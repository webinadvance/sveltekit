<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let componentName;
  export let componentData;
  
  // Local copy for editing
  let editData = { ...componentData };
  
  function handleSave() {
    dispatch('save', editData);
  }
  
  function handleCancel() {
    dispatch('cancel');
  }
  
  function updateField(field, value) {
    editData = { ...editData, [field]: value };
  }
  
  // Get field type for appropriate input
  function getFieldType(value) {
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string' && value.length > 100) return 'textarea';
    return 'text';
  }
  
  function isHtmlContent(value) {
    return typeof value === 'string' && (value.includes('<') || value.includes('&'));
  }
</script>

<div class="component-editor">
  <div class="editor-header">
    <h3 class="editor-title">
      ✏️ Editing: {componentName}
    </h3>
    <div class="editor-actions">
      <button class="cancel-btn" on:click={handleCancel}>
        Cancel
      </button>
      <button class="save-btn" on:click={handleSave}>
        Save Changes
      </button>
    </div>
  </div>
  
  <div class="editor-content">
    {#each Object.entries(editData) as [field, value]}
      <div class="field-group">
        <label class="field-label" for="field-{field}">
          {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </label>
        
        {#if getFieldType(value) === 'checkbox'}
          <input
            id="field-{field}"
            type="checkbox"
            bind:checked={editData[field]}
            class="field-checkbox"
          />
        {:else if getFieldType(value) === 'textarea' || isHtmlContent(value)}
          <textarea
            id="field-{field}"
            bind:value={editData[field]}
            class="field-textarea"
            rows="4"
            placeholder="Enter {field}..."
          />
        {:else if getFieldType(value) === 'number'}
          <input
            id="field-{field}"
            type="number"
            bind:value={editData[field]}
            class="field-input"
            placeholder="Enter {field}..."
          />
        {:else}
          <input
            id="field-{field}"
            type="text"
            bind:value={editData[field]}
            class="field-input"
            placeholder="Enter {field}..."
          />
        {/if}
        
        {#if isHtmlContent(value)}
          <p class="field-hint">Supports HTML tags</p>
        {/if}
      </div>
    {/each}
  </div>
  
  <div class="editor-footer">
    <p class="editor-info">
      💡 Changes are saved to the database and will be visible immediately
    </p>
  </div>
</div>

<style>
  .component-editor {
    background: white;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .editor-header {
    background: #f8fafc;
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .editor-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
  
  .editor-actions {
    display: flex;
    gap: 8px;
  }
  
  .cancel-btn, .save-btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .cancel-btn {
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }
  
  .cancel-btn:hover {
    background: #e2e8f0;
  }
  
  .save-btn {
    background: #10b981;
    color: white;
    border: 1px solid #10b981;
  }
  
  .save-btn:hover {
    background: #059669;
  }
  
  .editor-content {
    padding: 20px;
    max-height: 400px;
    overflow-y: auto;
  }
  
  .field-group {
    margin-bottom: 16px;
  }
  
  .field-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
  }
  
  .field-input, .field-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s ease;
  }
  
  .field-input:focus, .field-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .field-checkbox {
    width: 18px;
    height: 18px;
    accent-color: #3b82f6;
  }
  
  .field-hint {
    font-size: 12px;
    color: #6b7280;
    margin-top: 4px;
    margin-bottom: 0;
  }
  
  .editor-footer {
    background: #f8fafc;
    padding: 12px 16px;
    border-top: 1px solid #e2e8f0;
  }
  
  .editor-info {
    margin: 0;
    font-size: 12px;
    color: #6b7280;
  }
</style>