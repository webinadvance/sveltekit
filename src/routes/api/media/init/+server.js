import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/var/data/uploads';

export async function POST() {
  try {
    // Ensure upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      console.log(`Created upload directory: ${UPLOAD_DIR}`);
    }
    
    // Set proper permissions
    try {
      fs.chmodSync(UPLOAD_DIR, 0o755);
    } catch (permError) {
      console.warn('Could not set directory permissions:', permError.message);
    }
    
    return json({ 
      success: true, 
      message: 'Upload directory initialized',
      path: UPLOAD_DIR
    });
    
  } catch (error) {
    console.error('Init error:', error);
    return json({ 
      success: false, 
      error: 'Failed to initialize: ' + error.message 
    }, { status: 500 });
  }
}