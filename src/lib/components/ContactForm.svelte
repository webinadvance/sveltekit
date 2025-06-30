<script>
  export let title = "Contact Us";
  export let subtitle = "";
  export let success_message = "Thank you for your message!";
  export let fields = [];
  
  let formData = {};
  let isSubmitting = false;
  let submitted = false;
  
  // Initialize form data based on fields
  $: if (fields && fields.length > 0) {
    formData = fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {});
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      submitted = true;
      isSubmitting = false;
      
      // Reset form after a few seconds
      setTimeout(() => {
        submitted = false;
        formData = fields.reduce((acc, field) => {
          acc[field.name] = '';
          return acc;
        }, {});
      }, 3000);
    }, 1000);
  }
</script>

<section class="contact-form-section py-16 bg-gray-50">
  <div class="container mx-auto px-4 max-w-2xl">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {#if subtitle}
        <p class="text-xl text-gray-600">{subtitle}</p>
      {/if}
    </div>
    
    {#if submitted}
      <div class="text-center py-12">
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
        <p class="text-gray-600">{success_message}</p>
      </div>
    {:else}
      <form on:submit={handleSubmit} class="space-y-6">
        {#if fields && fields.length > 0}
          {#each fields as field}
            <div>
              <label for={field.name} class="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {#if field.required}
                  <span class="text-red-500">*</span>
                {/if}
              </label>
              
              {#if field.type === 'textarea'}
                <textarea 
                  id={field.name}
                  name={field.name}
                  bind:value={formData[field.name]}
                  required={field.required}
                  rows="6"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your {field.label.toLowerCase()}..."
                ></textarea>
              {:else}
                <input 
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  bind:value={formData[field.name]}
                  required={field.required}
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your {field.label.toLowerCase()}..."
                />
              {/if}
            </div>
          {/each}
          
          <div class="text-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              {#if isSubmitting}
                Sending...
              {:else}
                Send Message
              {/if}
            </button>
          </div>
        {:else}
          <div class="text-center py-8">
            <p class="text-gray-500">No form fields configured.</p>
          </div>
        {/if}
      </form>
    {/if}
  </div>
</section>

<style>
  .contact-form-section {
    min-height: 60vh;
  }
</style>