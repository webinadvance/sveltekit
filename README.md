# SvelteKit Technical Portfolio

## 🚀 Pure Svelte Integration Philosophy
- **No external dependencies** where possible
- **Native Svelte stores** for state management  
- **Built-in animations** using Svelte transitions
- **Modern ES modules** with dynamic imports
- **Reactive programming** with Svelte 5 runes
- **Component-first architecture**

## 🛠️ Technology Stack

### Core Framework
- **SvelteKit 2.16.0** - Latest full-stack framework with SSR
- **Svelte 5.0** - Reactive framework with runes ($state, $derived, $effect)
- **Vite 6.2.6** - Build tool and dev server

### Styling & UI
- **Tailwind CSS 4.1.11** - Zero-config, 5x faster builds
- **@tailwindcss/vite** - Official Vite plugin
- **Professional Theme System** - Centralized theming with pure Tailwind
- **Component Library** - Button, Card, Badge with consistent styling
- **lucide-svelte** - Modern icon library (570+ icons)

### Debug & Development
- **Eruda** - Mobile console debugging (integrated via SvelteKit)
- **AOS** - Scroll animations (integrated via SvelteKit imports)
- **Modern Svelte 5 stores** - Reactive state management

### Backend & Deployment
- **Node.js Adapter** - Server-side rendering
- **Nginx** - Reverse proxy with SSL
- **Systemd Service** - Process management
- **Let's Encrypt** - Auto SSL renewal

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/ui/     # Theme-aware components
│   ├── stores/           # Svelte 5 reactive stores
│   └── styles/           # Centralized theme system
├── routes/
│   ├── +layout.svelte    # Global layout with integrations
│   └── +page.svelte      # Main page
└── app.html              # HTML template
```

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
./deploy.sh      # Automated deployment
```

## 🎨 Pure Svelte Features

### Theme System
```javascript
// themes.js - Centralized Tailwind classes
export const activeTheme = themes.glassmorphism;
```

### Reactive Stores (Svelte 5)
```javascript
// debug.svelte.js - Modern reactive store
let eruda = $state(null);
export const debugStore = { get eruda() { return eruda; } };
```

### Component Integration
```svelte
<script>
  import { debugStore } from '$lib/stores/debug.svelte.js';
  import 'aos/dist/aos.css'; // Direct CSS import
</script>
```

## 🚀 Deployment

- **Production**: https://cinziabrugnola.com
- **Development**: https://svelte.prenotacorsi.com
- **Auto-deployment** via `./deploy.sh`
- **Service management** via systemd

## 📖 Technical Documentation

See `CLAUDE.md` for complete deployment and configuration details.