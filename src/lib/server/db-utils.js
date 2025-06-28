import { db } from './database.js';

// Portfolio operations
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
        const rows = db.prepare('SELECT key, value FROM site_settings').all();
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