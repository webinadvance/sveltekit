<script>
  import DataTable from '$lib/components/admin/DataTable.svelte';
  import FormBuilder from '$lib/components/admin/FormBuilder.svelte';
  import { invalidateAll } from '$app/navigation';
  
  export let data;
  
  // Table configuration
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'slug', label: 'URL Path', sortable: true },
    { 
      key: 'is_published', 
      label: 'Status', 
      sortable: true,
      render: (value) => value ? 'Published' : 'Draft'
    },
    { 
      key: 'updated_at', 
      label: 'Last Updated', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];
  
  // Form fields for creating/editing pages
  const formFields = [
    {
      key: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      placeholder: 'Enter page title'
    },
    {
      key: 'slug',
      label: 'URL Path',
      type: 'text',
      required: true,
      placeholder: '/about, /contact, etc.',
      help: 'The URL path for this page (e.g., /about, /contact)'
    },
    {
      key: 'meta_description',
      label: 'Meta Description',
      type: 'textarea',
      placeholder: 'Brief description for search engines'
    },
    {
      key: 'meta_keywords',
      label: 'Meta Keywords',
      type: 'text',
      placeholder: 'SEO keywords, comma separated'
    },
    {
      key: 'template',
      label: 'Template',
      type: 'select',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'landing', label: 'Landing Page' },
        { value: 'portfolio', label: 'Portfolio' }
      ],
      defaultValue: 'default'
    },
    {
      key: 'is_published',
      label: 'Published',
      type: 'checkbox',
      help: 'Make this page visible to visitors'
    }
  ];
  
  // Modal state
  let showCreateForm = false;
  let showEditForm = false;
  let editingPage = null;
  
  // Event handlers
  function handleCreate() {
    showCreateForm = true;
  }
  
  function handleEdit(event) {
    editingPage = event.detail;
    showEditForm = true;
  }
  
  async function handleDelete(event) {
    const page = event.detail;
    if (confirm(`Are you sure you want to delete "${page.title}"?`)) {
      try {
        const response = await fetch(`/admin/pages/${page.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await invalidateAll();
        } else {
          alert('Failed to delete page');
        }
      } catch (error) {
        console.error('Error deleting page:', error);
        alert('Failed to delete page');
      }
    }
  }
  
  async function handleFormSubmit(event) {
    const formData = event.detail;
    
    try {
      const url = editingPage ? `/admin/pages/${editingPage.id}` : '/admin/pages';
      const method = editingPage ? 'PUT' : 'POST';
      
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
        editingPage = null;
        await invalidateAll();
      } else {
        const error = await response.text();
        alert(`Failed to save page: ${error}`);
      }
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save page');
    }
  }
  
  function handleFormCancel() {
    showCreateForm = false;
    showEditForm = false;
    editingPage = null;
  }
</script>

<svelte:head>
  <title>Pages - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Pages</h1>
      <p class="text-gray-600">Manage your website pages and content</p>
    </div>
  </div>

  <!-- Data Table -->
  <DataTable
    {columns}
    data={data.pages}
    title="All Pages"
    searchPlaceholder="Search pages..."
    on:create={handleCreate}
    on:edit={handleEdit}
    on:delete={handleDelete}
  />
</div>

<!-- Create Page Modal -->
{#if showCreateForm}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <FormBuilder
        title="Create New Page"
        fields={formFields}
        values={{}}
        on:submit={handleFormSubmit}
        on:cancel={handleFormCancel}
      />
    </div>
  </div>
{/if}

<!-- Edit Page Modal -->
{#if showEditForm && editingPage}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <FormBuilder
        title="Edit Page"
        fields={formFields}
        values={editingPage}
        on:submit={handleFormSubmit}
        on:cancel={handleFormCancel}
      />
    </div>
  </div>
{/if}