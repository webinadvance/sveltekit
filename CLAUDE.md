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

#### 1. Neon Theater Theme Configuration (`/src/lib/styles/themes.js`)
```javascript
// Neon Theater Theme - Centralized styling for actress portfolio
export const neonTheme = {
  primary: '#ff1493',      // Deep pink neon
  secondary: '#ff69b4',    // Hot pink accents
  typography: {
    title: { fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900 },
    subtitle: { fontFamily: "'Dancing Script', cursive", fontWeight: 500, fontStyle: 'italic' },
    body: { fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }
  },
  neon: { glow: { small: '0 0 10px #ff1493', medium: '0 0 20px #ff1493' } }
};
```

#### 2. SUPER DRY Theme Features - ZERO REPETITION
- **Single Source of Truth** - All colors, fonts, effects in one theme file
- **Database-Driven Typography** - Handwritten fonts (Dancing Script) applied via theme
- **Centralized Neon Effects** - Pink theatrical lighting from theme configuration
- **Zero Hard-Coding** - No repeated colors or fonts anywhere in codebase
- **CSS Variables Integration** - Components use theme via custom properties

#### 3. SUPER DRY Component Integration - Database + Theme
```javascript
// All components get data from database AND styling from theme:
<section style="
  --subtitle-font-family: {activeTheme.typography.subtitle.fontFamily};
  --subtitle-font-weight: {activeTheme.typography.subtitle.fontWeight};
  --subtitle-font-style: {activeTheme.typography.subtitle.fontStyle};
">
  {#if subtitle}
    <p class="hero-subtitle">{subtitle}</p> <!-- Content from DB, styling from theme -->
  {/if}
</section>
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

# Super Dynamic CMS - Technical Architecture

## Core Philosophy: SUPER DRY APPROACH

### Everything is a Component
- **Database-Driven Components**: Every visual element is a reusable component that gets its data from the database
- **Zero Hard-Coding**: No content is hard-coded in components - everything comes from database props
- **Maximum Reusability**: Same component can be used multiple times across different pages with different data
- **Component-Based Architecture**: Pages are just collections of components with their respective data

### Database Structure
```sql
-- Pages: Define routes and meta data
pages (id, slug, title, meta_description, meta_keywords, og_image, is_published)

-- Components: Define available component types  
components (id, name, display_name, description, schema, template_path, is_active)

-- Page Components: Link pages to components with data
page_components (id, page_id, component_id, component_data, display_order, is_active)

-- Media: File uploads and assets
media (id, filename, url, thumbnail_url, alt_text, caption, mime_type, file_size)

-- Settings: Global configuration
settings (key, value, type, category, description)
```

### Component Data Flow
1. **Page Request** → Database loads page by slug
2. **Components Loading** → Database loads all components for that page with their data
3. **Dynamic Rendering** → Each component receives its data as props from database
4. **SSR Delivery** → Server-side rendered page with all data

### Example Component Usage
```javascript
// Database stores:
{
  page_id: 1,
  component_id: 'hero',
  component_data: {
    title: "Welcome to Our Site",
    subtitle: "Dynamic content from database",
    background_image: "/uploads/hero-bg.jpg",
    cta_text: "Get Started",
    cta_link: "/contact"
  }
}

// Component receives:
<Hero 
  title="Welcome to Our Site"
  subtitle="Dynamic content from database" 
  background_image="/uploads/hero-bg.jpg"
  cta_text="Get Started"
  cta_link="/contact"
