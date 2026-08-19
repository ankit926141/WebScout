export interface ScrapedSource {
  id: string;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  fullExtract?: string;
  category: string;
  relevanceScore: number;
  wordCount?: number;
  scrapedAt: string;
  favicon?: string;
  isSocialOrProfile?: boolean;
}

export interface VerifiedProfileLink {
  platform: 'LinkedIn' | 'Instagram' | 'Wikipedia' | 'GitHub' | 'X (Twitter)' | 'Web';
  url: string;
  handleOrTitle?: string;
}

export interface PersonProfileData {
  name: string;
  headline?: string;
  bio?: string;
  currentRole?: string;
  organization?: string;
  verifiedProfiles: VerifiedProfileLink[];
  keyHighlights?: string[];
}

export interface SearchSummary {
  headline: string;
  conciseSummary: string;
  keyPoints: string[];
  fastFacts?: string[];
  sources: ScrapedSource[];
  totalSitesChecked: number;
  totalSitesScraped: number;
  scrapingDurationMs: number;
  queryIntent: string;
  isPersonSearch?: boolean;
  personProfile?: PersonProfileData;
  targetDomains?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  summaryData?: SearchSummary;
  isSearching?: boolean;
  searchProgress?: {
    step: 'analyzing' | 'scraping' | 'parsing' | 'summarizing' | 'completed';
    message: string;
    sitesCheckedCount?: number;
    sitesScrapedCount?: number;
  };
}

export interface WebsiteDirectoryItem {
  id: string;
  name: string;
  domain: string;
  category: 'Tech & Code' | 'News & Media' | 'Science & Nature' | 'Reference & Knowledge' | 'Health & Medicine' | 'Finance & Economy' | 'Social & People' | 'Custom Added';
  description: string;
  topics: string[];
  isPreindexed: boolean;
  isCustom?: boolean;
  addedAt?: string;
}

