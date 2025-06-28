<script>
  import { Activity, FileText, Image, Grid, Users, Clapperboard } from 'lucide-svelte';
  
  export let data;
  
  // Dashboard stats
  $: stats = [
    {
      title: 'Pages',
      value: data.stats.pages,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Media Files',
      value: data.stats.media,
      icon: Image,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Galleries',
      value: data.stats.galleries,
      icon: Grid,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Shows',
      value: data.stats.shows,
      icon: Clapperboard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];
  
  // Recent activity
  $: recentPages = data.recentPages || [];
  $: recentMedia = data.recentMedia || [];
</script>

<svelte:head>
  <title>Admin Dashboard - Cinzia Brugnola</title>
</svelte:head>

<!-- Dashboard Header -->
<div class="mb-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
  <p class="text-gray-600">Welcome to your content management system</p>
</div>

<!-- Stats Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {#each stats as stat}
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="{stat.bgColor} rounded-md p-3">
            <svelte:component this={stat.icon} class="h-6 w-6 {stat.color}" />
          </div>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
            <dd class="text-lg font-medium text-gray-900">{stat.value}</dd>
          </dl>
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- Quick Actions & Recent Activity -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  
  <!-- Quick Actions -->
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-2 gap-4">
        <a href="/admin/pages/new" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <FileText class="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <div class="font-medium text-gray-900">New Page</div>
            <div class="text-sm text-gray-500">Create content page</div>
          </div>
        </a>
        
        <a href="/admin/media" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Image class="h-8 w-8 text-green-600 mr-3" />
          <div>
            <div class="font-medium text-gray-900">Upload Media</div>
            <div class="text-sm text-gray-500">Add images/videos</div>
          </div>
        </a>
        
        <a href="/admin/galleries/new" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Grid class="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <div class="font-medium text-gray-900">New Gallery</div>
            <div class="text-sm text-gray-500">Create photo gallery</div>
          </div>
        </a>
        
        <a href="/admin/shows/new" class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Clapperboard class="h-8 w-8 text-orange-600 mr-3" />
          <div>
            <div class="font-medium text-gray-900">New Show</div>
            <div class="text-sm text-gray-500">Add production</div>
          </div>
        </a>
      </div>
    </div>
  </div>
  
  <!-- Recent Activity -->
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        
        <!-- Recent Pages -->
        {#if recentPages.length > 0}
          <div>
            <h4 class="text-sm font-medium text-gray-900 mb-2">Recently Updated Pages</h4>
            <div class="space-y-2">
              {#each recentPages.slice(0, 3) as page}
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <FileText class="h-4 w-4 text-gray-400 mr-2" />
                    <span class="text-sm text-gray-900">{page.title}</span>
                  </div>
                  <span class="text-xs text-gray-500">{new Date(page.updated_at).toLocaleDateString()}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        
        <!-- Recent Media -->
        {#if recentMedia.length > 0}
          <div>
            <h4 class="text-sm font-medium text-gray-900 mb-2">Recently Added Media</h4>
            <div class="space-y-2">
              {#each recentMedia.slice(0, 3) as media}
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <Image class="h-4 w-4 text-gray-400 mr-2" />
                    <span class="text-sm text-gray-900">{media.filename}</span>
                  </div>
                  <span class="text-xs text-gray-500">{new Date(media.created_at).toLocaleDateString()}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        
        {#if recentPages.length === 0 && recentMedia.length === 0}
          <div class="text-center py-8">
            <Activity class="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500">No recent activity</p>
            <p class="text-sm text-gray-400">Start by creating your first page or uploading media</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>