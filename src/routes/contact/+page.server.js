import { contact } from '$lib/server/db-utils.js';
import { fail } from '@sveltejs/kit';

// Handle form submission server-side
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        
        const name = data.get('name');
        const email = data.get('email');
        const subject = data.get('subject');
        const message = data.get('message');
        
        // Validation
        if (!name || !email || !message) {
            return fail(400, { 
                error: 'Please fill in all required fields',
                name, email, subject, message 
            });
        }
        
        // Save to database directly - no API call!
        try {
            const saved = contact.saveMessage({
                name: name.toString(),
                email: email.toString(),
                subject: subject?.toString() || null,
                message: message.toString()
            });
            
            return { 
                success: true,
                message: 'Thank you! Your message has been sent.' 
            };
        } catch (error) {
            return fail(500, { 
                error: 'Failed to send message. Please try again.',
                name, email, subject, message 
            });
        }
    }
};