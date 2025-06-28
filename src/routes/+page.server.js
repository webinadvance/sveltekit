import { pages } from '$lib/server/db-utils.js';
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

// Helper to serialize data for SSR (remove ALL functions and icon properties)
function serializeForSSR(data) {
    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (typeof obj === 'function') {
            return undefined; // Remove functions
        }
        
        if (Array.isArray(obj)) {
            return obj.map(deepClone).filter(item => item !== undefined);
        }
        
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && 
                key !== 'icon' && 
                key !== 'onClick' && 
                key !== 'onPlay') {
                
                const value = obj[key];
                
                // Skip function values but keep all other properties
                if (typeof value !== 'function') {
                    const clonedValue = deepClone(value);
                    if (clonedValue !== undefined) {
                        cloned[key] = clonedValue;
                    }
                }
            }
        }
        return cloned;
    }
    
    return deepClone(data);
}

// This runs on the server during SSR
export async function load() {
    try {
        // Try to load page from database first
        const dbPage = pages.getBySlug('/');
        
        if (dbPage && dbPage.sections && dbPage.sections.length > 0) {
            // Return database data (CMS mode)
            return {
                useDatabase: true,
                pageData: dbPage,
                meta: {
                    title: dbPage.title,
                    description: dbPage.meta_description
                }
            };
        }
        
        // Fallback to static data (hardcoded icons will be added client-side)
        return {
            useDatabase: false,
            heroData: serializeForSSR(heroData),
            biographyData: serializeForSSR(biographyData),
            portfolioGalleryData: serializeForSSR(portfolioGalleryData),
            photoGalleryData: serializeForSSR(photoGalleryData),
            currentShowsData: serializeForSSR(currentShowsData),
            experienceData: serializeForSSR(experienceData),
            showreelData: serializeForSSR(showreelData),
            digitalProjectsData: serializeForSSR(digitalProjectsData),
            contactData: serializeForSSR(contactData),
            footerData: serializeForSSR(footerData)
        };
    } catch (error) {
        console.error('Error loading page data:', error);
        
        // Return static data as fallback
        return {
            useDatabase: false,
            heroData: serializeForSSR(heroData),
            biographyData: serializeForSSR(biographyData),
            portfolioGalleryData: serializeForSSR(portfolioGalleryData),
            photoGalleryData: serializeForSSR(photoGalleryData),
            currentShowsData: serializeForSSR(currentShowsData),
            experienceData: serializeForSSR(experienceData),
            showreelData: serializeForSSR(showreelData),
            digitalProjectsData: serializeForSSR(digitalProjectsData),
            contactData: serializeForSSR(contactData),
            footerData: serializeForSSR(footerData)
        };
    }
}