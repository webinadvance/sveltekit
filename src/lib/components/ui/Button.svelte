<script>
  export let variant = 'primary';
  export let size = 'md';
  export let disabled = false;
  export let type = 'button';
  
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white border-transparent',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-transparent',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-900 border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900 border-transparent',
    destructive: 'bg-red-500 hover:bg-red-600 text-white border-transparent'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  $: buttonClasses = [
    'inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
    variants[variant],
    sizes[size],
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  ].join(' ');
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