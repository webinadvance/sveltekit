import { json } from '@sveltejs/kit';
import { db } from '$lib/db/schema.js';

export async function GET({ params }) {
    try {
        const { id } = params;
        
        // Get component data directly from database
        const result = db.prepare(`
            SELECT pc.*, c.name as component_name
            FROM page_components pc
            JOIN components c ON pc.component_id = c.id
            WHERE pc.id = ?
        `).get(id);
        
        if (!result) {
            return json({ error: 'Component not found' }, { status: 404 });
        }
        
        return json({
            id: result.id,
            component_name: result.component_name,
            component_data: JSON.parse(result.component_data),
            display_order: result.display_order,
            is_active: result.is_active,
            updated_at: result.updated_at
        });
        
    } catch (error) {
        console.error('Error checking component:', error);
        return json({ 
            error: 'Failed to check component',
            details: error.message 
        }, { status: 500 });
    }
}