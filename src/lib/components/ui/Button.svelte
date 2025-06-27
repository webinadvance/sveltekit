<script>
  import { getComponentStyles } from '$lib/styles/themes.js';
  
  export let variant = 'primary';
  export let size = 'md';
  export let disabled = false;
  export let type = 'button';
  
  $: buttonClasses = [
    getComponentStyles('button', variant, size),
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    $$props.class || ''
  ].filter(Boolean).join(' ');
</script>

<button 
  class={buttonClasses}
  {type}
  {disabled}
  on:click
  {...$$restProps}
>
  <slot />
</button>