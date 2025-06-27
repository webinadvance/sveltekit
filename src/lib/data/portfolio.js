import { Theater, Camera, Heart, Users, Star, Mail, Phone, Play } from 'lucide-svelte';

export const heroData = {
  title: 'Cinzia Brugnola',
  subtitle: '<span class="accent">Attrice</span> • <span class="accent">Performer</span> • <span class="accent">Formatrice</span>',
  description: 'Friulana d\'origine e milanese d\'adozione, attiva in <span class="accent-bold">teatro</span>, <span class="accent-bold">cinema</span> e <span class="accent-bold">televisione</span>. Diplomata <span class="accent-bold">S.A.T. Teatranza</span>, fondatrice <span class="accent-bold">Compagnia Duchessa Rossa</span>.',
  backgroundImage: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2076',
  badges: ['Attrice Professionista', 'Milano, Italia', 'Disponibile'],
  actions: [
    {
      text: 'Portfolio',
      variant: 'primary',
      class: 'bg-white text-gray-900 hover:bg-gray-100'
    },
    {
      text: 'Contatti',
      variant: 'outline',
      class: 'text-white border-white hover:bg-white hover:text-gray-900'
    }
  ]
};

export const biographyData = {
  title: 'Biografia Professionale',
  subtitle: 'Un percorso artistico tra teatro, cinema e formazione',
  backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070',
  content: [
    'Cinzia Brugnola è un\'attrice, performer e formatrice attiva in <span class="accent-bold">teatro</span>, <span class="accent-bold">cinema</span> e <span class="accent-bold">televisione</span>. Friulana d\'origine e milanese d\'adozione, si è diplomata presso la <span class="accent-bold">Scuola professionale S.A.T. di Teatranza</span> di Torino ed è entrata subito a far parte del cast artistico della <span class="accent-bold">Compagnia Santibriganti</span>.',
    'Ha continuato gli studi presso <span class="accent-bold">Pontedera Teatro</span> e con maestri della scena nazionale ed internazionale, tra cui <span class="accent">Cesar Brie</span>, <span class="accent">Gabriele Vacis</span>, <span class="accent">Alfonso Santagata</span>, <span class="accent">Natalino Balasso</span>, <span class="accent">Leo Muscato</span>, <span class="accent">Dominique de Fazio</span>.'
  ],
  awards: [
    {
      title: 'Riconoscimento',
      description: 'Segnalata dal <span class="accent-bold">Premio Fersen all\'Attore Creativo</span> per il ruolo della <span class="accent">Locandiera</span>'
    }
  ],
  personalInfo: {
    title: 'Informazioni Artistiche',
    data: {
      'Altezza': '170 cm',
      'Occhi': 'Verdi',
      'Capelli': 'Rossi',
      'Data di nascita': '14 agosto 1978'
    }
  },
  skills: {
    title: 'Competenze Linguistiche',
    data: {
      'Italiano': 'Madrelingua',
      'Inglese': 'Fluente',
      'Spagnolo': 'Fluente'
    }
  }
};

