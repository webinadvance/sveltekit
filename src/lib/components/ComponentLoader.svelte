<script>
  import HomeComponent from './HomeComponent.svelte';
  import TestComponent from './TestComponent.svelte';
  import Hero from './Hero.svelte';
  import ArtGallery from './ArtGallery.svelte';
  import EditableGallery from './EditableGallery.svelte';
  import ArtistBio from './ArtistBio.svelte';
  import ContactSection from './ContactSection.svelte';
  import ContentSection from './ContentSection.svelte';
  import TextBlock from './TextBlock.svelte';
  import AboutSection from './AboutSection.svelte';
  import ContactForm from './ContactForm.svelte';
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
    'art_gallery': EditableGallery,  // Use new editable gallery
    'artist_bio': ArtistBio,
    'contact_section': ContactSection,
    'content_section': ContentSection,
    'text_block': TextBlock,
    'about_section': AboutSection,
    'contact_form': ContactForm,
    'image_gallery': EditableGallery, // Legacy mapping
    'editable_gallery': EditableGallery,
    // Add other components here as they are created
  };
  
  $: Component = componentMap[componentName];
</script>

{#if Component}
  {#if componentName === 'art_gallery' || componentName === 'editable_gallery' || componentName === 'image_gallery'}
    <!-- Gallery components handle their own editing -->
    <svelte:component 
      this={Component} 
      {...componentData} 
      {componentId}
      {componentName}
      {pageComponentId}
    />
  {:else}
    <!-- Other components use EditableWrapper -->
    <EditableWrapper 
      {componentId}
      {componentName}
      {componentData}
      {pageComponentId}
    >
      <svelte:component 
        this={Component} 
        {...componentData} 
        componentId={pageComponentId}
        {componentName}
      />
    </EditableWrapper>
  {/if}
{:else}
  <div class="unknown-component bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    <strong>Unknown Component:</strong> {componentName}
    <pre class="mt-2 text-sm">{JSON.stringify(componentData, null, 2)}</pre>
  </div>
{/if}