/>
```

### Benefits of Super DRY Approach
- **Content Management**: Non-technical users can manage content through admin interface
- **Developer Efficiency**: Write component once, use everywhere with different data
- **Scalability**: Easy to add new pages by combining existing components
- **Maintainability**: Single source of truth for all content in database
- **Performance**: SSR ensures fast loading with full SEO benefits

### Component Types
- `Hero` - Hero sections with title, subtitle, background, CTA
- `TextBlock` - Rich text content with alignment options
- `ImageGallery` - Image grids with lightbox functionality  
- `ContactForm` - Contact forms with customizable fields
- `VideoEmbed` - Video embeds from YouTube/Vimeo
- `Testimonials` - Customer testimonials and reviews
- `FAQ` - Frequently asked questions sections
- `PricingTable` - Pricing plans and features
- `TeamMembers` - Team/staff member profiles
- `BlogPosts` - Blog post listings and content

### Database-Driven Features
- **Dynamic Routing**: Pages created in database automatically become routes
- **Component Ordering**: Display order controlled via database
- **Content Versioning**: Track content changes over time
- **Multi-language Support**: Same components, different language data
- **A/B Testing**: Different component data for testing variations

## Data Binding Architecture

### How Data Flows Through the System
The super DRY architecture uses a three-table system to bind data to pages and components:

#### 1. Pages Table - Route Definitions
```sql
pages (id, slug, title, meta_description, meta_keywords, og_image, is_published)
```
- Each page has a unique `slug` like `/`, `/about`, `/contact`
- Contains SEO metadata and page-level configuration

#### 2. Components Table - Component Type Registry
```sql
components (id, name, display_name, description, schema, template_path, is_active)
```
- Defines available component types: `home_component`, `hero`, `text_block`, etc.
- `schema` = JSON schema defining expected props for each component type
- `template_path` = which Svelte component file to render

#### 3. Page Components Table - The Data Bridge
```sql
page_components (id, page_id, component_id, component_data, display_order, is_active)
```
- **THE MAGIC LINK** - connects pages to components with their data
- `page_id` → which page this component appears on
- `component_id` → which type of component it is  
- `component_data` → **JSON blob with all props for that component instance**
- `display_order` → order of components on the page

### Data Flow Example
```javascript
// 1. User visits /home
// 2. Database query loads page with components
{
  id: 1, slug: "/", title: "Homepage",
  components: [
    {
      component_name: "home_component",
      component_data: {
        title: "Welcome to CMS",
        subtitle: "Database-driven content",
        content: "<p>All from database...</p>"
      }
    }
  ]
}

// 3. ComponentLoader renders dynamically
<ComponentLoader 
  componentName="home_component"
  componentData={component_data} 
/>

// 4. HomeComponent receives all props from database
export let title;    // "Welcome to CMS"
export let subtitle; // "Database-driven content"
export let content;  // "<p>All from database...</p>"
```

### Why This Architecture is Optimal

#### Maximum Flexibility
- ✅ **Zero hard-coding** - Everything comes from database
- ✅ **Infinite reusability** - Same component, different data across pages
- ✅ **Dynamic routing** - Pages created in database become routes automatically
- ✅ **Visual ordering** - Components reordered via `display_order`
- ✅ **Type safety** - Component schemas validate props

#### Content Manager Friendly
- ✅ Non-technical users can create/edit pages
- ✅ Add/remove/reorder components visually  
- ✅ Edit content without touching code
- ✅ A/B testing with different component data

#### Developer Efficiency  
- ✅ Write component once, use everywhere with different data
- ✅ SSR for SEO performance and fast loading
- ✅ Schema-validated props prevent runtime errors
- ✅ Single source of truth in database

#### Perfect Balance
This approach hits the sweet spot between:
- **Flexibility** vs **Complexity** 
- **Power** vs **Performance**
- **Dynamic** vs **Maintainable**
- **User-friendly** vs **Developer-friendly**

### CRITICAL: Super DRY Approach - NEVER REPEAT A SINGLE LINE OF CODE

#### Absolute Zero Code Duplication
- ✅ **NEVER repeat a single line of code** - Everything must be reusable
- ✅ **ALL components are reusable** - No single-use components allowed
- ✅ **Always check for existing components** - Before creating new, search existing
- ✅ **Extend, don't duplicate** - Modify existing components rather than creating new

#### Super DRY Development Workflow
```
1. BEFORE creating ANY component:
   → Search existing components in database
   → Check component library for similar functionality
   → Can existing component be extended with props?

2. IF component exists:
   → Use existing component with different data
   → Add new props if needed (backwards compatible)
   → NEVER create duplicate functionality

