import { media } from '$lib/server/db-utils.js';
import { json } from '@sveltejs/kit';

// Update existing media  
export async function PUT({ request, params }) {
    try {
        const data = await request.json();
        const mediaId = params.id;
        
        if (!data.filename) {
            return new Response('Filename is required', { status: 400 });
        }
        
        // Update media record (not the actual file)
        const updatedMedia = {
            filename: data.filename,
            alt_text: data.alt_text || '',
            caption: data.caption || '',
            folder: data.folder || '/'
        };
        
        // Note: This doesn't update the actual file, only metadata
        const result = media.update(mediaId, updatedMedia);
        return json(result);
    } catch (error) {
        console.error('Error updating media:', error);
        return new Response('Failed to update media', { status: 500 });
    }
}

// Delete media
export async function DELETE({ params }) {
    try {
        const mediaId = params.id;
        
        // TODO: Also delete the actual file from filesystem
        media.delete(mediaId);
        return new Response('OK');
    } catch (error) {
        console.error('Error deleting media:', error);
        return new Response('Failed to delete media', { status: 500 });
    }
}