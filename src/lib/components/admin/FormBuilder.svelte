<script>
  import { createEventDispatcher } from 'svelte';
  import { Save, X } from 'lucide-svelte';
  
  export let fields = [];
  export let values = {};
  export let title = '';
  export let submitLabel = 'Save';
  export let cancelLabel = 'Cancel';
  
  const dispatch = createEventDispatcher();
  
  let formData = { ...values };
  let errors = {};
  
  function handleSubmit() {
    errors = {};
    
    // Validate required fields
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    }
    
    if (Object.keys(errors).length === 0) {
      dispatch('submit', formData);
    }
  }
  
  function handleCancel() {
    dispatch('cancel');
  }
  
  function getFieldComponent(type) {
    switch (type) {
      case 'textarea':
        return 'textarea';
      case 'select':
        return 'select';
      case 'checkbox':
        return 'input';
      default:
        return 'input';
    }
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-6 border-b border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900">{title}</h2>
  </div>
  
  <form on:submit|preventDefault={handleSubmit} class="p-6 space-y-6">
    {#each fields as field}
      <div>
        <label for={field.name} class="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {#if field.required}
            <span class="text-red-500">*</span>
          {/if}
        </label>
        
        {#if field.type === 'textarea'}
          <textarea
            id={field.name}
            bind:value={formData[field.name]}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            class:border-red-500={errors[field.name]}
          />
        {:else if field.type === 'select'}
          <select
            id={field.name}
            bind:value={formData[field.name]}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            class:border-red-500={errors[field.name]}
          >
            <option value="">Select {field.label}</option>
            {#each field.options as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        {:else if field.type === 'checkbox'}
          <input
            type="checkbox"
            id={field.name}
            bind:checked={formData[field.name]}
            class="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
          />
        {:else if field.type === 'number'}
          <input
            type="number"
            id={field.name}
            bind:value={formData[field.name]}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            class:border-red-500={errors[field.name]}
          />
        {:else if field.type === 'date'}
          <input
            type="date"
            id={field.name}
            bind:value={formData[field.name]}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            class:border-red-500={errors[field.name]}
          />
        {:else if field.type === 'json'}
          <textarea
            id={field.name}
            bind:value={formData[field.name]}
            placeholder={field.placeholder || 'Enter valid JSON'}
            rows={field.rows || 5}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono text-sm"
            class:border-red-500={errors[field.name]}
          />
        {:else}
          <input
            type={field.type || 'text'}
            id={field.name}
            bind:value={formData[field.name]}
            placeholder={field.placeholder}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            class:border-red-500={errors[field.name]}
          />
        {/if}
        
        {#if field.hint}
          <p class="mt-1 text-sm text-gray-500">{field.hint}</p>
        {/if}
        
        {#if errors[field.name]}
          <p class="mt-1 text-sm text-red-600">{errors[field.name]}</p>
        {/if}
      </div>
    {/each}
    
    <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
      <button
        type="button"
        on:click={handleCancel}
        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <X class="h-4 w-4" />
        {cancelLabel}
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
      >
        <Save class="h-4 w-4" />
        {submitLabel}
      </button>
    </div>
  </form>
</div>