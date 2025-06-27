<script>
  import { getComponentStyles } from '$lib/styles/themes.js';
  
  export let variant = 'default';
  export let size = 'md';
  
  $: badgeClasses = [
    getComponentStyles('badge', variant, size),
    $$props.class || ''
  ].filter(Boolean).join(' ');
</script>

<span class={badgeClasses} {...$$restProps}>
  <slot />
</span>