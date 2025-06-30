<script>
  import { onMount } from 'svelte';
  
  // Gallery props
  export let title = "Gallery";
  export let subtitle = "";
  export let images = [];
  export let columns = 3;
  
  let selectedImage = null;
  let galleryElement;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const items = galleryElement.querySelectorAll('.gallery-item');
    items.forEach(item => observer.observe(item));
    
    return () => {
      items.forEach(item => observer.unobserve(item));
    };
  });
  
  function openLightbox(image) {
    selectedImage = image;
  }
  
  function closeLightbox() {
    selectedImage = null;
  }
</script>

<section class="gallery-section" bind:this={galleryElement}>
  <div class="gallery-header">
    {#if title}
      <h2 class="gallery-title">{title}</h2>
    {/if}
    {#if subtitle}
      <p class="gallery-subtitle">{subtitle}</p>
    {/if}
  </div>
  
  <div class="gallery-grid" style="--columns: {columns}">
    {#each images as image, i}
      <div 
        class="gallery-item" 
        style="--index: {i}"
        on:click={() => openLightbox(image)}
        on:keypress={(e) => e.key === 'Enter' && openLightbox(image)}
        role="button"
        tabindex="0"
      >
        <img 
          src={image.url || image} 
          alt={image.alt || `Gallery image ${i + 1}`}
          loading="lazy"
        />
        <div class="item-overlay">
          <span class="view-icon">⊕</span>
        </div>
      </div>
    {/each}
  </div>
  
  {#if images.length === 0}
    <div class="empty-gallery">
      <p>✨ Add images to showcase your art</p>
    </div>
  {/if}
</section>

{#if selectedImage}
  <div 
    class="lightbox" 
    on:click={closeLightbox}
    on:keypress={(e) => e.key === 'Escape' && closeLightbox()}
    role="button"
    tabindex="0"
  >
    <img 
      src={selectedImage.url || selectedImage} 
      alt={selectedImage.alt || 'Lightbox image'}
    />
    <button class="close-btn" on:click={closeLightbox}>✕</button>
  </div>
{/if}

<style>
  .gallery-section {
    padding: 100px 0;
    background: #000;
    position: relative;
    overflow: hidden;
    width: 100vw;
    margin: 0;
  }
  
  .gallery-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .gallery-header {
    text-align: center;
    margin-bottom: 80px;
    position: relative;
    z-index: 1;
  }
  
  .gallery-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    color: #fff;
    margin: 0 0 20px 0;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    background: linear-gradient(90deg, #fff 0%, #9333ea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .gallery-subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 30px;
    width: 100%;
    padding: 0 40px;
    margin: 0;
    position: relative;
    z-index: 1;
  }
  
  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: calc(var(--index) * 0.05s);
    aspect-ratio: 1;
    background: rgba(147, 51, 234, 0.05);
  }
  
  .gallery-item.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  .gallery-item:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(147, 51, 234, 0.3);
  }
  
  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  .gallery-item:hover img {
    transform: scale(1.1);
  }
  
  .item-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .gallery-item:hover .item-overlay {
    opacity: 1;
  }
  
  .view-icon {
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.9);
    transform: scale(0);
    transition: transform 0.3s ease;
  }
  
  .gallery-item:hover .view-icon {
    transform: scale(1);
  }
  
  .empty-gallery {
    text-align: center;
    padding: 80px 20px;
    color: rgba(147, 51, 234, 0.7);
    font-size: 1.2rem;
  }
  
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 40px;
    backdrop-filter: blur(20px);
    animation: fadeIn 0.3s ease;
  }
  
  .lightbox img {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(147, 51, 234, 0.3);
    animation: scaleIn 0.3s ease;
  }
  
  .close-btn {
    position: absolute;
    top: 40px;
    right: 40px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .close-btn:hover {
    background: rgba(147, 51, 234, 0.3);
    border-color: rgba(147, 51, 234, 0.5);
    transform: rotate(90deg);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      padding: 0 20px;
    }
    
    .gallery-section {
      padding: 60px 0;
    }
    
    .close-btn {
      top: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>