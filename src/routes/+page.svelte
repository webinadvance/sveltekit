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
  
  // Import data configuration
  import {
    heroData,
    biographyData,
    portfolioGalleryData,
    photoGalleryData,
    currentShowsData,
    experienceData,
    showreelData,
    digitalProjectsData,
    contactData,
    footerData
  } from '$lib/data/portfolio.js';
  
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
  <Hero {...heroData} />

  <!-- Biography Section -->
  <Biography {...biographyData} />

  <!-- Portfolio Gallery Section -->
  <PortfolioGallery {...portfolioGalleryData} backgroundColor={appBackground} />

  <!-- Portfolio Gallery Grid Section -->
  <PhotoGallery {...photoGalleryData} />

  <!-- Current Shows Section -->
  <CurrentShows {...currentShowsData} />

  <!-- Experience Section -->
  <Experience {...experienceData} />

  <!-- Showreel Section -->
  <Showreel {...showreelData} />

  <!-- Digital Projects and Training Section -->
  <DigitalProjects {...digitalProjectsData} {scrollY} />

  <!-- Contact Section -->
  <Contact {...contactData} />

  <!-- Footer -->
  <Footer {...footerData} />

</div>