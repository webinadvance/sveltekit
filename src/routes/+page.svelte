<script>
  import { Button, Badge } from '$lib/components/ui';
  import { getAppBackground, currentTheme, currentAccent } from '$lib/styles/themes.js';
  import { ArrowRight, Star, Camera, Heart, Award, Mail, Phone, Play, Users, Theater } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  $: appBackground = getAppBackground();
  
  // Parallax scrolling
  let scrollY = 0;
  
  onMount(() => {
    const handleScroll = () => scrollY = window.scrollY;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:window bind:scrollY />

<!-- Professional Actress Portfolio -->
<div class="min-h-screen overflow-x-hidden">

  <!-- Hero Section with Background Image -->
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2076" 
        alt="Theatre stage" 
        class="w-full h-full object-cover grayscale"
      />
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/50"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 text-center">
      <div class="max-w-5xl mx-auto">
        <div class="flex gap-3 justify-center mb-8 flex-wrap"  >
          <Badge variant="secondary">Attrice Professionista</Badge>
          <Badge variant="secondary">Milano, Italia</Badge>
          <Badge variant="secondary">Disponibile</Badge>
        </div>
        
        <h1 class="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6 text-white drop-shadow-2xl"  >
          Cinzia Brugnola
        </h1>
        
        <p class="text-white text-2xl lg:text-3xl mb-8 font-light tracking-wide"  >
          <span class="accent">Attrice</span> • <span class="accent">Performer</span> • <span class="accent">Formatrice</span>
        </p>
        
        <p class="text-white/90 text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto"  >
          Friulana d'origine e milanese d'adozione, attiva in <span class="accent-bold">teatro</span>, <span class="accent-bold">cinema</span> e <span class="accent-bold">televisione</span>. 
          Diplomata <span class="accent-bold">S.A.T. Teatranza</span>, fondatrice <span class="accent-bold">Compagnia Duchessa Rossa</span>.
        </p>
        
        <div class="flex gap-4 justify-center flex-wrap"  >
          <Button size="lg" class="bg-white text-gray-900 hover:bg-gray-100">
            Portfolio
          </Button>
          <Button size="lg" variant="outline" class="text-white border-white hover:bg-white hover:text-gray-900">
            Contatti
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"  >
      <div class="w-8 h-12 border-2 border-white/50 flex justify-center">
        <div class="w-1 h-3 bg-white/70 mt-2"></div>
      </div>
    </div>
  </div>

  <!-- Biografia Section with Background -->
  <div class="relative py-20 overflow-hidden">
    <!-- Background Image with Parallax -->
    <div class="absolute inset-0 z-0" style="transform: translateY({scrollY * 0.3}px)">
      <img 
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070" 
        alt="Portrait background" 
        class="w-full h-full object-cover opacity-10 grayscale"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95"></div>
    </div>
    
    <div class="relative z-10 container mx-auto px-0 md:px-4">
      <div class="max-w-4xl mx-auto px-4 md:px-0">
        <div class="text-center mb-16">
          <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6" >
            Biografia Professionale
          </h2>
          <p class="{currentTheme.text.secondary} text-xl"  >
            Un percorso artistico tra teatro, cinema e formazione
          </p>
        </div>
        
        <div class="mb-12" >
          <p class="{currentTheme.text.secondary} text-lg leading-relaxed mb-6">
            Cinzia Brugnola è un'attrice, performer e formatrice attiva in <span class="accent-bold">teatro</span>, <span class="accent-bold">cinema</span> e <span class="accent-bold">televisione</span>. 
            Friulana d'origine e milanese d'adozione, si è diplomata presso la <span class="accent-bold">Scuola professionale S.A.T. di Teatranza</span> 
            di Torino ed è entrata subito a far parte del cast artistico della <span class="accent-bold">Compagnia Santibriganti</span>.
          </p>
          
          <p class="{currentTheme.text.secondary} text-lg leading-relaxed mb-6">
            Ha continuato gli studi presso <span class="accent-bold">Pontedera Teatro</span> e con maestri della scena nazionale ed internazionale, 
            tra cui <span class="accent">Cesar Brie</span>, <span class="accent">Gabriele Vacis</span>, <span class="accent">Alfonso Santagata</span>, <span class="accent">Natalino Balasso</span>, <span class="accent">Leo Muscato</span>, <span class="accent">Dominique de Fazio</span>.
          </p>
          
          <div class="mb-6"  >
            <div class="flex items-center mb-3">
              <Award class="w-6 h-6 accent mr-3" />
              <h4 class="{currentTheme.text.primary} font-semibold">Riconoscimento</h4>
            </div>
            <p class="{currentTheme.text.secondary}">
              Segnalata dal <span class="accent-bold">Premio Fersen all'Attore Creativo</span> per il ruolo della <span class="accent">Locandiera</span>
            </p>
          </div>
        </div>
        
        <!-- Caratteristiche -->
        <div class="grid md:grid-cols-2 gap-8">
          <div  >
            <h3 class="{currentTheme.text.primary} text-xl font-semibold mb-4">Informazioni Artistiche</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="{currentTheme.text.secondary}">Altezza:</span>
                <span class="{currentTheme.text.primary} font-medium">170 cm</span>
              </div>
              <div class="flex justify-between">
                <span class="{currentTheme.text.secondary}">Occhi:</span>
                <span class="{currentTheme.text.primary} font-medium">Verdi</span>
              </div>
              <div class="flex justify-between">
                <span class="{currentTheme.text.secondary}">Capelli:</span>
                <span class="{currentTheme.text.primary} font-medium">Rossi</span>
              </div>
              <div class="flex justify-between">
                <span class="{currentTheme.text.secondary}">Data di nascita:</span>
                <span class="{currentTheme.text.primary} font-medium">14 agosto 1978</span>
              </div>
            </div>
          </div>
          
          <div  >
            <h3 class="{currentTheme.text.primary} text-xl font-semibold mb-4">Competenze Linguistiche</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="{currentTheme.text.secondary}">Italiano</span>
                <Badge variant="secondary" size="sm">Madrelingua</Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="{currentTheme.text.secondary}">Inglese</span>
                <Badge variant="secondary" size="sm">Fluente</Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="{currentTheme.text.secondary}">Spagnolo</span>
                <Badge variant="secondary" size="sm">Fluente</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Professional Gallery Section -->
  <div class="relative py-20 {appBackground}">
    <div class="container mx-auto px-0 md:px-4">
      <div class="text-center mb-16 px-4 md:px-0">
        <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6" >
          Portfolio per Categoria
        </h2>
        <p class="{currentTheme.text.secondary} text-xl"  >
          Collezioni professionali organizzate per settore artistico
        </p>
      </div>

      <!-- Teatro Gallery -->
      <div class="mb-16"  >
        <div class="flex items-center gap-3 mb-8 px-4 md:px-0">
          <Theater class="w-8 h-8 accent" />
          <h3 class="{currentTheme.text.primary} text-3xl font-bold">Teatro</h3>
        </div>
        <div class="overflow-x-auto pb-6">
          <div class="flex gap-6 px-4 md:px-0" style="width: max-content;">
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800" alt="Teatro - Imitationofdeath" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?q=80&w=800" alt="Teatro - Compagnia Duchessa Rossa" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800" alt="Teatro - Pontedera Teatro" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800" alt="Teatro - Santibriganti" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=800" alt="Teatro - La Locandiera" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800" alt="Teatro - Spettacoli Attuali" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      <!-- Cinema Gallery -->
      <div class="mb-16"  >
        <div class="flex items-center gap-3 mb-8 px-4 md:px-0">
          <Camera class="w-8 h-8 accent" />
          <h3 class="{currentTheme.text.primary} text-3xl font-bold">Cinema</h3>
        </div>
        <div class="overflow-x-auto pb-6">
          <div class="flex gap-6 px-4 md:px-0" style="width: max-content;">
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800" alt="Cinema - The Lack" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800" alt="Cinema - Masbedo" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800" alt="Cinema - Set" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" alt="Cinema - Co-protagonista" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800" alt="Cinema - Behind Scenes" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      <!-- Ritratti Gallery -->
      <div class="mb-16"  >
        <div class="flex items-center gap-3 mb-8 px-4 md:px-0">
          <Heart class="w-8 h-8 accent" />
          <h3 class="{currentTheme.text.primary} text-3xl font-bold">Ritratti Professionali</h3>
        </div>
        <div class="overflow-x-auto pb-6">
          <div class="flex gap-6 px-4 md:px-0" style="width: max-content;">
            <div class="w-64 h-80 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800" alt="Ritratto - Studio" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-64 h-80 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800" alt="Ritratto - Professionale" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-64 h-80 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1494790108755-2616c14b62f1?q=80&w=800" alt="Ritratto - Headshot" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-64 h-80 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800" alt="Ritratto - Character" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-64 h-80 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800" alt="Ritratto - Artistico" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-64 h-80 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800" alt="Ritratto - Portfolio" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      <!-- Behind the Scenes Gallery -->
      <div class="mb-16"  >
        <div class="flex items-center gap-3 mb-8 px-4 md:px-0">
          <Users class="w-8 h-8 accent" />
          <h3 class="{currentTheme.text.primary} text-3xl font-bold">Backstage</h3>
        </div>
        <div class="overflow-x-auto pb-6">
          <div class="flex gap-6 px-4 md:px-0" style="width: max-content;">
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=800" alt="Backstage - Preparazione" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800" alt="Backstage - Trucco" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=800" alt="Backstage - Costume" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1514475110565-131ba0d94a71?q=80&w=800" alt="Backstage - Prove" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="w-80 h-52 bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800" alt="Backstage - Team" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Portfolio Gallery Section -->
  <div class="relative py-20 bg-gray-50">
    <div class="container mx-auto px-0 md:px-4">
      <div class="text-center mb-16">
        <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6" >
          Portfolio Fotografico
        </h2>
        <p class="{currentTheme.text.secondary} text-xl"  >
          Momenti di scena e ritratti professionali
        </p>
      </div>
      
      <!-- Image Gallery Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4 mb-20">
        <div class="relative group overflow-hidden aspect-[3/4]"  >
          <img src="https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?q=80&w=2070" alt="Teatro" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 text-white">
              <p class="font-semibold">Teatro</p>
              <p class="text-sm">Imitationofdeath</p>
            </div>
          </div>
        </div>
        
        <div class="relative group overflow-hidden aspect-[3/4]"  >
          <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=2070" alt="Cinema" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 text-white">
              <p class="font-semibold">Cinema</p>
              <p class="text-sm">The Lack</p>
            </div>
          </div>
        </div>
        
        <div class="relative group overflow-hidden aspect-[3/4]"  >
          <img src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=2070" alt="Ritratto" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 text-white">
              <p class="font-semibold">Ritratto</p>
              <p class="text-sm">Professionale</p>
            </div>
          </div>
        </div>
        
        <div class="relative group overflow-hidden aspect-[3/4]"  >
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2070" alt="Performance" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 text-white">
              <p class="font-semibold">Performance</p>
              <p class="text-sm">Live Show</p>
            </div>
          </div>
        </div>
        
        <div class="relative group overflow-hidden aspect-[3/4] md:col-span-2 md:row-span-2"  >
          <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070" alt="Stage" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 text-white">
              <p class="font-semibold">Palcoscenico</p>
              <p class="text-sm">Alta Luce Teatro</p>
            </div>
          </div>
        </div>
        
        <div class="relative group overflow-hidden aspect-[3/4]"  >
          <img src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=2070" alt="Backstage" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 text-white">
              <p class="font-semibold">Backstage</p>
              <p class="text-sm">Dietro le quinte</p>
            </div>
          </div>
        </div>
        
        <div class="relative group overflow-hidden aspect-[3/4]"  >
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070" alt="Workshop" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 text-white">
              <p class="font-semibold">Formazione</p>
              <p class="text-sm">Workshop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Spettacoli Attuali with Background -->
  <div class="relative py-20 overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2071" 
        alt="Theater lights" 
        class="w-full h-full object-cover grayscale"
      />
      <div class="absolute inset-0 bg-black/80"></div>
    </div>
    
    <div class="relative z-10 container mx-auto px-0 md:px-4">
      <div class="text-center mb-16 px-4 md:px-0">
        <h2 class="text-white text-4xl lg:text-5xl font-bold mb-6" >
          Spettacoli Attuali 2024-2025
        </h2>
        <p class="text-white/80 text-xl"  >
          In scena con Alta Luce Teatro Milano
        </p>
      </div>
      
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-0">
        <!-- Inseparabili -->
        <div class="bg-white/5 backdrop-blur-sm p-6"  >
          <h3 class="text-white text-2xl font-bold mb-3">INSEPARABILI</h3>
          <p class="text-white/80 mb-4">
            <strong>Regia, scrittura e adattamento:</strong> Arturo di Tullio<br>
            <strong>Con:</strong> Arturo di Tullio, Cinzia Brugnola, Riccardo Quintavalle
          </p>
          <Badge variant="secondary" size="sm">Comico, struggente, borgogna</Badge>
        </div>

        <!-- Clichè -->
        <div class="bg-white/5 backdrop-blur-sm p-6"  >
          <h3 class="text-white text-2xl font-bold mb-3">CLICHÈ</h3>
          <p class="text-white/80 mb-4">
            <strong>Scritto e diretto da:</strong> Silvia Beillard<br>
            <strong>Musiche originali:</strong> Fabrizio Rabbolini
          </p>
          <Badge variant="secondary" size="sm">Stereotipi femminili con ironia</Badge>
        </div>

        <!-- Svamp Tutorial -->
        <div class="bg-white/5 backdrop-blur-sm p-6"  >
          <h3 class="text-white text-2xl font-bold mb-3">SVAMP TUTORIAL</h3>
          <p class="text-white/80 mb-4">
            <strong>Di:</strong> Isabella Rotti<br>
            Nato dal successo su YouTube di Svamp Channel
          </p>
          <Badge variant="secondary" size="sm">Digital Performance</Badge>
        </div>

        <!-- Di Morte e Altre Idiozie -->
        <div class="bg-white/5 backdrop-blur-sm p-6"  >
          <h3 class="text-white text-2xl font-bold mb-3">DI MORTE E ALTRE IDIOZIE</h3>
          <p class="text-white/80 mb-4">
            <strong>Scritto e diretto da:</strong> Silvia Beillard<br>
            <strong>Con:</strong> Elizabeth Annable e Cinzia Brugnola
          </p>
          <Badge variant="secondary" size="sm">Teatro Contemporaneo</Badge>
        </div>
      </div>
    </div>
  </div>

  <!-- Teatro, Cinema e TV with Image Backgrounds -->
  <div class="relative py-20">
    <div class="container mx-auto px-0 md:px-4">
      <div class="max-w-6xl mx-auto px-4 md:px-0">
        <div class="text-center mb-16">
          <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6" >
            Teatro, Cinema e Televisione
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 gap-4 md:gap-8">
          <!-- Teatro -->
          <div class="relative overflow-hidden group"  >
            <div class="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069" alt="Teatro" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50"></div>
            </div>
            <div class="relative z-10 p-8">
              <div class="w-16 h-16 bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Theater class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-white text-xl font-semibold mb-4 text-center">Teatro</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="text-white font-medium">Compagnia Ricci/Forte</h4>
                  <p class="text-white/80 text-sm">Spettacolo "Imitationofdeath" con tournée internazionale (Piccolo Teatro di Milano, Mc93 di Parigi)</p>
                </div>
                <div>
                  <h4 class="text-white font-medium">Compagnia Duchessa Rossa</h4>
                  <p class="text-white/80 text-sm">Fondatrice e autrice di "Due di Voi" e "Sogni Liquidi"</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Cinema -->
          <div class="relative overflow-hidden group"  >
            <div class="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070" alt="Cinema" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50"></div>
            </div>
            <div class="relative z-10 p-8">
              <div class="w-16 h-16 bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Camera class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-white text-xl font-semibold mb-4 text-center">Cinema</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="text-white font-medium">"The Lack" (2014)</h4>
                  <p class="text-white/80 text-sm">Film dei Masbedo, co-protagonista</p>
                  <Badge variant="secondary" size="sm">Co-protagonista</Badge>
                </div>
              </div>
            </div>
          </div>

          <!-- TV -->
          <div class="relative overflow-hidden group"  >
            <div class="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070" alt="TV Studio" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50"></div>
            </div>
            <div class="relative z-10 p-8">
              <div class="w-16 h-16 bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Play class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-white text-xl font-semibold mb-4 text-center">Televisione</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="text-white font-medium">Amore Criminale</h4>
                  <p class="text-white/80 text-sm">Protagonista della docu-fiction (più volte)</p>
                  <Badge variant="secondary" size="sm">Protagonista</Badge>
                </div>
                <div>
                  <h4 class="text-white font-medium">Pubblicità</h4>
                  <p class="text-white/80 text-sm">eBay, IKEA, Dalani, Carrefour, Piadineria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Video Showreel Section -->
  <div class="relative py-20 bg-black">
    <div class="container mx-auto px-0 md:px-4">
      <div class="text-center mb-12">
        <h2 class="text-white text-4xl lg:text-5xl font-bold mb-6" >
          Showreel
        </h2>
        <p class="text-white/80 text-xl"  >
          Una selezione dei miei lavori più significativi
        </p>
      </div>
      
      <!-- Video Player Mock -->
      <div class="max-w-4xl mx-auto px-4 md:px-0">
        <div class="relative aspect-video bg-gray-900 overflow-hidden group cursor-pointer"  >
          <img 
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070" 
            alt="Showreel thumbnail" 
            class="w-full h-full object-cover grayscale"
          />
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div class="w-20 h-20 bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play class="w-10 h-10 text-gray-900 ml-1" />
            </div>
          </div>
          <div class="absolute bottom-4 left-4 text-white">
            <p class="text-lg font-semibold">Cinzia Brugnola - Showreel 2024</p>
            <p class="text-sm text-white/80">Durata: 3:45</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Progetti Digitali e Formazione with Background -->
  <div class="relative py-20 overflow-hidden">
    <!-- Background with Parallax -->
    <div class="absolute inset-0 z-0" style="transform: translateY({scrollY * 0.2}px)">
      <img 
        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070" 
        alt="Digital projects background" 
        class="w-full h-full object-cover opacity-5 grayscale"
      />
    </div>
    
    <div class="relative z-10 container mx-auto px-0 md:px-4">
      <div class="max-w-5xl mx-auto px-4 md:px-0">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Progetti Digitali -->
          <div >
            <h3 class="{currentTheme.text.primary} text-2xl font-semibold mb-6">Progetti Digitali</h3>
            <div class="space-y-6">
              <div>
                <h4 class="{currentTheme.text.primary} font-medium mb-2">Svamp Channel (YouTube)</h4>
                <p class="{currentTheme.text.secondary} text-sm mb-3">Contenitore di personaggi comici ideati con Isabella Rotti</p>
                <Badge variant="secondary" size="sm">YouTube</Badge>
              </div>
              <div>
                <h4 class="{currentTheme.text.primary} font-medium mb-2">Web serie A.Q.A.</h4>
                <p class="{currentTheme.text.secondary} text-sm mb-3">(Attori Quarantenati Anonimi) - Durante il lockdown</p>
                <Badge variant="secondary" size="sm">Web Serie</Badge>
              </div>
            </div>
          </div>

          <!-- Formazione -->
          <div >
            <h3 class="{currentTheme.text.primary} text-2xl font-semibold mb-6">Formazione e Docenza</h3>
            <div class="space-y-6">
              <div>
                <h4 class="{currentTheme.text.primary} font-medium mb-2">Docenze</h4>
                <p class="{currentTheme.text.secondary} text-sm mb-3">Docente stabile presso Pantagruele Teatro e Incantattori di Milano</p>
              </div>
              <div>
                <h4 class="{currentTheme.text.primary} font-medium mb-2">Cobalto27</h4>
                <p class="{currentTheme.text.secondary} text-sm mb-3">Co-fondatrice del gruppo (eventi, formazione, intrattenimento)</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge variant="secondary" size="sm">Danza giapponese</Badge>
                <Badge variant="secondary" size="sm">Danza acrobatica</Badge>
                <Badge variant="secondary" size="sm">Tastiera</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Contatti Professionali with Background -->
  <div class="relative py-20 overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070" 
        alt="Contact background" 
        class="w-full h-full object-cover grayscale"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95"></div>
    </div>
    
    <div class="relative z-10">
      <div class="container mx-auto px-0 md:px-4">
        <div class="text-center mb-16 px-4 md:px-0">
          <h2 class="text-white text-4xl lg:text-5xl font-bold mb-6" >
            Contatti Professionali
          </h2>
          <p class="text-white/80 text-xl"  >
            Per collaborazioni e progetti artistici
          </p>
        </div>

        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-0">
          <!-- Agenzia -->
          <div class="bg-white/5 backdrop-blur-sm p-8"  >
            <h3 class="text-white text-2xl font-semibold mb-6">Agenzia di Rappresentanza</h3>
            <div class="space-y-4">
              <h4 class="text-white text-xl font-bold">Clan Group S.r.l.</h4>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <div class="w-5 h-5 bg-white/20 flex items-center justify-center mt-1">
                    <div class="w-2 h-2 bg-white"></div>
                  </div>
                  <div>
                    <p class="text-white/80">Via Faà di Bruno 12A</p>
                    <p class="text-white/80">20137 Milano</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <Phone class="w-5 h-5 text-white/60" />
                  <span class="text-white/80">+39 02 48519551</span>
                </div>
                <div class="flex items-center gap-3">
                  <Mail class="w-5 h-5 text-white/60" />
                  <span class="text-white/80">clan@clangroup.it</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-white/5 backdrop-blur-sm p-8"  >
            <h3 class="text-white text-2xl font-semibold mb-6">Social Media e Digital</h3>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                  <Star class="w-5 h-5 text-white/60" />
                  <span class="text-white/80">Svamp Channel</span>
                </div>
                <div class="flex items-center gap-3">
                  <Camera class="w-5 h-5 text-white/60" />
                  <span class="text-white/80">LinkedIn</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-16 max-w-3xl mx-auto px-4 md:px-0"  >
          <h3 class="text-white text-3xl font-bold mb-6">
            Disponibile per Nuovi Progetti
          </h3>
          <p class="text-white/80 text-lg mb-8 leading-relaxed italic">
            "Finalmente ho fatto pace con la me stessa scema e ne ho sfruttato le sue potenzialità"
          </p>
          
          <div class="flex gap-4 justify-center flex-wrap"  >
            <Button size="lg" class="bg-white text-gray-900 hover:bg-gray-100">
              <Mail class="w-5 h-5" />
              Contatta Agenzia
            </Button>
            <Button size="lg" variant="outline" class="text-white border-white hover:bg-white hover:text-gray-900">
              <Star class="w-5 h-5" />
              Vedi Showreel
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12 mt-20" >
    <div class="container mx-auto px-0 md:px-4">
      <div class="max-w-6xl mx-auto px-4 md:px-0">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- About -->
          <div class="md:col-span-2"  >
            <h3 class="text-2xl font-bold mb-4">Cinzia Brugnola</h3>
            <p class="text-gray-400 mb-4">
              Attrice professionista con oltre 20 anni di esperienza in teatro, cinema e televisione. 
              Fondatrice della Compagnia Duchessa Rossa.
            </p>
            <div class="flex gap-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Mail class="w-6 h-6" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Phone class="w-6 h-6" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div  >
            <h4 class="text-lg font-semibold mb-4">Link Rapidi</h4>
            <ul class="space-y-2">
              <li><a href="#biografia" class="text-gray-400 hover:text-white transition-colors">Biografia</a></li>
              <li><a href="#spettacoli" class="text-gray-400 hover:text-white transition-colors">Spettacoli</a></li>
              <li><a href="#progetti" class="text-gray-400 hover:text-white transition-colors">Progetti</a></li>
              <li><a href="#contatti" class="text-gray-400 hover:text-white transition-colors">Contatti</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div  >
            <h4 class="text-lg font-semibold mb-4">Agenzia</h4>
            <div class="space-y-2 text-gray-400">
              <p class="font-semibold text-white">Clan Group S.r.l.</p>
              <p>Via Faà di Bruno 12A</p>
              <p>20137 Milano</p>
              <p>+39 02 48519551</p>
              <p>clan@clangroup.it</p>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"  >
          <p>&copy; 2024 Cinzia Brugnola. Tutti i diritti riservati.</p>
        </div>
      </div>
    </div>
  </footer>
</div>