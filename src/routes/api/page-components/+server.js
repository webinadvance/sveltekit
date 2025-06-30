import { json } from '@sveltejs/kit';
import { pageComponents } from '$lib/db/index.js';

export async function PUT({ request }) {
    try {
        const { id, component_data } = await request.json();
        
        if (!id || !component_data) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }
        
        // Update the component data in database
        const result = pageComponents.update(id, { component_data });
        
        return json({ 
            success: true, 
            message: 'Component updated successfully',
            data: result 
        });
        
    } catch (error) {
        console.error('Error updating component:', error);
        return json({ 
            error: 'Failed to update component',
            details: error.message 
        }, { status: 500 });
    }
}