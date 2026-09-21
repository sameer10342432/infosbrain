import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { SectionHeading } from '../common/SectionHeading';
import {
  ShoppingBag,
  HeartHandshake,
  GraduationCap,
  Building2,
  Briefcase,
  Cpu,
  Landmark,
  Rocket,
  ArrowRight,
} from 'lucide-react';

export const IndustriesTeaser: React.FC = () => {
  const { navigate } = useRouter();

  const industriesList = [
    {
      id: 'ind-ecommerce',
      name: 'E-Commerce',
      icon: ShoppingBag,
      desc: 'Modern, enterprise-grade commerce platforms with real-time inventory synchronization, sub-second search, and seamless cross-border checkout experiences.',
      caseLink: '/case-studies',
      tag: 'Global Commerce',
    },
    {
      id: 'ind-nonprofits',
      name: 'Nonprofits & NGOs',
      icon: HeartHandshake,
      desc: 'Centralized digital engagement platforms featuring automated impact reporting, unified donor management, and personalized supporter journeys.',
      caseLink: '/case-studies',
      tag: 'Mission-Driven',
    },
    {
      id: 'ind-education',
      name: 'Education',
      icon: GraduationCap,
      desc: 'Scalable educational portals, adaptive digital learning environments, automated evaluation workflows, and institutional engagement platforms.',
      caseLink: '/case-studies',
      tag: 'EdTech & Academics',
    },
    {
      id: 'ind-government',
      name: 'Government Services',
      icon: Building2,
      desc: 'Accessible citizen digital services, compliant municipal portals, secure public records systems, and modernized civic workflows.',
      caseLink: '/case-studies',
      tag: 'Public Sector',
    },
    {
      id: 'ind-professional',
      name: 'Professional Services',
      icon: Briefcase,
      desc: 'Authoritative digital platforms, secure client portals, automated practice workflows, and data-driven client acquisition systems.',
      caseLink: '/case-studies',
      tag: 'Consulting & Legal',
    },
    {
      id: 'ind-enterprise-tech',
      name: 'Enterprise Technology',
      icon: Cpu,
      desc: 'High-availability cloud platforms, custom SaaS architectures, microservices integration, and enterprise-grade software engineering.',
      caseLink: '/case-studies',
      tag: 'SaaS & Tech',
    },
    {
      id: 'ind-institutions',
      name: 'Institutions',
      icon: Landmark,
      desc: 'Mission-critical operational systems, secure compliance frameworks, stakeholder communication portals, and organizational analytics.',
      caseLink: '/case-studies',
      tag: 'Governance',
    },
    {
      id: 'ind-growing-businesses',
      name: 'Growing Businesses',
      icon: Rocket,
      desc: 'Agile, high-velocity digital solutions designed to modernize legacy workflows, expand customer reach, and build scalable infrastructure.',
      caseLink: '/case-studies',
      tag: 'Scale & Growth',
    },
  ];

  return (
    <section id="industries" className="relative py-24 bg-[#071A35] overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#0078FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="SECTORS WE SERVE"
          title="Industries We"
          highlightText="Serve"
          description="InfosBrain supports organizations across private, public, and mission-driven sectors."
        />

        {/* 8 Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {industriesList.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                onClick={() => navigate(ind.caseLink)}
                className="group p-6 rounded-3xl bg-[#050816]/85 border border-slate-800 hover:border-[#0078FF]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,120,255,0.15)] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-[#0078FF]/50 group-hover:bg-[#0078FF]/15 flex items-center justify-center text-[#0078FF] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-[#071A35] border border-slate-800">
                      {ind.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display group-hover:text-[#00C9A7] transition-colors mb-2">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{ind.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#0078FF] group-hover:text-[#00C9A7] transition-colors">
                  <span>Explore Sector Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/industries')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#050816] hover:bg-slate-900 text-sm font-bold text-white border border-slate-800 hover:border-[#0078FF] transition-all cursor-pointer shadow-md"
          >
            <span>Explore Complete Industry Directory</span>
            <ArrowRight className="w-4 h-4 text-[#0078FF]" />
          </button>
        </div>
      </div>
    </section>
  );
};
