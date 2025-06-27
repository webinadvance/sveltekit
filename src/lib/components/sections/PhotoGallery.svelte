<script>
  export let title = 'Portfolio Fotografico';
  export let subtitle = 'Momenti di scena e ritratti professionali';
  export let backgroundColor = 'bg-gray-50';
  export let images = [];
</script>

<!-- Photo Gallery Grid Section -->
<div class="relative py-20 {backgroundColor}">
  <div class="container mx-auto px-0 md:px-4">
    <div class="text-center mb-16">
      <h2 class="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
        {title}
      </h2>
      <p class="text-gray-700 text-xl">
        {subtitle}
      </p>
    </div>
    
    <!-- Image Gallery Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4 mb-20">
      {#each images as image, index}
        <div class="relative group overflow-hidden aspect-[3/4] {image.class || ''}">
          <img 
            src={image.url} 
            alt={image.alt || 'Portfolio image'} 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-4 left-4 text-white">
              <p class="font-semibold">{image.title}</p>
              <p class="text-sm">{image.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>