import { pages, media, galleries, shows } from '$lib/server/db-utils.js';

export async function load() {
    try {
        // Get dashboard statistics
        const allPages = pages.getAll();
        const allMedia = media.getAll();
        const allGalleries = galleries.getAll();
        const allShows = shows.getAll();
        
        // Get recent activity
        const recentPages = allPages.slice(0, 5);
        const recentMedia = allMedia.slice(0, 5);
        
        return {
            stats: {
                pages: allPages.length,
                media: allMedia.length,
                galleries: allGalleries.length,
                shows: allShows.length
            },
            recentPages,
            recentMedia
        };
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        
        return {
            stats: {
                pages: 0,
                media: 0,
                galleries: 0,
                shows: 0
            },
            recentPages: [],
            recentMedia: []
        };
    }
}