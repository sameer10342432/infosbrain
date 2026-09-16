import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { Button } from './Button';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Code2,
  Megaphone,
  Search,
  ShoppingBag,
  Terminal,
  Palette,
  Layers,
  Cpu,
  Mail,
  Share2,
  TrendingUp,
  Target,
  Zap,
  Globe,
  FileText,
  Building,
  DollarSign,
  Activity,
  Rocket,
  Bot,
  Eye,
} from 'lucide-react';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const { currentPath, navigate } = useRouter();
  const isDark = true;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [currentPath]);

  const serviceCategories = [
    {
      group: 'Development & Engineering',
      icon: Code2,
      items: [
        { name: 'MERN Stack Development', path: '/services/mern-stack-development', desc: 'React, Node, Express, MongoDB SaaS' },
        { name: 'Shopify Development', path: '/services/shopify-development', desc: 'Custom stores & headless commerce' },
        { name: 'WordPress Development', path: '/services/wordpress-development', desc: 'Enterprise custom themes & WooCommerce' },
        { name: 'PHP & Laravel Development', path: '/services/php-development', desc: 'Scalable backends & business portals' },
      ],
    },
    {
      group: 'Digital Marketing & Growth',
      icon: Megaphone,
      items: [
        { name: 'Digital Marketing Strategy', path: '/services/digital-marketing', desc: '360° revenue growth funnels' },
        { name: 'Search Engine Optimization (SEO)', path: '/services/seo', desc: 'Technical & organic ranking dominance' },
        { name: 'Content Marketing', path: '/services/content-marketing', desc: 'Thought leadership & inbound assets' },
        { name: 'Email Marketing & Automation', path: '/services/email-marketing', desc: 'Lifecycle retention flows & Klaviyo' },
        { name: 'Social Media Marketing', path: '/services/social-media-marketing', desc: 'Community engagement & brand viral reach' },
      ],
    },
    {
      group: 'Advertising & Creative',
      icon: Target,
      items: [
        { name: 'Paid Advertising (PPC)', path: '/services/paid-ads', desc: 'Multi-channel high-ROAS campaigns' },
        { name: 'Google Ads & Search', path: '/services/google-ads', desc: 'Search intent, PMax & YouTube ads' },
        { name: 'Facebook & Meta Ads', path: '/services/facebook-meta-ads', desc: 'Advantage+ scaling & CAPI tracking' },
        { name: 'Graphic Design & Branding', path: '/services/graphic-design', desc: 'Visual identity systems & UI design' },
      ],
    },
  ];

  const aiSolutions = [
    {
      title: 'AI Workflow Integration',
      desc: 'Autonomous multi-agent pipelines and enterprise API orchestration.',
      path: '/ai-solutions/workflow-automation',
      icon: Cpu,
    },
    {
      title: 'Predictive Marketing Analytics',
      desc: 'Algorithmic attribution modeling, churn scoring, and ROAS arbitrage.',
      path: '/ai-solutions/predictive-analytics',
      icon: TrendingUp,
    },
    {
      title: 'AI Search & SGE Optimization',
      desc: 'Dominate Google AI Overviews, Perplexity, and vector retrieval.',
      path: '/ai-solutions/generative-search',
      icon: Search,
    },
    {
      title: 'Enterprise Custom LLMs & Agents',
      desc: 'Domain-grounded private RAG assistants with zero hallucinations.',
      path: '/ai-solutions/chatbots-agents',
      icon: Bot,
    },
    {
      title: 'Computer Vision & Document OCR',
      desc: 'Sub-second key-value extraction and multimodal asset classification.',
      path: '/ai-solutions/computer-vision',
      icon: Eye,
    },
    {
      title: 'Generative AI Content Engines',
      desc: 'Brand-voice fine-tuned pipelines for high-velocity creative scale.',
      path: '/ai-solutions/generative-ai',
      icon: Sparkles,
    },
  ];

  const topIndustries = [
    { name: 'E-commerce & D2C', path: '/industries', icon: ShoppingBag },
    { name: 'SaaS & Cloud Platforms', path: '/industries', icon: Cpu },
    { name: 'Healthcare & MedTech', path: '/industries', icon: Activity },
    { name: 'Real Estate & PropTech', path: '/industries', icon: Building },
    { name: 'FinTech & Banking', path: '/industries', icon: DollarSign },
    { name: 'Startups & Scaleups', path: '/industries', icon: Rocket },
  ];

  const getNavBtnClass = (isActive: boolean) =>
    `px-3 py-2 rounded-lg transition-colors cursor-pointer font-medium text-sm ${
      isActive
        ? isDark
          ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30'
          : 'text-sky-700 bg-sky-100/90 border border-sky-300/80 font-bold'
        : isDark
          ? 'text-slate-300 hover:text-white hover:bg-white/5'
          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#050816]/90 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
            : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.06)] py-3'
          : isDark
            ? 'bg-transparent border-b border-white/5 py-4'
            : 'bg-transparent border-b border-slate-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          aria-label="InfosBrain Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-violet-600 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center transition-colors ${
              isDark ? 'bg-[#050816]' : 'bg-slate-900'
            }`}>
              <span className="font-display font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                IB
              </span>
            </div>
          </div>
          <div>
            <span className={`font-display font-bold text-xl sm:text-2xl tracking-tight flex items-center transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Infos<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Brain</span>
            </span>
            <span className={`hidden sm:block text-[9px] font-mono tracking-widest uppercase -mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Intelligent Digital Solutions
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <button
            onClick={() => navigate('/')}
            className={getNavBtnClass(currentPath === '/')}
          >
            Home
          </button>

          <button
            onClick={() => navigate('/about')}
            className={getNavBtnClass(currentPath === '/about')}
          >
            About Us
          </button>

          {/* Services Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => navigate('/services')}
              className={`${getNavBtnClass(currentPath.startsWith('/services'))} flex items-center gap-1.5`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'services' ? 'rotate-180 text-cyan-400' : ''
                }`}
              />
            </button>

            {activeDropdown === 'services' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-[#070B1F]/95 backdrop-blur-2xl border border-cyan-500/25 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)]">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        Complete Digital Capabilities
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">End-to-end technology, marketing & development services</p>
                    </div>
                    <button
                      onClick={() => navigate('/services')}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      View All Services <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {serviceCategories.map((cat, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                          <cat.icon className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{cat.group}</span>
                        </div>
                        <div className="space-y-1.5">
                          {cat.items.map((s, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => navigate(s.path)}
                              className="w-full text-left p-2 rounded-lg hover:bg-slate-800/60 transition-colors group cursor-pointer"
                            >
                              <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                                {s.name}
                              </div>
                              <div className="text-[11px] text-slate-500 group-hover:text-slate-400 line-clamp-1">
                                {s.desc}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('ai')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => navigate('/ai-solutions')}
              className={`${getNavBtnClass(currentPath.startsWith('/ai-solutions'))} flex items-center gap-1.5`}
            >
              <span className="flex items-center gap-1.5">
                AI Solutions
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-sm">
                  NEW
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'ai' ? 'rotate-180 text-cyan-400' : ''
                }`}
              />
            </button>

            {activeDropdown === 'ai' && (
              <div className="absolute top-full left-0 w-[420px] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-[#070B1F]/95 backdrop-blur-2xl border border-violet-500/25 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(139,92,246,0.15)] space-y-2">
                  <div className="flex items-center justify-between px-2 py-1 border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-violet-300 uppercase tracking-wider font-mono">
                      Enterprise AI Practices
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      Private & Compliant
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {aiSolutions.map((ai, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate(ai.path)}
                        className="w-full text-left p-2 rounded-xl hover:bg-slate-800/60 transition-colors group cursor-pointer flex gap-3 items-start"
                      >
                        <div className="p-2 rounded-lg bg-violet-950/60 border border-violet-500/30 text-violet-400 group-hover:text-cyan-300 transition-colors flex-shrink-0 mt-0.5">
                          <ai.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                            {ai.title}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {ai.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => navigate('/ai-solutions')}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-violet-950/60 to-cyan-950/60 hover:from-violet-900/60 hover:to-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Explore All AI Capabilities & Roadmaps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('industries')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => navigate('/industries')}
              className={`${getNavBtnClass(currentPath === '/industries')} flex items-center gap-1.5`}
            >
              <span>Industries</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'industries' ? 'rotate-180 text-cyan-400' : ''
                }`}
              />
            </button>

            {activeDropdown === 'industries' && (
              <div className="absolute top-full left-0 w-72 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-[#070B1F]/95 backdrop-blur-2xl border border-cyan-500/25 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.15)] space-y-1">
                  <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider px-2 py-1 mb-1">
                    Sectors We Serve
                  </div>
                  {topIndustries.map((ind, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(ind.path)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-2.5 text-xs text-slate-300 hover:text-cyan-300 cursor-pointer"
                    >
                      <ind.icon className="w-4 h-4 text-cyan-400" />
                      <span>{ind.name}</span>
                    </button>
                  ))}
                  <div className="pt-2 mt-2 border-t border-slate-800">
                    <button
                      onClick={() => navigate('/industries')}
                      className="w-full text-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1 cursor-pointer"
                    >
                      View All 12 Industries →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/case-studies')}
            className={getNavBtnClass(currentPath === '/case-studies')}
          >
            Case Studies
          </button>

          <button
            onClick={() => navigate('/blog')}
            className={getNavBtnClass(currentPath.startsWith('/blog') || currentPath === '/insights')}
          >
            Insights
          </button>

          <button
            onClick={() => navigate('/careers')}
            className={getNavBtnClass(currentPath === '/careers')}
          >
            Careers
          </button>

          <button
            onClick={() => scrollToSection('global')}
            className={getNavBtnClass(false)}
          >
            Global
          </button>

          <button
            onClick={() => navigate('/contact')}
            className={getNavBtnClass(currentPath === '/contact')}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            size="sm"
            variant="primary"
            onClick={() => (onOpenConsultation ? onOpenConsultation() : navigate('/contact'))}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Schedule Consultation
          </Button>
        </div>

        {/* Mobile Header Right: Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl transition-colors border cursor-pointer focus:outline-none text-slate-300 hover:text-white hover:bg-slate-800/60 border-slate-700/60"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-[65px] bottom-0 backdrop-blur-2xl border-b overflow-y-auto px-6 py-8 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-300 ${
          isDark
            ? 'bg-[#050816]/98 border-cyan-500/20 text-slate-200'
            : 'bg-white/98 border-slate-200 text-slate-800 shadow-2xl'
        }`}>
          <div className="space-y-4">

            <button
              onClick={() => navigate('/')}
              className={`w-full text-left py-2.5 text-base font-semibold border-b ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              } ${currentPath === '/' ? 'text-cyan-400' : isDark ? 'text-slate-200' : 'text-slate-800'}`}
            >
              Home
            </button>

            <button
              onClick={() => navigate('/about')}
              className={`w-full text-left py-2.5 text-base font-semibold border-b border-slate-800 ${
                currentPath === '/about' ? 'text-cyan-400' : 'text-slate-200'
              }`}
            >
              About Us
            </button>

            {/* Mobile Services Accordion */}
            <div className="border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-services' ? null : 'mobile-services')}
                className="w-full flex items-center justify-between py-2 text-base font-semibold text-slate-200"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    activeDropdown === 'mobile-services' ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'mobile-services' && (
                <div className="pl-3 mt-2 space-y-2 text-sm">
                  <button
                    onClick={() => navigate('/services')}
                    className="block py-1 text-cyan-400 font-bold"
                  >
                    All Services Overview →
                  </button>
                  {siteConfig.services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => navigate(`/services/${s.slug}`)}
                      className="block w-full text-left py-1 text-slate-300 hover:text-cyan-300"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile AI Solutions Accordion */}
            <div className="border-b border-slate-800 py-2">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-ai' ? null : 'mobile-ai')}
                className="w-full flex items-center justify-between py-2 text-base font-semibold text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <span>AI Solutions</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gradient-to-r from-cyan-500 to-violet-600 text-white">
                    NEW
                  </span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    activeDropdown === 'mobile-ai' ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'mobile-ai' && (
                <div className="pl-3 mt-2 space-y-2 text-sm">
                  <button
                    onClick={() => navigate('/ai-solutions')}
                    className="block py-1 text-cyan-400 font-bold"
                  >
                    All AI Solutions Practice Hub →
                  </button>
                  {aiSolutions.map((ai, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(ai.path)}
                      className="block w-full text-left py-1 text-slate-300 hover:text-cyan-300"
                    >
                      {ai.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/industries')}
              className={`w-full text-left py-2.5 text-base font-semibold border-b border-slate-800 ${
                currentPath === '/industries' ? 'text-cyan-400' : 'text-slate-200'
              }`}
            >
              Industries
            </button>

            <button
              onClick={() => navigate('/case-studies')}
              className={`w-full text-left py-2.5 text-base font-semibold border-b border-slate-800 ${
                currentPath === '/case-studies' ? 'text-cyan-400' : 'text-slate-200'
              }`}
            >
              Case Studies
            </button>

            <button
              onClick={() => navigate('/blog')}
              className={`w-full text-left py-2.5 text-base font-semibold border-b border-slate-800 ${
                currentPath.startsWith('/blog') ? 'text-cyan-400' : 'text-slate-200'
              }`}
            >
              Insights & Blog
            </button>

            <button
              onClick={() => navigate('/careers')}
              className={`w-full text-left py-2.5 text-base font-semibold border-b border-slate-800 ${
                currentPath === '/careers' ? 'text-cyan-400' : 'text-slate-200'
              }`}
            >
              Careers
            </button>

            <button
              onClick={() => navigate('/contact')}
              className={`w-full text-left py-2.5 text-base font-semibold border-b border-slate-800 ${
                currentPath === '/contact' ? 'text-cyan-400' : 'text-slate-200'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-8 space-y-4">
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={() => navigate('/contact')}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Let's Talk
            </Button>
            <div className="text-center text-xs text-slate-400">
              Direct Contact:{' '}
              <a href="mailto:info@infosbrain.com" className="text-cyan-400 hover:underline">
                info@infosbrain.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
