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

const normalizeCat = (cat?: string): 'leadership' | 'team' => {
  if (!cat) return 'leadership';
  const c = String(cat).trim().toLowerCase();
  if (
    c.includes('leadership') ||
    c.includes('executive') ||
    c.includes('showcase') ||
    c === 'lead' ||
    c === 'director'
  ) {
    return 'leadership';
  }
  return 'team';
};

const initialLeadershipList = (siteConfig.leadership || []).map((m: any) => ({
  ...m,
  category: 'leadership',
}));

const initialTeamList = (siteConfig.teamMembers || []).map((m: any) => ({
  ...m,
  category: 'team',
}));

const initialAllMembers = [...initialLeadershipList, ...initialTeamList];

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
  isLoading: true,
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
    let rawMembers: any[] | null = null;
    let data: any = null;

    // 1. Attempt primary unified endpoint: /api/cms/all
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
        data = await res.json();
        if (Array.isArray(data?.members)) {
          rawMembers = data.members;
        } else if (Array.isArray(data?.data?.members)) {
          rawMembers = data.data.members;
        } else if (Array.isArray(data?.data)) {
          rawMembers = data.data;
        } else if (Array.isArray(data?.leadership) || Array.isArray(data?.teamMembers)) {
          rawMembers = [
            ...(Array.isArray(data.leadership) ? data.leadership : []),
            ...(Array.isArray(data.teamMembers) ? data.teamMembers : []),
          ];
        }
      }
    } catch (err) {
      console.warn('[CMS Provider] /api/cms/all fetch notice:', err);
    }

    // 2. If team members not found in /api/cms/all, attempt public Team endpoint: /api/team
    if (rawMembers === null) {
      for (const endpoint of ['/api/team', '/api/team.json', '/api/cms/all.json']) {
        try {
          const res = await fetch(endpoint, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store',
              Pragma: 'no-cache',
            },
          });
          const contentType = res.headers.get('content-type') || '';
          if (res.ok && contentType.includes('application/json')) {
            const teamData = await res.json();
            if (Array.isArray(teamData)) {
              rawMembers = teamData;
              break;
            } else if (Array.isArray(teamData?.members)) {
              rawMembers = teamData.members;
              break;
            } else if (Array.isArray(teamData?.data)) {
              rawMembers = teamData.data;
              break;
            } else if (Array.isArray(teamData?.leadership) || Array.isArray(teamData?.teamMembers)) {
              rawMembers = [
                ...(Array.isArray(teamData.leadership) ? teamData.leadership : []),
                ...(Array.isArray(teamData.teamMembers) ? teamData.teamMembers : []),
              ];
              break;
            }
          }
        } catch {}
      }
    }

    // 3. Format and update team if retrieved from API
    if (Array.isArray(rawMembers)) {
      const activeMembers = rawMembers.filter((m: any) => {
        const st = String(m.status || 'published').toLowerCase();
        return st !== 'hidden' && st !== 'draft';
      });

      const formattedMembers = activeMembers.map((m: any) => {
        const cat = normalizeCat(m.category);
        return {
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
          category: cat,
          displayOrder: Number(m.displayOrder) || 0,
          status: m.status || 'published',
        };
      }).sort((a, b) => a.displayOrder - b.displayOrder);

      setMembers(formattedMembers);

      setLeadership(
        formattedMembers
          .filter((m: any) => m.category === 'leadership')
          .map((m: any) => ({
            id: m.id,
            name: m.name,
            role: m.role,
            bio: m.bio,
            achievements: m.achievements,
            imageUrl: m.imageUrl,
            linkedinUrl: m.linkedinUrl,
          }))
      );

      setTeamMembers(
        formattedMembers
          .filter((m: any) => m.category === 'team')
          .map((m: any) => ({
            id: m.id,
            name: m.name,
            role: m.role,
            bio: m.bio,
            imageUrl: m.imageUrl,
            skills: m.skills,
          }))
      );
    }

    // 4. Update other CMS sections if cmsData was returned
    if (data) {
      if (Array.isArray(data.services)) {
        setServices(data.services);
      }
      if (Array.isArray(data.statistics)) {
        setStatistics(data.statistics);
      }
      if (Array.isArray(data.testimonials)) {
        setTestimonials(data.testimonials);
      }
      if (Array.isArray(data.faqs)) {
        setFaqs(data.faqs);
      }
      if (Array.isArray(data.locations)) {
        setLocations(data.locations);
      }
      if (Array.isArray(data.caseStudies)) {
        setCaseStudies(data.caseStudies);
      }
      if (Array.isArray(data.careers)) {
        setCareers(data.careers);
      }
      if (Array.isArray(data.partnerships)) {
        setPartnerships(data.partnerships);
      }
      if (data.sections && typeof data.sections === 'object' && Object.keys(data.sections).length > 0) {
        setSections((prev) => ({ ...prev, ...data.sections }));
      }
      if (data.settings && typeof data.settings === 'object' && Object.keys(data.settings).length > 0) {
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCmsData();

    // Trigger immediate reload when admin mutates CMS content
    const handleCmsUpdate = () => {
      fetchCmsData();
    };

    window.addEventListener('infosbrain_cms_updated', handleCmsUpdate);
    window.addEventListener('storage', handleCmsUpdate);
    return () => {
      window.removeEventListener('infosbrain_cms_updated', handleCmsUpdate);
      window.removeEventListener('storage', handleCmsUpdate);
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