3. IF component doesn't exist:
   → Create maximally reusable component
   → Design for multiple use cases from day 1
   → Add to component registry immediately
```

#### Component Reusability Rules
- ✅ **Every component accepts props** - No hard-coded values ever
- ✅ **Components are data-agnostic** - Work with any data structure
- ✅ **Flexible styling** - Accept CSS classes/colors as props
- ✅ **Conditional rendering** - Show/hide elements based on props
- ✅ **Multiple layouts** - Single component, multiple display modes

#### Examples of Super DRY Implementation
```javascript
// ❌ BAD - Multiple similar components
- HeroSection.svelte
- AboutHero.svelte  
- ContactHero.svelte

// ✅ GOOD - One reusable component
- Hero.svelte (accepts title, subtitle, background, layout props)

// ❌ BAD - Hard-coded button
<button class="bg-blue-500">Submit</button>

// ✅ GOOD - Reusable button component
<Button variant="primary" text="Submit" onClick={handleSubmit} />
```

#### Component Extension Strategy
```javascript
// Instead of creating new component, extend existing:
export let variant = 'default';  // default, large, small, hero
export let layout = 'center';    // center, left, right, split
export let theme = 'light';      // light, dark, gradient
export let showCTA = true;       // show/hide call-to-action
```

#### Database Component Management
- ✅ **Component registry** - All components tracked in database
- ✅ **Usage tracking** - Know which components are used where
- ✅ **Schema evolution** - Update component schemas, not create new
- ✅ **Deprecation process** - Phase out old components gradually

### MANDATORY Super DRY Principles
- **NEVER repeat a single line of code** - Zero tolerance for duplication
- **Everything is reusable** - No single-use components exist  
- **Always check existing first** - Search before create
- **Extend over create** - Modify existing rather than duplicate
- **Props over hard-coding** - Every value comes from props/database
- **One component, infinite uses** - Maximum reusability always
- **Theme centralization** - All colors, fonts, effects in single theme file
- **Database-driven content** - Zero hardcoded text, images, or data
- **Editor component integration** - All content editable via SuperDynamicEditor

# Super Dynamic Editor - Revolutionary CMS Editing Experience

## SuperDynamicEditor.svelte - The Ultimate DRY Editor

### 🚀 Revolutionary Features

#### **Schema-Driven Intelligence**
- **Automatic Schema Loading** - Fetches component schemas from database via API
- **Smart Field Detection** - Auto-detects field types even without schemas
- **JSON Schema Integration** - Full support for JSON Schema validation
- **Dynamic Form Generation** - Creates perfect forms for any component automatically

#### **Advanced Field Types**
- **Text Fields** - Smart detection of text, email, URL, HTML content
- **Rich Inputs** - Color pickers, date/time, number with min/max
- **Boolean Controls** - Elegant checkbox with custom labels
- **Select Dropdowns** - From enum arrays with custom labels
- **Array Management** - Full CRUD for array fields (add/remove/edit)
- **Object Support** - Nested object editing with sub-fields
- **File Uploads** - (Ready for implementation)

#### **Intelligent Auto-Detection**
```javascript
// Automatic field type detection:
detectType(value) {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  return 'string';
}

