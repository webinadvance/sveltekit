import { media } from '$lib/server/db-utils.js';
import { json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Upload new media file
export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const alt_text = formData.get('alt_text') || '';
        const caption = formData.get('caption') || '';
        const folder = formData.get('folder') || '/';
        
        if (!file) {
            return new Response('No file provided', { status: 400 });
        }
        
        // Create upload directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'static', 'uploads', folder.replace(/^\//, ''));
        await mkdir(uploadDir, { recursive: true });
        
        // Generate unique filename
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const filename = `${timestamp}.${extension}`;
        const filePath = join(uploadDir, filename);
        
        // Save file
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);
        
        // Create media record
        const mediaData = {
            filename: file.name,
            url: `/uploads${folder}${filename}`,
            alt_text,
            caption,
            mime_type: file.type,
            file_size: file.size,
            folder
        };
        
        const newMedia = media.create(mediaData);
        return json(newMedia);
    } catch (error) {
        console.error('Error uploading file:', error);
        return new Response('Failed to upload file', { status: 500 });
    }
}