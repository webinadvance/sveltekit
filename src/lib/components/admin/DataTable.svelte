<script>
  import { createEventDispatcher } from 'svelte';
  import { Edit, Trash2, Plus, Search } from 'lucide-svelte';
  
  export let columns = [];
  export let data = [];
  export let title = '';
  export let searchable = true;
  export let actions = ['edit', 'delete'];
  export let idField = 'id';
  
  const dispatch = createEventDispatcher();
  
  let searchQuery = '';
  
  $: filteredData = searchQuery 
    ? data.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : data;
  
  function handleAction(action, item) {
    dispatch(action, item);
  }
  
  function getValue(item, column) {
    if (column.render) {
      return column.render(item);
    }
    return item[column.key] || '-';
  }
</script>

<div class="bg-white rounded-lg shadow">
  <!-- Header -->
  <div class="p-6 border-b border-gray-200">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 class="text-xl font-semibold text-gray-900">{title}</h2>
      
      <div class="flex gap-3">
        {#if searchable}
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        {/if}
        
        <button
          on:click={() => dispatch('create')}
          class="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus class="h-4 w-4" />
          Add New
        </button>
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          {#each columns as column}
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {column.label}
            </th>
          {/each}
          {#if actions.length > 0}
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          {/if}
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each filteredData as item}
          <tr class="hover:bg-gray-50">
            {#each columns as column}
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {@html getValue(item, column)}
              </td>
            {/each}
            {#if actions.length > 0}
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-2">
                  {#if actions.includes('edit')}
                    <button
                      on:click={() => handleAction('edit', item)}
                      class="text-gray-600 hover:text-gray-900 transition-colors"
                      title="Edit"
                    >
                      <Edit class="h-4 w-4" />
                    </button>
                  {/if}
                  {#if actions.includes('delete')}
                    <button
                      on:click={() => handleAction('delete', item)}
                      class="text-red-600 hover:text-red-900 transition-colors"
                      title="Delete"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  {/if}
                </div>
              </td>
            {/if}
          </tr>
        {:else}
          <tr>
            <td colspan={columns.length + (actions.length > 0 ? 1 : 0)} 
                class="px-6 py-8 text-center text-gray-500">
              No data found
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>