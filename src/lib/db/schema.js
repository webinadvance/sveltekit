import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = process.env.DB_PATH || "/var/data/databases/cms.db";
const dbDir = path.dirname(DB_PATH);

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db;
try {
  db = new Database(DB_PATH);
  db.pragma("foreign_keys = ON");
  console.log(`Database connected: ${DB_PATH}`);
} catch (error) {
  console.error("Failed to open database:", error);
  db = new Database(":memory:");
  db.pragma("foreign_keys = ON");
}

function initializeDatabase() {
  db.exec(`
    -- Pages table - stores dynamic routes
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      meta_description TEXT,
      meta_keywords TEXT,
      og_image TEXT,
      is_published BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Components table - defines available component types
    CREATE TABLE IF NOT EXISTS components (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL,
      description TEXT,
      schema JSON, -- JSON schema for component props
      template_path TEXT, -- Path to Svelte component
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Page components table - links pages to their components
    CREATE TABLE IF NOT EXISTS page_components (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_id INTEGER NOT NULL,
      component_id INTEGER NOT NULL,
      component_data JSON NOT NULL, -- Component props/data
      display_order INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
      FOREIGN KEY (component_id) REFERENCES components(id) ON DELETE CASCADE
    );

    -- Media library for file uploads
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      url TEXT NOT NULL,
      thumbnail_url TEXT,
      alt_text TEXT,
      caption TEXT,
      mime_type TEXT,
      file_size INTEGER,
      width INTEGER,
      height INTEGER,
      folder TEXT DEFAULT '/',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Settings for global CMS configuration
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      type TEXT DEFAULT 'string', -- string, number, boolean, json
      category TEXT DEFAULT 'general',
      description TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Users for admin access (simple auth)
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin', -- admin, editor, viewer
      is_active BOOLEAN DEFAULT 1,
      last_login DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
    CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(is_published);
    CREATE INDEX IF NOT EXISTS idx_page_components_page ON page_components(page_id);
    CREATE INDEX IF NOT EXISTS idx_page_components_order ON page_components(display_order);
    CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);
    CREATE INDEX IF NOT EXISTS idx_components_active ON components(is_active);
  `);

  // Insert default components
  const insertComponent = db.prepare(`
    INSERT OR IGNORE INTO components (name, display_name, description, schema, template_path)
    VALUES (?, ?, ?, ?, ?)
  `);

  const defaultComponents = [
    {
      name: 'home_component',
      display_name: 'Home Component',
      description: 'Homepage placeholder component with title and content',
      schema: JSON.stringify({
        type: 'object',
        properties: {
          title: { type: 'string', title: 'Title', default: 'Home Placeholder' },
          subtitle: { type: 'string', title: 'Subtitle' },
          content: { type: 'string', title: 'Content', format: 'textarea' },
          background_color: { type: 'string', title: 'Background Color', default: 'bg-white' }
        },
        required: ['title']
      }),
      template_path: 'HomeComponent.svelte'
    },
    {
      name: 'hero',
      display_name: 'Hero Section',
      description: 'Hero banner with title, subtitle, and call-to-action',
      schema: JSON.stringify({
        type: 'object',
        properties: {
          title: { type: 'string', title: 'Title' },
          subtitle: { type: 'string', title: 'Subtitle' },
          background_image: { type: 'string', title: 'Background Image' },
          cta_text: { type: 'string', title: 'CTA Button Text' },
          cta_link: { type: 'string', title: 'CTA Link' }
        },
        required: ['title']
      }),
      template_path: 'Hero.svelte'
    },
    {
      name: 'text_block',
      display_name: 'Text Block',
      description: 'Rich text content block',
      schema: JSON.stringify({
        type: 'object',
        properties: {
          title: { type: 'string', title: 'Title' },
          content: { type: 'string', title: 'Content', format: 'textarea' },
          text_align: { 
            type: 'string', 
            title: 'Text Alignment',
            enum: ['left', 'center', 'right'],
            default: 'left'
          }
        },
        required: ['content']
      }),
      template_path: 'TextBlock.svelte'
    },
    {
      name: 'image_gallery',
      display_name: 'Image Gallery',
      description: 'Grid of images with lightbox',
      schema: JSON.stringify({
        type: 'object',
        properties: {
          title: { type: 'string', title: 'Gallery Title' },
          images: {
            type: 'array',
            title: 'Images',
            items: {
              type: 'object',
              properties: {
                url: { type: 'string', title: 'Image URL' },
                alt: { type: 'string', title: 'Alt Text' },
                caption: { type: 'string', title: 'Caption' }
              }
            }
          },
          columns: { 
            type: 'number', 
            title: 'Columns',
            minimum: 1,
            maximum: 6,
            default: 3
          }
        },
        required: ['images']
      }),
      template_path: 'ImageGallery.svelte'
    },
    {
      name: 'contact_form',
      display_name: 'Contact Form',
      description: 'Contact form with customizable fields',
      schema: JSON.stringify({
        type: 'object',
        properties: {
          title: { type: 'string', title: 'Form Title' },
          subtitle: { type: 'string', title: 'Form Subtitle' },
          success_message: { type: 'string', title: 'Success Message' },
          fields: {
            type: 'array',
            title: 'Form Fields',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', title: 'Field Name' },
                label: { type: 'string', title: 'Field Label' },
                type: { 
                  type: 'string', 
                  title: 'Field Type',
                  enum: ['text', 'email', 'textarea', 'tel'],
                  default: 'text'
                },
                required: { type: 'boolean', title: 'Required' }
              }
            }
          }
        },
        required: ['title']
      }),
      template_path: 'ContactForm.svelte'
    }
  ];

  defaultComponents.forEach(component => {
    insertComponent.run(
      component.name,
      component.display_name,
      component.description,
      component.schema,
      component.template_path
    );
  });

  // Insert default settings
  const insertSetting = db.prepare(`
    INSERT OR IGNORE INTO settings (key, value, type, category, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  const defaultSettings = [
    ['site_title', 'CMS Site', 'string', 'general', 'Website title'],
    ['site_description', 'A dynamic CMS website', 'string', 'general', 'Website description'],
    ['contact_email', 'contact@example.com', 'string', 'contact', 'Contact email address'],
    ['social_links', '{}', 'json', 'social', 'Social media links'],
    ['analytics_id', '', 'string', 'tracking', 'Google Analytics ID']
  ];

  defaultSettings.forEach(setting => {
    insertSetting.run(...setting);
  });

  // Create default homepage
  const insertPage = db.prepare(`
    INSERT OR IGNORE INTO pages (slug, title, meta_description)
    VALUES (?, ?, ?)
  `);

  insertPage.run('/', 'Homepage', 'Welcome to our dynamic CMS website');

  console.log("Database initialized successfully");
}

// Initialize database
try {
  initializeDatabase();
} catch (error) {
  console.error("Failed to initialize database:", error);
}

// Close database on exit
if (typeof process !== "undefined") {
  process.on("exit", () => db && db.close());
  process.on("SIGINT", () => {
    db && db.close();
    process.exit(0);
  });
}

export { db };