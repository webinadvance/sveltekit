import { galleries } from '$lib/server/db-utils.js';

export async function load() {
    try {
        const allGalleries = galleries.getAll();
        
        return {
            galleries: allGalleries
        };
    } catch (error) {
        console.error('Error loading galleries:', error);
        return {
            galleries: []
        };
    }
}