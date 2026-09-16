import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
  Laptop,
  GraduationCap,
  Coffee,
  CheckCircle2,
  Mail,
  X,
  Users,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [applicationSent, setApplicationSent] = useState(false);

  const perks = [
    {
      title: 'Global Remote Culture',
      desc: 'Work from anywhere with core asynchronous collaboration hours.',
      icon: Laptop,
    },
    {
      title: 'Competitive Compensation',
      desc: 'Top-tier base pay plus milestone equity and performance bonuses.',
      icon: Sparkles,
    },
    {
      title: 'Continuous Growth Stipend',
      desc: 'Annual budgets for courses, certifications, conferences, and books.',
      icon: GraduationCap,
    },
    {
      title: 'Comprehensive Health & Wellness',
      desc: 'Full medical coverage, wellness stipends, and flexible mental health days.',
      icon: Heart,
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Careers & Opportunities - Join InfosBrain"
        description="Join InfosBrain's global team of digital engineers, SEO architects, and performance marketing specialists. View open engineering and marketing positions."
      />

      {/* Hero Banner Section with Team Culture Imagery */}
      <PageHeroBanner
        badge="GROW WITH INFOSBRAIN"
        badgeIcon={<Briefcase className="w-3.5 h-3.5 text-cyan-400" />}
        title="Build The Future of"
        highlightText="Digital Craft"
        description="We are looking for obsessed builders, algorithmic media strategists, and meticulous designers who hold themselves to the highest craftsmanship standards."
        image={{
          src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Collaborative Global Engineering Team',
          tag: 'High-Impact Engineering Culture',
          statPill: {
            value: '100%',
            label: 'Remote First',
            subtext: 'Worldwide Team Across 6+ Timezones',
          },
          secondaryPill: {
            text: 'Annual Growth Stipend',
            icon: <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        actions={
          <>
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                const el = document.getElementById('open-positions');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View Open Roles
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/about')}
            >
              About Our Ethos
            </Button>
          </>
        }
        keyPoints={[
          'Autonomous Asynchronous Sprints',
          'Top 1% Engineering Standards',
          'Milestone Equity & Rewards',
        ]}
      />

      {/* Perks & Culture */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="WHY JOIN US"
            title="Culture That Empowers"
            highlightText="High Performers"
            description="We eliminate bureaucratic noise so you can focus on building meaningful software and high-converting campaigns."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#050816] border border-slate-800 hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 mb-4">
                  <perk.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Life At InfosBrain Image Mosaic */}
          <div className="mt-16 pt-12 border-t border-slate-800/80">
            <div className="text-center mb-8">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                // LIFE AT INFOSBRAIN
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Collaborative, High-Cadence Engineering Culture
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800 group shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="InfosBrain Engineering Standup & Sprint Planning"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                  Sprint Strategy & Architecture
                </div>
              </div>

              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800 group shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Distributed Development Environment"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                  Deep Focus Deep Work
                </div>
              </div>

              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800 group shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Mentorship & Growth at InfosBrain"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                  Mentorship & Peer Review
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 bg-[#050816]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-2">
                // ACTIVE SEARCHES
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                Open Career Opportunities
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Direct resume submissions: <span className="text-cyan-300 font-mono">info@infosbrain.com</span>
            </div>
          </div>

          <div className="space-y-4">
            {siteConfig.careers.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-[#070B1F] border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                      {job.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                      {job.department}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Briefcase className="w-3.5 h-3.5" />
                      {job.experience}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => setSelectedRole(job)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer hover:bg-slate-800"
                  >
                    <span>View Role Spec</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Spec Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#070B1F] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setSelectedRole(null);
                setApplicationSent(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400">
                  {selectedRole.department} • {selectedRole.type}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                  {selectedRole.title}
                </h2>
                <div className="text-xs text-slate-400 mt-1">
                  Location: {selectedRole.location} • Experience: {selectedRole.experience}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedRole.description}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Key Responsibilities</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Architect robust, scalable production deliverables aligned with client benchmarks.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Collaborate asynchronously across senior engineering, SEO, and paid acquisition teams.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Contribute to internal knowledge systems and continuous architecture upgrades.</span>
                  </div>
                </div>
              </div>

              {applicationSent ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Application initiated! Please forward your resume to info@infosbrain.com.</span>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Direct resume submissions to: <a href="mailto:info@infosbrain.com" className="text-cyan-300 underline font-mono">info@infosbrain.com</a>
                  </div>
                  <a
                    href={`mailto:info@infosbrain.com?subject=Application for ${encodeURIComponent(selectedRole.title)}`}
                    onClick={() => setApplicationSent(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Apply via Email</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
