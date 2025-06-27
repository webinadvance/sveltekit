<script>
  export let title = 'Progetti Digitali e Formazione';
  export let backgroundImage = '';
  export let scrollY = 0;
  export let sections = [];
</script>

<!-- Digital Projects and Training Section -->
<div class="relative py-20 overflow-hidden">
  <!-- Background with Parallax -->
  {#if backgroundImage}
    <div class="absolute inset-0 z-0" style="transform: translateY({scrollY * 0.2}px)">
      <img 
        src={backgroundImage} 
        alt="Digital projects background" 
        class="w-full h-full object-cover opacity-5 grayscale"
      />
    </div>
  {/if}
  
  <div class="relative z-10 container mx-auto px-0 md:px-4">
    <div class="max-w-5xl mx-auto px-4 md:px-0">
      <div class="grid md:grid-cols-2 gap-12">
        {#each sections as section}
          <div>
            <h3 class="text-gray-900 text-2xl font-semibold mb-6">{section.title}</h3>
            <div class="space-y-6">
              {#each section.items as item}
                <div>
                  <h4 class="text-gray-900 font-medium mb-2">{item.title}</h4>
                  <p class="text-gray-700 text-sm mb-3">{item.description}</p>
                  {#if item.badge}
                    <span class="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">{item.badge}</span>
                  {/if}
                </div>
              {/each}
              {#if section.skills}
                <div class="flex flex-wrap gap-2">
                  {#each section.skills as skill}
                    <span class="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">{skill}</span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>