import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { siteConfig } from '../config/siteConfig';
import {
  LeadershipMember,
  TeamMember,
  ServiceItem,
  TestimonialItem,
  FAQItem,
  OfficeLocation,
  CaseStudyItem,
  CareerPosition,
} from '../types';

export interface CmsStatistic {
  id: string;
  value: string;
  label: string;
  suffix?: string;
  icon?: string;
}

export interface CmsSection {
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
  status: 'visible' | 'hidden';
  isVisible: boolean;
  contentJson?: any;
}

export interface CmsContextType {
  leadership: LeadershipMember[];
  teamMembers: TeamMember[];
  services: ServiceItem[];
  statistics: CmsStatistic[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  locations: OfficeLocation[];
  caseStudies: CaseStudyItem[];
  careers: CareerPosition[];
  partnerships: any[];
  sections: Record<string, CmsSection>;
  settings: Record<string, string>;
  isLoading: boolean;
  isSectionVisible: (sectionKey: string) => boolean;
  getSection: (sectionKey: string) => CmsSection | undefined;
  refreshCms: () => Promise<void>;
}

const defaultStats: CmsStatistic[] = (siteConfig.stats || []).map((s, idx) => ({
  id: `stat-${idx}`,
  value: s.value,
  label: s.label,
  suffix: s.suffix,
  icon: 'TrendingUp',
}));

const defaultSections: Record<string, CmsSection> = {
  home_hero: {
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
    isVisible: true,
  },
  home_metrics: { id: 'sec_home_metrics', sectionKey: 'home_metrics', page: 'home', status: 'visible', isVisible: true },
  home_about: { id: 'sec_home_about', sectionKey: 'home_about', page: 'home', status: 'visible', isVisible: true },
  home_services: { id: 'sec_home_services', sectionKey: 'home_services', page: 'home', status: 'visible', isVisible: true },
  home_why_us: { id: 'sec_home_why_us', sectionKey: 'home_why_us', page: 'home', status: 'visible', isVisible: true },
  home_process: { id: 'sec_home_process', sectionKey: 'home_process', page: 'home', status: 'visible', isVisible: true },
  home_industries: { id: 'sec_home_industries', sectionKey: 'home_industries', page: 'home', status: 'visible', isVisible: true },
  home_case_studies: { id: 'sec_home_case_studies', sectionKey: 'home_case_studies', page: 'home', status: 'visible', isVisible: true },
  home_partnerships: { id: 'sec_home_partnerships', sectionKey: 'home_partnerships', page: 'home', status: 'visible', isVisible: true },
  home_ai_tools: { id: 'sec_home_ai_tools', sectionKey: 'home_ai_tools', page: 'home', status: 'visible', isVisible: true },
  home_global_presence: { id: 'sec_home_global_presence', sectionKey: 'home_global_presence', page: 'home', status: 'visible', isVisible: true },
  home_innovations: { id: 'sec_home_innovations', sectionKey: 'home_innovations', page: 'home', status: 'visible', isVisible: true },
  home_leadership: { id: 'sec_home_leadership', sectionKey: 'home_leadership', page: 'home', status: 'visible', isVisible: true },
  home_thought_leadership: { id: 'sec_home_thought_leadership', sectionKey: 'home_thought_leadership', page: 'home', status: 'visible', isVisible: true },
  home_testimonials: { id: 'sec_home_testimonials', sectionKey: 'home_testimonials', page: 'home', status: 'visible', isVisible: true },
  home_careers: { id: 'sec_home_careers', sectionKey: 'home_careers', page: 'home', status: 'visible', isVisible: true },
  home_cta: {
    id: 'sec_home_cta',
    sectionKey: 'home_cta',
    page: 'home',
    badge: 'READY TO SCALE & INNOVATE',
    title: "Let's Build Something Extraordinary",
    highlightText: 'Together',
    description: siteConfig.brand.heroServiceStatement,
    primaryCtaText: 'Start A Conversation',
    primaryCtaUrl: '/contact',
    status: 'visible',
    isVisible: true,
  },
  home_contact: { id: 'sec_home_contact', sectionKey: 'home_contact', page: 'home', status: 'visible', isVisible: true },
  banner_about: { id: 'banner_about', sectionKey: 'banner_about', page: 'about', status: 'visible', isVisible: true },
  banner_services: { id: 'banner_services', sectionKey: 'banner_services', page: 'services', status: 'visible', isVisible: true },
  banner_careers: { id: 'banner_careers', sectionKey: 'banner_careers', page: 'careers', status: 'visible', isVisible: true },
  banner_contact: { id: 'banner_contact', sectionKey: 'banner_contact', page: 'contact', status: 'visible', isVisible: true },
};

const defaultSettings: Record<string, string> = {
  brand_name: siteConfig.brand.name,
  tagline: siteConfig.brand.tagline,
  contact_email: siteConfig.contact.primaryEmail,
  secondary_email: siteConfig.contact.secondaryEmail,
  phone: siteConfig.contact.phone,
  whatsapp: siteConfig.contact.whatsapp,
  address: siteConfig.contact.address,
  hours: siteConfig.contact.hours,
  social_linkedin: siteConfig.contact.social.linkedin,
  social_facebook: siteConfig.contact.social.facebook,
  social_instagram: siteConfig.contact.social.instagram,
  social_x: siteConfig.contact.social.x,
  social_youtube: siteConfig.contact.social.youtube,
};

const CmsContext = createContext<CmsContextType>({
  leadership: siteConfig.leadership,
  teamMembers: siteConfig.teamMembers,
  services: siteConfig.services,
  statistics: defaultStats,
  testimonials: siteConfig.testimonials,
  faqs: siteConfig.faqs,
  locations: siteConfig.globalOffices,
  caseStudies: siteConfig.caseStudies,
  careers: siteConfig.careers,
  partnerships: [],
  sections: defaultSections,
  settings: defaultSettings,
  isLoading: false,
  isSectionVisible: () => true,
  getSection: () => undefined,
  refreshCms: async () => {},
});

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leadership, setLeadership] = useState<LeadershipMember[]>(siteConfig.leadership || []);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(siteConfig.teamMembers || []);
  const [services, setServices] = useState<ServiceItem[]>(siteConfig.services || []);
  const [statistics, setStatistics] = useState<CmsStatistic[]>(defaultStats);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(siteConfig.testimonials || []);
  const [faqs, setFaqs] = useState<FAQItem[]>(siteConfig.faqs || []);
  const [locations, setLocations] = useState<OfficeLocation[]>(siteConfig.globalOffices || []);
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(siteConfig.caseStudies || []);
  const [careers, setCareers] = useState<CareerPosition[]>(siteConfig.careers || []);
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [sections, setSections] = useState<Record<string, CmsSection>>(defaultSections);
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const syncOfflineSections = useCallback(() => {
    try {
      const saved = localStorage.getItem('infosbrain_cms_sections');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const customSectionsMap: Record<string, CmsSection> = {};
          parsed.forEach((sec: any) => {
            customSectionsMap[sec.sectionKey] = {
              ...sec,
              isVisible: sec.status === 'visible',
            };
          });
          setSections((prev) => ({ ...prev, ...customSectionsMap }));
        }
      }
    } catch {}
  }, []);

  const fetchCmsData = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/all');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data.leadership)) {
          setLeadership(data.leadership);
        }
        if (Array.isArray(data.teamMembers)) {
          setTeamMembers(data.teamMembers);
        }
        if (data.services && data.services.length > 0) {
          setServices((prev) => {
            const cmsServices: ServiceItem[] = data.services;
            const cmsSlugSet = new Set(cmsServices.map((s: any) => s.slug));
            return [...cmsServices, ...prev.filter((p: any) => !cmsSlugSet.has(p.slug))];
          });
        }
        if (data.statistics && data.statistics.length > 0) {
          setStatistics(data.statistics);
        }
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
        if (data.faqs && data.faqs.length > 0) {
          setFaqs(data.faqs);
        }
        if (data.locations && data.locations.length > 0) {
          setLocations(data.locations);
        }
        if (data.caseStudies && data.caseStudies.length > 0) {
          setCaseStudies((prev) => {
            const cmsItems: CaseStudyItem[] = data.caseStudies;
            const cmsKeySet = new Set(cmsItems.flatMap((c: any) => [c.id, c.slug].filter(Boolean)));
            return [...cmsItems, ...prev.filter((p: any) => !cmsKeySet.has(p.id) && !cmsKeySet.has(p.slug))];
          });
        }
        if (data.careers && data.careers.length > 0) {
          setCareers(data.careers);
        }
        if (data.partnerships && data.partnerships.length > 0) {
          setPartnerships(data.partnerships);
        }
        if (data.sections && Object.keys(data.sections).length > 0) {
          setSections((prev) => ({ ...prev, ...data.sections }));
        }
        if (data.settings && Object.keys(data.settings).length > 0) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      }
    } catch (err) {
      console.warn('[CMS Provider] Falling back to default site configuration:', err);
    } finally {
      syncOfflineSections();
      setIsLoading(false);
    }
  }, [syncOfflineSections]);

  useEffect(() => {
    syncOfflineSections();
    fetchCmsData();

    const handleCmsUpdate = () => {
      syncOfflineSections();
      fetchCmsData();
    };
    window.addEventListener('infosbrain_cms_updated', handleCmsUpdate);
    return () => {
      window.removeEventListener('infosbrain_cms_updated', handleCmsUpdate);
    };
  }, [fetchCmsData, syncOfflineSections]);

  const isSectionVisible = useCallback(
    (sectionKey: string): boolean => {
      const sec = sections[sectionKey];
      if (!sec) return true; // default visible if not found
      return sec.status !== 'hidden';
    },
    [sections]
  );

  const getSection = useCallback(
    (sectionKey: string): CmsSection | undefined => {
      return sections[sectionKey];
    },
    [sections]
  );

  return (
    <CmsContext.Provider
      value={{
        leadership,
        teamMembers,
        services,
        statistics,
        testimonials,
        faqs,
        locations,
        caseStudies,
        careers,
        partnerships,
        sections,
        settings,
        isLoading,
        isSectionVisible,
        getSection,
        refreshCms: fetchCmsData,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  return useContext(CmsContext);
};
