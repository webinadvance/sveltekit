import { json } from '@sveltejs/kit';
import { portfolio } from '$lib/server/db-utils.js';

// GET single portfolio item
export async function GET({ params }) {
    try {
        const item = portfolio.getById(params.id);
        
        if (!item) {
            return json({ success: false, error: 'Item not found' }, { status: 404 });
        }
        
        return json({ success: true, item });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT update portfolio item
export async function PUT({ params, request }) {
    try {
        const data = await request.json();
        const updated = portfolio.update(params.id, data);
        
        if (!updated) {
            return json({ success: false, error: 'Item not found' }, { status: 404 });
        }
        
        return json({ success: true, item: updated });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE portfolio item
export async function DELETE({ params }) {
    try {
        const result = portfolio.delete(params.id);
        
        if (result.changes === 0) {
            return json({ success: false, error: 'Item not found' }, { status: 404 });
        }
        
        return json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
}