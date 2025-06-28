<script>
  import { getAppBackground } from '$lib/styles/themes.js';
  import { onMount } from 'svelte';
  
  // Import semantic section components
  import {
    Hero,
    Biography,
    PortfolioGallery,
    PhotoGallery,
    CurrentShows,
    Experience,
    Showreel,
    DigitalProjects,
    Contact,
    Footer
  } from '$lib/components/sections';
  
  // Data now comes from server (SSR)
  export let data;
  
  $: appBackground = getAppBackground();
  
  // Parallax scrolling for sections that need it
  let scrollY = 0;
  
  onMount(() => {
    const handleScroll = () => scrollY = window.scrollY;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:window bind:scrollY />

<!-- Professional Actress Portfolio - Component-Based Architecture -->
<div class="min-h-screen overflow-x-hidden">

  <!-- Hero Section -->
  <Hero {...data.heroData} />

  <!-- Biography Section -->
  <Biography {...data.biographyData} />

  <!-- Portfolio Gallery Section -->
  <PortfolioGallery {...data.portfolioGalleryData} backgroundColor={appBackground} />

  <!-- Portfolio Gallery Grid Section -->
  <PhotoGallery {...data.photoGalleryData} />

  <!-- Current Shows Section -->
  <CurrentShows {...data.currentShowsData} />

  <!-- Experience Section -->
  <Experience {...data.experienceData} />

  <!-- Showreel Section -->
  <Showreel {...data.showreelData} />

  <!-- Digital Projects and Training Section -->
  <DigitalProjects {...data.digitalProjectsData} {scrollY} />

  <!-- Contact Section -->
  <Contact {...data.contactData} />

  <!-- Footer -->
  <Footer {...data.footerData} />

</div>