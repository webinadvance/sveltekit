import { settings } from '$lib/server/db-utils.js';

export async function load() {
    try {
        const allSettings = settings.getAll();
        
        return {
            settings: allSettings
        };
    } catch (error) {
        console.error('Error loading settings:', error);
        return {
            settings: {}
        };
    }
}