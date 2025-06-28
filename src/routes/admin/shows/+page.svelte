<script>
  import DataTable from '$lib/components/admin/DataTable.svelte';
  import FormBuilder from '$lib/components/admin/FormBuilder.svelte';
  import { invalidateAll } from '$app/navigation';
  import { Clapperboard, Theater } from 'lucide-svelte';
  
  export let data;
  
  // Table configuration
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'director', label: 'Director', sortable: true },
    { key: 'venue', label: 'Venue', sortable: true },
    { key: 'genre', label: 'Genre', sortable: true },
    { 
      key: 'start_date', 
      label: 'Start Date', 
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString() : 'TBD'
    },
    { 
      key: 'is_current', 
      label: 'Current', 
      sortable: true,
      render: (value) => value ? 'Yes' : 'No'
    }
  ];
  
  // Form fields for creating/editing shows
  const formFields = [
    {
      key: 'show_component_id',
      label: 'Show Component ID',
      type: 'number',
      required: true,
      placeholder: 'Enter show component ID this belongs to'
    },
    {
      key: 'title',
      label: 'Show Title',
      type: 'text',
      required: true,
      placeholder: 'Enter show title'
    },
    {
      key: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      placeholder: 'Optional subtitle or tagline'
    },
    {
      key: 'director',
      label: 'Director',
      type: 'text',
      placeholder: 'Director name'
    },
    {
      key: 'venue',
      label: 'Venue',
      type: 'text',
      placeholder: 'Theater or venue name'
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Show description'
    },
    {
      key: 'genre',
      label: 'Genre',
      type: 'text',
      placeholder: 'Drama, Comedy, Musical, etc.'
    },
    {
      key: 'start_date',
      label: 'Start Date',
      type: 'date',
      help: 'When the show opens'
    },
    {
      key: 'end_date',
      label: 'End Date',
      type: 'date',
      help: 'When the show closes (optional)'
    },
    {
      key: 'poster_image_id',
      label: 'Poster Image ID',
      type: 'number',
      placeholder: 'ID from media library',
      help: 'Upload image to media library first, then enter ID'
    },
    {
      key: 'is_current',
      label: 'Currently Running',
      type: 'checkbox',
      help: 'Check if this show is currently running'
    },
    {
      key: 'display_order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      help: 'Order in which to display (lower numbers first)'
    }
  ];
  
  // Modal state
  let showCreateForm = false;
  let showEditForm = false;
  let editingShow = null;
  
  // Event handlers
  function handleCreate() {
    showCreateForm = true;
  }
  
  function handleEdit(event) {
    editingShow = event.detail;
    showEditForm = true;
  }
  
  async function handleDelete(event) {
    const show = event.detail;
    if (confirm(`Are you sure you want to delete "${show.title}"?`)) {
      try {
        const response = await fetch(`/admin/shows/${show.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await invalidateAll();
        } else {
          alert('Failed to delete show');
        }
      } catch (error) {
        console.error('Error deleting show:', error);
        alert('Failed to delete show');
      }
    }
  }
  
  async function handleFormSubmit(event) {
    const formData = event.detail;
    
    try {
      const url = editingShow ? `/admin/shows/${editingShow.id}` : '/admin/shows';
      const method = editingShow ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        showCreateForm = false;
        showEditForm = false;
        editingShow = null;
        await invalidateAll();
      } else {
        const error = await response.text();
        alert(`Failed to save show: ${error}`);
      }
    } catch (error) {
      console.error('Error saving show:', error);
      alert('Failed to save show');
    }
  }
  
  function handleFormCancel() {
    showCreateForm = false;
    showEditForm = false;
    editingShow = null;
  }
</script>

<svelte:head>
  <title>Shows & Productions - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Shows & Productions</h1>
      <p class="text-gray-600">Manage theater, film, and TV productions</p>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center">
        <Theater class="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <div class="text-2xl font-bold text-gray-900">{data.shows.length}</div>
          <div class="text-sm text-gray-500">Total Shows</div>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center">
        <Clapperboard class="h-8 w-8 text-green-600 mr-3" />
        <div>
          <div class="text-2xl font-bold text-gray-900">{data.shows.filter(s => s.is_current).length}</div>
          <div class="text-sm text-gray-500">Currently Running</div>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center">
        <Theater class="h-8 w-8 text-purple-600 mr-3" />
        <div>
          <div class="text-2xl font-bold text-gray-900">{data.shows.filter(s => !s.is_current).length}</div>
          <div class="text-sm text-gray-500">Past Productions</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Data Table -->
  <DataTable
    {columns}
    data={data.shows}
    title="All Shows & Productions"
    searchPlaceholder="Search shows..."
    createButtonText="New Show"
    createButtonIcon={Clapperboard}
    on:create={handleCreate}
    on:edit={handleEdit}
    on:delete={handleDelete}
  />
</div>

<!-- Create Show Modal -->
{#if showCreateForm}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <FormBuilder
        title="Create New Show"
        fields={formFields}
        values={{}}
        on:submit={handleFormSubmit}
        on:cancel={handleFormCancel}
      />
    </div>
  </div>
{/if}

<!-- Edit Show Modal -->
{#if showEditForm && editingShow}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <FormBuilder
        title="Edit Show"
        fields={formFields}
        values={editingShow}
        on:submit={handleFormSubmit}
        on:cancel={handleFormCancel}
      />
    </div>
  </div>
{/if}