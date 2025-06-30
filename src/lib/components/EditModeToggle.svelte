<script>
  import { isEditMode, editModeStore } from '$lib/stores/editMode.js';
  
  function toggleEditMode() {
    if ($isEditMode) {
      editModeStore.disableEditMode();
    } else {
      editModeStore.enableEditMode();
    }
  }
</script>

<!-- Floating Edit Mode Button -->
<button 
  class="floating-toggle-btn" 
  class:active={$isEditMode}
  on:click={toggleEditMode}
  title="{$isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}"
>
  {#if $isEditMode}
    <!-- Material Design visibility icon -->
    <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
    <span class="btn-text">View Mode</span>
  {:else}
    <!-- Material Design edit icon -->
    <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
    <span class="btn-text">Edit Mode</span>
  {/if}
</button>

<style>
  .floating-toggle-btn {
    position: fixed;
    bottom: 50px;
    left: 32px;
    z-index: 1000;
    
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    
    background: #1a1a1a;
    border: none;
    border-radius: 28px;
    
    color: rgba(255, 255, 255, 0.87);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.25px;
    
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    box-shadow: 
      0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12);
  }
  
  .floating-toggle-btn:hover {
    transform: translateY(-1px);
    background: #2a2a2a;
    box-shadow: 
      0 5px 8px -2px rgba(0, 0, 0, 0.3),
      0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 3px 20px 0 rgba(0, 0, 0, 0.15);
  }
  
  .floating-toggle-btn.active {
    background: #1976d2;
    color: white;
  }
  
  .floating-toggle-btn.active:hover {
    background: #1565c0;
  }
  
  .icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  
  .btn-text {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }
  
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .floating-toggle-btn {
      bottom: 24px;
      padding: 10px 20px;
      font-size: 13px;
    }
    
    .icon {
      width: 20px;
      height: 20px;
    }
    
    .btn-text {
      font-size: 13px;
    }
  }
  
  /* Ultra small devices */
  @media (max-width: 480px) {
    .floating-toggle-btn {
      padding: 10px 16px;
    }
    
    .btn-text {
      display: none;
    }
  }
</style>