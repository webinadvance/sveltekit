<script>
  import ComponentLoader from '$lib/components/ComponentLoader.svelte';
  import EditModeToggle from '$lib/components/EditModeToggle.svelte';
  
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

<main>
  {#if page}
    {#if page.components && page.components.length > 0}
      {#each page.components as component (component.id)}
        <ComponentLoader 
          componentName={component.component_name} 
          componentData={component.component_data}
          componentId={`component-${component.id}`}
          pageComponentId={component.id}
        />
      {/each}
    {:else}
      <div class="no-components text-center py-12">
        <p class="text-gray-600">
          This page has no components yet. Add some components from the admin panel.
        </p>
      </div>
    {/if}
  {:else}
    <div class="error-state text-center py-12">
      <h1 class="text-2xl font-bold text-red-600 mb-4">Page Not Found</h1>
      <p class="text-gray-600">The requested page could not be found.</p>
    </div>
  {/if}
</main>

<!-- Floating Edit Mode Toggle -->
<EditModeToggle />

<style>
  main {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>