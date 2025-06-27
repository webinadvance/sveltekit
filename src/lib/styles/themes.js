// Centralized Theme System - Easy to change entire app style

// Base theme structure
export const createTheme = (config) => ({
  // Core colors with semantic meaning
  colors: {
    primary: config.primary || 'blue',
    secondary: config.secondary || 'gray',
    accent: config.accent || 'purple',
    success: config.success || 'green',
    warning: config.warning || 'yellow',
    error: config.error || 'red',
    info: config.info || 'blue'
  },
  
  // Glass effect settings
  glass: {
    background: config.glassBackground || 'bg-white/10',
    blur: config.glassBlur || 'backdrop-blur-lg',
    border: config.glassBorder || 'border border-white/20',
    shadow: config.glassShadow || 'shadow-xl'
  },
  
  // Typography
  text: {
    primary: config.textPrimary || 'text-white',
    secondary: config.textSecondary || 'text-white/80',
    muted: config.textMuted || 'text-white/60'
  },
  
  // Effects
  effects: {
    hover: config.hoverEffect || 'hover:scale-105',
    focus: config.focusEffect || 'focus:ring-2 focus:ring-white/50',
    transition: config.transition || 'transition-all duration-300'
  }
});

// Theme presets
export const themes = {
  // Professional clean theme - Fully Flat Modern Design
  glassmorphism: createTheme({
    primary: 'slate',
    secondary: 'gray',
    accent: 'blue',
    glassBackground: 'bg-white',
    glassBlur: '',
    glassBorder: 'border border-gray-200',
    glassShadow: '',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    hoverEffect: 'hover:bg-gray-50',
    transition: 'transition-colors duration-150'
  }),
  
  // Dark solid theme alternative
  dark: createTheme({
    primary: 'gray',
    secondary: 'slate',
    accent: 'indigo',
    glassBackground: 'bg-gray-800',
    glassBlur: '',
    glassBorder: 'border border-gray-700',
    glassShadow: 'shadow-lg',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    hoverEffect: 'hover:bg-gray-700',
    transition: 'transition-colors duration-200'
  }),
  
  // Light theme alternative
  light: createTheme({
    primary: 'blue',
    secondary: 'gray',
    accent: 'purple',
    glassBackground: 'bg-white',
    glassBlur: '',
    glassBorder: 'border border-gray-200',
    glassShadow: 'shadow-md',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    hoverEffect: 'hover:shadow-lg',
    transition: 'transition-shadow duration-200'
  })
};

// Accent color system - easy to change throughout app
export const accentColors = {
  blue: 'blue-600',
  purple: 'purple-600', 
  emerald: 'emerald-600',
  rose: 'rose-600',
  orange: 'orange-500'
};

// Current accent color (change this to update accent throughout app)
export const currentAccent = accentColors.orange;

// Active theme - change this to switch entire app theme
export const activeTheme = themes.glassmorphism;

// Component style generators using active theme
export const getComponentStyles = (component, variant = 'default', size = 'md') => {
  const theme = activeTheme;
  
  const styles = {
    button: {
      base: `inline-flex items-center justify-center gap-2 rounded-lg font-medium ${theme.effects.transition} ${theme.effects.focus}`,
      variants: {
        primary: `bg-gray-900 text-white hover:bg-gray-800`,
        secondary: `bg-gray-100 ${theme.text.secondary} hover:bg-gray-200`,
        outline: `bg-transparent ${theme.text.primary} border border-gray-300 hover:border-gray-400`,
        ghost: `bg-transparent ${theme.text.primary} hover:bg-gray-100`,
        destructive: `bg-red-600 text-white hover:bg-red-700`
      },
      sizes: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-sm', 
        lg: 'px-8 py-3 text-base',
        xl: 'px-10 py-4 text-lg'
      }
    },
    
    card: {
      base: `rounded-lg ${theme.effects.transition} overflow-hidden relative`,
      variants: {
        default: `${theme.glass.background} ${theme.glass.border}`,
        elevated: `bg-white border border-gray-300`,
        outlined: `bg-transparent border border-gray-300`,
        ghost: `bg-transparent border-transparent`,
        frosted: `bg-white border border-gray-200`
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6', 
        lg: 'p-8',
        xl: 'p-10'
      },
      effects: {
        hover: 'hover:border-gray-300',
        float: ''
      }
    },
    
    badge: {
      base: `inline-flex items-center rounded font-medium`,
      variants: {
        default: `bg-gray-100 ${theme.text.primary}`,
        secondary: `bg-gray-100 ${theme.text.secondary}`,
        success: `bg-green-100 text-green-800`,
        warning: `bg-yellow-100 text-yellow-800`,
        error: `bg-red-100 text-red-800`,
        info: `bg-blue-100 text-blue-800`,
        outline: `bg-transparent ${theme.text.primary} border border-gray-300`
      },
      sizes: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm'
      }
    }
  };
  
  const comp = styles[component];
  if (!comp) return '';
  
  return [
    comp.base,
    comp.variants?.[variant] || '',
    comp.sizes?.[size] || comp.padding?.[size] || ''
  ].filter(Boolean).join(' ');
};

// Background generator for app-wide background
export const getAppBackground = () => {
  const theme = activeTheme;
  
  // Different backgrounds based on theme
  if (theme === themes.glassmorphism) {
    return 'bg-gradient-to-br from-gray-50 to-white';
  } else if (theme === themes.dark) {
    return 'bg-gradient-to-br from-gray-900 to-gray-800';
  } else if (theme === themes.light) {
    return 'bg-gradient-to-br from-gray-50 to-white';
  }
  
  return 'bg-gradient-to-br from-gray-50 to-white';
};

// Easy theme switching function
export const switchTheme = (themeName) => {
  if (themes[themeName]) {
    // In a real app, you'd update a store/context here
    console.log(`Switching to ${themeName} theme`);
    return themes[themeName];
  }
};

// Export current theme for components
export { activeTheme as currentTheme };