import { db } from './database.js';

// Pages operations
export const pages = {
    // Get page by slug with all sections
    getBySlug(slug) {
        try {
            const page = db.prepare('SELECT * FROM pages WHERE slug = ? AND is_published = 1').get(slug);
            if (!page) return null;

            const sections = db.prepare(`
                SELECT * FROM page_sections 
                WHERE page_id = ? AND is_active = 1 
                ORDER BY display_order
            `).all(page.id);

            return {
                ...page,
                sections: sections.map(section => ({
                    ...section,
                    content: section.content ? JSON.parse(section.content) : {},
                    settings: section.settings ? JSON.parse(section.settings) : {}
                }))
            };
        } catch (error) {
            console.error('Error loading page:', error);
            return null;
        }
    },

    // Get all pages
    getAll() {
        return db.prepare('SELECT * FROM pages ORDER BY created_at DESC').all();
    },

    // Create page
    create(data) {
        const stmt = db.prepare(`
            INSERT INTO pages (slug, title, meta_description, meta_keywords, template, is_published)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(data.slug, data.title, data.meta_description, data.meta_keywords, data.template || 'default', data.is_published ? 1 : 0);
        return { id: result.lastInsertRowid, ...data };
    },

    // Update page
    update(id, data) {
        const stmt = db.prepare(`
            UPDATE pages 
            SET slug = ?, title = ?, meta_description = ?, meta_keywords = ?, template = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `);
        stmt.run(data.slug, data.title, data.meta_description, data.meta_keywords, data.template, data.is_published ? 1 : 0, id);
        return { id, ...data };
    },

    // Delete page
    delete(id) {
        const stmt = db.prepare('DELETE FROM pages WHERE id = ?');
        return stmt.run(id);
    }
};

// Page sections operations
export const sections = {
    // Get sections for page
    getByPageId(pageId) {
        return db.prepare(`
            SELECT * FROM page_sections 
            WHERE page_id = ? AND is_active = 1 
            ORDER BY display_order
        `).all(pageId);
    },

    // Create section
    create(data) {
        const stmt = db.prepare(`
            INSERT INTO page_sections (page_id, component_type, title, subtitle, content, settings, display_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(
            data.page_id,
            data.component_type,
            data.title,
            data.subtitle,
            JSON.stringify(data.content || {}),
            JSON.stringify(data.settings || {}),
            data.display_order || 0
        );
        return { id: result.lastInsertRowid, ...data };
    },

    // Update section
    update(id, data) {
        const stmt = db.prepare(`
            UPDATE page_sections 
            SET title = ?, subtitle = ?, content = ?, settings = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `);
        stmt.run(data.title, data.subtitle, JSON.stringify(data.content || {}), JSON.stringify(data.settings || {}), data.display_order, id);
        return { id, ...data };
    },

    // Delete section
    delete(id) {
        const stmt = db.prepare('DELETE FROM page_sections WHERE id = ?');
        return stmt.run(id);
    }
};

// Gallery operations
export const galleries = {
    // Get all galleries
    getAll() {
        return db.prepare(`
            SELECT g.*, COUNT(gi.id) as item_count
            FROM gallery_components g
            LEFT JOIN gallery_items gi ON g.id = gi.gallery_component_id
            GROUP BY g.id
            ORDER BY g.id DESC
        `).all();
    },

    // Get gallery with categories and items
    getById(id) {
        const gallery = db.prepare('SELECT * FROM gallery_components WHERE id = ?').get(id);
        if (!gallery) return null;

        const categories = db.prepare(`
            SELECT * FROM gallery_categories 
            WHERE gallery_component_id = ?
            ORDER BY display_order
        `).all(id);

        const items = db.prepare(`
            SELECT gi.*, m.url, m.alt_text, m.width, m.height
            FROM gallery_items gi
            JOIN media_library m ON gi.media_id = m.id
            WHERE gi.gallery_component_id = ?
            ORDER BY gi.display_order
        `).all(id);

        return {
            ...gallery,
            categories,
            items
        };
    },

    // Create gallery
    create(data) {
        const stmt = db.prepare(`
            INSERT INTO gallery_components (section_id, gallery_type, columns, aspect_ratio, show_captions, enable_lightbox)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(data.section_id, data.gallery_type, data.columns, data.aspect_ratio, data.show_captions ? 1 : 0, data.enable_lightbox ? 1 : 0);
        return { id: result.lastInsertRowid, ...data };
    }
};

// Media library operations
export const media = {
    // Get all media
    getAll(folder = null) {
        const query = folder 
            ? 'SELECT * FROM media_library WHERE folder = ? ORDER BY created_at DESC'
            : 'SELECT * FROM media_library ORDER BY created_at DESC';
        
        return folder 
            ? db.prepare(query).all(folder)
            : db.prepare(query).all();
    },

    // Get media by ID
    getById(id) {
        return db.prepare('SELECT * FROM media_library WHERE id = ?').get(id);
    },

    // Create media
    create(data) {
        const stmt = db.prepare(`
            INSERT INTO media_library (filename, url, thumbnail_url, alt_text, caption, mime_type, file_size, width, height, folder)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(data.filename, data.url, data.thumbnail_url, data.alt_text, data.caption, data.mime_type, data.file_size, data.width, data.height, data.folder || '/');
        return { id: result.lastInsertRowid, ...data };
    },

    // Update media
    update(id, data) {
        const stmt = db.prepare(`
            UPDATE media_library 
            SET filename = ?, alt_text = ?, caption = ?, folder = ?
            WHERE id = ?
        `);
        stmt.run(data.filename, data.alt_text, data.caption, data.folder, id);
        return this.getById(id);
    },

    // Delete media
    delete(id) {
        const stmt = db.prepare('DELETE FROM media_library WHERE id = ?');
        return stmt.run(id);
    }
};

// Shows operations  
export const shows = {
    // Get all shows
    getAll() {
        return db.prepare(`
            SELECT s.*, m.url as poster_url
            FROM shows s
            LEFT JOIN media_library m ON s.poster_image_id = m.id
            ORDER BY s.start_date DESC
        `).all();
    },

    // Get current shows
    getCurrent() {
        return db.prepare(`
            SELECT s.*, m.url as poster_url
            FROM shows s
            LEFT JOIN media_library m ON s.poster_image_id = m.id
            WHERE s.is_current = 1
            ORDER BY s.start_date DESC
        `).all();
    },

    // Create show
    create(data) {
        const stmt = db.prepare(`
            INSERT INTO shows (show_component_id, title, subtitle, director, venue, description, genre, start_date, end_date, poster_image_id, is_current, display_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(data.show_component_id, data.title, data.subtitle, data.director, data.venue, data.description, data.genre, data.start_date, data.end_date, data.poster_image_id, data.is_current ? 1 : 0, data.display_order || 0);
        return { id: result.lastInsertRowid, ...data };
    }
};

// Portfolio operations (legacy - kept for compatibility)
export const portfolio = {
    // Get all items or by category
    getAll(category = null) {
        // Temporary - return empty array until we migrate data
        return [];
    },

    // Get single item
    getById(id) {
        return null;
    },

    // Get featured items
    getFeatured() {
        return [];
    },

    // Create new portfolio item
    create(data) {
        const stmt = db.prepare(`
            INSERT INTO portfolio_items (title, category, description, image_url, video_url, date, featured, display_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        const result = stmt.run(
            data.title,
            data.category,
            data.description || null,
            data.image_url || null,
            data.video_url || null,
            data.date || null,
            data.featured ? 1 : 0,
            data.display_order || 0
        );
        
        return { id: result.lastInsertRowid, ...data };
    },

    // Update portfolio item
    update(id, data) {
        const updates = [];
        const values = [];
        
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'id') {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        });
        
        values.push(id);
        
        const stmt = db.prepare(`
            UPDATE portfolio_items 
            SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `);
        
        stmt.run(...values);
        return this.getById(id);
    },

    // Delete portfolio item
    delete(id) {
        const stmt = db.prepare('DELETE FROM portfolio_items WHERE id = ?');
        return stmt.run(id);
    }
};

// Contact operations
export const contact = {
    // Save contact message
    saveMessage(data) {
        const stmt = db.prepare('INSERT INTO form_submissions (form_data) VALUES (?)');
        const result = stmt.run(JSON.stringify(data));
        
        return { id: result.lastInsertRowid, ...data };
    },

    // Get all messages
    getMessages(unreadOnly = false) {
        const stmt = db.prepare('SELECT * FROM form_submissions WHERE is_read = ? ORDER BY created_at DESC');
        return stmt.all(unreadOnly ? 0 : 1);
    },

    // Mark message as read
    markAsRead(id) {
        const stmt = db.prepare('UPDATE form_submissions SET is_read = 1 WHERE id = ?');
        return stmt.run(id);
    },

    // Delete message
    deleteMessage(id) {
        const stmt = db.prepare('DELETE FROM contact_messages WHERE id = ?');
        return stmt.run(id);
    }
};

// Settings operations
export const settings = {
    // Get single setting
    get(key) {
        const stmt = db.prepare('SELECT value FROM settings WHERE key = ?');
        const result = stmt.get(key);
        return result?.value;
    },

    // Set single setting
    set(key, value) {
        const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
        return stmt.run(key, value);
    },

    // Get all settings
    getAll() {
        const rows = db.prepare('SELECT key, value FROM settings').all();
        return rows.reduce((acc, row) => {
            acc[row.key] = row.value;
            return acc;
        }, {});
    },

    // Update multiple settings
    updateMany(settings) {
        const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
        const updates = db.transaction((settingsObj) => {
            Object.entries(settingsObj).forEach(([key, value]) => {
                stmt.run(key, value);
            });
        });
        
        updates(settings);
    }
};

// Analytics operations
export const analytics = {
    // Log page visit
    logVisit(pageData) {
        // Disabled for now
        return null;
    },

    // Get page visit count (last 30 days)
    getPageVisits(path) {
        return 0;
    },

    // Get all analytics data
    getAnalytics() {
        const stmt = db.prepare(`
            SELECT 
                page_path,
                COUNT(*) as visits,
                COUNT(DISTINCT visitor_ip) as unique_visitors
            FROM page_visits
            WHERE created_at > datetime('now', '-30 days')
            GROUP BY page_path
            ORDER BY visits DESC
        `);
        
        return stmt.all();
    }
};

// Transaction helper
export function transaction(callback) {
    return db.transaction(callback)();
}