// Smart format detection:
detectFormat(value) {
  if (value.match(/^#[0-9a-f]{3,6}$/i)) return 'color';
  if (value.match(/^https?:\/\//)) return 'url';
  if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'email';
  if (value.includes('<') && value.includes('>')) return 'html';
  if (value.length > 100) return 'textarea';
  return null;
}
```

#### **Schema-Based Validation**
- **Required Field Validation** - Based on schema.required array
- **Min/Max Constraints** - Number and string length validation
- **Pattern Matching** - Regex validation with custom error messages
- **Enum Validation** - Dropdown options from schema
- **Real-time Feedback** - Instant validation with error messages

#### **Super DRY Architecture**
- **Single Editor Component** - Works with ALL component types
- **Zero Configuration** - Automatically adapts to any data structure
- **Schema-First Design** - Uses database schemas for perfect UX
- **Fallback Intelligence** - Works even without schemas
- **Maximum Reusability** - One editor for infinite components

### 🎯 Usage Examples

#### **Basic Usage**
```svelte
<SuperDynamicEditor 
  componentName="hero"
  componentData={heroData}
  on:save={handleSave}
  on:cancel={handleCancel}
/>
```

#### **With Schema**
```svelte
<SuperDynamicEditor 
  componentName="gallery"
  componentData={galleryData}
  componentSchema={gallerySchema}
  on:save={handleSave}
  on:cancel={handleCancel}
/>
```

### 🔧 Component Integration

#### **EditableWrapper Integration**
The SuperDynamicEditor is seamlessly integrated into the editing system:

```svelte
<!-- EditableWrapper.svelte -->
<SuperDynamicEditor 
  {componentName}
  componentData={$editingComponentData}
  on:save={(event) => handleSave(event.detail)}
  on:cancel={handleCancel}
/>
```

#### **API Schema Endpoint**
```javascript
// GET /api/components/[name]/schema
{
  "success": true,
  "schema": {
    "type": "object",
    "properties": {
      "title": { "type": "string", "title": "Title" },
      "content": { "type": "string", "format": "textarea" }
    },
    "required": ["title"]
  }
}
```

### 🎨 Visual Design

#### **Modern Glassmorphism UI**
- **Gradient Headers** - Beautiful gradient backgrounds
- **Backdrop Blur Effects** - Modern frosted glass appearance
- **Smooth Animations** - Hover effects and transitions
- **Professional Typography** - Clean, readable fonts
- **Responsive Design** - Perfect on all devices

#### **Smart Field Rendering**
- **Color Inputs** - Visual color picker + text input
- **Array Fields** - Add/remove items with elegant controls
- **Object Fields** - Nested editing with sub-forms
- **Rich Validation** - Visual error states with helpful messages

### 📊 Super Dynamic Features

#### **Array Field Management**
```svelte
<!-- Dynamic array editing -->
{#each editData[field] as item, index}
  <div class="array-item">
    {#if typeof item === 'object'}
      <!-- Nested object editing -->
      {#each Object.entries(item) as [subField, subValue]}
        <input bind:value={item[subField]} />
      {/each}
    {:else}
      <!-- Simple value editing -->
      <input bind:value={editData[field][index]} />
    {/if}
    <button on:click={() => removeArrayItem(field, index)}>🗑️</button>
  </div>
{/each}
<button on:click={() => addArrayItem(field, config.items)}>
  ➕ Add Item
</button>
```

#### **Schema-Driven Validation**
```javascript
function validateForm() {
  // Check required fields from schema
  const required = componentSchema.required || [];
  
  // Check constraints (min/max, length, pattern)
  for (const [field, config] of Object.entries(schema.properties)) {
    if (config.minimum && value < config.minimum) {
      errors[field] = `Minimum value is ${config.minimum}`;
    }
    // ... more validations
  }
}
```

### 🔄 Data Flow

1. **Schema Loading** → API fetches component schema from database
2. **Field Generation** → Creates appropriate input for each field
3. **Auto-Detection** → Detects types/formats for schemaless fields
4. **Validation** → Real-time validation against schema rules
5. **Save Process** → Validates and saves to database

### 🚀 Performance Benefits

- **Lazy Loading** - Schemas loaded on-demand
- **Smart Caching** - Component schemas cached for performance
- **Minimal Footprint** - Single editor for all components
- **Fast Rendering** - Efficient field generation algorithm

### 💡 Future Enhancements Ready

- **File Upload Fields** - Image/video upload support
- **Rich Text Editor** - WYSIWYG HTML editing
- **Conditional Fields** - Show/hide based on other values
- **Field Dependencies** - Auto-update related fields
- **Custom Validators** - Component-specific validation rules
- **Field Groups** - Collapsible sections for complex forms

This SuperDynamicEditor represents the pinnacle of DRY architecture - one component that intelligently adapts to edit ANY data structure while providing a beautiful, professional user experience.