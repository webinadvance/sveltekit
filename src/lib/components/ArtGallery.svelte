<script>
  import { activeTheme } from '$lib/styles/themes.js';
  import EditableWrapper from './EditableWrapper.svelte';
  import { isEditMode, editingComponentId } from '$lib/stores/editMode.js';
  
  // Gallery props
  export let title = 'Gallery';
  export let subtitle = '';
  export let images = [];
  export let layout = 'grid'; // grid, masonry, carousel
  export let columns = 3;
  export let spacing = 'medium'; // small, medium, large
  export let showCaptions = true;
  export let enableLightbox = true;
  
  // For editor mode
  export let componentName = 'art_gallery';
  export let componentId = null;
  
  // Check if we're in edit mode for this specific component
  $: isEditing = $isEditMode && $editingComponentId === componentId;
  
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
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      isUploading = false;
    }
  }
  
  function removeImage(index) {
    images = images.filter((_, i) => i !== index);
  }
  
  function openLightbox(image) {
    if (enableLightbox) {
      selectedImage = image;
    }
  }
  
  function closeLightbox() {
    selectedImage = null;
  }
  
  // Calculate grid columns based on prop
  $: gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  
  // Calculate spacing
  $: gapClass = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6'
  }[spacing] || 'gap-4';
</script>

<EditableWrapper {componentName} {componentId} componentData={{title, subtitle, images, layout, columns, spacing, showCaptions, enableLightbox}}>
  <section class="gallery-section py-16 px-4" style="
    --primary-color: {activeTheme.primary};
    --title-font-family: {activeTheme.typography.title.fontFamily};
    --subtitle-font-family: {activeTheme.typography.subtitle.fontFamily};
    --subtitle-font-weight: {activeTheme.typography.subtitle.fontWeight};
    --subtitle-font-style: {activeTheme.typography.subtitle.fontStyle};
    --neon-glow-medium: {activeTheme.neon.glow.medium};
  ">
    <div class="max-w-7xl mx-auto">
      {#if title}
        <h2 class="gallery-title text-4xl font-bold text-center mb-4 text-white">{title}</h2>
      {/if}
      
      {#if subtitle}
        <p class="gallery-subtitle text-2xl text-center mb-12 text-pink-300">{subtitle}</p>
      {/if}
      
      <!-- Upload button shows when editing this gallery -->
      {#if isEditing || ($isEditMode && componentId)}
        <div class="mb-8 text-center">
          <input 
            type="file" 
            accept="image/*" 
            on:change={handleImageUpload}
            bind:this={fileInput}
            class="hidden"
            id="gallery-upload-{componentId}"
          />
          <label 
            for="gallery-upload-{componentId}"
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
      <div class="grid {gridCols} {gapClass}">
        {#each images as image, index}
          <div class="gallery-item relative group">
            <div class="overflow-hidden rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
              <img 
                src={image.url || image} 
                alt={image.alt || `Gallery image ${index + 1}`}
                class="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                on:click={() => openLightbox(image)}
              />
              
              {#if showCaptions && image.caption}
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p class="text-white text-sm">{image.caption}</p>
                </div>
              {/if}
              
              {#if isEditing || ($isEditMode && componentId)}
                <button 
                  on:click|stopPropagation={() => removeImage(index)}
                  class="absolute top-2 right-2 w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
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
          {#if isEditing || ($isEditMode && componentId)}
            <p class="text-sm">Click "Upload Image" above to add your first image</p>
          {/if}
        </div>
      {/if}
    </div>
    
    <!-- Lightbox -->
    {#if selectedImage && enableLightbox}
      <div 
        class="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        on:click={closeLightbox}
      >
        <button 
          class="absolute top-4 right-4 text-white text-4xl hover:text-pink-400 transition-colors"
          on:click={closeLightbox}
        >
          ✕
        </button>
        
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
    {/if}
  </section>
</EditableWrapper>

<style>
  .gallery-title {
    font-family: var(--title-font-family);
    text-shadow: var(--neon-glow-medium);
  }
  
  .gallery-subtitle {
    font-family: var(--subtitle-font-family);
    font-weight: var(--subtitle-font-weight);
    font-style: var(--subtitle-font-style);
  }
  
  .gallery-item {
    aspect-ratio: 1;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin {
    display: inline-block;
    animation: spin 1s linear infinite;
  }
</style>