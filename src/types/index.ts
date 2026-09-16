export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroSubtitle?: string;
  fullDescription?: string;
  category: 'Marketing' | 'Development' | 'Design' | 'Advertising';
  iconName: string;
  featured?: boolean;
  imageUrl?: string;
  features: string[];
  deliverables?: string[];
  technologies?: string[];
  tools?: string[];
  benefits: string[];
  processSteps?: { title: string; desc: string }[];
  process?: { phase: string; description: string }[];
  faqs?: { q: string; a: string }[];
  ctaText: string;
}

export interface AISolutionItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: 'Automation' | 'Analytics' | 'Generative Search' | 'Agents & LLMs' | 'Vision & Documents' | 'Content Engines';
  imageUrl: string;
  badge?: string;
  statsMetric: { label: string; value: string };
  capabilities: string[];
  architectureHighlights: string[];
  useCases: { title: string; desc: string; impact: string }[];
  deliverables: string[];
  techStack: string[];
  faqs: { q: string; a: string }[];
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description?: string;
  imageUrl?: string;
  challenges: string[];
  solutions: string[];
  relevantServices: string[];
  statsHeadline?: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: 'Web Development' | 'SEO' | 'Digital Marketing' | 'E-commerce' | 'Branding';
  imageUrl?: string;
  challenge: string;
  strategy: string;
  services: string[];
  solution: string;
  results: { label: string; value: string }[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  testimonial: string;
  rating: number;
  avatarText?: string;
  avatarUrl?: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'SEO' | 'Digital Marketing' | 'Web Development' | 'E-commerce' | 'Social Media' | 'Paid Advertising' | 'Business Growth' | 'Technology';
  readTime: string;
  date: string;
  author: string;
  imageUrl?: string;
  content: string[];
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  description: string;
  requirements: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  skills: string[];
}
