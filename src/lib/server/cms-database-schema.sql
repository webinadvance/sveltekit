-- CMS-style database schema for SvelteKit portfolio
-- Page-based content management with component system

-- Pages (routes in the application)
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL, -- URL path like '/', '/about', '/contact'
    title TEXT NOT NULL,
    meta_description TEXT,
    meta_keywords TEXT,
    og_image TEXT,
    template TEXT DEFAULT 'default', -- Page template type
    is_published BOOLEAN DEFAULT 1,
    publish_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Page sections (components on each page)
CREATE TABLE IF NOT EXISTS page_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_id INTEGER NOT NULL,
    component_type TEXT NOT NULL, -- 'hero', 'gallery', 'biography', etc.
    title TEXT,
    subtitle TEXT,
    content JSON, -- Flexible JSON data for component props
    settings JSON, -- Component-specific settings
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- Content blocks (reusable content pieces)
CREATE TABLE IF NOT EXISTS content_blocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    block_key TEXT UNIQUE NOT NULL,
    block_type TEXT NOT NULL, -- 'text', 'html', 'markdown', 'json'
    content TEXT NOT NULL,
    metadata JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Media library (all images, videos, documents)
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
    duration INTEGER, -- For videos
    folder TEXT DEFAULT '/',
    tags JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Component data storage (for specific component types)

-- Hero components data
CREATE TABLE IF NOT EXISTS hero_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER UNIQUE NOT NULL,
    background_image_id INTEGER,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    buttons JSON, -- Array of button configs
    badges JSON, -- Array of badge texts
    FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE,
    FOREIGN KEY (background_image_id) REFERENCES media_library(id) ON DELETE SET NULL
);

-- Gallery components data
CREATE TABLE IF NOT EXISTS gallery_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER UNIQUE NOT NULL,
    gallery_type TEXT DEFAULT 'grid', -- 'grid', 'masonry', 'carousel', 'categories'
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

-- Text/Biography components
CREATE TABLE IF NOT EXISTS text_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER UNIQUE NOT NULL,
    content_format TEXT DEFAULT 'html', -- 'html', 'markdown', 'plain'
    content TEXT,
    columns INTEGER DEFAULT 1,
    background_image_id INTEGER,
    FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE,
    FOREIGN KEY (background_image_id) REFERENCES media_library(id) ON DELETE SET NULL
);

-- List components (for awards, skills, info lists)
CREATE TABLE IF NOT EXISTS list_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER UNIQUE NOT NULL,
    list_type TEXT DEFAULT 'simple', -- 'simple', 'key-value', 'timeline', 'cards'
    show_icons BOOLEAN DEFAULT 0,
    columns INTEGER DEFAULT 1,
    FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE
);

-- List items
CREATE TABLE IF NOT EXISTS list_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    list_component_id INTEGER NOT NULL,
    item_key TEXT,
    item_value TEXT,
    description TEXT,
    date TEXT,
    metadata JSON,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (list_component_id) REFERENCES list_components(id) ON DELETE CASCADE
);

-- Show/Production components
CREATE TABLE IF NOT EXISTS show_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER UNIQUE NOT NULL,
    display_style TEXT DEFAULT 'cards', -- 'cards', 'list', 'timeline'
    show_dates BOOLEAN DEFAULT 1,
    show_venue BOOLEAN DEFAULT 1,
    FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE
);

-- Shows/Productions
CREATE TABLE IF NOT EXISTS shows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    show_component_id INTEGER NOT NULL,
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
    FOREIGN KEY (show_component_id) REFERENCES show_components(id) ON DELETE CASCADE,
    FOREIGN KEY (poster_image_id) REFERENCES media_library(id) ON DELETE SET NULL
);

-- Show cast/crew
CREATE TABLE IF NOT EXISTS show_credits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    show_id INTEGER NOT NULL,
    person_name TEXT NOT NULL,
    role TEXT,
    is_cast BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE
);

-- Video/Showreel components
CREATE TABLE IF NOT EXISTS video_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER UNIQUE NOT NULL,
    layout TEXT DEFAULT 'single', -- 'single', 'grid', 'playlist'
    autoplay BOOLEAN DEFAULT 0,
    show_controls BOOLEAN DEFAULT 1,
    FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE
);

-- Videos
CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_component_id INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_id INTEGER,
    platform TEXT DEFAULT 'youtube', -- 'youtube', 'vimeo', 'self'
    duration INTEGER,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (video_component_id) REFERENCES video_components(id) ON DELETE CASCADE,
    FOREIGN KEY (thumbnail_id) REFERENCES media_library(id) ON DELETE SET NULL
);

-- Contact form components
CREATE TABLE IF NOT EXISTS contact_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_id INTEGER UNIQUE NOT NULL,
    email_to TEXT,
    success_message TEXT,
    fields JSON, -- Dynamic form fields configuration
    FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE
);

-- Form submissions
CREATE TABLE IF NOT EXISTS form_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    component_id INTEGER NOT NULL,
    form_data JSON NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    is_read BOOLEAN DEFAULT 0,
    is_spam BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (component_id) REFERENCES contact_components(id) ON DELETE CASCADE
);

-- Navigation menus
CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menu_key TEXT UNIQUE NOT NULL, -- 'main', 'footer', 'social'
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Menu items
CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menu_id INTEGER NOT NULL,
    parent_id INTEGER,
    title TEXT NOT NULL,
    url TEXT,
    page_id INTEGER,
    css_class TEXT,
    target TEXT DEFAULT '_self',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES menu_items(id) ON DELETE CASCADE,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE SET NULL
);

-- Global settings
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    type TEXT DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
    category TEXT DEFAULT 'general',
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- SEO metadata
CREATE TABLE IF NOT EXISTS seo_metadata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_id INTEGER UNIQUE NOT NULL,
    title_template TEXT,
    meta_robots TEXT,
    canonical_url TEXT,
    structured_data JSON,
    custom_head TEXT,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_page_sections_page ON page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_page_sections_type ON page_sections(component_type);
CREATE INDEX IF NOT EXISTS idx_content_blocks_key ON content_blocks(block_key);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media_library(folder);
CREATE INDEX IF NOT EXISTS idx_gallery_items_gallery ON gallery_items(gallery_component_id);
CREATE INDEX IF NOT EXISTS idx_shows_current ON shows(is_current);
CREATE INDEX IF NOT EXISTS idx_form_submissions_read ON form_submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_menu_items_menu ON menu_items(menu_id);

-- Triggers for updated_at
CREATE TRIGGER update_pages_timestamp 
AFTER UPDATE ON pages
BEGIN
    UPDATE pages SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_page_sections_timestamp 
AFTER UPDATE ON page_sections
BEGIN
    UPDATE page_sections SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_content_blocks_timestamp 
AFTER UPDATE ON content_blocks
BEGIN
    UPDATE content_blocks SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_settings_timestamp 
AFTER UPDATE ON settings
BEGIN
    UPDATE settings SET updated_at = CURRENT_TIMESTAMP WHERE key = NEW.key;
END;