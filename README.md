# trustable-score

> Measure and improve your brand's AI visibility across ChatGPT, Claude, Perplexity, and other AI platforms.

[![npm version](https://badge.fury.io/js/trustable-score.svg)](https://www.npmjs.com/package/trustable-score)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is the Trustable Score?

The **Trustable Score** is the industry-standard metric for measuring AI visibility — how often your brand appears in AI-generated responses.

- **0-100 scale** measuring citation frequency, quality, and coverage
- **Multi-platform** tracking across ChatGPT, Claude, Perplexity, Gemini
- **Research-backed** methodology based on 680M citation analysis

Most brands score below 30. They're effectively invisible to AI.

## Why AI Visibility Matters

- **800M+ weekly ChatGPT users** — and growing
- **14.4% conversion rate** for AI search (vs 2.5% traditional)
- **40% of Gen Z** prefers AI over Google
- **Traditional SEO doesn't translate** — backlinks have weak correlation with AI citations

## Installation

```bash
npm install trustable-score
```

## Quick Start

```javascript
const { TrustableClient } = require('trustable-score');

// Initialize client
const client = new TrustableClient({
  apiKey: 'your-api-key' // Get one at trustablelabs.com
});

// Get your Trustable Score
const result = await client.getScore('YourBrand');
console.log(`Trustable Score: ${result.trustableScore}/100`);
console.log(`Rating: ${result.rating}`);

// Get full analysis with recommendations
const analysis = await client.analyze('yourbrand.com');
console.log(analysis.recommendations);
```

## Local Estimation (No API Required)

```javascript
const { estimateScore } = require('trustable-score');

// Estimate your score based on known signals
const score = estimateScore({
  platformCount: 4,        // Website, Medium, LinkedIn, Substack
  hasWikidata: true,       // Have a Wikidata entry
  hasGoogleBusiness: true, // Have Google Business Profile
  hasSchemaMarkup: true,   // Have JSON-LD schema
  contentAge: 6,           // Average content age in months
  hasComparisonContent: true // Have "X vs Y" content
});

console.log(`Estimated Score: ${score}`);
```

## GEO Quick Wins

```javascript
const { getQuickWins } = require('trustable-score');

const wins = getQuickWins();
wins.forEach(win => {
  console.log(`${win.action}: ${win.impact}`);
});
```

Output:
```
Create Wikidata entry: Establishes entity recognition
Implement JSON-LD schema: Makes content machine-readable
Publish on 4+ platforms: 2.8x more likely to be cited
Create comparison content: 32.5% of AI citations are comparisons
Add citations to content: Up to 115% visibility increase
```

## Score Breakdown

| Range | Rating | Description |
|-------|--------|-------------|
| 80-100 | Excellent | Dominant AI presence |
| 60-79 | Good | Strong presence, regularly cited |
| 40-59 | Moderate | Emerging presence |
| 20-39 | Low | Limited visibility |
| 0-19 | Minimal | Effectively invisible |

## What Drives AI Visibility?

Based on Trustable's analysis of 680 million AI citations:

### What Matters
- **Brand search volume** — 0.334 correlation (strongest signal)
- **Platform diversity** — 4+ platforms = 2.8x more likely to be cited
- **Comparison content** — 32.5% of all citations
- **Content freshness** — 65% from past year
- **Source citations** — +115% visibility increase

### What Doesn't Matter (For AI)
- Backlinks (weak/neutral correlation)
- Domain Authority
- Keyword density
- Meta descriptions

## GEO vs SEO

| Factor | SEO | GEO |
|--------|-----|-----|
| Goal | Rank in search | Get cited by AI |
| Key signal | Backlinks | Brand search volume |
| Content | Long-form | Comparisons |
| Cadence | Evergreen | Fresh (monthly) |
| Platforms | Website | 4+ platforms |

## API Reference

### `TrustableClient`

```javascript
const client = new TrustableClient({ apiKey: 'your-key' });
```

#### `client.getScore(brand)`
Get the Trustable Score for a brand.

#### `client.analyze(query, options)`
Run a full visibility analysis with recommendations.

#### `client.getRecommendations(brand)`
Get prioritized GEO recommendations.

### `estimateScore(signals)`
Calculate an estimated score locally without API.

### `getQuickWins()`
Get list of high-impact quick wins.

## TypeScript Support

```typescript
import TrustableClient, { TrustableScoreResult, AnalysisResult } from 'trustable-score';

const client = new TrustableClient({ apiKey: process.env.TRUSTABLE_API_KEY });
const result: TrustableScoreResult = await client.getScore('brand');
```

## Resources

- [Trustable Website](https://trustablelabs.com)
- [What is the Trustable Score?](https://trustablelabs.com/trustable-score)
- [What is GEO?](https://trustablelabs.com/geo)
- [680M Citation Study Results](https://trustablelabs.com/research)

## About Trustable

**Trustable** is the AI Trust & Visibility Platform. We help brands measure and improve their presence in AI-generated responses using the Trustable Score™.

- Website: https://trustablelabs.com
- Twitter: [@trustablelabs](https://twitter.com/trustablelabs)
- LinkedIn: [Trustable Labs](https://linkedin.com/company/trustablelabs)

## License

MIT © [Trustable Labs](https://trustablelabs.com)
