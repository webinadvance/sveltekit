<script>
  export let data;
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta name="description" content={data.description} />
</svelte:head>

<div class="min-h-screen bg-white flex items-center justify-center">
  <div class="max-w-md mx-auto text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">
      Clean SvelteKit App
    </h1>
    <p class="text-gray-600">
      Ready for development
    </p>
  </div>
</div>