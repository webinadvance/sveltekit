import { pages } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        // Build the slug from params
        let slug = params.slug ? `/${params.slug}` : '/';
        
        // Handle homepage routes - both / and /home should load the homepage
        if (slug === '/home') {
            slug = '/';
        }
        
        console.log(`Loading page for slug: ${slug}`);
        
        // Load page from database
        const page = pages.getBySlug(slug);
        
        if (!page) {
            console.log(`Page not found for slug: ${slug}`);
            throw error(404, `Page not found: ${slug}`);
        }
        
        console.log(`Page loaded:`, page);
        
        return {
            page,
            title: page.title,
            description: page.meta_description || 'Dynamic CMS Website'
        };
    } catch (err) {
        console.error('Error loading page:', err);
        if (err.status) {
            throw err; // Re-throw SvelteKit errors
        }
        throw error(500, 'Failed to load page');
    }
}