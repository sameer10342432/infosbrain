import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { SectionHeading } from '../common/SectionHeading';
import {
  Activity,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Truck,
  ShoppingBag,
  Building2,
  Factory,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const IndustriesTeaser: React.FC = () => {
  const { navigate } = useRouter();

  const industriesList = [
    {
      id: 'ind-healthcare',
      name: 'Healthcare & Life Sciences',
      icon: Activity,
      desc: 'Administrative automation, secure patient portals, HIPAA/GDPR compliance, and clinical document intelligence.',
      caseLink: '/case-studies',
      color: '#00C9A7',
      tag: 'Clinical Portals',
    },
    {
      id: 'ind-education',
      name: 'Education & Institutions',
      icon: GraduationCap,
      desc: 'Adaptive learning pathways, AI tutoring assistance, institutional student portals, and comprehension analytics.',
      caseLink: '/case-studies',
      color: '#0078FF',
      tag: '10,000+ Active Learners',
    },
    {
      id: 'ind-nonprofit',
      name: 'Nonprofits & NGOs',
      icon: HeartHandshake,
      desc: 'Multilingual donor engagement platforms, automated impact reporting, transparency ledgers, and outreach funnels.',
      caseLink: '/case-studies',
      color: '#6C4DFF',
      tag: '+300% Engagement',
    },
    {
      id: 'ind-banking',
      name: 'Banking & Financial Services',
      icon: Landmark,
      desc: 'Document intelligence for underwriting, regulatory compliance audit trails, fraud pattern detection, and fintech dashboards.',
      caseLink: '/case-studies',
      color: '#0078FF',
      tag: 'Audit Ready',
    },
    {
      id: 'ind-logistics',
      name: 'Logistics & Supply Chain',
      icon: Truck,
      desc: 'Real-time fleet tracking, invoice three-way matching, demand forecasting, and cross-border route optimization.',
      caseLink: '/case-studies',
      color: '#00C9A7',
      tag: 'Real-Time Telemetry',
    },
    {
      id: 'ind-retail',
      name: 'Retail & E-Commerce',
      icon: ShoppingBag,
      desc: 'Sub-second headless digital storefronts, predictive cart cross-sells, omnichannel inventory, and customer chatbots.',
      caseLink: '/case-studies',
      color: '#6C4DFF',
      tag: '+180% Sales Growth',
    },
    {
      id: 'ind-government',
      name: 'Government & Public Sector',
      icon: Building2,
      desc: 'Accessible citizen digital services, municipal management portals, secure document archives, and civic reporting.',
      caseLink: '/case-studies',
      color: '#0078FF',
      tag: 'Citizen Services',
    },
    {
      id: 'ind-manufacturing',
      name: 'Manufacturing & Industrial',
      icon: Factory,
      desc: 'Industrial IoT telemetry, predictive machinery maintenance, process optimization, and inventory synchronizations.',
      caseLink: '/case-studies',
      color: '#00C9A7',
      tag: 'Process Automation',
    },
  ];

  return (
    <section id="industries" className="relative py-24 bg-[#071A35] overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#0078FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="SECTOR EXPERTISE"
          title="Industries We"
          highlightText="Serve Globally"
          description="Every sector operates under specific regulatory frameworks, data confidentiality requirements, and user expectations. InfosBrain delivers tailored digital solutions architected around your industry's precise realities."
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
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-[#071A35] border border-slate-800">
                      {ind.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display group-hover:text-[#00C9A7] transition-colors mb-2">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{ind.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#0078FF] group-hover:text-[#00C9A7] transition-colors">
                  <span>View Case Study</span>
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
            <span>Explore Complete Industry Solutions</span>
            <ArrowRight className="w-4 h-4 text-[#0078FF]" />
          </button>
        </div>
      </div>
    </section>
  );
};
