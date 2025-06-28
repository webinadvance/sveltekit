<script>
  // Export all props that this component expects from database
  export let title = "Home Placeholder";
  export let subtitle = "";
  export let content = "";
  export let background_color = "bg-white";
</script>

<div class="home-component {background_color} py-16">
  <div class="container mx-auto px-4 text-center">
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
    
    <div class="mt-12 p-8 bg-green-100 rounded-lg">
      <h3 class="text-xl font-semibold text-green-800 mb-4">
        🏠 Home Placeholder Component
      </h3>
      <p class="text-green-700">
        This is a database-driven home component. All content comes from the CMS database.
      </p>
      <div class="mt-4 text-sm text-green-600">
        <p><strong>Component:</strong> HomeComponent.svelte</p>
        <p><strong>Data Source:</strong> Database component_data</p>
        <p><strong>Reusable:</strong> Yes, can be used on any page</p>
      </div>
    </div>
  </div>
</div>

<style>
  .home-component {
    min-height: 60vh;
    display: flex;
    align-items: center;
  }
</style>