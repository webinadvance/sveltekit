import { pages } from '$lib/server/db-utils.js';
import { json } from '@sveltejs/kit';

// Create new page
export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Validate required fields
        if (!data.title || !data.slug) {
            return new Response('Title and slug are required', { status: 400 });
        }
        
        // Check if slug already exists
        const existing = pages.getBySlug(data.slug);
        if (existing) {
            return new Response('A page with this URL path already exists', { status: 400 });
        }
        
        const page = pages.create(data);
        return json(page);
    } catch (error) {
        console.error('Error creating page:', error);
        return new Response('Failed to create page', { status: 500 });
    }
}