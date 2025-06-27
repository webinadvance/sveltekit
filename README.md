# Cinzia - Professional Actress Portfolio

A stunning glassmorphism-themed actress portfolio built with SvelteKit and revolutionary centralized theming system. Features professional branding, portfolio showcase, and contact management.

## 🎭 Live Portfolio

**Cinzia's Portfolio**: [https://svelte.prenotacorsi.com](https://svelte.prenotacorsi.com)

## ✨ Features

### Professional Actress Portfolio
- **Personal Branding** - Professional actress presentation with "Cinzia" persona
- **Acting Services** - Film/TV, Theater, and Commercial acting showcase
- **Portfolio Highlights** - Recent projects, skills, training, and awards
- **Contact Management** - Multiple contact options and social media integration
- **Responsive Design** - Perfect on all devices with mobile-first approach

### Revolutionary Theming System
- **One-Line Theme Switching** - Change entire site theme instantly
- **Pure Tailwind CSS v4** - Zero custom CSS, only utility classes
- **Glassmorphism Effects** - Stunning backdrop-blur and transparency effects
- **Centralized Control** - All styling managed from single configuration file

### Technical Excellence
- **SvelteKit 2.16.0** - Latest full-stack framework with SSR
- **Tailwind CSS 4.1.11** - Latest version with 5x faster builds
- **46.18kB CSS Bundle** - Optimized glassmorphism styling
- **Production Ready** - Deployed with Nginx, SSL, and systemd service

## 🎨 Theming System

### Instant Theme Switching
```javascript
// Change entire portfolio theme with one line:
export const activeTheme = themes.glassmorphism;
// Available: themes.glassmorphism, themes.dark, themes.light
```

### Benefits for Agencies
- **Multi-Client Support** - Perfect for talent agencies with multiple actors
- **Brand Consistency** - Maintain consistent styling across all portfolios
- **A/B Testing** - Quick design variations for different audiences
- **Seasonal Themes** - Holiday or event-specific styling

## 🛠️ Technology Stack

### Frontend
- **SvelteKit** - Full-stack framework with file-based routing
- **Svelte 5.0** - Reactive UI framework with runes
- **Tailwind CSS v4** - Utility-first CSS with modern features
- **Vite 6.2** - Lightning-fast build tool

### UI Components (Theme-Aware)
- **Button** - Multiple variants with glassmorphism effects
- **Card** - Portfolio cards with backdrop-blur
- **Badge** - Status indicators for skills and availability
- **Centralized Theming** - All components inherit theme automatically

### Backend & Deployment
- **Node.js Adapter** - Server-side rendering for SEO
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

# Switch to actress portfolio branch
git checkout cinzia

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the actress portfolio.

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
│   │   └── ui/           # Theme-aware UI components
│   │       ├── Button.svelte
│   │       ├── Card.svelte
│   │       ├── Badge.svelte
│   │       └── index.js
│   └── styles/
│       └── themes.js     # Centralized theme system
├── routes/
│   ├── +layout.svelte    # Global layout
│   └── +page.svelte      # Actress portfolio page
├── app.html              # HTML template
└── app.css               # Minimal Tailwind imports
```

## 🎨 Theme Customization

### Creating Custom Themes

```javascript
// Easy custom theme creation in themes.js:
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

### Component Usage

```svelte
<script>
  import { Button, Card, Badge } from '$lib/components/ui';
</script>

<!-- Components automatically inherit active theme -->
<Card variant="frosted" hover>
  <h3>Portfolio Item</h3>
  <p>Description of work...</p>
  <Badge variant="success">Available</Badge>
  <Button>Contact Me</Button>
</Card>
```

## 🎭 Portfolio Sections

### Acting Services
- **Film & Television** - Feature films, TV series, streaming platforms
- **Theater** - Stage productions, classical and contemporary
- **Commercials** - Lifestyle, beauty, fashion, product advertisements

### Portfolio Highlights
- **Recent Projects** - Latest film and TV work
- **Skills & Training** - Acting techniques, special skills, education
- **Awards & Recognition** - Industry awards and nominations

### Contact Options
- **Email** - Direct professional contact
- **Phone** - Scheduling calls and meetings
- **Social Media** - Instagram, portfolio, showreel links

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

The actress portfolio is configured for production deployment with:

- **Nginx** reverse proxy configuration
- **SSL/HTTPS** with Let's Encrypt
- **Systemd** service for process management
- **Node.js adapter** for SSR and SEO optimization

See `CLAUDE.md` for detailed deployment instructions.

## 📖 Documentation

- **Technical Details**: See `CLAUDE.md` for comprehensive technical documentation
- **Theme System**: Complete guide to the centralized theming architecture
- **Deployment Guide**: Server setup and deployment instructions

## 🌿 Branches

- **Main Branch**: Original theming system demo
- **Cinzia Branch**: Professional actress portfolio (current deployment)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Portfolio**: [https://svelte.prenotacorsi.com](https://svelte.prenotacorsi.com)
- **GitHub Repository**: [https://github.com/webinadvance/sveltekit](https://github.com/webinadvance/sveltekit)
- **Cinzia Branch**: [https://github.com/webinadvance/sveltekit/tree/cinzia](https://github.com/webinadvance/sveltekit/tree/cinzia)
- **SvelteKit Docs**: [https://kit.svelte.dev](https://kit.svelte.dev)
- **Tailwind CSS v4**: [https://tailwindcss.com](https://tailwindcss.com)

---

Built with ❤️ for professional actresses using SvelteKit and Tailwind CSS v4