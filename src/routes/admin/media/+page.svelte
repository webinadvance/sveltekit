<script>
  import DataTable from '$lib/components/admin/DataTable.svelte';
  import FormBuilder from '$lib/components/admin/FormBuilder.svelte';
  import { invalidateAll } from '$app/navigation';
  import { Upload, Image as ImageIcon, Video, File } from 'lucide-svelte';
  
  export let data;
  
  // Table configuration
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { 
      key: 'url', 
      label: 'Preview',
      render: (value, row) => row.mime_type?.startsWith('image/') ? 
        `<img src="${value}" alt="${row.alt_text || row.filename}" class="w-16 h-16 object-cover rounded" />` :
        `<div class="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">${getFileIcon(row.mime_type)}</div>`
    },
    { key: 'filename', label: 'Filename', sortable: true },
    { key: 'alt_text', label: 'Alt Text', sortable: true },
    { 
      key: 'file_size', 
      label: 'Size', 
      sortable: true,
      render: (value) => formatFileSize(value)
    },
    { 
      key: 'created_at', 
      label: 'Uploaded', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];
  
  // Form fields for editing media
  const formFields = [
    {
      key: 'filename',
      label: 'Filename',
      type: 'text',
      required: true,
      placeholder: 'Enter filename'
    },
    {
      key: 'alt_text',
      label: 'Alt Text',
      type: 'text',
      placeholder: 'Description for screen readers'
    },
    {
      key: 'caption',
      label: 'Caption',
      type: 'textarea',
      placeholder: 'Optional caption'
    },
    {
      key: 'folder',
      label: 'Folder',
      type: 'text',
      placeholder: '/images, /videos, etc.',
      defaultValue: '/'
    }
  ];
  
  // Upload form fields
  const uploadFields = [
    {
      key: 'file',
      label: 'Select File',
      type: 'file',
      required: true,
      accept: 'image/*,video/*,.pdf,.doc,.docx'
    },
    {
      key: 'alt_text',
      label: 'Alt Text',
      type: 'text',
      placeholder: 'Description for screen readers'
    },
    {
      key: 'caption',
      label: 'Caption',
      type: 'textarea',
      placeholder: 'Optional caption'
    },
    {
      key: 'folder',
      label: 'Folder',
      type: 'text',
      placeholder: '/images, /videos, etc.',
      defaultValue: '/'
    }
  ];
  
  // Modal state
  let showUploadForm = false;
  let showEditForm = false;
  let editingMedia = null;
  
  // Utility functions
  function formatFileSize(bytes) {
    if (!bytes) return 'Unknown';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  function getFileIcon(mimeType) {
    if (mimeType?.startsWith('image/')) return '🖼️';
    if (mimeType?.startsWith('video/')) return '🎥';
    return '📄';
  }
  
  // Event handlers
  function handleCreate() {
    showUploadForm = true;
  }
  
  function handleEdit(event) {
    editingMedia = event.detail;
    showEditForm = true;
  }
  
  async function handleDelete(event) {
    const media = event.detail;
    if (confirm(`Are you sure you want to delete "${media.filename}"?`)) {
      try {
        const response = await fetch(`/admin/media/${media.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await invalidateAll();
        } else {
          alert('Failed to delete media');
        }
      } catch (error) {
        console.error('Error deleting media:', error);
        alert('Failed to delete media');
      }
    }
  }
  
  async function handleUploadSubmit(event) {
    const formData = event.detail;
    
    try {
      const uploadData = new FormData();
      uploadData.append('file', formData.file);
      uploadData.append('alt_text', formData.alt_text || '');
      uploadData.append('caption', formData.caption || '');
      uploadData.append('folder', formData.folder || '/');
      
      const response = await fetch('/admin/media', {
        method: 'POST',
        body: uploadData
      });
      
      if (response.ok) {
        showUploadForm = false;
        await invalidateAll();
      } else {
        const error = await response.text();
        alert(`Failed to upload file: ${error}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  }
  
  async function handleEditSubmit(event) {
    const formData = event.detail;
    
    try {
      const response = await fetch(`/admin/media/${editingMedia.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        showEditForm = false;
        editingMedia = null;
        await invalidateAll();
      } else {
        const error = await response.text();
        alert(`Failed to update media: ${error}`);
      }
    } catch (error) {
      console.error('Error updating media:', error);
      alert('Failed to update media');
    }
  }
  
  function handleFormCancel() {
    showUploadForm = false;
    showEditForm = false;
    editingMedia = null;
  }
</script>

<svelte:head>
  <title>Media Library - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Media Library</h1>
      <p class="text-gray-600">Manage your images, videos, and documents</p>
    </div>
  </div>

  <!-- Data Table -->
  <DataTable
    {columns}
    data={data.media}
    title="All Media"
    searchPlaceholder="Search media files..."
    createButtonText="Upload File"
    createButtonIcon={Upload}
    on:create={handleCreate}
    on:edit={handleEdit}
    on:delete={handleDelete}
  />
</div>

<!-- Upload File Modal -->
{#if showUploadForm}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <FormBuilder
        title="Upload New File"
        fields={uploadFields}
        values={{}}
        submitText="Upload"
        on:submit={handleUploadSubmit}
        on:cancel={handleFormCancel}
      />
    </div>
  </div>
{/if}

<!-- Edit Media Modal -->
{#if showEditForm && editingMedia}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <FormBuilder
        title="Edit Media"
        fields={formFields}
        values={editingMedia}
        on:submit={handleEditSubmit}
        on:cancel={handleFormCancel}
      />
    </div>
  </div>
{/if}