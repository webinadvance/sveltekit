<script>
  // Test component with various prop types for testing edit mode
  export let title = "Test Component";
  export let subtitle = "This is a test component for edit mode";
  export let content = "<p>This is some <strong>HTML content</strong> that can be edited.</p>";
  export let buttonText = "Click Me";
  export let showButton = true;
  export let backgroundColor = "#f3f4f6";
  export let textColor = "#1f2937";
  export let fontSize = 16;
  export let isHighlighted = false;
</script>

<div 
  class="test-component" 
  style="background-color: {backgroundColor}; color: {textColor}; font-size: {fontSize}px;"
  class:highlighted={isHighlighted}
>
  <div class="test-content">
    <h2 class="test-title">{title}</h2>
    
    {#if subtitle}
      <h3 class="test-subtitle">{subtitle}</h3>
    {/if}
    
    <div class="test-body">
      {@html content}
    </div>
    
    {#if showButton}
      <button class="test-button" on:click={() => alert('Test button clicked!')}>
        {buttonText}
      </button>
    {/if}
    
    {#if isHighlighted}
      <div class="highlight-indicator">
        ⭐ This component is highlighted!
      </div>
    {/if}
  </div>
</div>

<style>
  .test-component {
    padding: 24px;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    margin: 16px 0;
    transition: all 0.3s ease;
  }
  
  .test-component.highlighted {
    border-color: #fbbf24;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
  }
  
  .test-content {
    max-width: 600px;
  }
  
  .test-title {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0 0 8px 0;
    color: inherit;
  }
  
  .test-subtitle {
    font-size: 1.1em;
    font-weight: 500;
    margin: 0 0 16px 0;
    color: inherit;
    opacity: 0.8;
  }
  
  .test-body {
    margin: 16px 0;
    line-height: 1.6;
  }
  
  .test-button {
    background: #3b82f6;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
    margin-top: 16px;
  }
  
  .test-button:hover {
    background: #2563eb;
  }
  
  .highlight-indicator {
    background: #fef3c7;
    color: #92400e;
    padding: 8px 12px;
    border-radius: 6px;
    margin-top: 12px;
    font-size: 14px;
    font-weight: 500;
  }
</style>