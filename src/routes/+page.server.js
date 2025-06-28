import { redirect } from '@sveltejs/kit';

export async function load() {
    // Redirect root / to /home
    throw redirect(301, '/home');
}