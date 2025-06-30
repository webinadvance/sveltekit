<script>
  import { activeTheme } from '$lib/styles/themes.js';
  import NeonTitle from '$lib/components/NeonTitle.svelte';
  
  // Hero component props
  export let title = "Welcome";
  export let subtitle = "";
  export let background_image = "";
  export let cta_text = "";
  export let cta_link = "";
</script>

<section class="hero-section" style="
  --subtitle-font-family: {activeTheme.typography.subtitle.fontFamily};
  --subtitle-font-weight: {activeTheme.typography.subtitle.fontWeight};
  --subtitle-font-style: {activeTheme.typography.subtitle.fontStyle};
  --subtitle-letter-spacing: {activeTheme.typography.subtitle.letterSpacing};
">
  <div class="hero-background">
    {#if background_image}
      <img 
        src={background_image} 
        alt={title}
        class="hero-image"
      />
    {:else}
      <div class="hero-placeholder">
        <span class="upload-hint">✨ Add your artistic masterpiece</span>
      </div>
    {/if}
    <div class="hero-overlay"></div>
  </div>
  
  <div class="hero-content">
    <div class="hero-text">
      <NeonTitle 
        {title} 
        size="large" 
        splitWords={true} 
        showLaser={true} 
        animate={true} 
      />
      {#if subtitle}
        <p class="hero-subtitle">{subtitle}</p>
      {/if}
      {#if cta_text && cta_link}
        <a href={cta_link} class="hero-cta">
          {cta_text}
        </a>
      {/if}
    </div>
  </div>

  <!-- Scroll Down Indicator -->
  <div class="scroll-indicator">
    <svg class="scroll-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14m7-7l-7 7-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="scroll-text">Scroll</span>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    width: 100%;
    height: 80vh; /* Reduced from 100vh to allow scrolling */
    min-height: 600px; /* Minimum height for smaller screens */
    max-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: 0;
    padding: 0;
    background: #000;
  }
  
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  
  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: grayscale(100%);
    box-shadow: 
      inset 0 0 30px rgba(255, 20, 147, 0.3),
      inset 0 0 60px rgba(255, 105, 180, 0.2);
  }
  
  .hero-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: 
      radial-gradient(ellipse at center top, rgba(255, 20, 147, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at left bottom, rgba(255, 105, 180, 0.1) 0%, transparent 40%),
      radial-gradient(ellipse at right bottom, rgba(255, 20, 147, 0.1) 0%, transparent 40%),
      linear-gradient(135deg, #000000 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #533a7d 100%);
    position: relative;
  }
  
  .hero-placeholder::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(255, 20, 147, 0.03) 2px,
        rgba(255, 20, 147, 0.03) 4px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 105, 180, 0.02) 2px,
        rgba(255, 105, 180, 0.02) 4px
      );
    pointer-events: none;
  }
  
  .upload-hint {
    color: rgba(255, 20, 147, 0.8);
    font-size: 16px;
    text-align: center;
    padding: 20px 40px;
    border: 1px solid rgba(255, 20, 147, 0.3);
    border-radius: 50px;
    background: rgba(255, 20, 147, 0.05);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-shadow: 0 0 10px rgba(255, 20, 147, 0.5);
    backdrop-filter: blur(10px);
    position: relative;
    z-index: 10;
  }
  
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  
  .hero-content {
    position: relative;
    z-index: 3;
    text-align: center;
    color: white;
    width: 100%;
    padding: 0 40px;
    transform: translateY(-8vh);
  }
  
  /* NeonTitle component styles are now centralized in the component itself */
  
  .hero-subtitle {
    font-family: var(--subtitle-font-family, 'Dancing Script', cursive);
    font-weight: var(--subtitle-font-weight, 500);
    font-style: var(--subtitle-font-style, italic);
    letter-spacing: var(--subtitle-letter-spacing, 0.01em);
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    margin: 0 auto 48px;
    line-height: 1.4;
    opacity: 0.95;
    max-width: 700px;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 
      0 2px 20px rgba(0, 0, 0, 0.8),
      0 0 10px rgba(255, 20, 147, 0.3);
  }
  
  .hero-cta {
    display: inline-block;
    padding: 16px 48px;
    background: transparent;
    color: #ff1493;
    text-decoration: none;
    border: 2px solid #ff1493;
    border-radius: 25px;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: all 0.3s ease;
    box-shadow: 
      0 0 15px #ff1493,
      0 4px 15px rgba(255, 20, 147, 0.3);
    text-shadow: 0 0 5px #ff1493;
  }
  
  .hero-cta:hover {
    transform: translateY(-2px);
    background: rgba(255, 20, 147, 0.1);
    box-shadow: 
      0 0 25px #ff1493, 
      0 0 35px #ff69b4,
      0 6px 25px rgba(255, 20, 147, 0.4);
    color: #ff69b4;
    border-color: #ff69b4;
  }
  
  /* Scroll Down Indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #ff1493;
    cursor: pointer;
    animation: scroll-bounce 2s ease-in-out infinite;
  }
  
  .scroll-icon {
    width: 32px;
    height: 32px;
    color: #ff1493;
    filter: drop-shadow(0 0 10px #ff1493);
  }
  
  .scroll-text {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    text-shadow: 0 0 10px #ff1493;
  }
  
  @keyframes scroll-bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
  
  .scroll-indicator:hover {
    transform: translateX(-50%) scale(1.1);
    color: #ff69b4;
  }
  
  .scroll-indicator:hover .scroll-icon {
    color: #ff69b4;
    filter: drop-shadow(0 0 15px #ff69b4);
  }
  
  .scroll-indicator:hover .scroll-text {
    text-shadow: 0 0 15px #ff69b4;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .hero-content {
      padding: 0 20px;
    }
    
    /* NeonTitle mobile styles handled in component */
    
    .hero-cta {
      padding: 14px 36px;
      font-size: 0.95rem;
    }
    
    .scroll-indicator {
      bottom: 20px;
    }
    
    .scroll-icon {
      width: 28px;
      height: 28px;
    }
    
    .scroll-text {
      font-size: 11px;
    }
  }
  
  @media (max-width: 480px) {
    .upload-hint {
      font-size: 14px;
      padding: 15px 25px;
    }
    
    .scroll-indicator {
      bottom: 15px;
    }
    
    .scroll-icon {
      width: 24px;
      height: 24px;
    }
    
    .scroll-text {
      font-size: 10px;
    }
  }
</style>