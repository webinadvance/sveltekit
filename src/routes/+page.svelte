<script>
  import { Button, Card, Badge } from '$lib/components/ui';
  import { ArrowRight, Zap, Shield, Gauge } from 'lucide-svelte';
</script>

<div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
  <!-- Hero Section -->
  <div class="container mx-auto px-4 py-16">
    <div class="text-center max-w-3xl mx-auto">
      <Badge class="mb-4">Built with SvelteKit + Tailwind v4</Badge>
      <h1 class="text-5xl font-bold tracking-tight text-gray-900 mb-6">
        Modern Web Development with <span class="text-orange-500">SvelteKit</span>
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Experience the power of SvelteKit combined with beautiful, themeable UI components built with pure Tailwind CSS v4.
      </p>
      <div class="flex gap-4 justify-center flex-wrap">
        <Button size="lg">
          Get Started <ArrowRight class="w-4 h-4" />
        </Button>
        <Button size="lg" variant="outline">
          View Documentation
        </Button>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-12">Why Choose This Stack?</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <Card hover>
        <div class="rounded-lg bg-orange-100 w-12 h-12 flex items-center justify-center mb-4">
          <Zap class="w-6 h-6 text-orange-600" />
        </div>
        <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
        <p class="text-gray-600 mb-4">
          SvelteKit's optimized builds and server-side rendering deliver exceptional performance out of the box.
        </p>
        <Badge variant="success" size="sm">Performance</Badge>
      </Card>

      <Card hover>
        <div class="rounded-lg bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
          <Shield class="w-6 h-6 text-blue-600" />
        </div>
        <h3 class="text-xl font-semibold mb-2">Type-Safe</h3>
        <p class="text-gray-600 mb-4">
          Full TypeScript support with auto-generated types for routes, ensuring a robust development experience.
        </p>
        <Badge variant="info" size="sm">TypeScript</Badge>
      </Card>

      <Card hover>
        <div class="rounded-lg bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
          <Gauge class="w-6 h-6 text-green-600" />
        </div>
        <h3 class="text-xl font-semibold mb-2">Modern DX</h3>
        <p class="text-gray-600 mb-4">
          Hot module replacement, file-based routing, and an intuitive API make development a breeze.
        </p>
        <Badge variant="secondary" size="sm">Developer Experience</Badge>
      </Card>
    </div>
  </div>

  <!-- Component Showcase -->
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-12">Component Showcase</h2>
    <div class="max-w-4xl mx-auto">
      <Card variant="elevated" class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Button Variants</h3>
        <div class="flex gap-4 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </Card>

      <Card variant="elevated" class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Badge Collection</h3>
        <div class="flex gap-2 flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Card>
    </div>
  </div>

  <!-- CTA Section -->
  <div class="bg-gray-900 text-white py-16 mt-16">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
      <p class="text-xl text-gray-300 mb-8">
        Start your next project with the power of SvelteKit and custom Tailwind components.
      </p>
      <Button size="lg" variant="secondary">
        Explore Components <ArrowRight class="w-4 h-4" />
      </Button>
    </div>
  </div>
</div>