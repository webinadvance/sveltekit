<script>
  import { Play } from 'lucide-svelte';
  
  export let title = '';
  export let subtitle = '';
  export let video = {};
  export let backgroundColor = 'bg-black';
  
  // video structure:
  // video = {
  //   thumbnailUrl: '...',
  //   title: 'Video Title',
  //   duration: '3:45',
  //   description: 'Video description',
  //   onClick: () => {}
  // }
</script>

<div class="relative py-20 {backgroundColor}">
  <div class="container mx-auto px-0 md:px-4">
    <div class="text-center mb-12">
      <h2 class="text-white text-4xl lg:text-5xl font-bold mb-6">
        {title}
      </h2>
      {#if subtitle}
        <p class="text-white/80 text-xl">
          {subtitle}
        </p>
      {/if}
    </div>
    
    <!-- Video Player Mock -->
    <div class="max-w-4xl mx-auto px-4 md:px-0">
      <div 
        class="relative aspect-video bg-gray-900 overflow-hidden group cursor-pointer"
        on:click={video.onClick}
        on:keydown={(e) => e.key === 'Enter' && video.onClick?.()}
        role="button"
        tabindex="0"
      >
        <img 
          src={video.thumbnailUrl}
          alt={video.title}
          class="w-full h-full object-cover grayscale"
        />
        
        <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div class="w-20 h-20 bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Play class="w-10 h-10 text-gray-900 ml-1" />
          </div>
        </div>
        
        <div class="absolute bottom-4 left-4 text-white">
          <p class="text-lg font-semibold">{video.title}</p>
          {#if video.duration}
            <p class="text-sm text-white/80">Durata: {video.duration}</p>
          {/if}
        </div>
      </div>
      
      {#if video.description}
        <div class="mt-6 text-center">
          <p class="text-white/80 text-lg">{video.description}</p>
        </div>
      {/if}
    </div>
  </div>
</div>