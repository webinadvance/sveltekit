import { json } from '@sveltejs/kit';
import { db } from '$lib/db/schema.js';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/var/data/uploads';
// No file size limits - allow any size
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Note: File size limits removed

export async function POST({ request }) {
  try {
    // Handle large uploads by increasing the limit
    const contentLength = request.headers.get('content-length');
    console.log('Upload content length:', contentLength);
    
    const formData = await request.formData();
    const file = formData.get('file');
    const alt_text = formData.get('alt_text') || '';
    const caption = formData.get('caption') || '';
    const folder = formData.get('folder') || '/';

    if (!file || file.size === 0) {
      return json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    console.log('File size:', file.size, 'bytes');

    // No file size validation - accept any size

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return json({ 
        success: false, 
        error: `File type not allowed. Allowed types: ${ALLOWED_TYPES.join(', ')}` 
      }, { status: 400 });
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    // Convert file to buffer and save
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await fs.promises.writeFile(filePath, buffer);

    // Get image dimensions (basic implementation)
    let width = null;
    let height = null;
    
    // For more advanced image processing, you could use sharp or jimp here
    // For now, we'll store as null and update later if needed

    // Create URL path
    const url = `/uploads/${uniqueFilename}`;
    const thumbnail_url = url; // For now, same as main URL

    // Insert into database
    const insertMedia = db.prepare(`
      INSERT INTO media (filename, original_name, url, thumbnail_url, alt_text, caption, mime_type, file_size, width, height, folder)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertMedia.run(
      uniqueFilename,
      file.name,
      url,
      thumbnail_url,
      alt_text,
      caption,
      file.type,
      file.size,
      width,
      height,
      folder
    );

    // Get the inserted media record
    const getMedia = db.prepare('SELECT * FROM media WHERE id = ?');
    const mediaRecord = getMedia.get(result.lastInsertRowid);

    return json({ 
      success: true, 
      media: mediaRecord,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return json({ 
      success: false, 
      error: 'Upload failed: ' + error.message 
    }, { status: 500 });
  }
}

export async function GET({ url }) {
  try {
    const searchParams = url.searchParams;
    const folder = searchParams.get('folder') || '/';
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;

    // Get media files from database
    const getMedia = db.prepare(`
      SELECT * FROM media 
      WHERE folder = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `);

    const media = getMedia.all(folder, limit, offset);

    // Get total count
    const getCount = db.prepare('SELECT COUNT(*) as count FROM media WHERE folder = ?');
    const { count } = getCount.get(folder);

    return json({
      success: true,
      media,
      total: count,
      limit,
      offset
    });

  } catch (error) {
    console.error('Media fetch error:', error);
    return json({ 
      success: false, 
      error: 'Failed to fetch media: ' + error.message 
    }, { status: 500 });
  }
}