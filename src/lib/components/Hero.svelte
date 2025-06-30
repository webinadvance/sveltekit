<script>
  import { activeTheme } from '$lib/styles/themes.js';
  
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
      <h1 class="hero-title neon-text">
        {#each title.split(' ') as word, index}
          <div class="name-line">
            {word}
            <div class="laser-effect"></div>
          </div>
        {/each}
      </h1>
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
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height for mobile */
    min-height: 100vh;
    min-height: 100dvh;
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
    background: #111;
  }
  
  .upload-hint {
    color: rgba(147, 51, 234, 0.9);
    font-size: 16px;
    text-align: center;
    padding: 20px 40px;
    border: 1px solid rgba(147, 51, 234, 0.3);
    border-radius: 50px;
    background: rgba(147, 51, 234, 0.05);
    text-transform: uppercase;
    letter-spacing: 0.1em;
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
  
  .hero-title {
    font-size: clamp(4rem, 12vw, 8rem);
    font-weight: 900;
    margin: 0 0 32px 0;
    line-height: 0.9;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  
  .name-line {
    position: relative;
    display: block;
    white-space: nowrap;
  }
  
  .neon-text {
    color: #ff1493;
    -webkit-text-stroke: 1px #ffffff;
    text-stroke: 1px #ffffff;
    text-shadow: 
      0 0 10px #ff1493,
      0 0 20px #ff1493,
      0 0 2px #000000,
      1px 1px 2px rgba(0, 0, 0, 0.9);
    animation: neon-flicker 3s ease-in-out infinite alternate;
  }
  
  @keyframes neon-flicker {
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
      text-shadow: 
        0 0 10px #ff1493,
        0 0 20px #ff1493,
        0 0 2px #000000,
        1px 1px 2px rgba(0, 0, 0, 0.9);
    }
    20%, 24%, 55% {
      text-shadow: 
        0 0 5px #ff1493,
        0 0 15px #ff1493,
        0 0 2px #000000,
        1px 1px 2px rgba(0, 0, 0, 0.9);
    }
  }
  
  .laser-effect {
    position: absolute;
    top: 50%;
    left: -100%;
    width: 200%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #ff69b4 45%,
      #ffffff 50%,
      #ff69b4 55%,
      transparent 100%
    );
    transform: translateY(-50%);
    animation: laser-sweep 3s ease-in-out infinite;
    box-shadow: 
      0 0 5px #ff69b4,
      0 0 10px #ff69b4;
  }
  
  @keyframes laser-sweep {
    0% {
      left: -100%;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      left: 100%;
      opacity: 0;
    }
  }
  
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
    
    .hero-title {
      font-size: clamp(3rem, 10vw, 6rem);
    }
    
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