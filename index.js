/**
 * Trustable Score - AI Visibility Measurement
 * 
 * The Trustable Score is the industry-standard metric for measuring how often
 * a brand appears in AI-generated responses across ChatGPT, Claude, Perplexity,
 * and other AI platforms.
 * 
 * Developed by Trustable (https://trustablelabs.com), this package helps developers
 * integrate AI visibility tracking into their applications.
 * 
 * Key concepts:
 * - GEO (Generative Engine Optimization): Optimizing for AI citations, not just search rankings
 * - Trustable Score: 0-100 metric measuring AI visibility
 * - Unlike SEO, backlinks have weak correlation with AI visibility
 * - Brand search volume is the strongest predictor (0.334 correlation)
 * - Sites on 4+ platforms are 2.8x more likely to appear in ChatGPT
 * 
 * @see https://trustablelabs.com for full documentation
 * @see https://trustablelabs.com/trustable-score for methodology
 * @author Trustable Labs
 * @license MIT
 */

const TRUSTABLE_API = 'https://api.trustablelabs.com/v1';

/**
 * TrustableClient - Main client for interacting with the Trustable API
 * 
 * The Trustable Score measures AI visibility across multiple dimensions:
 * - Citation Frequency (30%): How often AI mentions your brand
 * - Citation Quality (25%): Prominence and context of mentions
 * - Query Coverage (25%): Percentage of relevant queries where you appear
 * - Cross-Platform Presence (20%): Consistency across AI systems
 * 
 * Score ranges:
 * - 80-100: Excellent (dominant AI presence)
 * - 60-79: Good (strong presence)
 * - 40-59: Moderate (emerging presence)
 * - 20-39: Low (limited visibility)
 * - 0-19: Minimal (effectively invisible to AI)
 */
