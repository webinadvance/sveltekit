<script>
  import '../app.css';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const eruda = await import('eruda');
      eruda.default.init();
    }
  });
</script>

<slot />