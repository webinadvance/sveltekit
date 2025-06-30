<script>
  import { isEditMode } from '$lib/stores/editMode.js';
  
  // Export all props that this component expects from database
  export let title = "Home Placeholder";
  export let subtitle = "";
  export let content = "";
  export let header_image = "";
  export let background_color = "bg-white";
  
  // Gallery state
  let images = [];
  let fileInput;
  let isUploading = false;
  
  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    isUploading = true;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        images = [...images, {
          url: data.url,
          alt: file.name
        }];
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      isUploading = false;
      fileInput.value = '';
    }
  }
  
  function removeImage(index) {
    images = images.filter((_, i) => i !== index);
  }
</script>

<div class="home-component {background_color} py-16">
  <div class="container mx-auto px-4 text-center">
    {#if header_image}
      <div class="header-image-wrapper mb-8">
        <img 
          src={header_image} 
          alt={title}
          class="header-image mx-auto rounded-lg shadow-lg"
        />
      </div>
    {/if}
    
    <h1 class="text-5xl font-bold text-gray-900 mb-6">
      {title}
    </h1>
    
    {#if subtitle}
      <h2 class="text-2xl text-gray-600 mb-8">
        {subtitle}
      </h2>
    {/if}
    
    {#if content}
      <div class="text-lg text-gray-700 max-w-4xl mx-auto">
        {@html content}
      </div>
    {/if}
    
    <!-- Simple Gallery Section -->
    <div class="mt-16 gallery-section">
      <h2 class="text-4xl font-bold text-white mb-4">My Portfolio</h2>
      <p class="text-2xl text-pink-300 mb-12">A collection of my theatrical performances</p>
      
      {#if $isEditMode}
        <div class="mb-8">
          <input 
            type="file" 
            accept="image/*" 
            on:change={handleImageUpload}
            bind:this={fileInput}
            class="hidden"
            id="gallery-upload"
          />
          <label 
            for="gallery-upload"
            class="inline-flex items-center px-6 py-3 bg-pink-500/20 backdrop-blur-lg border border-pink-500/50 rounded-lg cursor-pointer hover:bg-pink-500/30 transition-all duration-300 text-pink-100"
          >
            {#if isUploading}
              <span class="mr-2">⏳</span> Uploading...
            {:else}
              <span class="mr-2">📸</span> Upload Image
            {/if}
          </label>
        </div>
      {/if}
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each images as image, index}
          <div class="gallery-item relative group">
            <div class="overflow-hidden rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 aspect-square">
              <img 
                src={image.url} 
                alt={image.alt}
                class="w-full h-full object-cover"
              />
              
              {#if $isEditMode}
                <button 
                  on:click={() => removeImage(index)}
                  class="absolute top-2 right-2 w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 text-white"
                >
                  ✕
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      
      {#if images.length === 0}
        <div class="text-center py-12 text-gray-400">
          <p class="text-lg mb-2">No images in gallery yet</p>
          {#if $isEditMode}
            <p class="text-sm">Click "Upload Image" above to add your first image</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .home-component {
    min-height: 60vh;
    display: flex;
    align-items: center;
  }
  
  .header-image {
    max-width: 400px;
    max-height: 300px;
    object-fit: cover;
    border-radius: 12px;
  }
  
  .header-image-wrapper {
    animation: fadeInUp 0.8s ease-out;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>