<script>
  import { Button, Card, Badge } from '$lib/components/ui';
  import { getAppBackground, currentTheme } from '$lib/styles/themes.js';
  import { ArrowRight, Zap, Shield, Gauge } from 'lucide-svelte';
  
  $: appBackground = getAppBackground();
</script>

<!-- Themed Landing Page - Easy to change entire style -->
<div class="min-h-screen {appBackground} relative overflow-hidden">
  <!-- Floating background elements -->
  <div class="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
  <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>

  <!-- Hero Section -->
  <div class="container mx-auto px-4 py-16 relative z-10">
    <div class="text-center max-w-4xl mx-auto">
      <Badge class="mb-6 animate-bounce">✨ Themeable Glassmorphism UI</Badge>
      
      <h1 class="text-6xl md:text-7xl font-bold tracking-tight mb-8">
        <span class="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent drop-shadow-lg">
          Beautiful
        </span>
        <br>
        <span class="bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent">
          Themeable UI
        </span>
      </h1>
      
      <p class="{currentTheme.text.secondary} text-xl md:text-2xl mb-10 leading-relaxed backdrop-blur-sm">
        Instantly change your entire app's theme with one line of code.
        <br class="hidden md:block">
        Modern components, extreme customization.
      </p>
      
      <div class="flex gap-4 justify-center flex-wrap">
        <Button size="lg" class="animate-pulse">
          <Zap class="w-5 h-5" />
          Get Started
          <ArrowRight class="w-5 h-5" />
        </Button>
        <Button size="lg" variant="outline" class="hover:scale-110">
          <Shield class="w-5 h-5" />
          Switch Themes
        </Button>
      </div>
    </div>
  </div>

  <!-- Theme Benefits Section -->
  <div class="container mx-auto px-4 py-16 relative z-10">
    <div class="text-center mb-16">
      <h2 class="{currentTheme.text.primary} text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Why Our Theming System?
      </h2>
      <p class="{currentTheme.text.secondary} text-xl max-w-2xl mx-auto">
        Change your entire app's look and feel by modifying just one variable
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <Card hover float class="group">
        <div class="rounded-2xl bg-gradient-to-br from-orange-400/30 to-red-500/30 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Zap class="w-8 h-8 text-white" />
        </div>
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-4">One Line Changes</h3>
        <p class="{currentTheme.text.secondary} mb-6 leading-relaxed">
          Switch between glassmorphism, dark, light, or any custom theme by changing just the activeTheme variable.
        </p>
        <Badge variant="success" size="sm">Easy</Badge>
      </Card>

      <Card hover class="group animate-bounce delay-300">
        <div class="rounded-2xl bg-gradient-to-br from-blue-400/30 to-purple-500/30 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Shield class="w-8 h-8 text-white" />
        </div>
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-4">Consistent Design</h3>
        <p class="{currentTheme.text.secondary} mb-6 leading-relaxed">
          All components automatically inherit the theme. No need to update individual components.
        </p>
        <Badge variant="info" size="sm">Consistent</Badge>
      </Card>

      <Card hover float class="group">
        <div class="rounded-2xl bg-gradient-to-br from-green-400/30 to-teal-500/30 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Gauge class="w-8 h-8 text-white" />
        </div>
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-4">Tailwind Pure</h3>
        <p class="{currentTheme.text.secondary} mb-6 leading-relaxed">
          Built entirely with Tailwind utility classes. No custom CSS needed.
        </p>
        <Badge variant="secondary" size="sm">Pure Tailwind</Badge>
      </Card>
    </div>
  </div>

  <!-- Theme Examples -->
  <div class="container mx-auto px-4 py-16 relative z-10">
    <div class="text-center mb-16">
      <h2 class="{currentTheme.text.primary} text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Available Themes
      </h2>
      <p class="{currentTheme.text.secondary} text-xl">
        Choose from pre-built themes or create your own
      </p>
    </div>
    
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Current Theme Demo -->
      <Card variant="frosted" class="overflow-visible">
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-6">Current Theme: Glassmorphism</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="{currentTheme.text.primary} font-semibold mb-3">Buttons</h4>
            <div class="flex gap-2 flex-wrap">
              <Button size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="outline" size="sm">Outline</Button>
            </div>
          </div>
          <div>
            <h4 class="{currentTheme.text.primary} font-semibold mb-3">Badges</h4>
            <div class="flex gap-2 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </div>
        </div>
      </Card>

      <!-- Theme Code Example -->
      <Card variant="frosted">
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-6">Easy Theme Switching</h3>
        <div class="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
          <div class="text-green-400">// Change entire app theme with one line:</div>
          <div class="text-blue-400">export const activeTheme = themes.glassmorphism;</div>
          <div class="text-gray-400">// Switch to dark: themes.dark</div>
          <div class="text-gray-400">// Switch to light: themes.light</div>
          <div class="text-gray-400">// Or create custom theme</div>
        </div>
      </Card>
    </div>
  </div>

  <!-- CTA Section -->
  <div class="relative z-10 py-20">
    <div class="container mx-auto px-4 text-center">
      <Card variant="frosted" class="max-w-4xl mx-auto">
        <h2 class="{currentTheme.text.primary} text-4xl md:text-5xl font-bold mb-6">
          Start Theming Today
        </h2>
        <p class="{currentTheme.text.secondary} text-xl mb-8 leading-relaxed">
          Build beautiful, consistent UIs that can be restyled instantly. Perfect for multi-brand apps or design system testing.
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <Button size="xl" class="hover:scale-110 hover:rotate-1 transition-all">
            <ArrowRight class="w-6 h-6" />
            Start Building
          </Button>
          <Button size="xl" variant="outline" class="hover:scale-110 hover:-rotate-1 transition-all">
            <Shield class="w-6 h-6" />
            View Themes
          </Button>
        </div>
      </Card>
    </div>
  </div>
</div>