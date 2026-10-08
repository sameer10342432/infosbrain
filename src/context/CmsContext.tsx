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
  members: any[];
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
  members: [],
  leadership: [],
  teamMembers: [],
  services: siteConfig.services || [],
  statistics: defaultStats,
  testimonials: siteConfig.testimonials || [],
  faqs: siteConfig.faqs || [],
  locations: siteConfig.globalOffices || [],
  caseStudies: siteConfig.caseStudies || [],
  careers: siteConfig.careers || [],
  partnerships: [],
  sections: defaultSections,
  settings: defaultSettings,
  isLoading: false,
  isSectionVisible: () => true,
  getSection: () => undefined,
  refreshCms: async () => {},
});

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<any[]>([]);
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
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

  const fetchCmsData = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/all', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store',
          Pragma: 'no-cache',
        },
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();

        // 1. Team & Leadership: Database is single source of truth
        const rawMembers = Array.isArray(data.members)
          ? data.members
          : [
              ...(Array.isArray(data.leadership) ? data.leadership : []),
              ...(Array.isArray(data.teamMembers) ? data.teamMembers : []),
            ];

        // Format team members consistently
        const formattedMembers = rawMembers.map((m: any) => ({
          ...m,
          id: m.id,
          name: m.name,
          role: m.role || m.designation || '',
          designation: m.designation || m.role || '',
          bio: m.bio || '',
          qualification: m.qualification || '',
          imageUrl: m.imageUrl || m.profileImage || m.image || '',
          profileImage: m.profileImage || m.imageUrl || m.image || '',
          linkedinUrl: m.linkedinUrl || m.linkedin || '',
          achievements: Array.isArray(m.achievements) ? m.achievements : [],
          skills: Array.isArray(m.skills) ? m.skills : Array.isArray(m.achievements) ? m.achievements : [],
          category: m.category || 'leadership',
          displayOrder: Number(m.displayOrder) || 0,
          status: m.status || 'published',
        }));

        setMembers(formattedMembers);

        if (Array.isArray(data.leadership)) {
          setLeadership(
            data.leadership.map((m: any) => ({
              ...m,
              role: m.role || m.designation || '',
              imageUrl: m.imageUrl || m.profileImage || '',
            }))
          );
        } else {
          setLeadership(formattedMembers.filter((m: any) => m.category === 'leadership'));
        }

        if (Array.isArray(data.teamMembers)) {
          setTeamMembers(
            data.teamMembers.map((m: any) => ({
              ...m,
              role: m.role || m.designation || '',
              imageUrl: m.imageUrl || m.profileImage || '',
              skills: Array.isArray(m.skills) ? m.skills : Array.isArray(m.achievements) ? m.achievements : [],
            }))
          );
        } else {
          setTeamMembers(formattedMembers.filter((m: any) => m.category === 'team'));
        }

        // 2. Services: Database is single source of truth
        if (Array.isArray(data.services)) {
          setServices(data.services);
        }

        // 3. Statistics
        if (Array.isArray(data.statistics)) {
          setStatistics(data.statistics);
        }

        // 4. Testimonials
        if (Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }

        // 5. FAQs
        if (Array.isArray(data.faqs)) {
          setFaqs(data.faqs);
        }

        // 6. Locations
        if (Array.isArray(data.locations)) {
          setLocations(data.locations);
        }

        // 7. Case Studies: Database is single source of truth
        if (Array.isArray(data.caseStudies)) {
          setCaseStudies(data.caseStudies);
        }

        // 8. Careers
        if (Array.isArray(data.careers)) {
          setCareers(data.careers);
        }

        // 9. Partnerships
        if (Array.isArray(data.partnerships)) {
          setPartnerships(data.partnerships);
        }

        // 10. Sections & Page Banners
        if (data.sections && typeof data.sections === 'object' && Object.keys(data.sections).length > 0) {
          setSections((prev) => ({ ...prev, ...data.sections }));
        }

        // 11. Site Settings
        if (data.settings && typeof data.settings === 'object' && Object.keys(data.settings).length > 0) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      }
    } catch (err) {
      console.warn('[CMS Provider] API fetch notice:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCmsData();

    // Trigger immediate reload when admin mutates CMS content
    const handleCmsUpdate = () => {
      fetchCmsData();
    };

    window.addEventListener('infosbrain_cms_updated', handleCmsUpdate);
    return () => {
      window.removeEventListener('infosbrain_cms_updated', handleCmsUpdate);
    };
  }, [fetchCmsData]);

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
        members,
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
