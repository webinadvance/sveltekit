import { json } from '@sveltejs/kit';
import { components } from '$lib/db/index.js';

export async function GET({ params }) {
    try {
        const { name } = params;
        
        if (!name) {
            return json({ error: 'Component name is required' }, { status: 400 });
        }
        
        // Get component schema from database
        const component = components.getByName(name);
        
        if (!component) {
            return json({ error: 'Component not found' }, { status: 404 });
        }
        
        return json({
            success: true,
            schema: component.schema,
            component: {
                name: component.name,
                display_name: component.display_name,
                description: component.description,
                template_path: component.template_path
            }
        });
        
    } catch (error) {
        console.error('Error fetching component schema:', error);
        return json({ 
            error: 'Failed to fetch component schema',
            details: error.message 
        }, { status: 500 });
    }
}