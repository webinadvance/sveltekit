<script>
  import { Button } from '$lib/components/ui';
  import { Mail, Phone, Star } from 'lucide-svelte';
  
  export let title = '';
  export let subtitle = '';
  export let backgroundImage = '';
  export let agency = {};
  export let socialMedia = [];
  export let callToAction = {};
  export let quote = '';
  
  // agency structure:
  // agency = {
  //   name: 'Agency Name',
  //   address: ['Street', 'City'],
  //   phone: '+39 123 456 789',
  //   email: 'email@agency.com'
  // }
  
  // socialMedia structure:
  // socialMedia = [
  //   { name: 'Platform', icon: IconComponent, url: '...' }
  // ]
  
  // callToAction structure:
  // callToAction = {
  //   title: 'CTA Title',
  //   buttons: [
  //     { text: 'Button Text', icon: IconComponent, onClick: () => {} }
  //   ]
  // }
</script>

<div class="relative py-20 overflow-hidden">
  <!-- Background Image -->
  {#if backgroundImage}
    <div class="absolute inset-0 z-0">
      <img 
        src={backgroundImage}
        alt="Contact background" 
        class="w-full h-full object-cover grayscale"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95"></div>
    </div>
  {/if}
  
  <div class="relative z-10">
    <div class="container mx-auto px-0 md:px-4">
      <div class="text-center mb-16 px-4 md:px-0">
        <h2 class="text-white text-4xl lg:text-5xl font-bold mb-6">
          {title}
        </h2>
        {#if subtitle}
          <p class="text-white/80 text-xl">
            {subtitle}
          </p>
        {/if}
      </div>

      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-0">
        <!-- Agency Information -->
        {#if Object.keys(agency).length > 0}
          <div class="bg-white/5 backdrop-blur-sm p-8">
            <h3 class="text-white text-2xl font-semibold mb-6">Agenzia di Rappresentanza</h3>
            <div class="space-y-4">
              <h4 class="text-white text-xl font-bold">{agency.name}</h4>
              <div class="space-y-3">
                {#if agency.address}
                  <div class="flex items-start gap-3">
                    <div class="w-5 h-5 bg-white/20 flex items-center justify-center mt-1">
                      <div class="w-2 h-2 bg-white"></div>
                    </div>
                    <div>
                      {#each agency.address as line}
                        <p class="text-white/80">{line}</p>
                      {/each}
                    </div>
                  </div>
                {/if}
                
                {#if agency.phone}
                  <div class="flex items-center gap-3">
                    <Phone class="w-5 h-5 text-white/60" />
                    <span class="text-white/80">{agency.phone}</span>
                  </div>
                {/if}
                
                {#if agency.email}
                  <div class="flex items-center gap-3">
                    <Mail class="w-5 h-5 text-white/60" />
                    <span class="text-white/80">{agency.email}</span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/if}

        <!-- Social Media -->
        {#if socialMedia.length > 0}
          <div class="bg-white/5 backdrop-blur-sm p-8">
            <h3 class="text-white text-2xl font-semibold mb-6">Social Media e Digital</h3>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                {#each socialMedia as social}
                  <div class="flex items-center gap-3">
                    <svelte:component this={social.icon} class="w-5 h-5 text-white/60" />
                    <span class="text-white/80">{social.name}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Call to Action -->
      {#if Object.keys(callToAction).length > 0}
        <div class="text-center mt-16 max-w-3xl mx-auto px-4 md:px-0">
          <h3 class="text-white text-3xl font-bold mb-6">
            {callToAction.title}
          </h3>
          
          {#if quote}
            <p class="text-white/80 text-lg mb-8 leading-relaxed italic">
              "{quote}"
            </p>
          {/if}
          
          {#if callToAction.buttons && callToAction.buttons.length > 0}
            <div class="flex gap-4 justify-center flex-wrap">
              {#each callToAction.buttons as button}
                <Button 
                  size="lg" 
                  variant={button.variant || 'primary'}
                  class={button.class || ''}
                  on:click={button.onClick}
                >
                  {#if button.icon}
                    <svelte:component this={button.icon} class="w-5 h-5" />
                  {/if}
                  {button.text}
                </Button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>