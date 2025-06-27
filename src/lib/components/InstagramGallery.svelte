<script>
  import { onMount } from 'svelte';
  import { Instagram } from 'lucide-svelte';
  
  export let limit = 4;
  export let accessToken = ''; // You'll need to get this from Instagram API
  
  let posts = [];
  let loading = true;
  let error = null;
  
  // For demo purposes, using placeholder data
  // Replace with actual Instagram API call when you have access token
  onMount(async () => {
    try {
      if (accessToken) {
        // Actual Instagram API call would go here:
        // const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}&limit=${limit}`);
        // const data = await response.json();
        // posts = data.data;
      } else {
        // Demo data - replace with your actual Instagram posts
        posts = [
          {
            id: '1',
            media_url: 'https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?q=80&w=400',
            permalink: 'https://instagram.com/p/1',
            caption: 'Sul palco con Imitationofdeath'
          },
          {
            id: '2', 
            media_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400',
            permalink: 'https://instagram.com/p/2',
            caption: 'Backstage del film The Lack'
          },
          {
            id: '3',
            media_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400', 
            permalink: 'https://instagram.com/p/3',
            caption: 'Alta Luce Teatro Milano'
          },
          {
            id: '4',
            media_url: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=400',
            permalink: 'https://instagram.com/p/4', 
            caption: 'Ritratto professionale'
          }
        ];
      }
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
</script>

<div class="instagram-gallery">
  <div class="text-center mb-8">
    <h3 class="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
      <Instagram class="w-6 h-6" />
      Seguimi su Instagram
    </h3>
    <p class="text-gray-600">@cinziabrugnola</p>
  </div>
  
  {#if loading}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each Array(4) as _, i}
        <div class="aspect-square bg-gray-200 animate-pulse"></div>
      {/each}
    </div>
  {:else if error}
    <div class="text-center text-red-600">
      <p>Errore nel caricamento dei post: {error}</p>
    </div>
  {:else if posts.length > 0}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each posts.slice(0, limit) as post}
        <a 
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative aspect-square overflow-hidden bg-gray-100"
        >
          <img 
            src={post.media_url} 
            alt={post.caption || 'Instagram post'}
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p class="text-white text-sm line-clamp-2">{post.caption || ''}</p>
          </div>
        </a>
      {/each}
    </div>
    
    <div class="text-center mt-8">
      <a 
        href="https://instagram.com/cinziabrugnola" 
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
      >
        <Instagram class="w-5 h-5" />
        Vedi tutti i post
      </a>
    </div>
  {:else}
    <div class="text-center text-gray-600">
      <p>Nessun post disponibile</p>
    </div>
  {/if}
</div>