import { writable } from 'svelte/store';

// Global edit mode state
export const isEditMode = writable(false);

// Currently editing component ID
export const editingComponentId = writable(null);

// Component data being edited (local copy)
export const editingComponentData = writable(null);

// Functions to manage edit mode
export const editModeStore = {
  // Enable edit mode for the entire page
  enableEditMode() {
    isEditMode.set(true);
  },
  
  // Disable edit mode
  disableEditMode() {
    isEditMode.set(false);
    editingComponentId.set(null);
    editingComponentData.set(null);
  },
  
  // Start editing a specific component
  startEditing(componentId, componentData) {
    editingComponentId.set(componentId);
    // Create a deep copy for editing
    editingComponentData.set(JSON.parse(JSON.stringify(componentData)));
  },
  
  // Stop editing current component
  stopEditing() {
    editingComponentId.set(null);
    editingComponentData.set(null);
  },
  
  // Update the editing data
  updateEditingData(newData) {
    editingComponentData.set(newData);
  },
  
  // Save component changes
  async saveComponent(pageComponentId, newData) {
    try {
      const response = await fetch('/api/page-components', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: pageComponentId,
          component_data: newData
        })
      });
      
      if (response.ok) {
        // Reload the page to show updated data
        window.location.reload();
      } else {
        console.error('Failed to save component');
      }
    } catch (error) {
      console.error('Error saving component:', error);
    }
  }
};