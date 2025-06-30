<script>
  import { activeTheme } from '$lib/styles/themes.js';
  import { isEditMode } from '$lib/stores/editMode.js';
  
  // Gallery props
  export let title = '';
  export let images = [];
  export let columns = 3;
  
  // Component identification
  export let componentName = 'editable_gallery';
  export let componentId = null;
  export let pageComponentId = null;
  
  let selectedImage = null;
  let fileInput;
  let isUploading = false;
  
  // Handle image upload
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
          alt: file.name,
          caption: ''
        }];
        
        // Save to database
        await saveToDatabase();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      isUploading = false;
      fileInput.value = '';
    }
  }
  
  async function removeImage(index) {
    images = images.filter((_, i) => i !== index);
    await saveToDatabase();
  }
  
  async function saveToDatabase() {
    if (!pageComponentId) return;
    
    try {
      const response = await fetch('/api/page-components', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pageComponentId,
          component_data: {
            title,
            images,
            columns
          }
        })
      });
      
      if (!response.ok) {
        console.error('Failed to save gallery data');
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  }
  
  function openLightbox(image) {
    selectedImage = image;
  }
  
  function closeLightbox() {
    selectedImage = null;
  }
  
  // Grid columns
  $: gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
</script>

<section class="gallery-section py-4 px-4">
  <div class="max-w-7xl mx-auto">
    
    <!-- Editable Title -->
    {#if $isEditMode}
      <div class="mb-6">
        <input 
          type="text" 
          bind:value={title}
          on:blur={saveToDatabase}
          placeholder="Gallery Title"
          class="w-full text-2xl font-bold text-center bg-transparent border-b-2 border-pink-500/50 text-white placeholder-pink-300/50 focus:outline-none focus:border-pink-400 py-2"
        />
      </div>
    {:else if title}
      <h2 class="text-2xl font-bold text-center mb-6 text-white">{title}</h2>
    {/if}
    
    <!-- Upload button - always visible in edit mode -->
    {#if $isEditMode}
      <div class="mb-8 text-center">
        <input 
          type="file" 
          accept="image/*" 
          on:change={handleImageUpload}
          bind:this={fileInput}
          class="hidden"
          id="gallery-upload-{pageComponentId}"
        />
        <label 
          for="gallery-upload-{pageComponentId}"
          class="inline-flex items-center px-6 py-3 bg-pink-500/20 backdrop-blur-lg border border-pink-500/50 rounded-lg cursor-pointer hover:bg-pink-500/30 transition-all duration-300 text-pink-100"
        >
          {#if isUploading}
            <span class="animate-spin mr-2">⏳</span> Uploading...
          {:else}
            <span class="mr-2">📸</span> Upload Image
          {/if}
        </label>
      </div>
    {/if}
    
    <!-- Gallery Grid -->
    <div class="grid {gridCols} gap-4">
      {#each images as image, index}
        <div class="gallery-item relative group">
          <div class="overflow-hidden rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 aspect-square">
            <img 
              src={image.url || image} 
              alt={image.alt || `Gallery image ${index + 1}`}
              class="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
              on:click={() => openLightbox(image)}
            />
            
            {#if image.caption}
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p class="text-white text-sm">{image.caption}</p>
              </div>
            {/if}
            
            {#if $isEditMode}
              <button 
                on:click|stopPropagation={() => removeImage(index)}
                class="absolute top-2 right-2 w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 text-white"
                aria-label="Remove image"
              >
                ✕
              </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>
    
    {#if images.length === 0 && $isEditMode}
      <div class="text-center py-8 text-gray-400">
        <p class="text-sm">Click "Upload Image" above to add images</p>
      </div>
    {/if}
  </div>
  
  <!-- Lightbox -->
  {#if selectedImage}
    <button 
      class="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      on:click={closeLightbox}
      aria-label="Close lightbox"
    >
      <div class="relative max-w-full max-h-full">
        <img 
          src={selectedImage.url || selectedImage} 
          alt={selectedImage.alt || 'Lightbox image'}
          class="max-w-full max-h-full object-contain"
          on:click|stopPropagation
        />
        
        {#if selectedImage.caption}
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <p class="text-white text-center text-lg">{selectedImage.caption}</p>
          </div>
        {/if}
      </div>
      
      <span class="absolute top-4 right-4 text-white text-4xl hover:text-pink-400 transition-colors">
        ✕
      </span>
    </button>
  {/if}
</section>

<style>
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin {
    display: inline-block;
    animation: spin 1s linear infinite;
  }
</style>