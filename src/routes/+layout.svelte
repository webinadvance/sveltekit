<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { debugStore } from '$lib/stores/debug.svelte.js';

  onMount(async () => {
    await debugStore.initEruda();
  });
</script>

<slot />