import { pages } from '$lib/db';

export async function load() {
    try {
        // Load homepage content from database
        const page = pages.getBySlug('/');
        
        if (page) {
            return {
                page,
                title: page.title,
                description: page.meta_description || 'Dynamic CMS Website'
            };
        }
        
        // Fallback if no homepage found
        return {
            title: 'Dynamic CMS',
            description: 'A super dynamic CMS with SQLite and SSR'
        };
    } catch (error) {
        console.error('Error loading homepage:', error);
        return {
            title: 'Dynamic CMS',
            description: 'A super dynamic CMS with SQLite and SSR'
        };
    }
}