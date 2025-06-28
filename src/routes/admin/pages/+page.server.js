import { pages } from '$lib/server/db-utils.js';

export async function load() {
    try {
        const allPages = pages.getAll();
        
        return {
            pages: allPages
        };
    } catch (error) {
        console.error('Error loading pages:', error);
        return {
            pages: []
        };
    }
}