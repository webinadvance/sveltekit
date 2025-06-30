<script>
  import { isEditMode, editingComponentId, editingComponentData, editModeStore } from '$lib/stores/editMode.js';
  import SuperDynamicEditor from './SuperDynamicEditor.svelte';
  
  export let componentId;
  export let componentName;
  export let componentData;
  export let pageComponentId; // Database ID for saving
  
  $: isCurrentlyEditing = $editingComponentId === componentId;
  $: showEditOverlay = $isEditMode && !isCurrentlyEditing;
  
  function handleEditClick() {
    if ($isEditMode) {
      editModeStore.startEditing(componentId, componentData);
    }
  }
  
  function handleSave(newData) {
    editModeStore.saveComponent(pageComponentId, newData);
    editModeStore.stopEditing();
  }
  
  function handleCancel() {
    editModeStore.stopEditing();
  }
</script>

<div class="editable-wrapper" class:edit-mode={$isEditMode} class:editing={isCurrentlyEditing}>
  <!-- Edit overlay when in edit mode but not currently editing -->
  {#if showEditOverlay}
    <div class="edit-overlay" on:click={handleEditClick}>
      <div class="edit-indicator">
        <span class="edit-icon">✏️</span>
        <span class="edit-text">Click to edit {componentName}</span>
      </div>
    </div>
  {/if}
  
  <!-- Component editor when actively editing -->
  {#if isCurrentlyEditing}
    <div class="editor-container">
      <SuperDynamicEditor 
        {componentName}
        componentData={$editingComponentData}
        on:save={(event) => handleSave(event.detail)}
        on:cancel={handleCancel}
      />
    </div>
  {:else}
    <!-- Normal component view -->
    <div class="component-content" class:hover-highlight={showEditOverlay}>
      <slot />
    </div>
  {/if}
</div>

<style>
  .editable-wrapper {
    position: relative;
    transition: all 0.2s ease;
  }
  
  .edit-mode {
    outline: 2px dashed transparent;
    outline-offset: 4px;
  }
  
  .edit-mode:hover {
    outline-color: #3b82f6;
  }
  
  .editing {
    outline: 2px solid #10b981;
    outline-offset: 4px;
    background: #f0f9ff;
  }
  
  .edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(59, 130, 246, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .edit-overlay:hover {
    opacity: 1;
  }
  
  .edit-indicator {
    background: #3b82f6;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .edit-icon {
    font-size: 16px;
  }
  
  .component-content.hover-highlight:hover {
    background: rgba(59, 130, 246, 0.05);
  }
  
  .editor-container {
    min-height: 200px;
    background: white;
    border: 2px solid #10b981;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
</style>