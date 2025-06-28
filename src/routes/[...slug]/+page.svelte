<script>
  import ComponentLoader from '$lib/components/ComponentLoader.svelte';
  
  export let data;
  
  $: page = data.page;
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="description" content={data.description} />
  {#if page?.meta_keywords}
    <meta name="keywords" content={page.meta_keywords} />
  {/if}
  {#if page?.og_image}
    <meta property="og:image" content={page.og_image} />
  {/if}
</svelte:head>

<main class="min-h-screen">
  {#if page}
    <div class="dynamic-page">
      <h1 class="text-4xl font-bold text-gray-900 mb-6 text-center py-12">
        {page.title}
      </h1>
      
      {#if page.components && page.components.length > 0}
        <div class="components-container">
          {#each page.components as component (component.id)}
            <div class="component-wrapper" data-component="{component.component_name}">
              <ComponentLoader 
                componentName={component.component_name} 
                componentData={component.component_data} 
              />
            </div>
          {/each}
        </div>
      {:else}
        <div class="no-components text-center py-12">
          <p class="text-gray-600">
            This page has no components yet. Add some components from the admin panel.
          </p>
        </div>
      {/if}
    </div>
  {:else}
    <div class="error-state text-center py-12">
      <h1 class="text-2xl font-bold text-red-600 mb-4">Page Not Found</h1>
      <p class="text-gray-600">The requested page could not be found.</p>
    </div>
  {/if}
</main>

<style>
  .dynamic-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .component-wrapper {
    width: 100%;
  }
  
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>