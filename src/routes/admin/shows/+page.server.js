import { shows } from '$lib/server/db-utils.js';

export async function load() {
    try {
        const allShows = shows.getAll();
        
        return {
            shows: allShows
        };
    } catch (error) {
        console.error('Error loading shows:', error);
        return {
            shows: []
        };
    }
}