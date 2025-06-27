<script>
  import { Button, Card, Badge } from '$lib/components/ui';
  import { getAppBackground, currentTheme } from '$lib/styles/themes.js';
  import { ArrowRight, Star, Camera, Heart, Award, Mail, Phone, Instagram } from 'lucide-svelte';
  
  $: appBackground = getAppBackground();
</script>

<!-- Professional Actress Portfolio -->
<div class="min-h-screen {appBackground}">

  <!-- Hero Section -->
  <div class="container mx-auto px-4 py-20 lg:py-32">
    <div class="text-center max-w-5xl mx-auto">
      <div class="flex gap-3 justify-center mb-8 flex-wrap">
        <Badge>Attrice Professionista</Badge>
        <Badge variant="info">Milano, Italia</Badge>
        <Badge variant="success">Disponibile</Badge>
      </div>
      
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 {currentTheme.text.primary}">
        Cinzia Brugnola
      </h1>
      
      <p class="{currentTheme.text.primary} text-2xl lg:text-3xl mb-8 font-medium">
        Attrice • Performer • Formatrice
      </p>
      
      <p class="{currentTheme.text.secondary} text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto">
        Friulana d'origine e milanese d'adozione, attiva in teatro, cinema e televisione. 
        Diplomata S.A.T. Teatranza, fondatrice Compagnia Duchessa Rossa.
      </p>
      
      <div class="flex gap-4 justify-center flex-wrap">
        <Button size="lg">
          <Star class="w-5 h-5" />
          Portfolio
        </Button>
        <Button size="lg" variant="outline">
          <Mail class="w-5 h-5" />
          Contatti
        </Button>
      </div>
    </div>
  </div>

  <!-- Biografia Section -->
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6">
          Biografia Professionale
        </h2>
        <p class="{currentTheme.text.secondary} text-xl">
          Un percorso artistico tra teatro, cinema e formazione
        </p>
      </div>
      
      <Card class="mb-12">
        <p class="{currentTheme.text.secondary} text-lg leading-relaxed mb-6">
          Cinzia Brugnola è un'attrice, performer e formatrice attiva in teatro, cinema e televisione. 
          Friulana d'origine e milanese d'adozione, si è diplomata presso la <strong>Scuola professionale S.A.T. di Teatranza</strong> 
          di Torino ed è entrata subito a far parte del cast artistico della Compagnia Santibriganti.
        </p>
        
        <p class="{currentTheme.text.secondary} text-lg leading-relaxed mb-6">
          Ha continuato gli studi presso <strong>Pontedera Teatro</strong> e con maestri della scena nazionale ed internazionale, 
          tra cui <em>Cesar Brie, Gabriele Vacis, Alfonso Santagata, Natalino Balasso, Leo Muscato, Dominique de Fazio</em>.
        </p>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div class="flex items-center mb-3">
            <Award class="w-6 h-6 text-blue-600 mr-3" />
            <h4 class="text-blue-900 font-semibold">Riconoscimento</h4>
          </div>
          <p class="text-blue-800">
            Segnalata dal <strong>Premio Fersen all'Attore Creativo</strong> per il ruolo della Locandiera
          </p>
        </div>
      </Card>
      
      <!-- Caratteristiche -->
      <div class="grid md:grid-cols-2 gap-8">
        <Card>
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
        </Card>
        
        <Card>
          <h3 class="{currentTheme.text.primary} text-xl font-semibold mb-4">Competenze Linguistiche</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="{currentTheme.text.secondary}">Italiano</span>
              <Badge variant="success" size="sm">Madrelingua</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span class="{currentTheme.text.secondary}">Inglese</span>
              <Badge variant="info" size="sm">Fluente</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span class="{currentTheme.text.secondary}">Spagnolo</span>
              <Badge variant="info" size="sm">Fluente</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>

  <!-- Spettacoli Attuali -->
  <div class="container mx-auto px-4 py-20">
    <div class="text-center mb-16">
      <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6">
        Spettacoli Attuali 2024-2025
      </h2>
      <p class="{currentTheme.text.secondary} text-xl">
        In scena con Alta Luce Teatro Milano
      </p>
    </div>
    
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <!-- Inseparabili -->
      <Card hover>
        <div class="mb-6">
          <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-3">INSEPARABILI</h3>
          <p class="{currentTheme.text.secondary} mb-4">
            <strong>Regia, scrittura e adattamento:</strong> Arturo di Tullio<br>
            <strong>Con:</strong> Arturo di Tullio, Cinzia Brugnola, Riccardo Quintavalle
          </p>
          <Badge variant="warning" size="sm">Comico, struggente, borgogna</Badge>
        </div>
      </Card>

      <!-- Cliché -->
      <Card hover>
        <div class="mb-6">
          <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-3">CLICHÈ</h3>
          <p class="{currentTheme.text.secondary} mb-4">
            <strong>Scritto e diretto da:</strong> Silvia Beillard<br>
            <strong>Musiche originali:</strong> Fabrizio Rabbolini
          </p>
          <Badge variant="info" size="sm">Stereotipi femminili con ironia</Badge>
        </div>
      </Card>

      <!-- Svamp Tutorial -->
      <Card hover>
        <div class="mb-6">
          <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-3">SVAMP TUTORIAL</h3>
          <p class="{currentTheme.text.secondary} mb-4">
            <strong>Di:</strong> Isabella Rotti<br>
            Nato dal successo su YouTube di Svamp Channel
          </p>
          <Badge variant="success" size="sm">Digital Performance</Badge>
        </div>
      </Card>

      <!-- Di Morte e Altre Idiozie -->
      <Card hover>
        <div class="mb-6">
          <h3 class="{currentTheme.text.primary} text-2xl font-bold mb-3">DI MORTE E ALTRE IDIOZIE</h3>
          <p class="{currentTheme.text.secondary} mb-4">
            <strong>Scritto e diretto da:</strong> Silvia Beillard<br>
            <strong>Con:</strong> Elizabeth Annable e Cinzia Brugnola
          </p>
          <Badge variant="secondary" size="sm">Teatro Contemporaneo</Badge>
        </div>
      </Card>
    </div>
  </div>

  <!-- Teatro, Cinema e TV -->
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6">
          Teatro, Cinema e Televisione
        </h2>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Teatro -->
        <Card>
          <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Star class="w-8 h-8 text-gray-600" />
          </div>
          <h3 class="{currentTheme.text.primary} text-xl font-semibold mb-4 text-center">Teatro</h3>
          <div class="space-y-4">
            <div>
              <h4 class="{currentTheme.text.primary} font-medium">Compagnia Ricci/Forte</h4>
              <p class="{currentTheme.text.secondary} text-sm">Spettacolo "Imitationofdeath" con tournée internazionale (Piccolo Teatro di Milano, Mc93 di Parigi)</p>
            </div>
            <div>
              <h4 class="{currentTheme.text.primary} font-medium">Compagnia Duchessa Rossa</h4>
              <p class="{currentTheme.text.secondary} text-sm">Fondatrice e autrice di "Due di Voi" e "Sogni Liquidi"</p>
            </div>
          </div>
        </Card>

        <!-- Cinema -->
        <Card>
          <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Camera class="w-8 h-8 text-gray-600" />
          </div>
          <h3 class="{currentTheme.text.primary} text-xl font-semibold mb-4 text-center">Cinema</h3>
          <div class="space-y-4">
            <div>
              <h4 class="{currentTheme.text.primary} font-medium">"The Lack" (2014)</h4>
              <p class="{currentTheme.text.secondary} text-sm">Film dei Masbedo, co-protagonista</p>
              <Badge variant="success" size="sm">Co-protagonista</Badge>
            </div>
          </div>
        </Card>

        <!-- TV -->
        <Card>
          <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart class="w-8 h-8 text-gray-600" />
          </div>
          <h3 class="{currentTheme.text.primary} text-xl font-semibold mb-4 text-center">Televisione</h3>
          <div class="space-y-4">
            <div>
              <h4 class="{currentTheme.text.primary} font-medium">Amore Criminale</h4>
              <p class="{currentTheme.text.secondary} text-sm">Protagonista della docu-fiction (più volte)</p>
              <Badge variant="info" size="sm">Protagonista</Badge>
            </div>
            <div>
              <h4 class="{currentTheme.text.primary} font-medium">Pubblicità</h4>
              <p class="{currentTheme.text.secondary} text-sm">eBay, IKEA, Dalani, Carrefour, Piadineria</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>

  <!-- Progetti Digitali e Formazione -->
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Progetti Digitali -->
        <Card>
          <h3 class="{currentTheme.text.primary} text-2xl font-semibold mb-6">Progetti Digitali</h3>
          <div class="space-y-6">
            <div>
              <h4 class="{currentTheme.text.primary} font-medium mb-2">Svamp Channel (YouTube)</h4>
              <p class="{currentTheme.text.secondary} text-sm mb-3">Contenitore di personaggi comici ideati con Isabella Rotti</p>
              <Badge variant="success" size="sm">YouTube</Badge>
            </div>
            <div>
              <h4 class="{currentTheme.text.primary} font-medium mb-2">Web serie A.Q.A.</h4>
              <p class="{currentTheme.text.secondary} text-sm mb-3">(Attori Quarantenati Anonimi) - Durante il lockdown</p>
              <Badge variant="info" size="sm">Web Serie</Badge>
            </div>
          </div>
        </Card>

        <!-- Formazione -->
        <Card>
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
              <Badge size="sm">Danza giapponese</Badge>
              <Badge size="sm">Danza acrobatica</Badge>
              <Badge size="sm">Tastiera</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>

  <!-- Contatti Professionali -->
  <div class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6">
          Contatti Professionali
        </h2>
        <p class="{currentTheme.text.secondary} text-xl">
          Per collaborazioni e progetti artistici
        </p>
      </div>

      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <!-- Agenzia -->
        <Card>
          <h3 class="{currentTheme.text.primary} text-2xl font-semibold mb-6">Agenzia di Rappresentanza</h3>
          <div class="space-y-4">
            <h4 class="{currentTheme.text.primary} text-xl font-bold">Clan Group S.r.l.</h4>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mt-1">
                  <div class="w-2 h-2 bg-gray-600 rounded"></div>
                </div>
                <div>
                  <p class="{currentTheme.text.secondary}">Via Faà di Bruno 12A</p>
                  <p class="{currentTheme.text.secondary}">20137 Milano</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <Phone class="w-5 h-5 text-gray-600" />
                <span class="{currentTheme.text.secondary}">+39 02 48519551</span>
              </div>
              <div class="flex items-center gap-3">
                <Mail class="w-5 h-5 text-gray-600" />
                <span class="{currentTheme.text.secondary}">clan@clangroup.it</span>
              </div>
            </div>
          </div>
        </Card>

        <!-- Social Media -->
        <Card>
          <h3 class="{currentTheme.text.primary} text-2xl font-semibold mb-6">Social Media e Digital</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3">
                <Instagram class="w-5 h-5 text-gray-600" />
                <span class="{currentTheme.text.secondary}">@cinziabrugnola</span>
              </div>
              <div class="flex items-center gap-3">
                <Star class="w-5 h-5 text-gray-600" />
                <span class="{currentTheme.text.secondary}">Svamp Channel</span>
              </div>
              <div class="flex items-center gap-3">
                <Heart class="w-5 h-5 text-gray-600" />
                <span class="{currentTheme.text.secondary}">@duchessarossa</span>
              </div>
              <div class="flex items-center gap-3">
                <Camera class="w-5 h-5 text-gray-600" />
                <span class="{currentTheme.text.secondary}">LinkedIn</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16">
        <Card class="max-w-3xl mx-auto">
          <h3 class="{currentTheme.text.primary} text-3xl font-bold mb-6">
            Disponibile per Nuovi Progetti
          </h3>
          <p class="{currentTheme.text.secondary} text-lg mb-8 leading-relaxed">
            "Finalmente ho fatto pace con la me stessa scema e ne ho sfruttato le sue potenzialità"
          </p>
          
          <div class="flex gap-4 justify-center flex-wrap">
            <Button size="lg">
              <Mail class="w-5 h-5" />
              Contatta Agenzia
            </Button>
            <Button size="lg" variant="outline">
              <Star class="w-5 h-5" />
              Vedi Showreel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>