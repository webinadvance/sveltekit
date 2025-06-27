// Centralized Tailwind-Only Theme Configuration
export const glassTheme = {
  // Glass morphism variants using Tailwind classes
  glass: {
    base: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg',
    strong: 'bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl',
    subtle: 'bg-white/5 backdrop-blur-sm border border-white/10 shadow-md',
    card: 'bg-white/12 backdrop-blur-lg border border-white/25 shadow-2xl',
    frosted: 'bg-white/8 backdrop-blur-xl border border-white/30 shadow-2xl'
  },
  
  // Component styling classes (Tailwind only)
  components: {
    button: {
      base: 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transform hover:scale-105 active:scale-95',
      variants: {
        primary: 'bg-white/15 backdrop-blur-lg text-white border border-white/30 shadow-lg hover:shadow-xl hover:bg-white/20',
        secondary: 'bg-white/10 backdrop-blur-md text-gray-800 border border-white/20 hover:text-gray-900 hover:bg-white/15',
        outline: 'bg-white/5 backdrop-blur-sm text-gray-800 border border-white/30 hover:bg-white/10',
        ghost: 'bg-white/5 backdrop-blur-sm text-gray-800 border-transparent hover:bg-white/10',
        destructive: 'bg-red-500/20 backdrop-blur-lg text-red-100 border border-red-300/30 hover:text-white hover:bg-red-500/30'
      },
      sizes: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3 text-base',
        xl: 'px-10 py-4 text-lg'
      }
    },
    
    card: {
      base: 'rounded-2xl transition-all duration-500 ease-out overflow-hidden relative',
      variants: {
        default: 'bg-white/12 backdrop-blur-lg border border-white/25 shadow-2xl',
        elevated: 'bg-white/15 backdrop-blur-lg border border-white/30 shadow-2xl',
        outlined: 'bg-white/10 backdrop-blur-md border border-white/40',
        ghost: 'bg-white/5 backdrop-blur-sm border-transparent',
        frosted: 'bg-white/8 backdrop-blur-xl border border-white/30 shadow-2xl'
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10'
      },
      effects: {
        hover: 'hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1',
        float: 'animate-bounce',
        glow: 'hover:shadow-white/20'
      }
    },
    
    badge: {
      base: 'inline-flex items-center rounded-full font-medium backdrop-blur-md',
      variants: {
        default: 'bg-white/10 backdrop-blur-md text-white/90 border border-white/20',
        secondary: 'bg-white/5 backdrop-blur-sm text-gray-800 border border-white/10',
        success: 'bg-green-500/20 backdrop-blur-md border border-green-300/30 text-green-100',
        warning: 'bg-yellow-500/20 backdrop-blur-md border border-yellow-300/30 text-yellow-100',
        error: 'bg-red-500/20 backdrop-blur-md border border-red-300/30 text-red-100',
        info: 'bg-blue-500/20 backdrop-blur-md border border-blue-300/30 text-blue-100',
        outline: 'bg-white/5 backdrop-blur-sm text-gray-800 border border-white/30'
      },
      sizes: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm'
      }
    }
  },
  
  // Animation classes (Tailwind only)
  animations: {
    float: 'animate-bounce duration-6000',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    ping: 'animate-ping'
  },
  
  // Text effects (Tailwind only)
  text: {
    glass: 'bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-sm',
    gradient: 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent',
    glow: 'text-white drop-shadow-lg',
    shadow: 'text-gray-800 drop-shadow-sm'
  },
  
  // Background gradients
  backgrounds: {
    primary: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
    secondary: 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500',
    accent: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600',
    subtle: 'bg-gradient-to-br from-gray-100 to-gray-200'
  },
  
  // Layout utilities (Tailwind only)
  layout: {
    container: 'container mx-auto px-4',
    section: 'py-16',
    sectionLg: 'py-24',
    grid: 'grid gap-8',
    gridMd: 'md:grid-cols-2 lg:grid-cols-3',
    flex: 'flex items-center justify-center',
    flexCol: 'flex flex-col items-center',
    center: 'text-center max-w-3xl mx-auto',
    spacingY: 'space-y-6',
    spacingX: 'space-x-4'
  }
};

// Helper function to get theme classes
export function getThemeClasses(component, variant = 'default', size = 'md', effects = []) {
  const comp = glassTheme.components[component];
  if (!comp) return '';
  
  const classes = [
    comp.base,
    comp.variants?.[variant] || '',
    comp.sizes?.[size] || comp.padding?.[size] || '',
    ...effects.map(effect => comp.effects?.[effect] || glassTheme.animations[effect] || effect)
  ];
  
  return classes.filter(Boolean).join(' ');
}

// Quick access helpers
export const glass = glassTheme.glass;
export const components = glassTheme.components;
export const animations = glassTheme.animations;
export const text = glassTheme.text;
export const backgrounds = glassTheme.backgrounds;
export const layout = glassTheme.layout;