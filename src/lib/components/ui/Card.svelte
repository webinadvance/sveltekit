<script>
  export let variant = 'default';
  export let padding = 'md';
  export let hover = false;
  
  const variants = {
    default: 'bg-white border-gray-200',
    elevated: 'bg-white border-gray-200 shadow-lg',
    outlined: 'bg-transparent border-gray-300',
    ghost: 'bg-gray-50 border-transparent'
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  $: cardClasses = [
    'rounded-xl border transition-all duration-200',
    variants[variant],
    paddings[padding],
    hover ? 'hover:shadow-md hover:border-gray-300' : '',
    $$props.class || ''
  ].filter(Boolean).join(' ');
</script>

<div class={cardClasses} {...$$restProps}>
  <slot />
</div>