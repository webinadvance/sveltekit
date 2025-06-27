<script>
  import { currentTheme } from '$lib/styles/themes.js';
  
  export let title = '';
  export let subtitle = '';
  export let categories = [];
  export let backgroundColor = '';
  
  // Default categories structure:
  // categories = [
  //   {
  //     id: 'theater',
  //     title: 'Teatro',
  //     icon: TheaterIcon,
  //     images: [
  //       { url: '...', alt: '...', title: '...' }
  //     ]
  //   }
  // ]
</script>

<div class="relative py-20 {backgroundColor}">
  <div class="container mx-auto px-0 md:px-4">
    <div class="text-center mb-16 px-4 md:px-0">
      <h2 class="{currentTheme.text.primary} text-4xl lg:text-5xl font-bold mb-6">
        {title}
      </h2>
      {#if subtitle}
        <p class="{currentTheme.text.secondary} text-xl">
          {subtitle}
        </p>
      {/if}
    </div>

    {#each categories as category}
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-8 px-4 md:px-0">
          <svelte:component this={category.icon} class="w-8 h-8 accent" />
          <h3 class="{currentTheme.text.primary} text-3xl font-bold">{category.title}</h3>
        </div>
        
        <div class="overflow-x-auto pb-6">
          <div class="flex gap-6 px-4 md:px-0" style="width: max-content;">
            {#each category.images as image}
              <div class="w-80 {category.aspectRatio || 'h-52'} bg-white border border-gray-200 overflow-hidden group cursor-pointer flex-shrink-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                {#if image.title}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p class="text-white font-medium">{image.title}</p>
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