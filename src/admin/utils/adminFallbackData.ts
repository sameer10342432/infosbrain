import { siteConfig } from '../../config/siteConfig';

export interface AdminSectionItem {
  id: string;
  sectionKey: string;
  page: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  highlightText?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  image?: string;
  displayOrder: number;
  status: 'visible' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

export const FALLBACK_SECTIONS: AdminSectionItem[] = [
  {
    id: 'sec_home_hero',
    sectionKey: 'home_hero',
    page: 'home',
    badge: siteConfig.brand.badge,
    title: 'Transforming Ideas into',
    highlightText: 'Intelligent Digital Solutions',
    subtitle: siteConfig.brand.tagline,
    description: siteConfig.brand.heroSupport,
    primaryCtaText: siteConfig.brand.primaryCTAs[0]?.label || 'Start Your Digital Transformation',
    primaryCtaUrl: siteConfig.brand.primaryCTAs[0]?.path || '/contact',
    secondaryCtaText: siteConfig.brand.primaryCTAs[1]?.label || 'Explore Our Services',
    secondaryCtaUrl: siteConfig.brand.primaryCTAs[1]?.path || '/services',
    image: '/assets/hero-illustration.png',
    status: 'visible',
    displayOrder: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_metrics',
    sectionKey: 'home_metrics',
    page: 'home',
    badge: 'TRUST & SCALE',
    title: 'Delivering Solutions Across Continents',
    status: 'visible',
    displayOrder: 2,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_about',
    sectionKey: 'home_about',
    page: 'home',
    badge: 'WHO WE ARE',
    title: 'A Global Technology Partner Committed to',
    highlightText: 'Measurable Outcomes',
    description: 'InfosBrain was founded on a simple conviction: technology should create clarity, not complexity. We partner with organizations worldwide to design and engineer scalable digital solutions that drive operational resilience and sustainable growth.',
    primaryCtaText: 'Discover Our Story',
    primaryCtaUrl: '/about',
    status: 'visible',
    displayOrder: 3,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_services',
    sectionKey: 'home_services',
    page: 'home',
    badge: 'END-TO-END CAPABILITIES',
    title: 'Comprehensive Technology Practices Built for',
    highlightText: 'Scalable Impact',
    description: 'Six core technology practices designed to modernize operations, safeguard digital assets, and drive sustainable growth.',
    primaryCtaText: 'View All Practices',
    primaryCtaUrl: '/services',
    status: 'visible',
    displayOrder: 4,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_why_us',
    sectionKey: 'home_why_us',
    page: 'home',
    badge: 'THE INFOSBRAIN ADVANTAGE',
    title: 'Why Global Organizations Choose',
    highlightText: 'InfosBrain',
    status: 'visible',
    displayOrder: 5,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_process',
    sectionKey: 'home_process',
    page: 'home',
    badge: 'PROVEN METHODOLOGY',
    title: 'From Concept to Continuous Scale: Our',
    highlightText: 'Engineering Process',
    status: 'visible',
    displayOrder: 6,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_industries',
    sectionKey: 'home_industries',
    page: 'home',
    badge: 'INDUSTRY EXPERTISE',
    title: 'Tailored Digital Solutions for',
    highlightText: 'High-Stakes Sectors',
    status: 'visible',
    displayOrder: 7,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_case_studies',
    sectionKey: 'home_case_studies',
    page: 'home',
    badge: 'PROVEN OUTCOMES',
    title: 'Measurable Client Results in',
    highlightText: 'Action',
    status: 'visible',
    displayOrder: 8,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_partnerships',
    sectionKey: 'home_partnerships',
    page: 'home',
    badge: 'STRATEGIC ALLIANCES',
    title: 'Building Strategic Partnerships',
    highlightText: 'Across Continents',
    status: 'visible',
    displayOrder: 9,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_ai_tools',
    sectionKey: 'home_ai_tools',
    page: 'home',
    badge: 'INTELLIGENT SYSTEMS',
    title: 'Explore Our Suite of',
    highlightText: 'Enterprise AI Tools',
    status: 'visible',
    displayOrder: 10,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_global_presence',
    sectionKey: 'home_global_presence',
    page: 'home',
    badge: 'GLOBAL REACH',
    title: 'Worldwide Presence with',
    highlightText: 'Local Insight',
    status: 'visible',
    displayOrder: 11,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_innovations',
    sectionKey: 'home_innovations',
    page: 'home',
    badge: 'R&D LAB',
    title: 'Pioneering Innovations from Our',
    highlightText: 'Technology Center',
    status: 'visible',
    displayOrder: 12,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_leadership',
    sectionKey: 'home_leadership',
    page: 'home',
    badge: 'EXECUTIVE LEADERSHIP & ADVISORY',
    title: 'Meet the Visionaries',
    highlightText: 'Behind InfosBrain',
    description: 'A multidisciplinary executive cadre combining deep technological expertise, global governance acumen, and an uncompromising commitment to client success.',
    status: 'visible',
    displayOrder: 13,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_thought_leadership',
    sectionKey: 'home_thought_leadership',
    page: 'home',
    badge: 'INSIGHTS & INTELLIGENCE',
    title: 'Research, Whitepapers &',
    highlightText: 'Strategic Briefings',
    status: 'visible',
    displayOrder: 14,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_testimonials',
    sectionKey: 'home_testimonials',
    page: 'home',
    badge: 'GLOBAL SOCIAL PROOF',
    title: 'Trusted by Leaders',
    highlightText: 'Worldwide',
    description: 'Discover how organizations across continents partner with InfosBrain to accelerate their digital capabilities.',
    status: 'visible',
    displayOrder: 15,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_careers',
    sectionKey: 'home_careers',
    page: 'home',
    badge: 'CAREERS & CULTURE',
    title: 'Join Our Mission to Build the',
    highlightText: 'Future of Digital Solutions',
    status: 'visible',
    displayOrder: 16,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_cta',
    sectionKey: 'home_cta',
    page: 'home',
    badge: 'READY TO SCALE & INNOVATE',
    title: "Let's Build Something Extraordinary",
    highlightText: 'Together',
    description: siteConfig.brand.heroServiceStatement,
    primaryCtaText: 'Start A Conversation',
    primaryCtaUrl: '/contact',
    secondaryCtaText: 'Schedule Consultation',
    secondaryCtaUrl: '/contact',
    status: 'visible',
    displayOrder: 17,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'sec_home_contact',
    sectionKey: 'home_contact',
    page: 'home',
    badge: 'START A CONVERSATION',
    title: 'Connect with Our',
    highlightText: 'Strategy Leads',
    status: 'visible',
    displayOrder: 18,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'banner_about',
    sectionKey: 'banner_about',
    page: 'about',
    badge: 'ABOUT INFOSBRAIN',
    title: 'Global Technology & Digital Transformation',
    subtitle: 'Empowering organizations to build smarter, scale faster, and grow with confidence.',
    image: '/assets/team-banner.png',
    status: 'visible',
    displayOrder: 19,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'banner_services',
    sectionKey: 'banner_services',
    page: 'services',
    badge: 'PRACTICES & CAPABILITIES',
    title: 'End-to-End Technology Solutions',
    subtitle: 'Scalable engineering, intelligent automation, cloud resilience, and digital growth strategies.',
    image: '/assets/team-banner.png',
    status: 'visible',
    displayOrder: 20,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'banner_careers',
    sectionKey: 'banner_careers',
    page: 'careers',
    badge: 'GLOBAL TALENT',
    title: 'Build the Future with InfosBrain',
    subtitle: 'Join an international team of architects, engineers, and digital strategists.',
    image: '/assets/team-banner.png',
    status: 'visible',
    displayOrder: 21,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'banner_contact',
    sectionKey: 'banner_contact',
    page: 'contact',
    badge: 'DIRECT ADVISORY',
    title: 'Start Your Digital Transformation',
    subtitle: 'Consult directly with our practice directors in Dublin, Amsterdam, and globally.',
    image: '/assets/team-banner.png',
    status: 'visible',
    displayOrder: 22,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

/**
 * Safely fetches an API route. If the server responds with HTML (SPA fallback),
 * 404, or network error, it treats it as offline/static mode and returns isOffline: true.
 */
export async function safeApiFetch(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; data?: any; isOffline: boolean }> {
  try {
    const res = await fetch(url, options);
    // 501 (Not Implemented e.g. CDN/static host blocking DELETE/PUT) or 405 (Method Not Allowed)
    if (res.status === 501 || res.status === 405) {
      return { ok: false, status: res.status, isOffline: true };
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      // Server returned HTML (e.g. Hostinger SPA index.html fallback)
      return { ok: false, status: res.status, isOffline: true };
    }
    const data = await res.json();
    return { ok: res.ok, status: res.status, data, isOffline: false };
  } catch {
    return { ok: false, status: 0, isOffline: true };
  }
}

/**
 * Helper to get cached data from localStorage or fallback to default dataset
 */
export function loadOfflineCache<T>(cacheKey: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(cacheKey);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed as T;
      }
      if (parsed && typeof parsed === 'object') {
        return parsed as T;
      }
    }
  } catch {}
  return defaultValue;
}

/**
 * Helper to persist data to localStorage
 */
export function saveOfflineCache<T>(cacheKey: string, data: T): void {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch {}
}
