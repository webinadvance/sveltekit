import Database from 'better-sqlite3';
import { dev } from '$app/environment';
import fs from 'fs';
import path from 'path';

// Database file location
const DB_PATH = process.env.DB_PATH || '/var/data/databases/cinziabrugnola.db';

// Ensure directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database connection
let db;
try {
    db = new Database(DB_PATH);
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
} catch (error) {
    console.error('Failed to open database:', error);
    // Create in-memory database as fallback
    db = new Database(':memory:');
    db.pragma('foreign_keys = ON');
}

export { db };

// Initialize database schema
export function initializeDatabase() {
    // Create CMS-style tables
    db.exec(`
        -- Pages (routes in the application)
        CREATE TABLE IF NOT EXISTS pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            meta_description TEXT,
            meta_keywords TEXT,
            og_image TEXT,
            template TEXT DEFAULT 'default',
            is_published BOOLEAN DEFAULT 1,
            publish_date DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Page sections (components on each page)
        CREATE TABLE IF NOT EXISTS page_sections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page_id INTEGER NOT NULL,
            component_type TEXT NOT NULL,
            title TEXT,
            subtitle TEXT,
            content JSON,
            settings JSON,
            display_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
        );

        -- Media library
        CREATE TABLE IF NOT EXISTS media_library (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            url TEXT NOT NULL,
            thumbnail_url TEXT,
            alt_text TEXT,
            caption TEXT,
            mime_type TEXT,
            file_size INTEGER,
            width INTEGER,
            height INTEGER,
            duration INTEGER,
            folder TEXT DEFAULT '/',
            tags JSON,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Gallery components
        CREATE TABLE IF NOT EXISTS gallery_components (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section_id INTEGER UNIQUE NOT NULL,
            gallery_type TEXT DEFAULT 'grid',
            columns INTEGER DEFAULT 3,
            aspect_ratio TEXT,
            show_captions BOOLEAN DEFAULT 1,
            enable_lightbox BOOLEAN DEFAULT 1,
            FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE
        );

        -- Gallery categories
        CREATE TABLE IF NOT EXISTS gallery_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            gallery_component_id INTEGER NOT NULL,
            slug TEXT NOT NULL,
            name TEXT NOT NULL,
            icon TEXT,
            display_order INTEGER DEFAULT 0,
            FOREIGN KEY (gallery_component_id) REFERENCES gallery_components(id) ON DELETE CASCADE,
            UNIQUE(gallery_component_id, slug)
        );

        -- Gallery items
        CREATE TABLE IF NOT EXISTS gallery_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            gallery_component_id INTEGER NOT NULL,
            category_id INTEGER,
            media_id INTEGER NOT NULL,
            title TEXT,
            description TEXT,
            link_url TEXT,
            display_order INTEGER DEFAULT 0,
            is_featured BOOLEAN DEFAULT 0,
            FOREIGN KEY (gallery_component_id) REFERENCES gallery_components(id) ON DELETE CASCADE,
            FOREIGN KEY (category_id) REFERENCES gallery_categories(id) ON DELETE SET NULL,
            FOREIGN KEY (media_id) REFERENCES media_library(id) ON DELETE CASCADE
        );

        -- Shows/Productions
        CREATE TABLE IF NOT EXISTS shows (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            subtitle TEXT,
            director TEXT,
            venue TEXT,
            description TEXT,
            genre TEXT,
            start_date DATE,
            end_date DATE,
            poster_image_id INTEGER,
            is_current BOOLEAN DEFAULT 0,
            display_order INTEGER DEFAULT 0,
            metadata JSON,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (poster_image_id) REFERENCES media_library(id) ON DELETE SET NULL
        );

        -- Show credits
        CREATE TABLE IF NOT EXISTS show_credits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            show_id INTEGER NOT NULL,
            person_name TEXT NOT NULL,
            role TEXT,
            is_cast BOOLEAN DEFAULT 1,
            display_order INTEGER DEFAULT 0,
            FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE
        );

        -- Content blocks
        CREATE TABLE IF NOT EXISTS content_blocks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            block_key TEXT UNIQUE NOT NULL,
            block_type TEXT NOT NULL,
            content TEXT NOT NULL,
            metadata JSON,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Settings
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT,
            type TEXT DEFAULT 'string',
            category TEXT DEFAULT 'general',
            description TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Form submissions
        CREATE TABLE IF NOT EXISTS form_submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            form_type TEXT DEFAULT 'contact',
            form_data JSON NOT NULL,
            ip_address TEXT,
            user_agent TEXT,
            is_read BOOLEAN DEFAULT 0,
            is_spam BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
        CREATE INDEX IF NOT EXISTS idx_page_sections_page ON page_sections(page_id);
        CREATE INDEX IF NOT EXISTS idx_media_folder ON media_library(folder);
        CREATE INDEX IF NOT EXISTS idx_shows_current ON shows(is_current);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_read ON form_submissions(is_read);
    `);
    
    // Also create simplified tables for immediate use
    db.exec(`
        -- Gallery categories table
        CREATE TABLE IF NOT EXISTS gallery_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            icon TEXT,
            aspect_ratio TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Gallery images table
        CREATE TABLE IF NOT EXISTS gallery_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id TEXT NOT NULL,
            url TEXT NOT NULL,
            alt TEXT,
            caption TEXT,
            display_order INTEGER DEFAULT 0,
            featured BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES gallery_categories(category_id) ON DELETE CASCADE
        );

        -- Portfolio gallery data (separate from categories)
        CREATE TABLE IF NOT EXISTS portfolio_gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            subtitle TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Photo gallery data  
        CREATE TABLE IF NOT EXISTS photo_gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            subtitle TEXT,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Photo gallery images
        CREATE TABLE IF NOT EXISTS photo_gallery_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            alt TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Hero section data
        CREATE TABLE IF NOT EXISTS hero_section (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            subtitle TEXT,
            description TEXT,
            background_image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Hero badges
        CREATE TABLE IF NOT EXISTS hero_badges (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            badge_text TEXT NOT NULL,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Hero actions/buttons
        CREATE TABLE IF NOT EXISTS hero_actions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            variant TEXT,
            class TEXT,
            href TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Biography section
        CREATE TABLE IF NOT EXISTS biography (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            subtitle TEXT,
            background_image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Biography content paragraphs
        CREATE TABLE IF NOT EXISTS biography_content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paragraph TEXT NOT NULL,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Awards
        CREATE TABLE IF NOT EXISTS awards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            year TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Personal info (height, eyes, etc)
        CREATE TABLE IF NOT EXISTS personal_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            info_key TEXT UNIQUE NOT NULL,
            info_value TEXT NOT NULL,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Skills/Languages
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            skill_key TEXT NOT NULL,
            skill_value TEXT NOT NULL,
            category TEXT DEFAULT 'language',
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Current shows
        CREATE TABLE IF NOT EXISTS current_shows (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            show_id TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            director TEXT,
            description TEXT,
            genre TEXT,
            venue TEXT,
            date_from TEXT,
            date_to TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Show cast members
        CREATE TABLE IF NOT EXISTS show_cast (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            show_id TEXT NOT NULL,
            cast_member TEXT NOT NULL,
            role TEXT,
            display_order INTEGER DEFAULT 0,
            FOREIGN KEY (show_id) REFERENCES current_shows(show_id) ON DELETE CASCADE
        );

        -- Experience sections (theater, cinema, tv)
        CREATE TABLE IF NOT EXISTS experience_sections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section_id TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            icon TEXT,
            background_image TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Experience projects
        CREATE TABLE IF NOT EXISTS experience_projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section_id TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            year TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (section_id) REFERENCES experience_sections(section_id) ON DELETE CASCADE
        );

        -- Project badges
        CREATE TABLE IF NOT EXISTS project_badges (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            badge_text TEXT NOT NULL,
            display_order INTEGER DEFAULT 0,
            FOREIGN KEY (project_id) REFERENCES experience_projects(id) ON DELETE CASCADE
        );

        -- Showreel videos
        CREATE TABLE IF NOT EXISTS showreel (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            subtitle TEXT,
            description TEXT,
            video_url TEXT NOT NULL,
            platform TEXT DEFAULT 'youtube',
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Digital projects
        CREATE TABLE IF NOT EXISTS digital_projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            link_text TEXT,
            link_url TEXT,
            image_url TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Footer links
        CREATE TABLE IF NOT EXISTS footer_links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            href TEXT NOT NULL,
            icon TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Contact messages table
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            read BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Site settings table
        CREATE TABLE IF NOT EXISTS site_settings (
            key TEXT PRIMARY KEY,
            value TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Page visits tracking (optional)
        CREATE TABLE IF NOT EXISTS page_visits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page_path TEXT NOT NULL,
            visitor_ip TEXT,
            user_agent TEXT,
            referrer TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Create indexes for better performance
        CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_items(category);
        CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_items(featured);
        CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio_items(display_order);
        CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages(read);
        CREATE INDEX IF NOT EXISTS idx_visits_page ON page_visits(page_path);
        CREATE INDEX IF NOT EXISTS idx_visits_date ON page_visits(created_at);
    `);

    // Insert default settings if not exist
    const settingsStmt = db.prepare('INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)');
    settingsStmt.run('site_title', 'Cinzia Brugnola - Professional Actress');
    settingsStmt.run('site_description', 'Professional actress portfolio');
    settingsStmt.run('contact_email', 'cinzia@example.com');
    
    console.log('Database initialized successfully');
}

// Initialize on module load
try {
    initializeDatabase();
} catch (error) {
    console.error('Failed to initialize database:', error);
}

// Helper functions
export function getSettings() {
    try {
        const rows = db.prepare('SELECT key, value FROM settings').all();
        return rows.reduce((acc, row) => {
            acc[row.key] = row.value;
            return acc;
        }, {});
    } catch (error) {
        console.error('Failed to get settings:', error);
        return {};
    }
}

// Close database on process exit
if (typeof process !== 'undefined') {
    process.on('exit', () => db && db.close());
    process.on('SIGINT', () => {
        db && db.close();
        process.exit(0);
    });
}