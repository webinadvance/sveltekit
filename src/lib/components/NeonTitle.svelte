<script>
  import { activeTheme } from '$lib/styles/themes.js';
  
  // NeonTitle component props - REUSABLE COMPONENT
  export let title = "Title";
  export let size = "large"; // small, medium, large, xl
  export let splitWords = true; // Split title into separate lines by words
  export let showLaser = true; // Show laser effects
  export let animate = true; // Enable neon pulse animation
</script>

<h1 class="neon-title" 
     class:size-small={size === 'small'}
     class:size-medium={size === 'medium'} 
     class:size-large={size === 'large'}
     class:size-xl={size === 'xl'}
     class:animated={animate}
     style="
       --title-font-family: {activeTheme.typography.title.fontFamily};
       --title-font-weight: {activeTheme.typography.title.fontWeight};
       --title-letter-spacing: {activeTheme.typography.title.letterSpacing};
       --title-color: {activeTheme.neon.title.color};
       --title-text-shadow: {activeTheme.neon.title.textShadow};
       --title-filter: {activeTheme.neon.title.filter};
       --title-text-stroke: {activeTheme.neon.title.textStroke};
       --animation-shadow: {activeTheme.neon.title.animationShadow};
       --size-small: {activeTheme.neon.title.sizes.small};
       --size-medium: {activeTheme.neon.title.sizes.medium};
       --size-large: {activeTheme.neon.title.sizes.large};
       --size-xl: {activeTheme.neon.title.sizes.xl};
       --laser-bg: {activeTheme.neon.laser.background};
       --laser-glow: {activeTheme.neon.laser.glow};
     ">
  {#if splitWords}
    {#each title.split(' ') as word, index}
      <div class="name-line">
        {word}
        {#if showLaser}
          <div class="laser-effect"></div>
        {/if}
      </div>
    {/each}
  {:else}
    {title}
    {#if showLaser}
      <div class="laser-effect"></div>
    {/if}
  {/if}
</h1>

<style>
  .neon-title {
    font-family: var(--title-font-family, 'Orbitron', system-ui, sans-serif);
    font-weight: var(--title-font-weight, 800);
    letter-spacing: var(--title-letter-spacing, 0.08em);
    margin: 0 0 32px 0;
    line-height: 0.9;
    text-transform: uppercase;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    color: var(--title-color, #ffffff);
    text-shadow: var(--title-text-shadow);
    filter: var(--title-filter, drop-shadow(0 0 8px #ff1493));
    -webkit-text-stroke: var(--title-text-stroke, 1px #ff1493);
  }
  
  /* Size variants */
  .size-small {
    font-size: var(--size-small, clamp(2rem, 6vw, 3rem));
  }
  
  .size-medium {
    font-size: var(--size-medium, clamp(3rem, 8vw, 4.5rem));
  }
  
  .size-large {
    font-size: var(--size-large, clamp(4rem, 12vw, 8rem));
  }
  
  .size-xl {
    font-size: var(--size-xl, clamp(5rem, 15vw, 10rem));
  }
  
  .name-line {
    position: relative;
    display: block;
    white-space: nowrap;
  }
  
  /* Animation */
  .animated {
    animation: neon-pulse 2s ease-in-out infinite alternate;
  }
  
  @keyframes neon-pulse {
    0% {
      filter: var(--title-filter, drop-shadow(0 0 8px #ff1493));
      text-shadow: var(--title-text-shadow);
    }
    50% {
      filter: var(--title-filter, drop-shadow(0 0 8px #ff1493)) brightness(1.1);
      text-shadow: var(--animation-shadow);
    }
    100% {
      filter: var(--title-filter, drop-shadow(0 0 8px #ff1493));
      text-shadow: var(--title-text-shadow);
    }
  }
  
  .laser-effect {
    position: absolute;
    top: 50%;
    left: -100%;
    width: 200%;
    height: 2px;
    background: var(--laser-bg, linear-gradient(90deg, transparent 0%, #ff69b4 45%, #ffffff 50%, #ff69b4 55%, transparent 100%));
    transform: translateY(-50%);
    animation: laser-sweep 3s ease-in-out infinite;
    box-shadow: var(--laser-glow, 0 0 5px #ff69b4, 0 0 10px #ff69b4);
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
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .size-large {
      font-size: clamp(3rem, 10vw, 6rem);
    }
    
    .size-xl {
      font-size: clamp(4rem, 12vw, 8rem);
    }
  }
</style>