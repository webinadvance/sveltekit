<script>
  export let variant = 'default';
  export let size = 'md';
  
  const variants = {
    default: 'bg-gray-900 text-white',
    secondary: 'bg-gray-100 text-gray-900',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800', 
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    outline: 'bg-transparent text-gray-900 border border-gray-300'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };
  
  $: badgeClasses = [
    'inline-flex items-center rounded-full font-medium',
    variants[variant],
    sizes[size],
    $$props.class || ''
  ].filter(Boolean).join(' ');
</script>

<span class={badgeClasses} {...$$restProps}>
  <slot />
</span>