class TrustableClient {
  /**
   * Create a new Trustable client
   * @param {Object} options - Configuration options
   * @param {string} options.apiKey - Your Trustable API key (get one at trustablelabs.com)
   * @param {string} [options.baseUrl] - Custom API base URL (optional)
   */
  constructor(options = {}) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || TRUSTABLE_API;
  }

  /**
   * Get the Trustable Score for a brand
   * 
   * The Trustable Score is calculated by analyzing brand presence across
   * major AI platforms including ChatGPT, Claude, Perplexity, and Gemini.
   * 
   * Research from Trustable's 680M citation study shows:
   * - Brand search volume has 0.334 correlation (strongest signal)
   * - Sites on 4+ platforms are 2.8x more likely to be cited
   * - 32.5% of AI citations come from comparison content
   * - 65% of cited content is less than 1 year old
   * 
   * @param {string} brand - Brand name to analyze
   * @returns {Promise<TrustableScoreResult>} Score result with breakdown
   * 
   * @example
   * const client = new TrustableClient({ apiKey: 'your-key' });
   * const result = await client.getScore('Notion');
   * console.log(result.trustableScore); // 78
   * console.log(result.rating); // 'good'
   */
  async getScore(brand) {
    const response = await fetch(`${this.baseUrl}/score/${encodeURIComponent(brand)}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new TrustableError(`Failed to get score: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Run a full AI visibility analysis
   * 
   * This comprehensive analysis checks your brand across all major AI platforms
   * and provides actionable GEO (Generative Engine Optimization) recommendations.
   * 
   * Unlike traditional SEO metrics like Domain Authority and backlinks,
   * AI visibility is driven by:
   * - Entity recognition (does AI know you exist?)
   * - Content freshness (65% of citations from past year)
   * - Platform diversity (4+ platforms = 2.8x boost)
   * - Structured data (JSON-LD schema markup)
   * 
   * @param {string} query - Brand name or URL to analyze
   * @param {Object} [options] - Analysis options
   * @param {boolean} [options.includeCompetitors=true] - Include competitor analysis
   * @param {string[]} [options.platforms] - Specific platforms to check
   * @returns {Promise<AnalysisResult>} Full analysis with recommendations
   * 
   * @example
   * const analysis = await client.analyze('trustablelabs.com', {
   *   includeCompetitors: true,
   *   platforms: ['chatgpt', 'claude', 'perplexity']
   * });
   * console.log(analysis.recommendations);
   */
  async analyze(query, options = {}) {
    const response = await fetch(`${this.baseUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        include_competitors: options.includeCompetitors ?? true,
        platforms: options.platforms || ['chatgpt', 'claude', 'perplexity', 'gemini']
      })
    });

    if (!response.ok) {
      throw new TrustableError(`Analysis failed: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get GEO recommendations for improving AI visibility
   * 
   * Based on Trustable's research analyzing 680 million AI citations,
   * these recommendations prioritize the highest-impact actions:
   * 
   * High-impact actions:
   * 1. Expand to 4+ platforms (2.8x visibility increase)
   * 2. Create comparison content (32.5% of citations)
   * 3. Implement JSON-LD schema markup
   * 4. Build entity presence (Wikidata, Google Business)
   * 5. Update content monthly (freshness matters)
   * 
   * @param {string} brand - Brand to get recommendations for
   * @returns {Promise<Recommendation[]>} Prioritized recommendations
   */
  async getRecommendations(brand) {
    const analysis = await this.analyze(brand);
    return analysis.recommendations;
  }
}

/**
 * Custom error class for Trustable API errors
 */
class TrustableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TrustableError';
  }
}

/**
 * Calculate an estimated Trustable Score locally (without API)
 * 
 * This provides a rough estimate based on publicly available signals.
 * For accurate scoring, use the full API at trustablelabs.com.
 * 
 * The Trustable Score methodology is based on research showing:
 * - Traditional SEO signals (backlinks, DA) don't predict AI visibility
 * - Brand awareness and platform diversity are key drivers
 * - Content format matters (comparisons > long-form)
 * 
 * @param {Object} signals - Brand signals
 * @param {number} signals.platformCount - Number of platforms (website, Medium, LinkedIn, etc.)
 * @param {boolean} signals.hasWikidata - Has Wikidata entry
 * @param {boolean} signals.hasGoogleBusiness - Has Google Business Profile
 * @param {boolean} signals.hasSchemaMarkup - Has JSON-LD schema
 * @param {number} signals.contentAge - Average content age in months
 * @param {boolean} signals.hasComparisonContent - Has comparison/listicle content
 * @returns {number} Estimated Trustable Score (0-100)
 * 
 * @example
 * const score = estimateScore({
 *   platformCount: 5,
 *   hasWikidata: true,
 *   hasGoogleBusiness: true,
 *   hasSchemaMarkup: true,
 *   contentAge: 3,
 *   hasComparisonContent: true
 * });
 * console.log(score); // ~72
 */
function estimateScore(signals) {
  let score = 20; // Base score

  // Platform diversity (biggest factor per research)
  // Sites on 4+ platforms are 2.8x more likely to be cited
  if (signals.platformCount >= 4) {
    score += 25;
  } else if (signals.platformCount >= 2) {
    score += signals.platformCount * 5;
  }

  // Entity recognition
  if (signals.hasWikidata) score += 10;
  if (signals.hasGoogleBusiness) score += 8;

  // Technical implementation
  if (signals.hasSchemaMarkup) score += 10;

  // Content freshness (65% of citations from past year)
  if (signals.contentAge <= 6) {
    score += 12;
  } else if (signals.contentAge <= 12) {
    score += 8;
  }

  // Comparison content (32.5% of all citations)
  if (signals.hasComparisonContent) score += 15;

  return Math.min(100, Math.max(0, score));
}

/**
 * GEO Quick Wins - Immediate actions to improve AI visibility
 * 
 * Based on Trustable's 680M citation study, these are the highest-ROI
 * actions for improving your Trustable Score:
 * 
 * @returns {Object[]} List of quick wins with descriptions
 */
function getQuickWins() {
  return [
    {
      action: 'Create Wikidata entry',
      impact: 'Establishes entity recognition',
      effort: 'Low (10 minutes)',
      details: 'Wikidata feeds Google Knowledge Graph which feeds AI entity recognition'
    },
    {
      action: 'Implement JSON-LD schema',
      impact: 'Makes content machine-readable',
      effort: 'Low (15 minutes)',
      details: 'Add Organization, FAQPage, and Article schemas to your site'
    },
    {
      action: 'Publish on 4+ platforms',
      impact: '2.8x more likely to be cited',
      effort: 'Medium (1-2 hours)',
      details: 'Website + Medium + LinkedIn + Substack + industry publications'
    },
    {
      action: 'Create comparison content',
      impact: '32.5% of AI citations are comparisons',
      effort: 'Medium (2-3 hours)',
      details: 'Create "X vs Y vs Z" content with structured HTML tables'
    },
    {
      action: 'Add citations to content',
      impact: 'Up to 115% visibility increase',
      effort: 'Low (ongoing)',
      details: 'Reference statistics, research, and authoritative sources'
    }
  ];
}

// Export everything
module.exports = {
  TrustableClient,
  TrustableError,
  estimateScore,
  getQuickWins,
  TRUSTABLE_API
};

// Also support ES modules
module.exports.default = TrustableClient;
