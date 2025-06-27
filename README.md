# SvelteKit + Tailwind CSS v4

A modern, high-performance web application built with the latest versions of SvelteKit and Tailwind CSS v4, featuring a custom component system and server-side rendering.

## 🚀 Live Demo

**Production Site**: [https://svelte.prenotacorsi.com](https://svelte.prenotacorsi.com)

## ✨ Features

- **SvelteKit 2.16.0** - Latest full-stack framework with SSR
- **Tailwind CSS 4.1.11** - Latest version with 5x faster builds and zero configuration
- **Custom Component System** - Fully themeable UI components built with pure Tailwind
- **Modern Icons** - 570+ icons from lucide-svelte
- **Production Ready** - Deployed with Nginx, SSL, and systemd service
- **Performance Optimized** - Incremental builds in microseconds

## 🛠️ Technology Stack

### Frontend
- **SvelteKit** - Full-stack framework with file-based routing
- **Svelte 5.0** - Reactive UI framework with runes
- **Tailwind CSS v4** - Utility-first CSS with modern features
- **Vite 6.2** - Lightning-fast build tool

### UI Components
- **Button** - Multiple variants and sizes with focus states
- **Card** - Flexible containers with hover effects
- **Badge** - Semantic status indicators
- **Theme System** - Centralized design tokens

### Backend & Deployment
- **Node.js Adapter** - Server-side rendering
- **Nginx** - Reverse proxy with SSL termination
- **Let's Encrypt** - Automatic SSL certificate management
- **Systemd** - Process management and auto-restart

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/webinadvance/sveltekit.git
cd sveltekit

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app running.

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   └── ui/           # Custom UI components
│   │       ├── Button.svelte
│   │       ├── Card.svelte
│   │       ├── Badge.svelte
│   │       └── index.js
│   └── styles/
│       └── theme.js      # Design system configuration
├── routes/
│   ├── +layout.svelte    # Global layout
│   └── +page.svelte      # Landing page
├── app.html              # HTML template
└── app.css               # Tailwind CSS imports
```

## 🎨 Component System

### Button Component

```svelte
<script>
  import { Button } from '$lib/components/ui';
</script>

<Button variant="primary" size="lg">
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `destructive`  
**Sizes**: `sm`, `md`, `lg`, `xl`

### Card Component

```svelte
<script>
  import { Card } from '$lib/components/ui';
</script>

<Card variant="elevated" hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Variants**: `default`, `elevated`, `outlined`, `ghost`  
**Features**: Configurable padding, hover effects, flexible slots

### Badge Component

```svelte
<script>
  import { Badge } from '$lib/components/ui';
</script>

<Badge variant="success">Active</Badge>
```

**Variants**: `default`, `secondary`, `success`, `warning`, `error`, `info`, `outline`

## 🎯 Tailwind CSS v4 Features

- **Zero Configuration** - No config files needed
- **Automatic Content Detection** - Scans all template files automatically
- **Enhanced Performance** - 5x faster full builds, 100x faster incremental builds
- **Modern CSS Features** - Cascade layers, custom properties, color-mix()
- **Vite Integration** - Dedicated plugin for optimal performance

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev -- --open   # Start dev server and open browser

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment (on server)
sudo systemctl restart sveltekit-app  # Restart service
sudo systemctl status sveltekit-app   # Check status
```

## 🚀 Deployment

The app is configured for production deployment with:

- **Nginx** reverse proxy configuration
- **SSL/HTTPS** with Let's Encrypt
- **Systemd** service for process management
- **Node.js adapter** for SSR

See `CLAUDE.md` for detailed deployment instructions.

## 📖 Documentation

- **Technical Details**: See `CLAUDE.md` for comprehensive technical documentation
- **Component Examples**: Visit the live demo for interactive component showcase
- **Deployment Guide**: Complete server setup and deployment instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [https://svelte.prenotacorsi.com](https://svelte.prenotacorsi.com)
- **SvelteKit Docs**: [https://kit.svelte.dev](https://kit.svelte.dev)
- **Tailwind CSS v4**: [https://tailwindcss.com](https://tailwindcss.com)
- **Lucide Icons**: [https://lucide.dev](https://lucide.dev)

---

Built with ❤️ using SvelteKit and Tailwind CSS v4