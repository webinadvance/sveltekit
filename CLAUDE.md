# SvelteKit App - Technical Stack & Infrastructure

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
- **Domain**: https://svelte.prenotacorsi.com
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

## Custom Component System

### Tailwind CSS v4.0 Features
- **Zero Configuration** - No config files needed, automatic content detection
- **Enhanced Performance** - 5x faster full builds, 100x faster incremental builds
- **Modern CSS Features** - Built on cascade layers, custom properties, and color-mix()
- **Simplified Installation** - Single `@import "tailwindcss"` line in CSS
- **Vite Integration** - Dedicated plugin for optimal performance

### Custom UI Components
- **Button** (`/src/lib/components/ui/Button.svelte`)
  - Variants: primary, secondary, outline, ghost, destructive
  - Sizes: sm, md, lg, xl
  - Focus states and accessibility built-in
  
- **Card** (`/src/lib/components/ui/Card.svelte`)
  - Variants: default, elevated, outlined, ghost
  - Configurable padding and hover effects
  - Flexible slot-based content
  
- **Badge** (`/src/lib/components/ui/Badge.svelte`)
  - Variants: default, secondary, success, warning, error, info, outline
  - Multiple sizes: sm, md, lg
  - Semantic color coding

### Theme System
- **Centralized Theme** (`/src/lib/styles/theme.js`)
  - Consistent color palette with orange primary theme
  - Standardized spacing and border radius values
  - Easy to modify for different brand colors

### Landing Page Enhancements
- **Component Showcase** - Interactive demonstration of all component variants
- **Performance Badges** - Visual indicators for different features
- **Responsive Grid** - Mobile-first design approach
- **Hover Effects** - Enhanced user interaction feedback
- **Semantic HTML** - Proper accessibility and SEO structure

## Security Notes

- App runs as `www-data` user (non-root)
- Nginx handles SSL termination
- Security headers configured in Nginx
- Node.js app only accessible via localhost (127.0.0.1:3000)