import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../common/SectionHeading';
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
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Map icon strings to Lucide components
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

  const filteredServices =
    selectedCategory === 'All'
      ? siteConfig.services
      : siteConfig.services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] radial-spotlight pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="OUR CAPABILITIES"
          title="Everything You Need"
          highlightText="To Grow Online"
          description="From strategy and design to development and digital marketing, InfosBrain provides end-to-end digital solutions designed around your business goals."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat === 'All' ? 'All 13 Services' : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="group relative rounded-2xl p-6 bg-[#070B1F]/70 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-sm cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all pointer-events-none" />

                <div>
                  {/* Service Image Banner */}
                  {service.imageUrl && (
                    <div className="relative h-36 w-full rounded-xl overflow-hidden mb-5 border border-slate-800/80 group-hover:border-cyan-500/30 transition-all">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-[#070B1F]/40 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-cyan-400/60 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300 shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {!service.imageUrl && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-400 border border-slate-800">
                        {service.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                  <span>Learn More & Strategy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Services Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sm font-bold text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer shadow-lg"
          >
            <span>Explore The Full Services Directory Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
