<script>
  // About section component props
  export let name = "";
  export let title = "";
  export let bio = "";
  export let image = "";
  export let stats = [];
</script>

<section class="about-section py-16 bg-gradient-to-b from-gray-900 to-black text-white">
  <div class="container mx-auto px-4">
    <div class="max-w-6xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          About {name}
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
      </div>

      <!-- Main Content -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
        
        <!-- Image Section -->
        <div class="text-center">
          {#if image}
            <img 
              src={image} 
              alt={name}
              class="w-80 h-80 object-cover rounded-full mx-auto shadow-2xl border-4 border-pink-500/30"
            />
          {:else}
            <div class="w-80 h-80 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mx-auto flex items-center justify-center border-4 border-pink-500/30">
              <div class="text-center">
                <div class="text-6xl mb-4">🎭</div>
                <p class="text-pink-300 font-semibold">Professional Photo</p>
              </div>
            </div>
          {/if}
          
          {#if title}
            <h3 class="text-2xl font-bold mt-6 text-pink-300">
              {title}
            </h3>
          {/if}
        </div>

        <!-- Bio Section -->
        <div class="space-y-6">
          {#if bio}
            <div class="prose prose-lg prose-invert max-w-none">
              {@html bio}
            </div>
          {/if}
        </div>
      </div>

      <!-- Stats Section -->
      {#if stats && stats.length > 0}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {#each stats as stat, index}
            <div class="stat-card bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div class="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
                {stat.value}
              </div>
              <div class="text-gray-300 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          {/each}
        </div>
      {/if}
      
    </div>
  </div>
</section>

<style>
  .about-section {
    min-height: 80vh;
  }
  
  .stat-card {
    transition: all 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(236, 72, 153, 0.3);
  }
  
  /* Prose styling for bio content */
  .prose p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    color: #e5e7eb;
  }
  
  .prose p:last-child {
    margin-bottom: 0;
  }
</style>