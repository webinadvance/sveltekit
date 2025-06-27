<script>
  import { Mail, Phone } from 'lucide-svelte';
  
  export let actorName = '';
  export let description = '';
  export let quickLinks = [];
  export let contactInfo = {};
  export let socialLinks = [];
  export let copyright = '';
  
  // quickLinks structure:
  // quickLinks = [
  //   { text: 'Link Text', href: '#section' }
  // ]
  
  // contactInfo structure:
  // contactInfo = {
  //   agency: 'Agency Name',
  //   address: ['Street', 'City'],
  //   phone: '+39 123',
  //   email: 'email@agency.com'
  // }
  
  // socialLinks structure:
  // socialLinks = [
  //   { icon: IconComponent, href: '#', ariaLabel: 'Platform name' }
  // ]
</script>

<footer class="bg-gray-900 text-white py-12 mt-20">
  <div class="container mx-auto px-0 md:px-4">
    <div class="max-w-6xl mx-auto px-4 md:px-0">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- About -->
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold mb-4">{actorName}</h3>
          {#if description}
            <p class="text-gray-400 mb-4">{description}</p>
          {/if}
          
          {#if socialLinks.length > 0}
            <div class="flex gap-4">
              {#each socialLinks as social}
                <a 
                  href={social.href}
                  class="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.ariaLabel}
                >
                  <svelte:component this={social.icon} class="w-6 h-6" />
                </a>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Quick Links -->
        {#if quickLinks.length > 0}
          <div>
            <h4 class="text-lg font-semibold mb-4">Link Rapidi</h4>
            <ul class="space-y-2">
              {#each quickLinks as link}
                <li>
                  <a 
                    href={link.href}
                    class="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Contact Info -->
        {#if Object.keys(contactInfo).length > 0}
          <div>
            <h4 class="text-lg font-semibold mb-4">Agenzia</h4>
            <div class="space-y-2 text-gray-400">
              {#if contactInfo.agency}
                <p class="font-semibold text-white">{contactInfo.agency}</p>
              {/if}
              {#if contactInfo.address}
                {#each contactInfo.address as line}
                  <p>{line}</p>
                {/each}
              {/if}
              {#if contactInfo.phone}
                <p>{contactInfo.phone}</p>
              {/if}
              {#if contactInfo.email}
                <p>{contactInfo.email}</p>
              {/if}
            </div>
          </div>
        {/if}
      </div>

      <!-- Bottom Bar -->
      {#if copyright}
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{copyright}</p>
        </div>
      {/if}
    </div>
  </div>
</footer>