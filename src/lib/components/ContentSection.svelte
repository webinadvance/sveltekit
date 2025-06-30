<script>
  import { activeTheme } from '$lib/styles/themes.js';
  import NeonTitle from '$lib/components/NeonTitle.svelte';
  
  // ContentSection component props
  export let title = "Section Title";
  export let description = "Section description text goes here.";
  export let titleSize = "medium"; // small, medium, large, xl
  export let showNeonTitle = false; // Use NeonTitle or regular title
  export let alignment = "center"; // left, center, right
  export let background = "transparent"; // background color/class
</script>

<section class="content-section" 
         class:align-left={alignment === 'left'}
         class:align-center={alignment === 'center'}
         class:align-right={alignment === 'right'}
         style="
           --section-bg: {background};
           --body-font-family: {activeTheme.typography.body.fontFamily};
           --body-font-weight: {activeTheme.typography.body.fontWeight};
         ">
  <div class="content-container">
    {#if showNeonTitle}
      <NeonTitle 
        {title} 
        size={titleSize} 
        splitWords={false} 
        showLaser={false} 
        animate={false} 
      />
    {:else}
      <h2 class="section-title" class:size-small={titleSize === 'small'}
                                class:size-medium={titleSize === 'medium'}
                                class:size-large={titleSize === 'large'}
                                class:size-xl={titleSize === 'xl'}>
        {title}
      </h2>
    {/if}
    
    {#if description}
      <div class="section-description">
        {@html description}
      </div>
    {/if}
  </div>
</section>

<style>
  .content-section {
    width: 100%;
    padding: 60px 0;
    background: var(--section-bg, transparent);
  }
  
  .content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
  }
  
  /* Alignment options */
  .align-left .content-container {
    text-align: left;
  }
  
  .align-center .content-container {
    text-align: center;
  }
  
  .align-right .content-container {
    text-align: right;
  }
  
  /* Regular title styles (non-neon) */
  .section-title {
    font-family: var(--body-font-family, 'Inter', system-ui, sans-serif);
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 24px 0;
    line-height: 1.2;
  }
  
  .section-title.size-small {
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
  
  .section-title.size-medium {
    font-size: clamp(2rem, 5vw, 3rem);
  }
  
  .section-title.size-large {
    font-size: clamp(2.5rem, 6vw, 4rem);
  }
  
  .section-title.size-xl {
    font-size: clamp(3rem, 8vw, 5rem);
  }
  
  /* Description styles */
  .section-description {
    font-family: var(--body-font-family, 'Inter', system-ui, sans-serif);
    font-weight: var(--body-font-weight, 400);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    line-height: 1.6;
    color: #4b5563;
    max-width: 800px;
  }
  
  .align-center .section-description {
    margin: 0 auto;
  }
  
  .align-right .section-description {
    margin-left: auto;
  }
  
  /* HTML content styling */
  .section-description :global(p) {
    margin: 0 0 16px 0;
  }
  
  .section-description :global(p:last-child) {
    margin-bottom: 0;
  }
  
  .section-description :global(strong) {
    font-weight: 600;
    color: #1f2937;
  }
  
  .section-description :global(em) {
    font-style: italic;
  }
  
  .section-description :global(a) {
    color: #ff1493;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .section-description :global(a:hover) {
    color: #ff69b4;
    text-decoration: underline;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .content-section {
      padding: 40px 0;
    }
    
    .content-container {
      padding: 0 20px;
    }
    
    .section-title {
      margin-bottom: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .content-section {
      padding: 30px 0;
    }
    
    .content-container {
      padding: 0 16px;
    }
  }
</style>