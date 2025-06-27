// Modern Svelte 5 reactive debug store
import { browser } from '$app/environment';

let eruda = $state(null);

export const debugStore = {
  get eruda() { return eruda; },
  
  async initEruda() {
    if (!browser) return;
    
    try {
      const erudaModule = await import('eruda');
      eruda = erudaModule.default;
      eruda.init();
      return true;
    } catch (err) {
      console.error('Eruda failed to load:', err);
      return false;
    }
  }
};