import { json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'static', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(uploadsDir, filename);
    
    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);
    
    // Return the URL
    return json({
      url: `/uploads/${filename}`,
      filename: filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    return json({ error: 'Upload failed' }, { status: 500 });
  }
}