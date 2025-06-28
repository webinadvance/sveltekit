import { media } from '$lib/server/db-utils.js';

export async function load() {
    try {
        const allMedia = media.getAll();
        
        return {
            media: allMedia
        };
    } catch (error) {
        console.error('Error loading media:', error);
        return {
            media: []
        };
    }
}