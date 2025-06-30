<script>
  import { activeTheme } from '$lib/styles/themes.js';
  
  export let title = '';
  export let content = '';
  export let text_align = 'left';
</script>

<section class="text-block py-8" style="
  --body-font-family: {activeTheme.typography.body.fontFamily};
  --body-font-weight: {activeTheme.typography.body.fontWeight};
  --title-font-family: {activeTheme.typography.title.fontFamily};
  --primary-color: {activeTheme.primary};
">
  <div class="container mx-auto px-4">
    {#if title}
      <h2 class="section-title text-{text_align}">{title}</h2>
    {/if}
    
    {#if content}
      <div class="prose max-w-none text-{text_align}">
        {@html content}
      </div>
    {/if}
  </div>
</section>

<style>
  .section-title {
    font-family: var(--title-font-family, 'Inter', system-ui, sans-serif);
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 24px 0;
    line-height: 1.2;
  }
  
  .prose {
    font-family: var(--body-font-family, 'Inter', system-ui, sans-serif);
    font-weight: var(--body-font-weight, 400);
    color: #374151;
    line-height: 1.75;
  }
  
  .prose :global(p) {
    margin-bottom: 1.25rem;
  }
  
  .prose :global(h1),
  .prose :global(h2),
  .prose :global(h3),
  .prose :global(h4) {
    font-family: var(--title-font-family, 'Inter', system-ui, sans-serif);
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }
  
  .prose :global(strong) {
    font-weight: 600;
    color: #1f2937;
  }
  
  .prose :global(em) {
    font-style: italic;
  }
  
  .prose :global(ul),
  .prose :global(ol) {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
  }
  
  .prose :global(li) {
    margin-bottom: 0.5rem;
  }
  
  .prose :global(blockquote) {
    border-left: 4px solid var(--primary-color, #d1d5db);
    padding-left: 1rem;
    font-style: italic;
    color: #6b7280;
    margin-bottom: 1.25rem;
  }
  
  .prose :global(a) {
    color: var(--primary-color, #ff1493);
    text-decoration: none;
    transition: opacity 0.2s ease;
  }
  
  .prose :global(a:hover) {
    opacity: 0.8;
    text-decoration: underline;
  }
</style>