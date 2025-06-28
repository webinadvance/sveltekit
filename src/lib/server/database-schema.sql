-- Best practice SQLite database schema for portfolio website
-- Following normalization, proper indexing, and scalability principles

-- Core content pages/sections metadata
CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_key TEXT UNIQUE NOT NULL, -- 'hero', 'biography', 'portfolio', etc.
    title TEXT,
    subtitle TEXT,
    description TEXT,
    background_image TEXT,
    meta_data JSON, -- Flexible field for section-specific data
    is_active BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Media assets (centralized media management)
CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    media_type TEXT CHECK(media_type IN ('image', 'video', 'audio')) DEFAULT 'image',
    width INTEGER,
    height INTEGER,
    file_size INTEGER,
    mime_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Gallery categories (theater, cinema, portraits, etc.)
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL, -- URL-friendly identifier
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    parent_id INTEGER,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Gallery items (links media to categories)
CREATE TABLE IF NOT EXISTS gallery_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    media_id INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT 0,
    metadata JSON, -- Extra data like credits, location, etc.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
    UNIQUE(category_id, media_id)
);

-- Productions/Shows (theater, cinema, TV)
CREATE TABLE IF NOT EXISTS productions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    type TEXT CHECK(type IN ('theater', 'cinema', 'tv', 'digital')) NOT NULL,
    director TEXT,
    production_company TEXT,
    venue TEXT,
    description TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cast & Crew for productions
CREATE TABLE IF NOT EXISTS production_credits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    production_id INTEGER NOT NULL,
    person_name TEXT NOT NULL,
    role TEXT NOT NULL,
    credit_type TEXT CHECK(credit_type IN ('cast', 'crew')) DEFAULT 'cast',
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (production_id) REFERENCES productions(id) ON DELETE CASCADE
);

-- Production media (photos, videos, posters)
CREATE TABLE IF NOT EXISTS production_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    production_id INTEGER NOT NULL,
    media_id INTEGER NOT NULL,
    media_type TEXT CHECK(media_type IN ('poster', 'still', 'trailer', 'backstage')),
    is_primary BOOLEAN DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (production_id) REFERENCES productions(id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
);

-- Tags system (for flexible categorization)
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Many-to-many relationship tables
CREATE TABLE IF NOT EXISTS production_tags (
    production_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (production_id, tag_id),
    FOREIGN KEY (production_id) REFERENCES productions(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Personal/Professional information
CREATE TABLE IF NOT EXISTS profile_info (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    category TEXT CHECK(category IN ('personal', 'physical', 'skills', 'languages', 'contact')),
    display_order INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Awards and achievements
CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    issuer TEXT,
    date_received DATE,
    category TEXT,
    display_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    is_read BOOLEAN DEFAULT 0,
    is_spam BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Site configuration
CREATE TABLE IF NOT EXISTS site_config (
    key TEXT PRIMARY KEY,
    value TEXT,
    type TEXT CHECK(type IN ('string', 'number', 'boolean', 'json')) DEFAULT 'string',
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Navigation menu items
CREATE TABLE IF NOT EXISTS navigation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    title TEXT NOT NULL,
    url TEXT,
    icon TEXT,
    position TEXT CHECK(position IN ('header', 'footer', 'social')) DEFAULT 'header',
    target TEXT DEFAULT '_self',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES navigation(id) ON DELETE CASCADE
);

-- Analytics/tracking (privacy-friendly)
CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_path TEXT NOT NULL,
    referrer TEXT,
    visitor_hash TEXT, -- Hashed IP for privacy
    country_code TEXT,
    device_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sections_key ON sections(section_key);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category_id);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_productions_type ON productions(type);
CREATE INDEX IF NOT EXISTS idx_productions_current ON productions(is_current);
CREATE INDEX IF NOT EXISTS idx_productions_slug ON productions(slug);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(created_at);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_sections_timestamp 
AFTER UPDATE ON sections
BEGIN
    UPDATE sections SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_categories_timestamp 
AFTER UPDATE ON categories
BEGIN
    UPDATE categories SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_productions_timestamp 
AFTER UPDATE ON productions
BEGIN
    UPDATE productions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_site_config_timestamp 
AFTER UPDATE ON site_config
BEGIN
    UPDATE site_config SET updated_at = CURRENT_TIMESTAMP WHERE key = NEW.key;
END;

CREATE TRIGGER update_profile_info_timestamp 
AFTER UPDATE ON profile_info
BEGIN
    UPDATE profile_info SET updated_at = CURRENT_TIMESTAMP WHERE key = NEW.key;
END;