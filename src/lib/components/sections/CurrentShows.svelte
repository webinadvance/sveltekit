<script>
  import { Badge } from '$lib/components/ui';
  
  export let title = '';
  export let subtitle = '';
  export let backgroundImage = '';
  export let shows = [];
  
  // shows structure:
  // shows = [
  //   {
  //     id: '1',
  //     title: 'Show Title',
  //     director: 'Director Name',
  //     cast: ['Actor 1', 'Actor 2'],
  //     description: 'Show description',
  //     genre: 'Comedy',
  //     status: 'current' | 'upcoming' | 'past'
  //   }
  // ]
</script>

<div class="relative py-20 overflow-hidden">
  <!-- Background Image -->
  {#if backgroundImage}
    <div class="absolute inset-0 z-0">
      <img 
        src={backgroundImage}
        alt="Background" 
        class="w-full h-full object-cover grayscale"
      />
      <div class="absolute inset-0 bg-black/80"></div>
    </div>
  {/if}
  
  <div class="relative z-10 container mx-auto px-0 md:px-4">
    <div class="text-center mb-16 px-4 md:px-0">
      <h2 class="text-white text-4xl lg:text-5xl font-bold mb-6">
        {title}
      </h2>
      {#if subtitle}
        <p class="text-white/80 text-xl">
          {subtitle}
        </p>
      {/if}
    </div>
    
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-0">
      {#each shows as show}
        <div class="bg-white/5 backdrop-blur-sm p-6">
          <h3 class="text-white text-2xl font-bold mb-3">{show.title}</h3>
          
          {#if show.director || show.cast}
            <div class="text-white/80 mb-4 space-y-1">
              {#if show.director}
                <p><strong>Regia:</strong> {show.director}</p>
              {/if}
              {#if show.cast && show.cast.length > 0}
                <p><strong>Con:</strong> {show.cast.join(', ')}</p>
              {/if}
            </div>
          {/if}
          
          {#if show.description}
            <p class="text-white/80 mb-4">{show.description}</p>
          {/if}
          
          {#if show.genre}
            <Badge variant="secondary" size="sm">{show.genre}</Badge>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>