<script>
  import { Button, Card, Badge } from '$lib/components/ui';
  import { getAppBackground, currentTheme } from '$lib/styles/themes.js';
  import { ArrowRight, Star, Camera, Heart, Award, Mail, Phone, Instagram } from 'lucide-svelte';
  
  $: appBackground = getAppBackground();
</script>

<!-- Actress Landing Page - Glassmorphism Theme -->
<div class="min-h-screen {appBackground} relative overflow-hidden">
  <!-- Floating background elements -->
  <div class="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
  <div class="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>

  <!-- Hero Section -->
  <div class="container mx-auto px-4 py-16 relative z-10">
    <div class="text-center max-w-5xl mx-auto">
      <Badge class="mb-6 animate-bounce">✨ Professional Actress</Badge>
      
      <h1 class="text-6xl md:text-8xl font-bold tracking-tight mb-8">
        <span class="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent drop-shadow-lg">
          Cinzia
        </span>
        <br>
        <span class="bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent text-4xl md:text-6xl">
          Professional Actress
        </span>
      </h1>
      
      <p class="{currentTheme.text.secondary} text-xl md:text-2xl mb-10 leading-relaxed backdrop-blur-sm max-w-3xl mx-auto">
        Bringing characters to life with passion, dedication, and artistic excellence.
        <br class="hidden md:block">
        Available for film, television, theater, and commercial projects.
      </p>
      
      <div class="flex gap-4 justify-center flex-wrap">
        <Button size="lg" class="animate-pulse">
          <Star class="w-5 h-5" />
          View Portfolio
          <ArrowRight class="w-5 h-5" />
        </Button>
        <Button size="lg" variant="outline" class="hover:scale-110">
          <Mail class="w-5 h-5" />
          Contact Me
        </Button>
      </div>
    </div>
  </div>

  <!-- Services Section -->
  <div class="container mx-auto px-4 py-16 relative z-10">
    <div class="text-center mb-16">
      <h2 class="{currentTheme.text.primary} text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Acting Services
      </h2>
      <p class="{currentTheme.text.secondary} text-xl max-w-2xl mx-auto">
        Professional acting services across multiple mediums and genres
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <Card hover float class="group">
        <div class="rounded-2xl bg-gradient-to-br from-red-400/30 to-pink-500/30 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Camera class="w-8 h-8 text-white" />
        </div>
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-4">Film & Television</h3>
        <p class="{currentTheme.text.secondary} mb-6 leading-relaxed">
          Experienced in dramatic and comedic roles for feature films, TV series, and streaming platforms. Comfortable with both lead and supporting characters.
        </p>
        <Badge variant="success" size="sm">Available</Badge>
      </Card>

      <Card hover class="group animate-bounce delay-300">
        <div class="rounded-2xl bg-gradient-to-br from-purple-400/30 to-blue-500/30 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Star class="w-8 h-8 text-white" />
        </div>
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-4">Theater</h3>
        <p class="{currentTheme.text.secondary} mb-6 leading-relaxed">
          Stage-trained with extensive theater background. Skilled in classical, contemporary, and experimental theater productions.
        </p>
        <Badge variant="info" size="sm">Stage Ready</Badge>
      </Card>

      <Card hover float class="group">
        <div class="rounded-2xl bg-gradient-to-br from-green-400/30 to-teal-500/30 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Heart class="w-8 h-8 text-white" />
        </div>
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-4">Commercials</h3>
        <p class="{currentTheme.text.secondary} mb-6 leading-relaxed">
          Professional commercial acting with experience in lifestyle, beauty, fashion, and product advertisements for major brands.
        </p>
        <Badge variant="secondary" size="sm">Brand Ready</Badge>
      </Card>
    </div>
  </div>

  <!-- Portfolio Highlights -->
  <div class="container mx-auto px-4 py-16 relative z-10">
    <div class="text-center mb-16">
      <h2 class="{currentTheme.text.primary} text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Portfolio Highlights
      </h2>
      <p class="{currentTheme.text.secondary} text-xl">
        Recent work and career achievements
      </p>
    </div>
    
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Recent Projects -->
      <Card variant="frosted" class="overflow-visible">
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-6">Recent Projects</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <Card variant="default" padding="sm" class="bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <h4 class="font-bold text-white mb-2">"Moonlight Dreams" (2024)</h4>
            <p class="text-white/70 text-sm mb-3">Lead Role - Independent Film</p>
            <Badge variant="success" size="sm">Completed</Badge>
          </Card>
          <Card variant="default" padding="sm" class="bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <h4 class="font-bold text-white mb-2">"City Nights" TV Series</h4>
            <p class="text-white/70 text-sm mb-3">Recurring Character - Season 2</p>
            <Badge variant="info" size="sm">Airing Now</Badge>
          </Card>
        </div>
      </Card>

      <!-- Skills & Training -->
      <Card variant="frosted">
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-6">Skills & Training</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <h4 class="{currentTheme.text.primary} font-semibold mb-3">Acting Techniques</h4>
            <div class="space-y-2">
              <Badge size="sm">Method Acting</Badge>
              <Badge size="sm">Meisner Technique</Badge>
              <Badge size="sm">Improvisation</Badge>
            </div>
          </div>
          <div>
            <h4 class="{currentTheme.text.primary} font-semibold mb-3">Special Skills</h4>
            <div class="space-y-2">
              <Badge variant="success" size="sm">Multilingual</Badge>
              <Badge variant="success" size="sm">Stage Combat</Badge>
              <Badge variant="success" size="sm">Dancing</Badge>
            </div>
          </div>
          <div>
            <h4 class="{currentTheme.text.primary} font-semibold mb-3">Training</h4>
            <div class="space-y-2">
              <Badge variant="info" size="sm">Drama Academy</Badge>
              <Badge variant="info" size="sm">Film Workshop</Badge>
              <Badge variant="info" size="sm">Voice Coach</Badge>
            </div>
          </div>
        </div>
      </Card>

      <!-- Awards & Recognition -->
      <Card variant="frosted">
        <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-6">Awards & Recognition</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex items-center space-x-4">
            <div class="rounded-full bg-yellow-400/20 p-3">
              <Award class="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <h4 class="font-semibold text-white">Best Actress Award</h4>
              <p class="text-white/70 text-sm">International Film Festival 2023</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="rounded-full bg-purple-400/20 p-3">
              <Star class="w-6 h-6 text-purple-200" />
            </div>
            <div>
              <h4 class="font-semibold text-white">Rising Star Nomination</h4>
              <p class="text-white/70 text-sm">Cinema Awards 2024</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>

  <!-- Contact Section -->
  <div class="relative z-10 py-20">
    <div class="container mx-auto px-4 text-center">
      <Card variant="frosted" class="max-w-4xl mx-auto">
        <h2 class="{currentTheme.text.primary} text-4xl md:text-5xl font-bold mb-6">
          Let's Work Together
        </h2>
        <p class="{currentTheme.text.secondary} text-xl mb-8 leading-relaxed">
          Ready to bring your project to life? I'm available for new opportunities and excited to collaborate on meaningful stories.
        </p>
        
        <!-- Contact Options -->
        <div class="flex gap-4 justify-center flex-wrap mb-8">
          <Button size="xl" class="hover:scale-110 hover:rotate-1 transition-all">
            <Mail class="w-6 h-6" />
            Email Me
          </Button>
          <Button size="xl" variant="outline" class="hover:scale-110 hover:-rotate-1 transition-all">
            <Phone class="w-6 h-6" />
            Schedule Call
          </Button>
        </div>

        <!-- Social Links -->
        <div class="flex gap-4 justify-center">
          <Button variant="ghost" size="sm" class="hover:scale-110">
            <Instagram class="w-5 h-5" />
            Instagram
          </Button>
          <Button variant="ghost" size="sm" class="hover:scale-110">
            <Camera class="w-5 h-5" />
            Portfolio
          </Button>
          <Button variant="ghost" size="sm" class="hover:scale-110">
            <Star class="w-5 h-5" />
            Showreel
          </Button>
        </div>
      </Card>
    </div>
  </div>
</div>