import { db } from './schema.js';

// Pages model
export const pages = {
  // Get all pages
  getAll() {
    return db.prepare(`
      SELECT * FROM pages 
      ORDER BY created_at DESC
    `).all();
  },

  // Get page by slug with components
  getBySlug(slug) {
    try {
      const page = db.prepare(`
        SELECT * FROM pages 
        WHERE slug = ? AND is_published = 1
      `).get(slug);

      if (!page) return null;

      const pageComponents = db.prepare(`
        SELECT 
          pc.*,
          c.name as component_name,
          c.display_name,
          c.template_path
        FROM page_components pc
        JOIN components c ON pc.component_id = c.id
        WHERE pc.page_id = ? AND pc.is_active = 1
        ORDER BY pc.display_order ASC
      `).all(page.id);

      return {
        ...page,
        components: pageComponents.map(pc => ({
          ...pc,
          component_data: JSON.parse(pc.component_data)
        }))
      };
    } catch (error) {
      console.error('Error loading page:', error);
      return null;
    }
  },

  // Create new page
  create(data) {
    const stmt = db.prepare(`
      INSERT INTO pages (slug, title, meta_description, meta_keywords, og_image, is_published)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.slug,
      data.title,
      data.meta_description || null,
      data.meta_keywords || null,
      data.og_image || null,
      data.is_published ? 1 : 0
    );
    return { id: result.lastInsertRowid, ...data };
  },

  // Update page
  update(id, data) {
    const stmt = db.prepare(`
      UPDATE pages 
      SET slug = ?, title = ?, meta_description = ?, meta_keywords = ?, 
          og_image = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(
      data.slug,
      data.title,
      data.meta_description || null,
      data.meta_keywords || null,
      data.og_image || null,
      data.is_published ? 1 : 0,
      id
    );
    return { id, ...data };
  },

  // Delete page
  delete(id) {
    const stmt = db.prepare('DELETE FROM pages WHERE id = ?');
    return stmt.run(id);
  }
};

// Components model
export const components = {
  // Get all available components
  getAll() {
    return db.prepare(`
      SELECT * FROM components 
      WHERE is_active = 1
      ORDER BY display_name
    `).all().map(comp => ({
      ...comp,
      schema: JSON.parse(comp.schema)
    }));
  },

  // Get component by name
  getByName(name) {
    const comp = db.prepare(`
      SELECT * FROM components 
      WHERE name = ? AND is_active = 1
    `).get(name);
    
    if (!comp) return null;
    
    return {
      ...comp,
      schema: JSON.parse(comp.schema)
    };
  },

  // Create component
  create(data) {
    const stmt = db.prepare(`
      INSERT INTO components (name, display_name, description, schema, template_path)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.name,
      data.display_name,
      data.description || null,
      JSON.stringify(data.schema),
      data.template_path
    );
    return { id: result.lastInsertRowid, ...data };
  }
};

// Page Components model
export const pageComponents = {
  // Get components for a page
  getByPageId(pageId) {
    return db.prepare(`
      SELECT 
        pc.*,
        c.name as component_name,
        c.display_name,
        c.template_path
      FROM page_components pc
      JOIN components c ON pc.component_id = c.id
      WHERE pc.page_id = ? AND pc.is_active = 1
      ORDER BY pc.display_order ASC
    `).all(pageId).map(pc => ({
      ...pc,
      component_data: JSON.parse(pc.component_data)
    }));
  },

  // Add component to page
  create(data) {
    const stmt = db.prepare(`
      INSERT INTO page_components (page_id, component_id, component_data, display_order)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.page_id,
      data.component_id,
      JSON.stringify(data.component_data),
      data.display_order || 0
    );
    return { id: result.lastInsertRowid, ...data };
  },

  // Update component data
  update(id, data) {
    const stmt = db.prepare(`
      UPDATE page_components 
      SET component_data = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(
      JSON.stringify(data.component_data),
      data.display_order || 0,
      id
    );
    return { id, ...data };
  },

  // Delete page component
  delete(id) {
    const stmt = db.prepare('DELETE FROM page_components WHERE id = ?');
    return stmt.run(id);
  },

  // Reorder components
  reorder(pageId, componentOrders) {
    const stmt = db.prepare(`
      UPDATE page_components 
      SET display_order = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND page_id = ?
    `);
    
    const transaction = db.transaction(() => {
      componentOrders.forEach(({ id, order }) => {
        stmt.run(order, id, pageId);
      });
    });
    
    transaction();
  }
};

// Media model
export const media = {
  // Get all media
  getAll(folder = null) {
    const query = folder 
      ? 'SELECT * FROM media WHERE folder = ? ORDER BY created_at DESC'
      : 'SELECT * FROM media ORDER BY created_at DESC';
    
    return folder 
      ? db.prepare(query).all(folder)
      : db.prepare(query).all();
  },

  // Get media by ID
  getById(id) {
    return db.prepare('SELECT * FROM media WHERE id = ?').get(id);
  },

  // Create media record
  create(data) {
    const stmt = db.prepare(`
      INSERT INTO media (filename, original_name, url, thumbnail_url, alt_text, 
                        caption, mime_type, file_size, width, height, folder)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.filename,
      data.original_name,
      data.url,
      data.thumbnail_url || null,
      data.alt_text || null,
      data.caption || null,
      data.mime_type,
      data.file_size || null,
      data.width || null,
      data.height || null,
      data.folder || '/'
    );
    return { id: result.lastInsertRowid, ...data };
  },

  // Update media
  update(id, data) {
    const stmt = db.prepare(`
      UPDATE media 
      SET alt_text = ?, caption = ?, folder = ?
      WHERE id = ?
    `);
    stmt.run(data.alt_text, data.caption, data.folder, id);
    return this.getById(id);
  },

  // Delete media
  delete(id) {
    const stmt = db.prepare('DELETE FROM media WHERE id = ?');
    return stmt.run(id);
  }
};

// Settings model
export const settings = {
  // Get setting by key
  get(key) {
    const result = db.prepare('SELECT value, type FROM settings WHERE key = ?').get(key);
    if (!result) return null;
    
    // Parse value based on type
    switch (result.type) {
      case 'json':
        return JSON.parse(result.value);
      case 'number':
        return parseFloat(result.value);
      case 'boolean':
        return result.value === 'true';
      default:
        return result.value;
    }
  },

  // Get all settings
  getAll() {
    const rows = db.prepare('SELECT key, value, type FROM settings').all();
    return rows.reduce((acc, row) => {
      switch (row.type) {
        case 'json':
          acc[row.key] = JSON.parse(row.value);
          break;
        case 'number':
          acc[row.key] = parseFloat(row.value);
          break;
        case 'boolean':
          acc[row.key] = row.value === 'true';
          break;
        default:
          acc[row.key] = row.value;
      }
      return acc;
    }, {});
  },

  // Set setting
  set(key, value, type = 'string') {
    let stringValue = value;
    if (type === 'json') {
      stringValue = JSON.stringify(value);
    } else if (type === 'boolean') {
      stringValue = value ? 'true' : 'false';
    } else if (type === 'number') {
      stringValue = value.toString();
    }

    const stmt = db.prepare(`
      INSERT OR REPLACE INTO settings (key, value, type, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `);
    return stmt.run(key, stringValue, type);
  },

  // Update multiple settings
  updateMany(settingsObj) {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO settings (key, value, type, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `);
    
    const transaction = db.transaction(() => {
      Object.entries(settingsObj).forEach(([key, { value, type = 'string' }]) => {
        let stringValue = value;
        if (type === 'json') {
          stringValue = JSON.stringify(value);
        } else if (type === 'boolean') {
          stringValue = value ? 'true' : 'false';
        } else if (type === 'number') {
          stringValue = value.toString();
        }
        stmt.run(key, stringValue, type);
      });
    });
    
    transaction();
  }
};