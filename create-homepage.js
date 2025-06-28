import { pages } from './src/lib/db/index.js';

console.log('🏠 Creating homepage record in CMS database...');

try {
  // Check if homepage already exists
  const existingHomepage = pages.getBySlug('/');
  
  if (existingHomepage) {
    console.log('✅ Homepage already exists:', existingHomepage);
  } else {
    // Create new homepage record
    const homepageData = {
      slug: '/',
      title: 'Homepage',
      meta_description: 'Welcome to our super dynamic CMS website',
      meta_keywords: 'cms, dynamic, sveltekit, database',
      og_image: null,
      is_published: true
    };

    const newHomepage = pages.create(homepageData);
    console.log('✅ Homepage created successfully:', newHomepage);
  }

  // Verify by loading it
  const homepage = pages.getBySlug('/');
  console.log('📄 Current homepage record:', homepage);

} catch (error) {
  console.error('❌ Failed to create homepage:', error);
}

console.log('✅ Homepage creation completed!');