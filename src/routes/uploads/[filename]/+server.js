import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/var/data/uploads';

export async function GET({ params }) {
  const { filename } = params;
  
  // Security: Prevent directory traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    throw error(400, 'Invalid filename');
  }
  
  const filePath = path.join(UPLOAD_DIR, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw error(404, 'File not found');
  }
  
  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    const fileExtension = path.extname(filename).toLowerCase();
    
    // Determine content type
    let contentType = 'application/octet-stream';
    switch (fileExtension) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
    }
    
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        'Content-Length': fileBuffer.length.toString()
      }
    });
    
  } catch (err) {
    console.error('Error serving file:', err);
    throw error(500, 'Error serving file');
  }
}