import { pages, components, pageComponents } from './src/lib/db/index.js';

console.log('🏠 Setting up homepage with HomeComponent...');

try {
  // Step 1: Ensure homepage exists
  let homepage = pages.getBySlug('/');
  
  if (!homepage) {
    console.log('Creating homepage...');
    homepage = pages.create({
      slug: '/',
      title: 'Homepage',
      meta_description: 'Welcome to our super dynamic CMS website',
      meta_keywords: 'cms, dynamic, sveltekit, database',
      is_published: true
    });
    console.log('✅ Homepage created:', homepage);
  } else {
    console.log('✅ Homepage already exists:', homepage);
  }

  // Step 2: Get HomeComponent
  const homeComponent = components.getByName('home_component');
  
  if (!homeComponent) {
    console.log('❌ HomeComponent not found in database. Make sure to build first to initialize components.');
    process.exit(1);
  }
  
  console.log('✅ HomeComponent found:', homeComponent);

  // Step 3: Check if homepage already has components
  const existingComponents = pageComponents.getByPageId(homepage.id);
  console.log('Existing page components:', existingComponents);

  // Step 4: Add HomeComponent to homepage if not already added
  const hasHomeComponent = existingComponents.some(c => c.component_name === 'home_component');
  
  if (!hasHomeComponent) {
    const homeComponentData = {
      page_id: homepage.id,
      component_id: homeComponent.id,
      component_data: {
        title: "Welcome to Super Dynamic CMS",
        subtitle: "Database-driven components with SvelteKit and SSR",
        content: "<p>This homepage is completely database-driven. The content you're seeing comes from the CMS database and is rendered server-side for optimal SEO and performance.</p><p>Every component on this page gets its data from the database, making it incredibly flexible and reusable.</p>",
        background_color: "bg-gradient-to-br from-blue-50 to-indigo-100"
      },
      display_order: 1
    };

    const result = pageComponents.create(homeComponentData);
    console.log('✅ HomeComponent added to homepage:', result);
  } else {
    console.log('✅ HomeComponent already exists on homepage');
  }

  // Step 5: Verify final setup
  const finalHomepage = pages.getBySlug('/');
  console.log('🎉 Final homepage setup:', JSON.stringify(finalHomepage, null, 2));

} catch (error) {
  console.error('❌ Failed to setup homepage:', error);
}

console.log('✅ Homepage setup completed!');