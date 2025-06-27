# SvelteKit Project - Technical Documentation

## Technology Stack

### Frontend Framework
- **SvelteKit 2.16.0** - Latest version with SSR capabilities
- **Svelte 5.0.0** - Latest reactive framework
- **Vite 6.2.6** - Build tool and dev server

### UI & Styling
- **Tailwind CSS 4.1.11** - Latest version with enhanced performance (5x faster builds)
- **@tailwindcss/vite** - Official Vite plugin for optimal integration
- **Custom Component System** - Fully themeable components built with pure Tailwind
- **lucide-svelte** - Modern icon library (570+ icons)

### Backend & Deployment
- **Node.js Adapter** - For server-side rendering and production deployment
- **Systemd Service** - Process management on Linux server

## Infrastructure Setup

### Domain & SSL
- **Live Site**: https://svelte.prenotacorsi.com
- **SSL Certificate**: Let's Encrypt (auto-renewal enabled)
- **Certificate Path**: `/etc/letsencrypt/live/svelte.prenotacorsi.com/`

### Nginx Configuration
- **Config File**: `/etc/nginx/sites-available/svelte.prenotacorsi.com`
- **Purpose**: Reverse proxy to Node.js app running on port 3000
- **Features**:
  - HTTP to HTTPS redirect
  - Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
  - Static file caching for `/_app` directory
  - WebSocket support for HMR in development

### Node.js Service
- **Service File**: `/etc/systemd/system/sveltekit-app.service`
- **Working Directory**: `/var/www/sveltekit-app`
- **Port**: 3000 (internal, proxied by Nginx)
- **User**: www-data
- **Auto-restart**: Enabled

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Production Management
```bash
# Service management
sudo systemctl status sveltekit-app    # Check service status
sudo systemctl restart sveltekit-app   # Restart the app
sudo systemctl stop sveltekit-app      # Stop the app
sudo systemctl start sveltekit-app     # Start the app

# View logs
sudo journalctl -u sveltekit-app -f   # Follow service logs
sudo tail -f /var/log/nginx/svelte.prenotacorsi.com.access.log  # Nginx access logs
sudo tail -f /var/log/nginx/svelte.prenotacorsi.com.error.log   # Nginx error logs

# Deploy updates
npm run build                          # Build new version
sudo cp -r build/* /var/www/sveltekit-app/build/  # Copy build files
sudo systemctl restart sveltekit-app   # Restart service
```

### SSL Certificate
```bash
# Check certificate status
sudo certbot certificates

# Manual renewal (auto-renewal is already configured)
sudo certbot renew

# Test renewal process
sudo certbot renew --dry-run
```

## File Locations

### Source Code
- **Development**: `/root/SvelteKit/`
- **Production**: `/var/www/sveltekit-app/`

### Configuration Files
- **Nginx**: `/etc/nginx/sites-available/svelte.prenotacorsi.com`
- **Systemd**: `/etc/systemd/system/sveltekit-app.service`
- **SSL**: `/etc/letsencrypt/live/svelte.prenotacorsi.com/`

## Deployment Process

1. Make changes in `/root/SvelteKit/`
2. Run `npm run build`
3. Copy all files to production: 
   ```bash
   sudo rm -rf /var/www/sveltekit-app/*
   sudo cp -r * /var/www/sveltekit-app/
   sudo chown -R www-data:www-data /var/www/sveltekit-app
   ```
4. Restart service: `sudo systemctl restart sveltekit-app`
5. Verify at https://svelte.prenotacorsi.com

## Advanced Theming System

### Revolutionary Theme Architecture
Our theming system is designed for **extreme customization** with **minimal effort**. Change your entire app's look with just one line of code.

### Core Theming Philosophy
- **Single Source of Truth** - One file controls all component styles
- **Pure Tailwind** - Zero custom CSS, only utility classes
- **Instant Switching** - Change themes without rebuilding
- **Consistent Design** - All components automatically inherit theme changes

