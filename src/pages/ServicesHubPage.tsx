import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import {
  Megaphone,
  Search,
  Palette,
  Globe,
  ShoppingBag,
  Code2,
  Terminal,
  FileText,
  Mail,
  Share2,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export const ServicesHubPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Megaphone':
        return Megaphone;
      case 'Search':
        return Search;
      case 'Palette':
        return Palette;
      case 'Globe':
        return Globe;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Code2':
        return Code2;
      case 'Terminal':
        return Terminal;
      case 'FileText':
        return FileText;
      case 'Mail':
        return Mail;
      case 'Share2':
        return Share2;
      case 'TrendingUp':
        return TrendingUp;
      case 'Target':
        return Target;
      case 'Zap':
        return Zap;
      default:
        return Sparkles;
    }
  };

  const categories = ['All', 'Development', 'Marketing', 'Advertising', 'Design'];

  const filtered = siteConfig.services.filter((s) => {
    const matchesCat = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Services Hub - Complete Technology & Marketing Solutions"
        description="Explore InfosBrain's 13 core digital services across full-stack web development, SEO, digital marketing, graphic design, and performance advertising."
      />

      {/* Hero Banner Section with Digital Workstation Image */}
      <PageHeroBanner
        badge="FULL-SPECTRUM CAPABILITIES"
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
        title="Digital Engineering &"
        highlightText="Marketing Excellence"
        description="From custom MERN architectures and headless e-commerce to algorithmic search dominance and multi-channel paid ad campaigns, explore our 13 specialized service lines."
        image={{
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Digital Technology & Performance Marketing Command Center',
          tag: 'Multi-Discipline Engineering',
          statPill: {
            value: '13 Practices',
            label: 'Production Disciplines',
            subtext: 'Engineering, Design, SEO & Media',
          },
          secondaryPill: {
            text: 'MERN & Cloud Native',
            icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        actions={
          <>
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/contact')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Consult An Architect
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/case-studies')}
              icon={<Layers className="w-4 h-4 text-cyan-400" />}
            >
              View Client Outcomes
            </Button>
          </>
        }
        keyPoints={[
          'Scalable Production Stacks',
          'Conversion-Optimized UI/UX',
          'Predictable Agile Sprints',
        ]}
      />

      {/* Filter and Search Bar */}
      <section className="py-8 bg-[#070B1F] border-y border-slate-800 sticky top-[68px] z-30 backdrop-blur-xl bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Services' : cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search services or tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service) => {
              const Icon = getIcon(service.iconName);

              return (
                <div
                  key={service.id}
                  onClick={() => navigate(`/services/${service.slug}`)}
                  className="group rounded-3xl p-6 sm:p-8 bg-[#070B1F]/90 border border-slate-800 hover:border-cyan-500/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Service Feature Banner */}
                    {service.imageUrl && (
                      <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-6 border border-slate-800 group-hover:border-cyan-500/40 transition-all">
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-[#070B1F]/30 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                            {service.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-cyan-400/60 flex items-center justify-center text-cyan-400 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      {!service.imageUrl && (
                        <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                          {service.category}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-3">
                      {service.title}
                    </h2>

                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                      {service.ctaText}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:translate-x-1 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              No services found matching your search. Please adjust your criteria or contact us directly.
            </div>
          )}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-display mb-4">
            Need A Custom Multi-Service Solution?
          </h2>
          <p className="text-sm text-slate-400 mb-8 max-w-xl mx-auto">
            Most client transformations blend custom web development with technical SEO and performance advertising. Let’s architect your custom roadmap.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/contact')}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Request Custom Scope & Estimate
          </Button>
        </div>
      </section>
    </div>
  );
};
