<script>
  import HomeComponent from './HomeComponent.svelte';
  // Import other components as they are created
  
  export let componentName = '';
  export let componentData = {};
  
  // Component mapping - maps database component names to actual Svelte components
  const componentMap = {
    'home_component': HomeComponent,
    // Add other components here as they are created
    // 'hero': HeroComponent,
    // 'text_block': TextBlockComponent,
    // etc.
  };
  
  $: Component = componentMap[componentName];
</script>

{#if Component}
  <svelte:component this={Component} {...componentData} />
{:else}
  <div class="unknown-component bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    <strong>Unknown Component:</strong> {componentName}
    <pre class="mt-2 text-sm">{JSON.stringify(componentData, null, 2)}</pre>
  </div>
{/if}