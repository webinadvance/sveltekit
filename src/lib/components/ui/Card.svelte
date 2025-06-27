<script>
  import { getComponentStyles } from '$lib/styles/themes.js';
  
  export let variant = 'default';
  export let padding = 'md';
  export let hover = false;
  export let float = false;
  
  $: cardClasses = [
    getComponentStyles('card', variant, padding),
    hover ? 'hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1' : '',
    float ? 'animate-bounce' : '',
    $$props.class || ''
  ].filter(Boolean).join(' ');
</script>

<div class={cardClasses} {...$$restProps}>
  <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl pointer-events-none"></div>
  <div class="relative z-10">
    <slot />
  </div>
</div>