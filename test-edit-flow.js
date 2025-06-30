// Test script to simulate edit flow

async function testEditFlow() {
  console.log('Testing component edit flow...\n');
  
  // 1. First, get current data
  console.log('1. Fetching homepage to see current data...');
  const initialResponse = await fetch('http://localhost:5173/');
  const initialHtml = await initialResponse.text();
  const initialMatch = initialHtml.match(/<h1[^>]*>([^<]+)<\/h1>/);
  console.log(`   Current title: ${initialMatch ? initialMatch[1] : 'Not found'}`);
  
  // 2. Update component via API
  console.log('\n2. Updating component via API...');
  const updateData = {
    id: 1,
    component_data: {
      title: "Modified Title via API Test",
      subtitle: "This was updated programmatically",
      content: "<p>This content was updated through the API endpoint to test persistence.</p>",
      background_color: "bg-gradient-to-br from-green-50 to-emerald-100"
    }
  };
  
  const updateResponse = await fetch('http://localhost:5173/api/page-components', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  });
  
  const updateResult = await updateResponse.json();
  console.log(`   API Response: ${updateResult.message}`);
  
  // 3. Wait a moment and check if data persisted
  console.log('\n3. Waiting 2 seconds and checking if update persisted...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const finalResponse = await fetch('http://localhost:5173/');
  const finalHtml = await finalResponse.text();
  const finalMatch = finalHtml.match(/<h1[^>]*>([^<]+)<\/h1>/);
  console.log(`   New title: ${finalMatch ? finalMatch[1] : 'Not found'}`);
  
  // 4. Check database directly
  console.log('\n4. Checking database directly...');
  const { execSync } = await import('child_process');
  const dbResult = execSync('sqlite3 /var/data/databases/cms.db "SELECT component_data FROM page_components WHERE id = 1;"').toString();
  const dbData = JSON.parse(dbResult.trim());
  console.log(`   Database title: ${dbData.title}`);
  
  // 5. Summary
  console.log('\n=== TEST RESULTS ===');
  if (dbData.title === "Modified Title via API Test") {
    console.log('✓ Database update: SUCCESS');
  } else {
    console.log('✗ Database update: FAILED');
  }
  
  if (finalMatch && finalMatch[1].includes("Modified Title")) {
    console.log('✓ Page render: SUCCESS');
  } else {
    console.log('✗ Page render: FAILED - Title not updated on page');
  }
}

testEditFlow().catch(console.error);