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
  // Current glassmorphism theme
  glassmorphism: createTheme({
    primary: 'purple',
    secondary: 'pink',
    accent: 'blue',
    glassBackground: 'bg-white/12',
    glassBlur: 'backdrop-blur-lg',
    glassBorder: 'border border-white/25',
    glassShadow: 'shadow-2xl',
    textPrimary: 'text-white',
    textSecondary: 'text-white/80',
    textMuted: 'text-white/60',
    hoverEffect: 'hover:scale-105 hover:-translate-y-1',
    transition: 'transition-all duration-300'
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

// Active theme - change this to switch entire app theme
export const activeTheme = themes.glassmorphism;

// Component style generators using active theme
export const getComponentStyles = (component, variant = 'default', size = 'md') => {
  const theme = activeTheme;
  
  const styles = {
    button: {
      base: `inline-flex items-center justify-center gap-2 rounded-xl font-medium ${theme.effects.transition} ${theme.effects.focus} transform active:scale-95 ${theme.effects.hover}`,
      variants: {
        primary: `${theme.glass.background} ${theme.glass.blur} ${theme.text.primary} ${theme.glass.border} ${theme.glass.shadow}`,
        secondary: `bg-${theme.colors.secondary}-500/20 ${theme.glass.blur} ${theme.text.secondary} border border-${theme.colors.secondary}-300/30`,
        outline: `bg-white/5 ${theme.glass.blur} ${theme.text.primary} ${theme.glass.border}`,
        ghost: `bg-white/5 ${theme.glass.blur} ${theme.text.primary} border-transparent`,
        destructive: `bg-${theme.colors.error}-500/20 ${theme.glass.blur} text-${theme.colors.error}-100 border border-${theme.colors.error}-300/30`
      },
      sizes: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-sm', 
        lg: 'px-8 py-3 text-base',
        xl: 'px-10 py-4 text-lg'
      }
    },
    
    card: {
      base: `rounded-2xl ${theme.effects.transition} overflow-hidden relative`,
      variants: {
        default: `${theme.glass.background} ${theme.glass.blur} ${theme.glass.border} ${theme.glass.shadow}`,
        elevated: `${theme.glass.background} ${theme.glass.blur} border border-white/30 shadow-2xl`,
        outlined: `bg-white/10 ${theme.glass.blur} border border-white/40`,
        ghost: `bg-white/5 ${theme.glass.blur} border-transparent`,
        frosted: `bg-white/8 backdrop-blur-xl border border-white/30 shadow-2xl`
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
        float: 'animate-bounce'
      }
    },
    
    badge: {
      base: `inline-flex items-center rounded-full font-medium ${theme.glass.blur}`,
      variants: {
        default: `${theme.glass.background} ${theme.text.primary} ${theme.glass.border}`,
        secondary: `bg-${theme.colors.secondary}-500/20 ${theme.text.secondary} border border-${theme.colors.secondary}-300/30`,
        success: `bg-${theme.colors.success}-500/20 text-${theme.colors.success}-100 border border-${theme.colors.success}-300/30`,
        warning: `bg-${theme.colors.warning}-500/20 text-${theme.colors.warning}-100 border border-${theme.colors.warning}-300/30`,
        error: `bg-${theme.colors.error}-500/20 text-${theme.colors.error}-100 border border-${theme.colors.error}-300/30`,
        info: `bg-${theme.colors.info}-500/20 text-${theme.colors.info}-100 border border-${theme.colors.info}-300/30`,
        outline: `bg-white/5 ${theme.text.primary} border border-white/30`
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
    return 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500';
  } else if (theme === themes.dark) {
    return 'bg-gradient-to-br from-gray-900 to-gray-800';
  } else if (theme === themes.light) {
    return 'bg-gradient-to-br from-gray-50 to-white';
  }
  
  return 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500';
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