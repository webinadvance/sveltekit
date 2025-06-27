<script>
  import { Button, Badge } from '$lib/components/ui';
  
  export let title = '';
  export let subtitle = '';
  export let description = '';
  export let backgroundImage = '';
  export let badges = [];
  export let actions = [];
  export let showScrollIndicator = true;
</script>

<div class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background Image -->
  <div class="absolute inset-0 z-0">
    <img 
      src={backgroundImage}
      alt="Hero background" 
      class="w-full h-full object-cover grayscale"
    />
    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black/50"></div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 text-center">
    <div class="max-w-5xl mx-auto">
      {#if badges.length > 0}
        <div class="flex gap-3 justify-center mb-8 flex-wrap">
          {#each badges as badge}
            <Badge variant="secondary">{badge}</Badge>
          {/each}
        </div>
      {/if}
      
      <h1 class="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6 text-white drop-shadow-2xl">
        {title}
      </h1>
      
      {#if subtitle}
        <p class="text-white text-2xl lg:text-3xl mb-8 font-light tracking-wide">
          {@html subtitle}
        </p>
      {/if}
      
      {#if description}
        <p class="text-white/90 text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto">
          {@html description}
        </p>
      {/if}
      
      {#if actions.length > 0}
        <div class="flex gap-4 justify-center flex-wrap">
          {#each actions as action}
            <Button 
              size="lg" 
              variant={action.variant || 'primary'}
              class={action.class || ''}
              on:click={action.onClick}
            >
              {action.text}
            </Button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  {#if showScrollIndicator}
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-8 h-12 border-2 border-white/50 flex justify-center">
        <div class="w-1 h-3 bg-white/70 mt-2"></div>
      </div>
    </div>
  {/if}
</div>