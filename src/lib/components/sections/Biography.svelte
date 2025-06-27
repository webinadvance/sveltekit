<script>
  import { currentTheme } from '$lib/styles/themes.js';
  import { Award } from 'lucide-svelte';
  
  export let title = '';
  export let subtitle = '';
  export let backgroundImage = '';
  export let parallaxOffset = 0.3;
  export let content = [];
  export let awards = [];
  export let personalInfo = {};
  export let skills = {};
  
  let scrollY = 0;
</script>

<svelte:window bind:scrollY />

<div class="relative py-20 overflow-hidden">
  <!-- Background Image with Parallax -->
  {#if backgroundImage}
    <div class="absolute inset-0 z-0" style="transform: translateY({scrollY * parallaxOffset}px)">
      <img 
        src={backgroundImage}
        alt="Background" 
        class="w-full h-full object-cover opacity-10 grayscale"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95"></div>
    </div>
  {/if}
  
  <div class="relative z-10 container mx-auto px-0 md:px-4">
    <div class="max-w-4xl mx-auto px-4 md:px-0">
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
      
      <div class="mb-12">
        {#each content as paragraph}
          <p class="{currentTheme.text.secondary} text-lg leading-relaxed mb-6">
            {@html paragraph}
          </p>
        {/each}
        
        {#if awards.length > 0}
          {#each awards as award}
            <div class="mb-6">
              <div class="flex items-center mb-3">
                <Award class="w-6 h-6 accent mr-3" />
                <h4 class="{currentTheme.text.primary} font-semibold">{award.title}</h4>
              </div>
              <p class="{currentTheme.text.secondary}">
                {@html award.description}
              </p>
            </div>
          {/each}
        {/if}
      </div>
      
      <!-- Personal Info and Skills Grid -->
      {#if Object.keys(personalInfo).length > 0 || Object.keys(skills).length > 0}
        <div class="grid md:grid-cols-2 gap-8">
          {#if Object.keys(personalInfo).length > 0}
            <div>
              <h3 class="{currentTheme.text.primary} text-xl font-semibold mb-4">
                {personalInfo.title || 'Informazioni Personali'}
              </h3>
              <div class="space-y-3">
                {#each Object.entries(personalInfo.data || {}) as [key, value]}
                  <div class="flex justify-between">
                    <span class="{currentTheme.text.secondary}">{key}:</span>
                    <span class="{currentTheme.text.primary} font-medium">{value}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          
          {#if Object.keys(skills).length > 0}
            <div>
              <h3 class="{currentTheme.text.primary} text-xl font-semibold mb-4">
                {skills.title || 'Competenze'}
              </h3>
              <div class="space-y-3">
                {#each Object.entries(skills.data || {}) as [key, value]}
                  <div class="flex items-center justify-between">
                    <span class="{currentTheme.text.secondary}">{key}</span>
                    {#if typeof value === 'string'}
                      <span class="{currentTheme.text.primary} font-medium">{value}</span>
                    {:else}
                      <div class="flex flex-wrap gap-2">
                        {#each value as skill}
                          <span class="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">{skill}</span>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>