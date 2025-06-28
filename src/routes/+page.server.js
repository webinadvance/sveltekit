import { db } from '$lib/server/database.js';
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

// This runs on the server during SSR
export async function load() {
    try {
        // Check if we have data in database
        const pageCheck = db.prepare('SELECT COUNT(*) as count FROM pages WHERE slug = ?').get('/');
        
        if (pageCheck?.count > 0) {
            // Load from database (future implementation)
            // For now, just return static data
            console.log('Database has data, but loading from static for now');
        }
        
        // Return static data for now
        return {
            heroData,
            biographyData,
            portfolioGalleryData,
            photoGalleryData,
            currentShowsData,
            experienceData,
            showreelData,
            digitalProjectsData,
            contactData,
            footerData,
            useDatabase: false // Flag to indicate data source
        };
    } catch (error) {
        console.error('Database error, falling back to static data:', error);
        
        // Fallback to static data
        return {
            heroData,
            biographyData,
            portfolioGalleryData,
            photoGalleryData,
            currentShowsData,
            experienceData,
            showreelData,
            digitalProjectsData,
            contactData,
            footerData,
            useDatabase: false
        };
    }
}