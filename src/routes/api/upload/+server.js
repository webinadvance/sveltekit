import { json } from '@sveltejs/kit';
import { media } from '$lib/db';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Convert file to base64 for database storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Data}`;
    
    // Save to database
    const mediaRecord = media.create({
      filename: file.name,
      original_name: file.name,
      url: dataUrl,
      alt_text: file.name,
      mime_type: file.type,
      file_size: buffer.length
    });
    
    // Return the data URL for immediate display
    return json({
      url: dataUrl,
      filename: file.name,
      id: mediaRecord.id
    });
  } catch (error) {
    console.error('Upload error:', error);
    return json({ error: 'Upload failed' }, { status: 500 });
  }
}