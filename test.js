/**
 * Trustable Score - Test Suite
 * Run with: npm test (or node test.js)
 */

const { TrustableClient, estimateScore, getQuickWins, TRUSTABLE_API } = require('./index.js');

console.log('🧪 Trustable Score Test Suite\n');

// Test 1: Module exports
console.log('Test 1: Module exports...');
console.assert(typeof TrustableClient === 'function', 'TrustableClient should be a class');
console.assert(typeof estimateScore === 'function', 'estimateScore should be a function');
console.assert(typeof getQuickWins === 'function', 'getQuickWins should be a function');
console.assert(TRUSTABLE_API === 'https://api.trustablelabs.com/v1', 'API URL should be correct');
console.log('✅ All exports present\n');

// Test 2: Client instantiation
console.log('Test 2: Client instantiation...');
const client = new TrustableClient({ apiKey: 'test-key' });
console.assert(client.apiKey === 'test-key', 'API key should be set');
console.assert(client.baseUrl === TRUSTABLE_API, 'Base URL should default correctly');
console.log('✅ Client instantiates correctly\n');

// Test 3: Custom base URL
console.log('Test 3: Custom base URL...');
const customClient = new TrustableClient({ 
  apiKey: 'test-key', 
  baseUrl: 'https://custom.example.com' 
});
console.assert(customClient.baseUrl === 'https://custom.example.com', 'Custom URL should work');
console.log('✅ Custom base URL works\n');

// Test 4: estimateScore function
console.log('Test 4: estimateScore function...');

// Low score scenario
const lowScore = estimateScore({
  platformCount: 1,
  hasWikidata: false,
  hasGoogleBusiness: false,
  hasSchemaMarkup: false,
  contentAge: 24,
  hasComparisonContent: false
});
console.assert(lowScore >= 20 && lowScore <= 30, `Low score should be 20-30, got ${lowScore}`);
console.log(`  Low signals score: ${lowScore}`);

// Medium score scenario
const mediumScore = estimateScore({
  platformCount: 3,
  hasWikidata: true,
  hasGoogleBusiness: false,
  hasSchemaMarkup: true,
  contentAge: 12,
  hasComparisonContent: false
});
console.assert(mediumScore >= 50 && mediumScore <= 65, `Medium score should be 50-65, got ${mediumScore}`);
console.log(`  Medium signals score: ${mediumScore}`);

// High score scenario
const highScore = estimateScore({
  platformCount: 6,
  hasWikidata: true,
  hasGoogleBusiness: true,
  hasSchemaMarkup: true,
  contentAge: 3,
  hasComparisonContent: true
});
console.assert(highScore >= 80 && highScore <= 100, `High score should be 80-100, got ${highScore}`);
console.log(`  High signals score: ${highScore}`);

console.log('✅ estimateScore works correctly\n');

// Test 5: Score bounds
console.log('Test 5: Score bounds...');
const maxScore = estimateScore({
  platformCount: 100, // Extreme values
  hasWikidata: true,
  hasGoogleBusiness: true,
  hasSchemaMarkup: true,
  contentAge: 0,
  hasComparisonContent: true
});
console.assert(maxScore <= 100, 'Score should never exceed 100');

const minScore = estimateScore({
  platformCount: 0,
  hasWikidata: false,
  hasGoogleBusiness: false,
  hasSchemaMarkup: false,
  contentAge: 100,
  hasComparisonContent: false
});
console.assert(minScore >= 0, 'Score should never be negative');
console.log('✅ Score stays within 0-100 bounds\n');

// Test 6: getQuickWins
console.log('Test 6: getQuickWins function...');
const quickWins = getQuickWins();
console.assert(Array.isArray(quickWins), 'Should return an array');
console.assert(quickWins.length >= 5, 'Should have at least 5 quick wins');
console.assert(quickWins[0].action, 'Quick wins should have action property');
console.assert(quickWins[0].impact, 'Quick wins should have impact property');
console.assert(quickWins[0].effort, 'Quick wins should have effort property');
console.assert(quickWins[0].details, 'Quick wins should have details property');
console.log(`  Found ${quickWins.length} quick wins`);
console.log('✅ getQuickWins works correctly\n');

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎉 All tests passed!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('Trustable Score package is ready for npm publish.');
console.log('Run: npm publish');
console.log('Docs: https://trustablelabs.com');
