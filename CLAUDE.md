# Cinzia Brugnola - Professional Actress Portfolio - Technical Documentation

## Technology Stack

### Frontend Framework
- **SvelteKit 2.16.0** - Latest version with SSR capabilities
- **Svelte 5.0.0** - Latest reactive framework
- **Vite 6.2.6** - Build tool and dev server

### UI & Styling
- **Tailwind CSS 4.1.11** - Latest version with enhanced performance (5x faster builds)
- **@tailwindcss/vite** - Official Vite plugin for optimal integration
- **Professional Theme System** - Clean, minimal design with centralized theming
- **Component Library** - Button, Card, Badge components with consistent styling
- **lucide-svelte** - Modern icon library (570+ icons)

### Backend & Deployment
- **Node.js Adapter** - For server-side rendering and production deployment
- **Systemd Service** - Process management on Linux server

## Infrastructure Setup

### Domain & SSL
- **Production Site**: https://cinziabrugnola.com (primary deployment)
- **Development Site**: https://svelte.prenotacorsi.com
- **SSL Certificates**: Let's Encrypt (auto-renewal enabled)
- **Certificate Paths**: 
  - `/etc/letsencrypt/live/cinziabrugnola.com/`
  - `/etc/letsencrypt/live/svelte.prenotacorsi.com/`

### Nginx Configuration

#### Production Site (cinziabrugnola.com)
- **Config File**: `/etc/nginx/sites-available/cinziabrugnola.com`
- **Purpose**: Reverse proxy to Node.js app running on port 3001
- **Service File**: `/etc/systemd/system/cinziabrugnola-app.service`
- **Working Directory**: `/var/www/cinziabrugnola-app`

#### Development Site (svelte.prenotacorsi.com)
- **Config File**: `/etc/nginx/sites-available/svelte.prenotacorsi.com`
- **Purpose**: Reverse proxy to Node.js app running on port 3000
- **Service File**: `/etc/systemd/system/sveltekit-app.service`
- **Working Directory**: `/var/www/sveltekit-app`

#### Common Features
- HTTP to HTTPS redirect
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Static file caching for `/_app` directory
- WebSocket support for HMR in development
- User: www-data
- Auto-restart: Enabled

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Production Management

#### Automated Deployment (Recommended)
```bash
# One-command deployment to production
./deploy.sh                            # Automated build, copy, and restart
```

#### Manual Production Site (cinziabrugnola.com)
```bash
# Service management
sudo systemctl status cinziabrugnola-app    # Check service status
sudo systemctl restart cinziabrugnola-app   # Restart the app
sudo systemctl stop cinziabrugnola-app      # Stop the app
sudo systemctl start cinziabrugnola-app     # Start the app

# View logs
sudo journalctl -u cinziabrugnola-app -f   # Follow service logs
sudo tail -f /var/log/nginx/cinziabrugnola.com.access.log  # Nginx access logs
sudo tail -f /var/log/nginx/cinziabrugnola.com.error.log   # Nginx error logs

# Manual deployment (if needed)
npm run build                          # Build new version
sudo cp -r * /var/www/cinziabrugnola-app/  # Copy all files
sudo chown -R www-data:www-data /var/www/cinziabrugnola-app
sudo systemctl restart cinziabrugnola-app   # Restart service
```

#### Development Site (svelte.prenotacorsi.com)
```bash
# Service management
sudo systemctl status sveltekit-app    # Check service status
sudo systemctl restart sveltekit-app   # Restart the app

# Deploy updates
sudo cp -r * /var/www/sveltekit-app/
sudo chown -R www-data:www-data /var/www/sveltekit-app
sudo systemctl restart sveltekit-app
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

## Professional Theming System

### Clean Professional Design
Our theming system delivers a **professional, minimalist design** optimized for business use. Perfect for professional portfolios and corporate websites.

### Core Design Philosophy
- **Professional First** - Clean, minimal aesthetic with subtle effects
- **Pure Tailwind** - Zero custom CSS, only utility classes
- **Consistent Branding** - All components follow unified design language
- **Business Ready** - Professional color scheme and typography

### How It Works

#### 1. Theme Configuration (`/src/lib/styles/themes.js`)
```javascript
// Professional theme optimized for business use:
export const activeTheme = themes.glassmorphism;
// Clean white/gray professional design
```

#### 2. Professional Theme Features
- **Clean Design** - White backgrounds with subtle gray borders
- **Professional Typography** - Gray-900/700 text hierarchy
- **Minimal Effects** - Subtle shadows and hover states only
- **Business Colors** - Professional badge colors (green, blue, red)
- **Consistent Spacing** - Uniform padding and margins throughout

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
- **40kB CSS Bundle** - Optimized professional styling
- **Professional Design** - Clean white/gray theme with minimal effects
- **Mobile Responsive** - Perfect viewing on all devices with touch-friendly interactions
- **SEO Optimized** - Server-side rendering for actress portfolio discoverability
- **Accessibility** - Focus states, ARIA support, screen reader friendly
- **Performance** - Fast loading with optimized assets and caching

### Deployment Automation
- **One-Command Deployment** - `./deploy.sh` handles entire deployment process
- **Automatic Port Configuration** - Environment variables prevent port conflicts
- **Zero Downtime** - Systemd service management with auto-restart
- **SSL Auto-Renewal** - Let's Encrypt certificates automatically renewed

## Security & Best Practices

### Security Configuration
- **Non-root execution** - App runs as `www-data` user for security
- **SSL termination** - Nginx handles HTTPS with strong ciphers
- **Security headers** - X-Frame-Options, CSP, etc. configured
- **Internal access only** - Node.js apps only accessible via localhost
- **Firewall ready** - External access only through Nginx proxy

### Port Management
- **Automatic configuration** - Environment variables handle ports (3000/3001)
- **No manual editing** - Systemd service sets PORT environment variable
- **Conflict prevention** - Different ports for production/development sites

### Deployment Best Practices
- **Automated deployment** - Use `./deploy.sh` for consistent deployments
- **Service monitoring** - Systemd auto-restart on failures
- **Log management** - Centralized logging via journalctl and Nginx logs
- **SSL automation** - Certbot handles certificate renewal