### How It Works

#### 1. Theme Configuration (`/src/lib/styles/themes.js`)
```javascript
// Change entire app theme by switching this line:
export const activeTheme = themes.glassmorphism;
// Available: themes.glassmorphism, themes.dark, themes.light
```

#### 2. Pre-built Themes
- **Glassmorphism** - Modern glass morphism with backdrop-blur effects
- **Dark** - Solid dark theme with gray color palette  
- **Light** - Clean light theme with white backgrounds
- **Custom** - Easy to create new themes

#### 3. Component Integration
Components automatically pull styles from the active theme:
```javascript
// In any component:
import { getComponentStyles } from '$lib/styles/themes.js';
$: classes = getComponentStyles('button', variant, size);
```

### Tailwind CSS v4.1 Features
- **Zero Configuration** - No config files needed, automatic content detection
- **Enhanced Performance** - 5x faster full builds, 100x faster incremental builds  
- **Modern CSS Features** - Built on cascade layers, custom properties, and color-mix()
- **Simplified Installation** - Single `@import "tailwindcss"` line in CSS
- **Vite Integration** - Dedicated plugin for optimal performance

### Glassmorphism UI Components

#### Button Component (`/src/lib/components/ui/Button.svelte`)
- **Theme-Aware** - Automatically adapts to active theme
- **Variants** - primary, secondary, outline, ghost, destructive  
- **Sizes** - sm, md, lg, xl
- **Glass Effects** - backdrop-blur, transparency, borders
- **Interactions** - hover:scale, focus rings, transitions

#### Card Component (`/src/lib/components/ui/Card.svelte`)  
- **Glass Variants** - default, elevated, outlined, ghost, frosted
- **Backdrop Effects** - blur-lg, shadow-2xl, border-white/25
- **Padding System** - none, sm, md, lg, xl
- **Interactive** - hover effects, floating animations
- **Flexible** - slot-based content system

#### Badge Component (`/src/lib/components/ui/Badge.svelte`)
- **Semantic Colors** - success, warning, error, info variants
- **Glass Styling** - backdrop-blur with colored borders  
- **Size Options** - sm, md, lg with proper typography
- **Status Indicators** - Perfect for UI state communication

### Theme Benefits

#### Developer Experience
- **One-Line Changes** - Switch entire app theme instantly
- **No CSS Knowledge** - Pure Tailwind utility classes
- **Type Safety** - Structured theme configuration
- **Consistent Patterns** - All components follow same theming approach

#### Design System
- **Brand Flexibility** - Easy multi-brand support
- **A/B Testing** - Quick theme variations for testing
- **Seasonal Themes** - Holiday or event-specific styling
- **User Preferences** - Light/dark mode switching

#### Performance
- **Pure Tailwind** - Minimal CSS bundle size
- **Tree Shaking** - Only used styles included in build
- **Cached Styles** - Repeated utility classes optimized
- **Fast Switching** - No CSS recompilation needed

### Creating Custom Themes

```javascript
// Easy custom theme creation:
const myTheme = createTheme({
  primary: 'emerald',
  secondary: 'teal', 
  glassBackground: 'bg-emerald-500/10',
  textPrimary: 'text-emerald-100',
  // ... other customizations
});

// Apply custom theme:
export const activeTheme = myTheme;
```

### Production Features
- **Optimized CSS Bundle** - Comprehensive glassmorphism styling
- **Glass Morphism Effects** - backdrop-blur, transparency, modern aesthetic
- **Responsive Design** - Perfect viewing on all devices
- **SEO Optimized** - Server-side rendering for discoverability
- **Accessibility** - Focus states, ARIA support, screen reader friendly

## Security Notes

- App runs as `www-data` user (non-root)
- Nginx handles SSL termination
- Security headers configured in Nginx
- Node.js app only accessible via localhost (127.0.0.1:3000)