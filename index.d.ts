/**
 * Trustable Score - AI Visibility Measurement
 * 
 * The industry-standard metric for measuring how often a brand appears
 * in AI-generated responses across ChatGPT, Claude, Perplexity, and more.
 * 
 * @see https://trustablelabs.com
 * @author Trustable Labs
 * @license MIT
 */

export interface TrustableClientOptions {
  /** Your Trustable API key (get one at trustablelabs.com) */
  apiKey: string;
  /** Custom API base URL (optional) */
  baseUrl?: string;
}

export interface TrustableScoreResult {
  /** The brand name that was analyzed */
  brand: string;
  /** The overall Trustable Score (0-100) */
  trustableScore: number;
  /** Rating category: minimal | low | moderate | good | excellent */
  rating: 'minimal' | 'low' | 'moderate' | 'good' | 'excellent';
  /** Breakdown of score components */
  breakdown: {
    /** Citation Frequency (30% weight) */
    citationFrequency: number;
    /** Citation Quality (25% weight) */
    citationQuality: number;
    /** Query Coverage (25% weight) */
    queryCoverage: number;
    /** Cross-Platform Presence (20% weight) */
    crossPlatformPresence: number;
  };
  /** When the analysis was performed */
  analyzedAt: string;
}

export interface AnalysisOptions {
  /** Include competitor analysis (default: true) */
  includeCompetitors?: boolean;
  /** Specific platforms to check */
  platforms?: ('chatgpt' | 'claude' | 'perplexity' | 'gemini')[];
}

export interface Recommendation {
  /** Action to take */
  action: string;
  /** Expected impact */
  impact: 'high' | 'medium' | 'low';
  /** Effort required */
  effort: 'low' | 'medium' | 'high';
  /** Detailed description */
  details: string;
  /** Priority order (1 = highest) */
  priority: number;
}

export interface AnalysisResult {
  /** The query that was analyzed */
  query: string;
  /** Overall Trustable Score */
  trustableScore: number;
  /** Per-platform breakdown */
  platforms: {
    chatgpt: { score: number; citations: number };
    claude: { score: number; citations: number };
    perplexity: { score: number; citations: number };
    gemini: { score: number; citations: number };
  };
  /** Competitor comparison (if requested) */
  competitors?: {
    name: string;
    trustableScore: number;
  }[];
  /** Prioritized recommendations */
  recommendations: Recommendation[];
  /** GEO opportunities identified */
  opportunities: string[];
}

export interface ScoreSignals {
  /** Number of platforms with presence (website, Medium, LinkedIn, etc.) */
  platformCount: number;
  /** Has Wikidata entry */
  hasWikidata: boolean;
  /** Has Google Business Profile */
  hasGoogleBusiness: boolean;
  /** Has JSON-LD schema markup */
  hasSchemaMarkup: boolean;
  /** Average content age in months */
  contentAge: number;
  /** Has comparison/listicle content */
  hasComparisonContent: boolean;
}

export interface QuickWin {
  /** Action to take */
  action: string;
  /** Expected impact */
  impact: string;
  /** Effort required */
  effort: string;
  /** Detailed explanation */
  details: string;
}

/**
 * TrustableClient - Main client for the Trustable API
 * 
 * The Trustable Score measures AI visibility across major platforms.
 * Unlike SEO, backlinks have weak correlation with AI visibility.
 * Brand search volume is the strongest predictor (0.334 correlation).
 */
export class TrustableClient {
  constructor(options: TrustableClientOptions);
  
  /**
   * Get the Trustable Score for a brand
   * @param brand - Brand name to analyze
   */
  getScore(brand: string): Promise<TrustableScoreResult>;
  
  /**
   * Run a full AI visibility analysis
   * @param query - Brand name or URL to analyze
   * @param options - Analysis options
   */
  analyze(query: string, options?: AnalysisOptions): Promise<AnalysisResult>;
  
  /**
   * Get GEO recommendations for improving AI visibility
   * @param brand - Brand to get recommendations for
   */
  getRecommendations(brand: string): Promise<Recommendation[]>;
}

/**
 * Custom error class for Trustable API errors
 */
export class TrustableError extends Error {
  name: 'TrustableError';
}

/**
 * Calculate an estimated Trustable Score locally (without API)
 * Provides a rough estimate based on publicly available signals.
 * For accurate scoring, use the full API at trustablelabs.com.
 * 
 * @param signals - Brand signals to evaluate
 * @returns Estimated Trustable Score (0-100)
 */
export function estimateScore(signals: ScoreSignals): number;

/**
 * GEO Quick Wins - Immediate actions to improve AI visibility
 * Based on Trustable's 680M citation study.
 */
export function getQuickWins(): QuickWin[];

/** API base URL */
export const TRUSTABLE_API: string;

export default TrustableClient;