export const portfolioGalleryData = {
  title: 'Portfolio per Categoria',
  subtitle: 'Collezioni professionali organizzate per settore artistico',
  categories: [
    {
      id: 'theater',
      title: 'Teatro',
      icon: Theater,
      images: [
        { url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800', alt: 'Teatro - Imitationofdeath' },
        { url: 'https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?q=80&w=800', alt: 'Teatro - Compagnia Duchessa Rossa' },
        { url: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800', alt: 'Teatro - Pontedera Teatro' },
        { url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800', alt: 'Teatro - Santibriganti' },
        { url: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=800', alt: 'Teatro - La Locandiera' },
        { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800', alt: 'Teatro - Spettacoli Attuali' }
      ]
    },
    {
      id: 'cinema',
      title: 'Cinema',
      icon: Camera,
      images: [
        { url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800', alt: 'Cinema - The Lack' },
        { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800', alt: 'Cinema - Masbedo' },
        { url: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800', alt: 'Cinema - Set' },
        { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800', alt: 'Cinema - Co-protagonista' },
        { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800', alt: 'Cinema - Behind Scenes' }
      ]
    },
    {
      id: 'portraits',
      title: 'Ritratti Professionali',
      icon: Heart,
      aspectRatio: 'h-80',
      images: [
        { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800', alt: 'Ritratto - Studio' },
        { url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800', alt: 'Ritratto - Professionale' },
        { url: 'https://images.unsplash.com/photo-1494790108755-2616c14b62f1?q=80&w=800', alt: 'Ritratto - Headshot' },
        { url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800', alt: 'Ritratto - Character' },
        { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800', alt: 'Ritratto - Artistico' },
        { url: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800', alt: 'Ritratto - Portfolio' }
      ]
    },
    {
      id: 'backstage',
      title: 'Backstage',
      icon: Users,
      images: [
        { url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=800', alt: 'Backstage - Preparazione' },
        { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800', alt: 'Backstage - Trucco' },
        { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=800', alt: 'Backstage - Costume' },
        { url: 'https://images.unsplash.com/photo-1514475110565-131ba0d94a71?q=80&w=800', alt: 'Backstage - Prove' },
        { url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800', alt: 'Backstage - Team' }
      ]
    }
  ]
};

export const currentShowsData = {
  title: 'Spettacoli Attuali 2024-2025',
  subtitle: 'In scena con Alta Luce Teatro Milano',
  backgroundImage: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2071',
  shows: [
    {
      id: 'inseparabili',
      title: 'INSEPARABILI',
      director: 'Arturo di Tullio',
      cast: ['Arturo di Tullio', 'Cinzia Brugnola', 'Riccardo Quintavalle'],
      genre: 'Comico, struggente, borgogna'
    },
    {
      id: 'cliche',
      title: 'CLICHÈ',
      director: 'Silvia Beillard',
      description: 'Musiche originali: Fabrizio Rabbolini',
      genre: 'Stereotipi femminili con ironia'
    },
    {
      id: 'svamp',
      title: 'SVAMP TUTORIAL',
      director: 'Isabella Rotti',
      description: 'Nato dal successo su YouTube di Svamp Channel',
      genre: 'Digital Performance'
    },
    {
      id: 'morte',
      title: 'DI MORTE E ALTRE IDIOZIE',
      director: 'Silvia Beillard',
      cast: ['Elizabeth Annable', 'Cinzia Brugnola'],
      genre: 'Teatro Contemporaneo'
    }
  ]
};

export const experienceData = {
  title: 'Teatro, Cinema e Televisione',
  experiences: [
    {
      id: 'theater',
      title: 'Teatro',
      icon: Theater,
      backgroundImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069',
      projects: [
        {
          title: 'Compagnia Ricci/Forte',
          description: 'Spettacolo "Imitationofdeath" con tournée internazionale (Piccolo Teatro di Milano, Mc93 di Parigi)'
        },
        {
          title: 'Compagnia Duchessa Rossa',
          description: 'Fondatrice e autrice di "Due di Voi" e "Sogni Liquidi"'
        }
      ]
    },
    {
      id: 'cinema',
      title: 'Cinema',
      icon: Camera,
      backgroundImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070',
      projects: [
        {
          title: '"The Lack" (2014)',
          description: 'Film dei Masbedo, co-protagonista',
          badges: ['Co-protagonista']
        }
      ]
    },
    {
      id: 'tv',
      title: 'Televisione',
      icon: Play,
      backgroundImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070',
      projects: [
        {
          title: 'Amore Criminale',
          description: 'Protagonista della docu-fiction (più volte)',
          badges: ['Protagonista']
        },
        {
          title: 'Pubblicità',
          description: 'eBay, IKEA, Dalani, Carrefour, Piadineria'
        }
      ]
    }
  ]
};

export const showreelData = {
  title: 'Showreel',
  subtitle: 'Una selezione dei miei lavori più significativi',
  video: {
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070',
    title: 'Cinzia Brugnola - Showreel 2024',
    duration: '3:45',
    onClick: () => console.log('Play showreel')
  }
};

export const contactData = {
  title: 'Contatti Professionali',
  subtitle: 'Per collaborazioni e progetti artistici',
  backgroundImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070',
  agency: {
    name: 'Clan Group S.r.l.',
    address: ['Via Faà di Bruno 12A', '20137 Milano'],
    phone: '+39 02 48519551',
    email: 'clan@clangroup.it'
  },
  socialMedia: [
    { name: 'Svamp Channel', icon: Star },
    { name: 'LinkedIn', icon: Camera }
  ],
  callToAction: {
    title: 'Disponibile per Nuovi Progetti',
    buttons: [
      {
        text: 'Contatta Agenzia',
        icon: Mail,
        variant: 'primary',
        class: 'bg-white text-gray-900 hover:bg-gray-100'
      },
      {
        text: 'Vedi Showreel',
        icon: Star,
        variant: 'outline',
        class: 'text-white border-white hover:bg-white hover:text-gray-900'
      }
    ]
  },
  quote: 'Finalmente ho fatto pace con la me stessa scema e ne ho sfruttato le sue potenzialità'
};

export const photoGalleryData = {
  title: 'Portfolio Fotografico',
  subtitle: 'Momenti di scena e ritratti professionali',
  backgroundColor: 'bg-gray-50',
  images: [
    {
      url: 'https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?q=80&w=2070',
      alt: 'Teatro',
      title: 'Teatro',
      description: 'Imitationofdeath'
    },
    {
      url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=2070',
      alt: 'Cinema',
      title: 'Cinema',
      description: 'The Lack'
    },
    {
      url: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=2070',
      alt: 'Ritratto',
      title: 'Ritratto',
      description: 'Professionale'
    },
    {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2070',
      alt: 'Performance',
      title: 'Performance',
      description: 'Live Show'
    },
    {
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070',
      alt: 'Stage',
      title: 'Palcoscenico',
      description: 'Alta Luce Teatro',
      class: 'md:col-span-2 md:row-span-2'
    },
    {
      url: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=2070',
      alt: 'Backstage',
      title: 'Backstage',
      description: 'Dietro le quinte'
    },
    {
      url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070',
      alt: 'Workshop',
      title: 'Formazione',
      description: 'Workshop'
    }
  ]
};

export const digitalProjectsData = {
  title: 'Progetti Digitali e Formazione',
  backgroundImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070',
  sections: [
    {
      title: 'Progetti Digitali',
      items: [
        {
          title: 'Svamp Channel (YouTube)',
          description: 'Contenitore di personaggi comici ideati con Isabella Rotti',
          badge: 'YouTube'
        },
        {
          title: 'Web serie A.Q.A.',
          description: '(Attori Quarantenati Anonimi) - Durante il lockdown',
          badge: 'Web Serie'
        }
      ]
    },
    {
      title: 'Formazione e Docenza',
      items: [
        {
          title: 'Docenze',
          description: 'Docente stabile presso Pantagruele Teatro e Incantattori di Milano'
        },
        {
          title: 'Cobalto27',
          description: 'Co-fondatrice del gruppo (eventi, formazione, intrattenimento)'
        }
      ],
      skills: ['Danza giapponese', 'Danza acrobatica', 'Tastiera']
    }
  ]
};

export const footerData = {
  actorName: 'Cinzia Brugnola',
  description: 'Attrice professionista con oltre 20 anni di esperienza in teatro, cinema e televisione. Fondatrice della Compagnia Duchessa Rossa.',
  quickLinks: [
    { text: 'Biografia', href: '#biografia' },
    { text: 'Spettacoli', href: '#spettacoli' },
    { text: 'Progetti', href: '#progetti' },
    { text: 'Contatti', href: '#contatti' }
  ],
  contactInfo: {
    agency: 'Clan Group S.r.l.',
    address: ['Via Faà di Bruno 12A', '20137 Milano'],
    phone: '+39 02 48519551',
    email: 'clan@clangroup.it'
  },
  socialLinks: [
    { icon: Mail, href: '#', ariaLabel: 'Email' },
    { icon: Phone, href: '#', ariaLabel: 'Phone' }
  ],
  copyright: '© 2024 Cinzia Brugnola. Tutti i diritti riservati.'
};