import { MONITORED_WEBSITES, PreindexedDomain } from './knowledgeBank';

export interface DynamicSource {
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

// Initial Social & People domains
const INITIAL_SOCIAL_SOURCES: DynamicSource[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn Professional Profiles',
    domain: 'linkedin.com',
    category: 'Social & People',
    description: 'Professional networking platform containing career profiles, work history, and executive bios.',
    topics: ['people', 'executives', 'founders', 'engineers', 'career', 'resume', 'profiles', 'jobs', 'ceo'],
    isPreindexed: true
  },
  {
    id: 'instagram',
    name: 'Instagram Public Profiles',
    domain: 'instagram.com',
    category: 'Social & People',
    description: 'Public visual media and social profiles, creator bios, and digital presence.',
    topics: ['people', 'creators', 'artists', 'influencers', 'social', 'bio', 'photos', 'profiles'],
    isPreindexed: true
  },
  {
    id: 'x-twitter',
    name: 'X (formerly Twitter)',
    domain: 'x.com',
    category: 'Social & People',
    description: 'Public posts, real-time thoughts, and identity profiles of leaders, builders, and journalists.',
    topics: ['people', 'tech leaders', 'journalists', 'authors', 'public figures', 'tweets', 'posts'],
    isPreindexed: true
  },
  {
    id: 'crunchbase',
    name: 'Crunchbase People & Startups',
    domain: 'crunchbase.com',
    category: 'Social & People',
    description: 'Database of venture-backed founders, executives, investors, and startup leadership teams.',
    topics: ['people', 'founders', 'investors', 'startups', 'executives', 'funding', 'venture capital'],
    isPreindexed: true
  }
];

// In-memory registry of dynamic custom sources
let customSourcesRegistry: DynamicSource[] = [...INITIAL_SOCIAL_SOURCES];

export function getAllSources(): DynamicSource[] {
  const baseSources: DynamicSource[] = MONITORED_WEBSITES.map(w => ({
    id: w.id,
    name: w.name,
    domain: w.domain,
    category: w.category as any,
    description: w.description,
    topics: w.topics,
    isPreindexed: true
  }));

  // Merge base sources and custom sources avoiding duplicate domains
  const domainMap = new Map<string, DynamicSource>();
  for (const s of baseSources) {
    domainMap.set(s.domain.toLowerCase(), s);
  }
  for (const s of customSourcesRegistry) {
    domainMap.set(s.domain.toLowerCase(), s);
  }

  return Array.from(domainMap.values());
}

export function cleanDomainInput(rawInput: string): string {
  let cleaned = rawInput.trim().toLowerCase();
  cleaned = cleaned.replace(/^https?:\/\//i, '');
  cleaned = cleaned.replace(/^www\./i, '');
  cleaned = cleaned.split('/')[0];
  cleaned = cleaned.split('?')[0];
  return cleaned;
}

export function addCustomDomain(rawDomain: string, customCategory?: string): DynamicSource | null {
  const domain = cleanDomainInput(rawDomain);
  if (!domain || !domain.includes('.') || domain.length < 4) {
    return null;
  }

  const existing = customSourcesRegistry.find(s => s.domain.toLowerCase() === domain);
  if (existing) {
    return existing;
  }

  // Derive domain name and category
  const domainParts = domain.split('.');
  const primaryName = domainParts[0].charAt(0).toUpperCase() + domainParts[0].slice(1);
  
  let category: DynamicSource['category'] = 'Custom Added';
  if (domain.includes('linkedin') || domain.includes('instagram') || domain.includes('twitter') || domain.includes('x.com') || domain.includes('facebook') || domain.includes('tiktok') || domain.includes('threads')) {
    category = 'Social & People';
  } else if (domain.includes('news') || domain.includes('times') || domain.includes('post') || domain.includes('tribune')) {
    category = 'News & Media';
  } else if (domain.includes('dev') || domain.includes('code') || domain.includes('git') || domain.includes('tech') || domain.includes('stack')) {
    category = 'Tech & Code';
  }

  const newSource: DynamicSource = {
    id: `custom-${domain.replace(/[^\w-]/g, '-')}-${Date.now().toString(36)}`,
    name: `${primaryName} (${domain})`,
    domain: domain,
    category: (customCategory as any) || category,
    description: `User-configured custom web scraping target for domain ${domain}.`,
    topics: [primaryName.toLowerCase(), 'custom', 'web source', 'scraper'],
    isPreindexed: false,
    isCustom: true,
    addedAt: new Date().toISOString()
  };

  customSourcesRegistry.unshift(newSource);
  return newSource;
}

export function removeCustomDomain(idOrDomain: string): boolean {
  const initialLength = customSourcesRegistry.length;
  const lower = idOrDomain.toLowerCase();
  customSourcesRegistry = customSourcesRegistry.filter(
    s => s.id !== idOrDomain && s.domain.toLowerCase() !== lower
  );
  return customSourcesRegistry.length < initialLength;
}
