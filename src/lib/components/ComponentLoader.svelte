<script>
  import HomeComponent from './HomeComponent.svelte';
  import TestComponent from './TestComponent.svelte';
  import Hero from './Hero.svelte';
  import ArtGallery from './ArtGallery.svelte';
  import ArtistBio from './ArtistBio.svelte';
  import ContactSection from './ContactSection.svelte';
  import ContentSection from './ContentSection.svelte';
  import TextBlock from './TextBlock.svelte';
  import EditableWrapper from './EditableWrapper.svelte';
  // Import other components as they are created
  
  export let componentName = '';
  export let componentData = {};
  export let componentId = '';
  export let pageComponentId = null; // Database ID for saving
  
  // Component mapping - maps database component names to actual Svelte components
  const componentMap = {
    'home_component': HomeComponent,
    'test_component': TestComponent,
    'hero': Hero,
    'art_gallery': ArtGallery,
    'artist_bio': ArtistBio,
    'contact_section': ContactSection,
    'content_section': ContentSection,
    'text_block': TextBlock,
    // Add other components here as they are created
  };
  
  $: Component = componentMap[componentName];
</script>

{#if Component}
  <EditableWrapper 
    {componentId}
    {componentName}
    {componentData}
    {pageComponentId}
  >
    <svelte:component this={Component} {...componentData} />
  </EditableWrapper>
{:else}
  <div class="unknown-component bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    <strong>Unknown Component:</strong> {componentName}
    <pre class="mt-2 text-sm">{JSON.stringify(componentData, null, 2)}</pre>
  </div>
{/if}