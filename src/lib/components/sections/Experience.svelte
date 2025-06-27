<script>
  import { Badge } from '$lib/components/ui';
  import { currentTheme } from '$lib/styles/themes.js';
  
  export let title = '';
  export let subtitle = '';
  export let experiences = [];
  
  // experiences structure:
  // experiences = [
  //   {
  //     id: 'theater',
  //     title: 'Teatro',
  //     icon: TheaterIcon,
  //     backgroundImage: '...',
  //     projects: [
  //       {
  //         title: 'Project Name',
  //         company: 'Company Name',
  //         description: 'Description',
  //         role: 'Role',
  //         badges: ['Tag1', 'Tag2']
  //       }
  //     ]
  //   }
  // ]
</script>

<div class="relative py-20">
  <div class="container mx-auto px-0 md:px-4">
    <div class="max-w-6xl mx-auto px-4 md:px-0">
      <div class="text-center mb-16">
        <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6">
          {title}
        </h2>
        {#if subtitle}
          <p class="{currentTheme.text.secondary} text-xl">
            {subtitle}
          </p>
        {/if}
      </div>
      
      <div class="grid md:grid-cols-3 gap-4 md:gap-8">
        {#each experiences as experience}
          <div class="relative overflow-hidden group">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
              <img 
                src={experience.backgroundImage} 
                alt={experience.title}
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50"></div>
            </div>
            
            <div class="relative z-10 p-8">
              <!-- Icon -->
              <div class="w-16 h-16 bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <svelte:component this={experience.icon} class="w-8 h-8 text-white" />
              </div>
              
              <h3 class="text-white text-xl font-semibold mb-4 text-center">{experience.title}</h3>
              
              <div class="space-y-4">
                {#each experience.projects as project}
                  <div>
                    <h4 class="text-white font-medium">{project.title}</h4>
                    {#if project.company}
                      <p class="text-white/80 text-sm mb-2">{project.company}</p>
                    {/if}
                    <p class="text-white/80 text-sm">{project.description}</p>
                    
                    {#if project.badges && project.badges.length > 0}
                      <div class="mt-2 flex flex-wrap gap-1">
                        {#each project.badges as badge}
                          <Badge variant="secondary" size="sm">{badge}</Badge>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>