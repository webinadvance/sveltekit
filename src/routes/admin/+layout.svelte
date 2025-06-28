<script>
  import { page } from '$app/stores';
  import { 
    LayoutDashboard, 
    FileText, 
    Image, 
    Camera,
    Theater,
    Settings,
    Menu,
    X
  } from 'lucide-svelte';
  
  let mobileMenuOpen = false;
  
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
    { href: '/admin/media', label: 'Media Library', icon: Image },
    { href: '/admin/galleries', label: 'Galleries', icon: Camera },
    { href: '/admin/shows', label: 'Shows', icon: Theater },
    { href: '/admin/settings', label: 'Settings', icon: Settings }
  ];
  
  $: currentPath = $page.url.pathname;
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Top Navigation Bar -->
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <button
            on:click={() => mobileMenuOpen = !mobileMenuOpen}
            class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
          >
            {#if mobileMenuOpen}
              <X class="h-6 w-6" />
            {:else}
              <Menu class="h-6 w-6" />
            {/if}
          </button>
          <h1 class="ml-4 text-xl font-semibold text-gray-900">
            Admin Panel
          </h1>
        </div>
        <div class="flex items-center space-x-4">
          <a href="/" class="text-sm text-gray-600 hover:text-gray-900">
            View Site
          </a>
        </div>
      </div>
    </div>
  </nav>

  <div class="flex h-[calc(100vh-4rem)]">
    <!-- Sidebar Navigation -->
    <aside class={`
      ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 fixed lg:static inset-y-16 lg:inset-y-0 z-30
      w-64 bg-white shadow-lg lg:shadow-none border-r border-gray-200
      transition-transform duration-300 ease-in-out
    `}>
      <nav class="p-4 space-y-1">
        {#each navItems as item}
          <a
            href={item.href}
            class={`
              flex items-center space-x-3 px-3 py-2 rounded-lg
              transition-colors duration-150
              ${currentPath === item.href 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
            on:click={() => mobileMenuOpen = false}
          >
            <svelte:component this={item.icon} class="h-5 w-5" />
            <span class="font-medium">{item.label}</span>
          </a>
        {/each}
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</div>

{#if mobileMenuOpen}
  <div
    class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
    on:click={() => mobileMenuOpen = false}
  />
{/if}