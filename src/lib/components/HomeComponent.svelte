<script>
  import { isEditMode } from '$lib/stores/editMode.js';
  
  // Export all props that this component expects from database
  export let title = "Home Placeholder";
  export let subtitle = "";
  export let content = "";
  export let header_image = "";
  export let background_color = "bg-white";
  
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