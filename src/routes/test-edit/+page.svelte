<script>
  import { onMount } from 'svelte';
  import { isEditMode, editModeStore } from '$lib/stores/editMode.js';
  
  let componentData = {
    title: "Original Title",
    content: "Original content"
  };
  
  let savedData = null;
  let error = null;
  
  async function testSave() {
    try {
      const response = await fetch('/api/page-components', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: 1,
          component_data: {
            title: "Updated Title " + new Date().toLocaleTimeString(),
            subtitle: "Updated via test page",
            content: "<p>This was updated at " + new Date().toLocaleTimeString() + "</p>",
            background_color: "bg-blue-100"
          }
        })
      });
      
      const result = await response.json();
      savedData = result;
      
      // Check database after save
      setTimeout(checkDatabase, 1000);
    } catch (err) {
      error = err.message;
    }
  }
  
  async function checkDatabase() {
    try {
      const response = await fetch('/api/page-components/check/1');
      const data = await response.json();
      console.log('Database check:', data);
    } catch (err) {
      console.error('Failed to check database:', err);
    }
  }
  
  onMount(() => {
    editModeStore.enableEditMode();
  });
</script>

<div class="container mx-auto p-8">
  <h1 class="text-2xl font-bold mb-4">Edit Mode Test Page</h1>
  
  <div class="mb-4 p-4 bg-gray-100 rounded">
    <p>Edit Mode: <strong>{$isEditMode ? 'ON' : 'OFF'}</strong></p>
  </div>
  
  <div class="mb-4">
    <button 
      on:click={testSave}
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Test Save Component Data
    </button>
  </div>
  
  {#if savedData}
    <div class="mb-4 p-4 bg-green-100 rounded">
      <h3 class="font-bold">Save Result:</h3>
      <pre>{JSON.stringify(savedData, null, 2)}</pre>
    </div>
  {/if}
  
  {#if error}
    <div class="mb-4 p-4 bg-red-100 rounded">
      <h3 class="font-bold">Error:</h3>
      <p>{error}</p>
    </div>
  {/if}
  
  <div class="mt-8">
    <h2 class="text-xl font-bold mb-2">Instructions:</h2>
    <ol class="list-decimal list-inside space-y-2">
      <li>Click "Test Save Component Data" to update component ID 1</li>
      <li>Check the console for database verification</li>
      <li>Navigate to the homepage to see if the changes persist</li>
      <li>Or refresh the homepage if it's already open</li>
    </ol>
  </div>
</div>