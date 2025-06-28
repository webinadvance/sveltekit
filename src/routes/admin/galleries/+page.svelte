<script>
  import DataTable from '$lib/components/admin/DataTable.svelte';
  import FormBuilder from '$lib/components/admin/FormBuilder.svelte';
  import { invalidateAll } from '$app/navigation';
  import { Grid, Image } from 'lucide-svelte';
  
  export let data;
  
  // Table configuration
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'section_id', label: 'Section ID', sortable: true },
    { 
      key: 'gallery_type', 
      label: 'Type', 
      sortable: true,
      render: (value) => value.charAt(0).toUpperCase() + value.slice(1)
    },
    { key: 'columns', label: 'Columns', sortable: true },
    { key: 'item_count', label: 'Items', sortable: true },
    { 
      key: 'enable_lightbox', 
      label: 'Lightbox', 
      sortable: true,
      render: (value) => value ? 'Yes' : 'No'
    }
  ];
  
  // Form fields for creating/editing galleries
  const formFields = [
    {
      key: 'section_id',
      label: 'Section ID',
      type: 'number',
      required: true,
      placeholder: 'Enter section ID this gallery belongs to'
    },
    {
      key: 'gallery_type',
      label: 'Gallery Type',
      type: 'select',
      required: true,
      options: [
        { value: 'grid', label: 'Grid Layout' },
        { value: 'masonry', label: 'Masonry Layout' },
        { value: 'carousel', label: 'Carousel' },
        { value: 'categories', label: 'Category Tabs' }
      ],
      defaultValue: 'grid'
    },
    {
      key: 'columns',
      label: 'Columns',
      type: 'number',
      min: 1,
      max: 6,
      defaultValue: 3,
      help: 'Number of columns in grid layout'
    },
    {
      key: 'aspect_ratio',
      label: 'Aspect Ratio',
      type: 'text',
      placeholder: '16:9, 4:3, 1:1, etc.',
      help: 'Optional aspect ratio for items'
    },
    {
      key: 'show_captions',
      label: 'Show Captions',
      type: 'checkbox',
      defaultValue: true,
      help: 'Display captions on gallery items'
    },
    {
      key: 'enable_lightbox',
      label: 'Enable Lightbox',
      type: 'checkbox',
      defaultValue: true,
      help: 'Allow full-screen viewing'
    }
  ];
  
  // Modal state
  let showCreateForm = false;
  let showEditForm = false;
  let editingGallery = null;
  
  // Event handlers
  function handleCreate() {
    showCreateForm = true;
  }
  
  function handleEdit(event) {
    editingGallery = event.detail;
    showEditForm = true;
  }
  
  async function handleDelete(event) {
    const gallery = event.detail;
    if (confirm(`Are you sure you want to delete gallery ${gallery.id}?`)) {
      try {
        const response = await fetch(`/admin/galleries/${gallery.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await invalidateAll();
        } else {
          alert('Failed to delete gallery');
        }
      } catch (error) {
        console.error('Error deleting gallery:', error);
        alert('Failed to delete gallery');
      }
    }
  }
  
  async function handleFormSubmit(event) {
    const formData = event.detail;
    
    try {
      const url = editingGallery ? `/admin/galleries/${editingGallery.id}` : '/admin/galleries';
      const method = editingGallery ? 'PUT' : 'POST';
      
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
        editingGallery = null;
        await invalidateAll();
      } else {
        const error = await response.text();
        alert(`Failed to save gallery: ${error}`);
      }
    } catch (error) {
      console.error('Error saving gallery:', error);
      alert('Failed to save gallery');
    }
  }
  
  function handleFormCancel() {
    showCreateForm = false;
    showEditForm = false;
    editingGallery = null;
  }
</script>

<svelte:head>
  <title>Galleries - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Galleries</h1>
      <p class="text-gray-600">Manage photo and media galleries</p>
    </div>
  </div>

  <!-- Info Banner -->
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <Grid class="h-5 w-5 text-blue-400" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-blue-800">
          Gallery Management
        </h3>
        <div class="mt-2 text-sm text-blue-700">
          <p>
            Galleries are components that belong to page sections. After creating a gallery, 
            you can add categories and items through the section management or by editing specific galleries.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Data Table -->
  <DataTable
    {columns}
    data={data.galleries}
    title="All Galleries"
    searchPlaceholder="Search galleries..."
    createButtonText="New Gallery"
    createButtonIcon={Grid}
    on:create={handleCreate}
    on:edit={handleEdit}
    on:delete={handleDelete}
  />
</div>

<!-- Create Gallery Modal -->
{#if showCreateForm}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <FormBuilder
        title="Create New Gallery"
        fields={formFields}
        values={{}}
        on:submit={handleFormSubmit}
        on:cancel={handleFormCancel}
      />
    </div>
  </div>
{/if}

<!-- Edit Gallery Modal -->
{#if showEditForm && editingGallery}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <FormBuilder
        title="Edit Gallery"
        fields={formFields}
        values={editingGallery}
        on:submit={handleFormSubmit}
        on:cancel={handleFormCancel}
      />
    </div>
  </div>
{/if}