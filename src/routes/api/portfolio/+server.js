import { json } from '@sveltejs/kit';
import { portfolio } from '$lib/server/db-utils.js';

// GET all portfolio items or by category
export async function GET({ url }) {
    try {
        const category = url.searchParams.get('category');
        const items = portfolio.getAll(category);
        
        return json({ success: true, items });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST new portfolio item
export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Validate required fields
        if (!data.title || !data.category) {
            return json({ success: false, error: 'Title and category are required' }, { status: 400 });
        }
        
        const item = portfolio.create(data);
        
        return json({ success: true, item }, { status: 201 });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
}