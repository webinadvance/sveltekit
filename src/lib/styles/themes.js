// Neon Theater Theme Configuration
export const neonTheme = {
  // Primary neon colors
  primary: '#ff1493',      // Deep pink for neon text
  secondary: '#ff69b4',    // Hot pink for accents
  accent: '#ffffff',       // White for strokes and highlights
  
  // Typography system
  typography: {
    title: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 900,
      textTransform: 'uppercase'
    },
    subtitle: {
      fontFamily: "'Dancing Script', cursive",
      fontWeight: 500,
      fontStyle: 'italic',
      letterSpacing: '0.01em'
    },
    body: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 400
    }
  },
  
  // Neon effects
  neon: {
    glow: {
      small: '0 0 10px #ff1493',
      medium: '0 0 20px #ff1493',
      large: '0 0 40px #ff1493',
      stroke: '1px #ffffff'
    },
    
    // Button styles
    button: {
      background: 'transparent',
      border: '2px solid #ff1493',
      borderRadius: '25px',
      color: '#ff1493',
      glow: '0 0 15px #ff1493',
      hoverGlow: '0 0 25px #ff1493, 0 0 35px #ff69b4'
    },
    
    // Image effects
    image: {
      filter: 'brightness(0.6) contrast(1.1) saturate(1.2)',
      borderGlow: '0 0 30px #ff1493, 0 0 60px #ff69b4',
      overlayGradient: 'radial-gradient(ellipse at center, transparent 0%, rgba(255, 20, 147, 0.1) 40%, rgba(0,0,0,0.8) 100%)'
    },
    
    // Laser effect
    laser: {
      background: 'linear-gradient(90deg, transparent 0%, #ff69b4 45%, #ffffff 50%, #ff69b4 55%, transparent 100%)',
      height: '2px',
      glow: '0 0 5px #ff69b4, 0 0 10px #ff69b4',
      duration: '3s'
    }
  }
};

// Export current active theme
export const activeTheme = neonTheme;

// Helper function to get theme values
export function getThemeValue(path) {
  const keys = path.split('.');
  let value = activeTheme;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value;
}