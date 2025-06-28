import { json } from '@sveltejs/kit';
import { contact } from '$lib/server/db-utils.js';

// POST new contact message
export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            return json({ 
                success: false, 
                error: 'Name, email, and message are required' 
            }, { status: 400 });
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return json({ 
                success: false, 
                error: 'Invalid email address' 
            }, { status: 400 });
        }
        
        const message = contact.saveMessage(data);
        
        return json({ 
            success: true, 
            message: 'Message sent successfully',
            id: message.id 
        }, { status: 201 });
    } catch (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
}