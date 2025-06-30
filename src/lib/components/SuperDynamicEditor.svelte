<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { activeTheme } from '$lib/styles/themes.js';
  
  const dispatch = createEventDispatcher();
  
  export let componentName;
  export let componentData;
  export let componentSchema = null;
  
  // Local copy for editing
  let editData = { ...componentData };
  let errors = {};
  
  // Get schema if available
  onMount(async () => {
    if (!componentSchema) {
      // Fetch schema from API if needed
      try {
        const response = await fetch(`/api/components/${componentName}/schema`);
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            componentSchema = result.schema;
            console.log('Loaded schema for', componentName, componentSchema);
          }
        }
      } catch (e) {
        console.log('No schema available, using data-driven approach');
      }
    }
  });
  
  function handleSave() {
    if (validateForm()) {
      dispatch('save', editData);
    }
  }
  
  function handleCancel() {
    dispatch('cancel');
  }
  
  // Get field configuration from schema or auto-detect
  function getFieldConfig(field, value) {
    if (componentSchema?.properties?.[field]) {
      return componentSchema.properties[field];
    }
    
    // Auto-detect if no schema - enhanced for image fields
    const detectedFormat = detectFormat(value);
    const config = {
      type: detectType(value),
      title: formatFieldName(field),
      format: detectedFormat
    };
    
    // Special handling for image-related fields
    if (field.toLowerCase().includes('image') || field.toLowerCase().includes('photo') || field.toLowerCase().includes('picture')) {
      config.format = 'image';
    }
    
    return config;
  }
  
  // Auto-detect field type from value
  function detectType(value) {
    if (value === null || value === undefined) return 'string';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return 'string';
  }
  
  // Detect special formats
  function detectFormat(value) {
    if (typeof value !== 'string') return null;
    
    // Image URL detection (prioritize this for background_image, image_url fields)
    if (value.match(/\.(jpg|jpeg|png|gif|webp)$/i) || value.startsWith('/uploads/')) return 'image';
    
    // Color detection
    if (value.match(/^#[0-9a-f]{3,6}$/i) || value.match(/^rgb/)) return 'color';
    
    // URL detection
    if (value.match(/^https?:\/\//)) return 'url';
    
    // Email detection
    if (value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'email';
    
    // HTML detection
    if (value.includes('<') && value.includes('>')) return 'html';
    
    // Long text
    if (value.length > 100) return 'textarea';
    
    return null;
  }
  
  // Format field name for display
  function formatFieldName(field) {
    return field
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/\b\w/g, l => l.toUpperCase())
      .trim();
  }
  
  // Get input type for field
  function getInputType(config) {
    const { type, format, enum: enumValues } = config;
    
    if (enumValues) return 'select';
    if (type === 'boolean') return 'checkbox';
    if (type === 'number') return 'number';
    if (type === 'array') return 'array';
    if (type === 'object') return 'object';
    
    // String formats
    if (format === 'image') return 'image';
    if (format === 'color') return 'color';
    if (format === 'url') return 'url';
    if (format === 'email') return 'email';
    if (format === 'textarea' || format === 'html') return 'textarea';
    if (format === 'date') return 'date';
    if (format === 'time') return 'time';
    if (format === 'datetime') return 'datetime-local';
    
    return 'text';
  }
  
  // Validate form based on schema
  function validateForm() {
    errors = {};
    
    if (!componentSchema) return true;
    
    // Check required fields
    const required = componentSchema.required || [];
    for (const field of required) {
      if (!editData[field] || editData[field] === '') {
        errors[field] = 'This field is required';
      }
    }
    
    // Check field constraints
    for (const [field, config] of Object.entries(componentSchema.properties || {})) {
      const value = editData[field];
      
      if (config.minimum !== undefined && value < config.minimum) {
        errors[field] = `Minimum value is ${config.minimum}`;
      }
      
      if (config.maximum !== undefined && value > config.maximum) {
        errors[field] = `Maximum value is ${config.maximum}`;
      }
      
      if (config.minLength !== undefined && value.length < config.minLength) {
        errors[field] = `Minimum length is ${config.minLength} characters`;
      }
      
      if (config.maxLength !== undefined && value.length > config.maxLength) {
        errors[field] = `Maximum length is ${config.maxLength} characters`;
      }
      
      if (config.pattern && !new RegExp(config.pattern).test(value)) {
        errors[field] = config.patternError || 'Invalid format';
      }
    }
    
    return Object.keys(errors).length === 0;
  }
  
  // Handle array operations
  function addArrayItem(field, itemSchema) {
    if (!editData[field]) editData[field] = [];
    
    const newItem = itemSchema?.properties 
      ? Object.keys(itemSchema.properties).reduce((acc, key) => {
          acc[key] = itemSchema.properties[key].default || '';
          return acc;
        }, {})
      : '';
    
    editData[field] = [...editData[field], newItem];
  }
  
  function removeArrayItem(field, index) {
    editData[field] = editData[field].filter((_, i) => i !== index);
  }
  
  function updateArrayItem(field, index, value) {
    editData[field][index] = value;
    editData = editData; // Trigger reactivity
  }
  
  // Image upload functionality
  let uploadingImages = {};
  
  async function handleImageUpload(field, event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Show uploading state
    uploadingImages[field] = true;
    uploadingImages = { ...uploadingImages };
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt_text', `${formatFieldName(field)} image`);
      formData.append('folder', '/components');
      
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        editData[field] = result.media.url;
        editData = editData; // Trigger reactivity
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      uploadingImages[field] = false;
      uploadingImages = { ...uploadingImages };
    }
  }
  
  async function selectFromMediaLibrary(field) {
    try {
      const response = await fetch('/api/media/upload?limit=50');
      const result = await response.json();
      
      if (result.success && result.media.length > 0) {
        // Simple selection - in a full implementation, you'd show a modal
        const selected = result.media[0]; // For demo, select first image
        editData[field] = selected.url;
        editData = editData; // Trigger reactivity
      } else {
        alert('No images found in media library');
      }
    } catch (error) {
      console.error('Media library error:', error);
      alert('Failed to load media library');
    }
  }
</script>

<div class="super-editor" style="
  --primary-color: {activeTheme.primary};
  --secondary-color: {activeTheme.secondary};
  --accent-color: {activeTheme.accent};
  --title-font: {activeTheme.typography.title.fontFamily};
  --title-weight: {activeTheme.typography.title.fontWeight};
  --body-font: {activeTheme.typography.body.fontFamily};
  --neon-glow-small: {activeTheme.neon.glow.small};
  --neon-glow-medium: {activeTheme.neon.glow.medium};
  --neon-title-shadow: {activeTheme.neon.title.textShadow};
  --button-border: {activeTheme.neon.button.border};
  --button-glow: {activeTheme.neon.button.glow};
  --button-hover-glow: {activeTheme.neon.button.hoverGlow};
">
  <div class="editor-header">
    <h3 class="editor-title">
      Editing: {componentName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </h3>
    <div class="editor-actions">
      <button class="btn-cancel" on:click={handleCancel}>
        Cancel
      </button>
      <button class="btn-save" on:click={handleSave}>
        Save Changes
      </button>
    </div>
  </div>
  
  <div class="editor-content">
    {#each Object.entries(editData) as [field, value]}
      {@const config = getFieldConfig(field, value)}
      {@const inputType = getInputType(config)}
      {@const isRequired = componentSchema?.required?.includes(field)}
      
      <div class="field-wrapper">
        <label class="field-label" for="field-{field}">
          {config.title || formatFieldName(field)}
          {#if isRequired}<span class="required">*</span>{/if}
        </label>
        
        {#if config.description}
          <p class="field-description">{config.description}</p>
        {/if}
        
        {#if inputType === 'checkbox'}
          <label class="checkbox-wrapper">
            <input
              id="field-{field}"
              type="checkbox"
              bind:checked={editData[field]}
              class="field-checkbox"
            />
            <span class="checkbox-label">
              {config.checkboxLabel || 'Enabled'}
            </span>
          </label>
          
        {:else if inputType === 'select'}
          <select
            id="field-{field}"
            bind:value={editData[field]}
            class="field-select"
            class:error={errors[field]}
          >
            <option value="">Choose...</option>
            {#each config.enum as option}
              <option value={option}>
                {config.enumLabels?.[option] || option}
              </option>
            {/each}
          </select>
          
        {:else if inputType === 'textarea'}
          <textarea
            id="field-{field}"
            bind:value={editData[field]}
            class="field-textarea"
            class:error={errors[field]}
            rows="5"
            placeholder={config.placeholder || `Enter ${config.title || field}...`}
          />
          {#if config.format === 'html'}
            <p class="field-hint">💡 HTML tags are supported</p>
          {/if}
          
        {:else if inputType === 'color'}
          <div class="color-input-wrapper">
            <input
              id="field-{field}"
              type="color"
              bind:value={editData[field]}
              class="field-color"
            />
            <input
              type="text"
              bind:value={editData[field]}
              class="field-input color-text"
              class:error={errors[field]}
              placeholder="#000000"
            />
          </div>
          
        {:else if inputType === 'image'}
          <div class="image-field">
            <div class="image-preview-wrapper">
              {#if editData[field]}
                <div class="image-preview">
                  <img src={editData[field]} alt="Preview" class="preview-img" />
                  <button 
                    class="btn-remove-image"
                    on:click={() => editData[field] = ''}
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              {:else}
                <div class="image-placeholder">
                  No image selected
                </div>
              {/if}
            </div>
            
            <div class="image-controls">
              <label class="btn-upload" class:uploading={uploadingImages[field]}>
                {#if uploadingImages[field]}
                  Uploading...
                {:else}
                  Upload Image
                {/if}
                <input
                  type="file"
                  accept="image/*"
                  on:change={(e) => handleImageUpload(field, e)}
                  class="file-input"
                  disabled={uploadingImages[field]}
                />
              </label>
              
              <button 
                class="btn-library"
                on:click={() => selectFromMediaLibrary(field)}
                disabled={uploadingImages[field]}
              >
                Media Library
              </button>
              
              <input
                type="url"
                bind:value={editData[field]}
                class="field-input url-input"
                class:error={errors[field]}
                placeholder="Or paste image URL..."
              />
            </div>
          </div>
          
        {:else if inputType === 'array'}
          <div class="array-field">
            {#if editData[field] && editData[field].length > 0}
              {#each editData[field] as item, index}
                <div class="array-item">
                  {#if typeof item === 'object'}
                    <div class="array-object">
                      {#each Object.entries(item) as [subField, subValue]}
                        <input
                          type="text"
                          placeholder={subField}
                          value={subValue}
                          on:input={(e) => {
                            item[subField] = e.target.value;
                            updateArrayItem(field, index, item);
                          }}
                          class="array-input"
                        />
                      {/each}
                    </div>
                  {:else}
                    <input
                      type="text"
                      bind:value={editData[field][index]}
                      class="array-input"
                    />
                  {/if}
                  <button 
                    class="btn-remove"
                    on:click={() => removeArrayItem(field, index)}
                    title="Remove item"
                  >
                    Remove
                  </button>
                </div>
              {/each}
            {:else}
              <p class="empty-array">No items yet</p>
            {/if}
            <button 
              class="btn-add"
              on:click={() => addArrayItem(field, config.items)}
            >
              Add {config.itemName || 'Item'}
            </button>
          </div>
          
        {:else}
          <input
            id="field-{field}"
            type={inputType}
            bind:value={editData[field]}
            class="field-input"
            class:error={errors[field]}
            placeholder={config.placeholder || `Enter ${config.title || field}...`}
            min={config.minimum}
            max={config.maximum}
            minlength={config.minLength}
            maxlength={config.maxLength}
            pattern={config.pattern}
          />
        {/if}
        
        {#if errors[field]}
          <p class="field-error">⚠️ {errors[field]}</p>
        {/if}
      </div>
    {/each}
  </div>
  
  <div class="editor-footer">
    <p class="editor-info">
      Changes are saved to the database in real-time
    </p>
  </div>
</div>

<style>
  .super-editor {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .editor-header {
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .editor-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  
  .editor-actions {
    display: flex;
    gap: 10px;
  }
  
  .btn-cancel, .btn-save {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid;
    font-family: inherit;
  }
  
  .btn-cancel {
    border-color: #6c757d;
    color: #6c757d;
    background: white;
  }
  
  .btn-cancel:hover {
    background: #f8f9fa;
    border-color: #5a6268;
    color: #5a6268;
  }
  
  .btn-save {
    border-color: #007bff;
    color: white;
    background: #007bff;
  }
  
  .btn-save:hover {
    background: #0056b3;
    border-color: #0056b3;
  }
  
  .editor-content {
    padding: 20px;
    max-height: 500px;
    overflow-y: auto;
    background: white;
  }
  
  .field-wrapper {
    margin-bottom: 16px;
  }
  
  .field-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    margin-bottom: 6px;
    font-family: inherit;
  }
  
  .required {
    color: #dc3545;
    margin-left: 2px;
  }
  
  .field-description {
    font-size: 12px;
    color: #6c757d;
    margin: 4px 0 6px 0;
  }
  
  .field-input, .field-textarea, .field-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.2s ease;
    background: white;
    color: #495057;
    font-family: inherit;
  }
  
  .field-input:focus, .field-textarea:focus, .field-select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  .field-input.error, .field-textarea.error, .field-select.error {
    border-color: #dc3545;
  }
  
  .field-checkbox {
    width: 18px;
    height: 18px;
    accent-color: #007bff;
  }
  
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  .checkbox-label {
    font-size: 14px;
    color: #495057;
    font-family: inherit;
  }
  
  .color-input-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .field-color {
    width: 50px;
    height: 32px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .color-text {
    flex: 1;
  }
  
  .array-field {
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 12px;
    background: #f8f9fa;
  }
  
  .array-item {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .array-object {
    flex: 1;
    display: flex;
    gap: 8px;
  }
  
  .array-input {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 13px;
    background: white;
    color: #495057;
  }
  
  .btn-remove {
    padding: 6px 8px;
    background: white;
    border: 1px solid #dc3545;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    color: #dc3545;
    font-size: 12px;
  }
  
  .btn-remove:hover {
    background: #dc3545;
    color: white;
  }
  
  .btn-add {
    margin-top: 8px;
    padding: 6px 12px;
    background: #28a745;
    border: 1px solid #28a745;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    color: white;
    font-family: inherit;
  }
  
  .btn-add:hover {
    background: #218838;
    border-color: #218838;
  }
  
  .empty-array {
    color: #6c757d;
    font-style: italic;
    margin: 8px 0;
    text-align: center;
    font-size: 13px;
  }
  
  .field-hint {
    font-size: 12px;
    color: #6c757d;
    margin-top: 4px;
  }
  
  .field-error {
    font-size: 12px;
    color: #dc3545;
    margin-top: 4px;
  }
  
  .editor-footer {
    background: #f8f9fa;
    padding: 12px 20px;
    border-top: 1px solid #e9ecef;
  }
  
  .editor-info {
    margin: 0;
    font-size: 12px;
    color: #6c757d;
    text-align: center;
    font-family: inherit;
  }
  
  /* Scrollbar styling */
  .editor-content::-webkit-scrollbar {
    width: 6px;
  }
  
  .editor-content::-webkit-scrollbar-track {
    background: #f8f9fa;
  }
  
  .editor-content::-webkit-scrollbar-thumb {
    background: #dee2e6;
    border-radius: 3px;
  }
  
  .editor-content::-webkit-scrollbar-thumb:hover {
    background: #adb5bd;
  }
  
  /* Image field styles */
  .image-field {
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 12px;
    background: #f8f9fa;
  }
  
  .image-preview-wrapper {
    margin-bottom: 16px;
  }
  
  .image-preview {
    position: relative;
    display: inline-block;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #dee2e6;
  }
  
  .preview-img {
    max-width: 200px;
    max-height: 150px;
    object-fit: cover;
    display: block;
  }
  
  .btn-remove-image {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    background: rgba(220, 53, 69, 0.8);
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    line-height: 1;
  }
  
  .btn-remove-image:hover {
    background: #dc3545;
  }
  
  .image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    border: 1px dashed #adb5bd;
    border-radius: 4px;
    color: #6c757d;
    font-size: 13px;
    background: white;
  }
  
  .image-controls {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .btn-upload {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background: #007bff;
    color: white;
    border: 1px solid #007bff;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    font-family: inherit;
  }
  
  .btn-upload:hover:not(.uploading) {
    background: #0056b3;
    border-color: #0056b3;
  }
  
  .btn-upload.uploading {
    background: #6c757d;
    border-color: #6c757d;
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .file-input {
    position: absolute;
    left: -9999px;
    opacity: 0;
  }
  
  .btn-library {
    padding: 6px 12px;
    background: white;
    color: #6c757d;
    border: 1px solid #6c757d;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }
  
  .btn-library:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #5a6268;
    color: #5a6268;
  }
  
  .btn-library:disabled {
    background: #f8f9fa;
    border-color: #dee2e6;
    color: #adb5bd;
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .url-input {
    flex: 1;
    min-width: 200px;
  }
</style>