/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Simply pass through - body size limits are handled by systemd environment
  const response = await resolve(event);
  return response;
}