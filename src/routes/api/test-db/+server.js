import { json } from '@sveltejs/kit';
import { pages } from '$lib/db';

export async function GET() {
    try {
        // Get homepage data
        const homepage = pages.getBySlug('/');
        
        return json({
            success: true,
            page: homepage,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Database test error:', error);
        return json({ 
            error: 'Failed to load data',
            details: error.message 
        }, { status: 500 });
    }
}