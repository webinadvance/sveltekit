<script>
  import { getAppBackground } from '$lib/styles/themes.js';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
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
  
  // Icons for client-side only (hardcoded)
  import { Theater, Camera, Video, Tv, Trophy, GraduationCap, Heart, Users, Star, Mail, Phone, Play } from 'lucide-svelte';
  
  // Data from server
  export let data;
  
  // Import static data as fallback
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
  
  // Prepare data with icons added client-side
  let pageData = {};
  
  $: {
    if (data.useDatabase && data.pageData) {
      // Use database data
      pageData = data.pageData;
    } else {
      // Use static data with icons added client-side
      pageData = {
        heroData: addIcons(data.heroData || heroData),
        biographyData: addIcons(data.biographyData || biographyData),
        portfolioGalleryData: addIcons(data.portfolioGalleryData || portfolioGalleryData),
        photoGalleryData: addIcons(data.photoGalleryData || photoGalleryData),
        currentShowsData: addIcons(data.currentShowsData || currentShowsData),
        experienceData: addIcons(data.experienceData || experienceData),
        showreelData: addIcons(data.showreelData || showreelData),
        digitalProjectsData: addIcons(data.digitalProjectsData || digitalProjectsData),
        contactData: addIcons(data.contactData || contactData),
        footerData: addIcons(data.footerData || footerData)
      };
    }
  }
  
  // Add hardcoded icons client-side only
  function addIcons(data) {
    if (!browser || !data) return data;
    
    const iconMap = {
      'theater': Theater,
      'cinema': Camera,
      'camera': Camera,
      'heart': Heart,
      'portraits': Heart,
      'users': Users,
      'backstage': Users,
      'play': Play,
      'television': Tv,
      'digital': Video,
      'video': Video,
      'star': Star,
      'mail': Mail,
      'phone': Phone,
      'awards': Trophy,
      'training': GraduationCap
    };
    
    function addIconsRecursively(obj) {
      if (!obj || typeof obj !== 'object') return obj;
      
      if (Array.isArray(obj)) {
        return obj.map(addIconsRecursively);
      }
      
      const newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        if (key === 'iconType' && typeof value === 'string') {
          newObj.icon = iconMap[value] || Theater;
          newObj[key] = value; // Keep the original iconType
        } else if (typeof value === 'object') {
          newObj[key] = addIconsRecursively(value);
        } else {
          newObj[key] = value;
        }
      }
      return newObj;
    }
    
    return addIconsRecursively(data);
  }
  
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
  {#if data.useDatabase && data.pageData}
    <!-- Database/CMS Mode - render sections dynamically -->
    {#each data.pageData.sections as section}
      {#if section.component_type === 'hero'}
        <Hero {...section.content} />
      {:else if section.component_type === 'biography'}
        <Biography {...section.content} />
      {:else if section.component_type === 'portfolio_gallery'}
        <PortfolioGallery {...section.content} backgroundColor={appBackground} />
      {:else if section.component_type === 'photo_gallery'}
        <PhotoGallery {...section.content} />
      {:else if section.component_type === 'current_shows'}
        <CurrentShows {...section.content} />
      {:else if section.component_type === 'experience'}
        <Experience {...section.content} />
      {:else if section.component_type === 'showreel'}
        <Showreel {...section.content} />
      {:else if section.component_type === 'digital_projects'}
        <DigitalProjects {...section.content} {scrollY} />
      {:else if section.component_type === 'contact'}
        <Contact {...section.content} />
      {:else if section.component_type === 'footer'}
        <Footer {...section.content} />
      {/if}
    {/each}
  {:else}
    <!-- Static Mode - use hardcoded data -->
    <!-- Hero Section -->
    <Hero {...pageData.heroData} />

    <!-- Biography Section -->
    <Biography {...pageData.biographyData} />

    <!-- Portfolio Gallery Section -->
    <PortfolioGallery {...pageData.portfolioGalleryData} backgroundColor={appBackground} />

    <!-- Portfolio Gallery Grid Section -->
    <PhotoGallery {...pageData.photoGalleryData} />

    <!-- Current Shows Section -->
    <CurrentShows {...pageData.currentShowsData} />

    <!-- Experience Section -->
    <Experience {...pageData.experienceData} />

    <!-- Showreel Section -->
    <Showreel {...pageData.showreelData} />

    <!-- Digital Projects and Training Section -->
    <DigitalProjects {...pageData.digitalProjectsData} {scrollY} />

    <!-- Contact Section -->
    <Contact {...pageData.contactData} />

    <!-- Footer -->
    <Footer {...pageData.footerData} />
  {/if}
</div>