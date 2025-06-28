import { settings } from '$lib/server/db-utils.js';
import { json } from '@sveltejs/kit';

// Update settings
export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Update all settings
        settings.updateMany(data);
        
        return json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return new Response('Failed to update settings', { status: 500 });
    }
}