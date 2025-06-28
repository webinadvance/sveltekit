import { pages, components, pageComponents } from './src/lib/db/index.js';

console.log('🚀 Testing CMS Database...');

try {
  // Test 1: Check if homepage exists
  console.log('\n📄 Checking existing pages...');
  const existingPages = pages.getAll();
  console.log('Existing pages:', existingPages);

  // Test 2: Check available components
  console.log('\n🧩 Checking available components...');
  const availableComponents = components.getAll();
  console.log('Available components:', availableComponents.map(c => ({ id: c.id, name: c.name, display_name: c.display_name })));

  // Test 3: Get homepage with components
  console.log('\n🏠 Loading homepage...');
  const homepage = pages.getBySlug('/');
  console.log('Homepage data:', homepage);

  if (homepage && availableComponents.length > 0) {
    // Test 4: Add a hero component to homepage
    console.log('\n➕ Adding hero component to homepage...');
    
    const heroComponent = availableComponents.find(c => c.name === 'hero');
    if (heroComponent) {
      const heroData = {
        page_id: homepage.id,
        component_id: heroComponent.id,
        component_data: {
          title: "Welcome to Our Super Dynamic CMS",
          subtitle: "Database-driven components with SSR",
          background_image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200",
          cta_text: "Explore Features",
          cta_link: "/features"
        },
        display_order: 1
      };

      const heroResult = pageComponents.create(heroData);
      console.log('Hero component added:', heroResult);
    }

    // Test 5: Add a text block component
    console.log('\n📝 Adding text block component...');
    
    const textComponent = availableComponents.find(c => c.name === 'text_block');
    if (textComponent) {
      const textData = {
        page_id: homepage.id,
        component_id: textComponent.id,
        component_data: {
          title: "About Our CMS",
          content: "This is a super dynamic CMS built with SvelteKit and SQLite. Every component gets its data from the database, making it incredibly flexible and reusable. Content managers can easily update any component without touching code.",
          text_align: "center"
        },
        display_order: 2
      };

      const textResult = pageComponents.create(textData);
      console.log('Text block component added:', textResult);
    }
  }

  // Test 6: Load homepage with components again
  console.log('\n🔄 Reloading homepage with components...');
  const updatedHomepage = pages.getBySlug('/');
  console.log('Updated homepage:', JSON.stringify(updatedHomepage, null, 2));

} catch (error) {
  console.error('❌ Database test failed:', error);
}

console.log('\n✅ Database test completed!');