<script>
  import { onMount } from 'svelte';
  
  export let name = "Artist Name";
  export let title = "Creative Visionary";
  export let bio = "";
  export let image = "";
  export let stats = [];
  
  let bioElement;
  let visible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(bioElement);
    
    return () => observer.unobserve(bioElement);
  });
</script>

<section class="bio-section" bind:this={bioElement} class:visible>
  <div class="bio-container">
    <div class="bio-content">
      <div class="bio-image-wrapper">
        {#if image}
          <img src={image} alt={name} class="bio-image" />
        {:else}
          <div class="bio-placeholder">
            <span>✨</span>
          </div>
        {/if}
        <div class="image-decoration"></div>
      </div>
      
      <div class="bio-text">
        <h2 class="bio-name">{name}</h2>
        <p class="bio-title">{title}</p>
        
        {#if bio}
          <div class="bio-description">
            {@html bio}
          </div>
        {/if}
        
        {#if stats.length > 0}
          <div class="bio-stats">
            {#each stats as stat}
              <div class="stat-item">
                <span class="stat-value">{stat.value}</span>
                <span class="stat-label">{stat.label}</span>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .bio-section {
    padding: 100px 0;
    background: #000;
    position: relative;
    overflow: hidden;
    width: 100vw;
    margin: 0;
  }
  
  .bio-section::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    animation: pulse-slow 8s ease-in-out infinite;
  }
  
  @keyframes pulse-slow {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.2); }
  }
  
  .bio-container {
    width: 100%;
    padding: 0 40px;
    margin: 0;
    position: relative;
    z-index: 1;
  }
  
  .bio-content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 80px;
    align-items: center;
  }
  
  .bio-image-wrapper {
    position: relative;
    opacity: 0;
    transform: translateX(-50px);
    transition: all 1s ease;
  }
  
  .visible .bio-image-wrapper {
    opacity: 1;
    transform: translateX(0);
  }
  
  .bio-image {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 3/4;
    object-fit: cover;
    border-radius: 8px;
    filter: grayscale(100%) contrast(1.2);
    transition: filter 0.5s ease;
  }
  
  .bio-image:hover {
    filter: grayscale(0%) contrast(1);
  }
  
  .bio-placeholder {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 3/4;
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%);
    border: 2px solid rgba(147, 51, 234, 0.3);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
  }
  
  .image-decoration {
    position: absolute;
    top: -20px;
    left: -20px;
    right: 20px;
    bottom: 20px;
    border: 2px solid rgba(147, 51, 234, 0.3);
    border-radius: 8px;
    z-index: -1;
  }
  
  .bio-text {
    opacity: 0;
    transform: translateX(50px);
    transition: all 1s ease 0.2s;
  }
  
  .visible .bio-text {
    opacity: 1;
    transform: translateX(0);
  }
  
  .bio-name {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 900;
    color: #fff;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    background: linear-gradient(90deg, #fff 0%, #9333ea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .bio-title {
    font-size: 1.3rem;
    color: rgba(147, 51, 234, 0.8);
    margin: 0 0 30px 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .bio-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 40px;
  }
  
  .bio-description :global(p) {
    margin-bottom: 20px;
  }
  
  .bio-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 30px;
    padding-top: 40px;
    border-top: 1px solid rgba(147, 51, 234, 0.2);
  }
  
  .stat-item {
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
  }
  
  .visible .stat-item:nth-child(1) { animation-delay: 0.4s; }
  .visible .stat-item:nth-child(2) { animation-delay: 0.5s; }
  .visible .stat-item:nth-child(3) { animation-delay: 0.6s; }
  .visible .stat-item:nth-child(4) { animation-delay: 0.7s; }
  
  .stat-value {
    display: block;
    font-size: 2.5rem;
    font-weight: 900;
    color: #9333ea;
    margin-bottom: 5px;
  }
  
  .stat-label {
    display: block;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 968px) {
    .bio-content {
      grid-template-columns: 1fr;
      gap: 60px;
      text-align: center;
    }
    
    .bio-image-wrapper {
      margin: 0 auto;
    }
    
    .bio-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .bio-section {
      padding: 60px 0;
    }
    
    .bio-container {
      padding: 0 20px;
    }
    
    .bio-stats {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
</style>