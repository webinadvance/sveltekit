<script>
  import FormBuilder from '$lib/components/admin/FormBuilder.svelte';
  import { invalidateAll } from '$app/navigation';
  import { Settings, Save } from 'lucide-svelte';
  
  export let data;
  
  // Settings form fields
  const settingsFields = [
    {
      key: 'site_title',
      label: 'Site Title',
      type: 'text',
      placeholder: 'Your website title',
      category: 'general'
    },
    {
      key: 'site_description',
      label: 'Site Description',
      type: 'textarea',
      placeholder: 'Brief description of your website',
      category: 'general'
    },
    {
      key: 'contact_email',
      label: 'Contact Email',
      type: 'email',
      placeholder: 'your@email.com',
      category: 'contact'
    },
    {
      key: 'social_instagram',
      label: 'Instagram URL',
      type: 'url',
      placeholder: 'https://instagram.com/username',
      category: 'social'
    },
    {
      key: 'social_facebook',
      label: 'Facebook URL',
      type: 'url',
      placeholder: 'https://facebook.com/username',
      category: 'social'
    },
    {
      key: 'social_linkedin',
      label: 'LinkedIn URL',
      type: 'url',
      placeholder: 'https://linkedin.com/in/username',
      category: 'social'
    },
    {
      key: 'social_twitter',
      label: 'Twitter URL',
      type: 'url',
      placeholder: 'https://twitter.com/username',
      category: 'social'
    },
    {
      key: 'google_analytics_id',
      label: 'Google Analytics ID',
      type: 'text',
      placeholder: 'GA-XXXXXXXXX-X',
      category: 'analytics'
    },
    {
      key: 'maintenance_mode',
      label: 'Maintenance Mode',
      type: 'checkbox',
      help: 'Enable to show maintenance page to visitors',
      category: 'general'
    },
    {
      key: 'theme_color',
      label: 'Theme Color',
      type: 'select',
      options: [
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'purple', label: 'Purple' },
        { value: 'orange', label: 'Orange' }
      ],
      defaultValue: 'blue',
      category: 'appearance'
    }
  ];
  
  // Group settings by category
  $: settingsByCategory = settingsFields.reduce((acc, field) => {
    const category = field.category || 'general';
    if (!acc[category]) acc[category] = [];
    acc[category].push(field);
    return acc;
  }, {});
  
  // Prepare form values from data
  $: formValues = data.settings || {};
  
  let saving = false;
  
  async function handleSubmit(event) {
    saving = true;
    const formData = event.detail;
    
    try {
      const response = await fetch('/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        await invalidateAll();
        // Show success message
        const successEl = document.createElement('div');
        successEl.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        successEl.textContent = 'Settings saved successfully!';
        document.body.appendChild(successEl);
        setTimeout(() => successEl.remove(), 3000);
      } else {
        const error = await response.text();
        alert(`Failed to save settings: ${error}`);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      saving = false;
    }
  }
</script>

<svelte:head>
  <title>Settings - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Page Header -->
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600">Configure your website settings</p>
    </div>
  </div>

  <!-- Settings Form by Category -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    
    {#each Object.entries(settingsByCategory) as [category, fields]}
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 capitalize">
            {category} Settings
          </h3>
        </div>
        
        <div class="p-6">
          <div class="space-y-4">
            {#each fields as field}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {#if field.required}
                    <span class="text-red-500">*</span>
                  {/if}
                </label>
                
                {#if field.type === 'textarea'}
                  <textarea
                    bind:value={formValues[field.key]}
                    placeholder={field.placeholder}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  ></textarea>
                {:else if field.type === 'select'}
                  <select
                    bind:value={formValues[field.key]}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {#each field.options as option}
                      <option value={option.value}>{option.label}</option>
                    {/each}
                  </select>
                {:else if field.type === 'checkbox'}
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      bind:checked={formValues[field.key]}
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-600">{field.help}</span>
                  </div>
                {:else}
                  <input
                    type={field.type}
                    bind:value={formValues[field.key]}
                    placeholder={field.placeholder}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                {/if}
                
                {#if field.help && field.type !== 'checkbox'}
                  <p class="mt-1 text-sm text-gray-500">{field.help}</p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Save Button -->
  <div class="flex justify-end">
    <button
      on:click={() => handleSubmit({ detail: formValues })}
      disabled={saving}
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {#if saving}
        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Saving...
      {:else}
        <Save class="h-4 w-4 mr-2" />
        Save Settings
      {/if}
    </button>
  </div>
</div>