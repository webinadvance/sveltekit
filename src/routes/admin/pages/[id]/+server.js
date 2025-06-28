import { pages } from '$lib/server/db-utils.js';
import { json } from '@sveltejs/kit';

// Update existing page  
export async function PUT({ request, params }) {
    try {
        const data = await request.json();
        const pageId = params.id;
        
        if (!data.title || !data.slug) {
            return new Response('Title and slug are required', { status: 400 });
        }
        
        // Check if slug exists for different page
        const existing = pages.getBySlug(data.slug);
        if (existing && existing.id !== parseInt(pageId)) {
            return new Response('A page with this URL path already exists', { status: 400 });
        }
        
        const page = pages.update(pageId, data);
        return json(page);
    } catch (error) {
        console.error('Error updating page:', error);
        return new Response('Failed to update page', { status: 500 });
    }
}

// Delete page
export async function DELETE({ params }) {
    try {
        const pageId = params.id;
        pages.delete(pageId);
        return new Response('OK');
    } catch (error) {
        console.error('Error deleting page:', error);
        return new Response('Failed to delete page', { status: 500 });
    }
}