import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useCms } from '../context/CmsContext';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import {
  Sparkles,
  Target,
  Lightbulb,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Linkedin,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();
  const { members, leadership, teamMembers, settings } = useCms();
  const [categoryFilter, setCategoryFilter] = React.useState<'all' | 'leadership' | 'team'>('all');

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

  const allMembers =
    members && members.length > 0
      ? members
      : [
          ...(leadership || []).map((m: any) => ({ ...m, category: 'leadership' })),
          ...(teamMembers || []).map((m: any) => ({ ...m, category: 'team' })),
        ];

  const displayTeam =
    categoryFilter === 'all'
      ? allMembers
      : categoryFilter === 'leadership'
      ? allMembers.filter((m: any) => normalizeCat(m.category) === 'leadership')
      : allMembers.filter((m: any) => normalizeCat(m.category) === 'team');


  const values = [
    {
      title: 'Obsession With Craft',
      desc: 'We do not build generic digital templates. Every user interaction, typography hierarchy, and API endpoint is treated as an engineering artifact.',
      icon: Sparkles,
    },
    {
      title: 'Empirical Accountability',
      desc: 'Zero vanity vanity metrics. We measure our agency performance against real client bottom lines, qualified pipeline generation, and return on ad spend.',
      icon: TrendingUp,
    },
    {
      title: 'Modern Architecture',
      desc: 'We reject bloated legacy tooling in favor of modern, high-speed stacks that score 95+ on Google Core Web Vitals and scale without friction.',
      icon: Cpu,
    },
    {
      title: 'Uncompromising Transparency',
      desc: 'Direct communication, transparent sprint tracking, zero hidden markups, and complete client ownership of codebases and ad accounts.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="About Us - Digital Technology & Growth Agency"
        description="InfosBrain is a modern digital agency providing technology, web development, digital marketing, SEO, design, and growth solutions for businesses."
      />

      {/* Hero Banner Section with Thematic Image */}
      <PageHeroBanner
        badge="WHO WE ARE"
        badgeIcon={<Users className="w-3.5 h-3.5 text-cyan-400" />}
        title="Transforming Complex Ideas Into"
        highlightText="Measurable Digital Reality"
        description={siteConfig.brand.description}
        image={{
          src: '/assets/about-us-banner.png',
          alt: 'About InfosBrain Strategic Digital Innovation Team',
          tag: 'InfosBrain Innovation Studio',
          statPill: {
            value: '10+ Years',
            label: 'Digital Engineering',
            subtext: 'Serving Global Scale-Ups & Enterprises',
          },
          secondaryPill: {
            text: '100% In-House Delivery',
            icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />,
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
              Start Your Digital Transformation
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/services')}
              icon={<Layers className="w-4 h-4 text-cyan-400" />}
            >
              Explore Capabilities
            </Button>
          </>
        }
        keyPoints={[
          'Full Intellectual Property Ownership',
          'Enterprise Scalability Standards',
          'Measurable Digital Outcomes',
        ]}
      />

      {/* Who We Are & What We Do */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-xs font-mono text-[#00C9A7] uppercase tracking-widest font-bold">
                // WHO WE ARE
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display leading-tight">
                Transforming Complex Ideas into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078FF] via-[#6C4DFF] to-[#00C9A7]">
                  Scalable, Measurable Digital Reality
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                InfosBrain is a technology and digital transformation company dedicated to helping businesses, nonprofits, institutions, and government organizations leverage innovative technologies to achieve their strategic objectives.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                By combining expertise in software development, artificial intelligence, cloud solutions, cybersecurity, and digital transformation consulting, InfosBrain delivers practical, scalable, and future-ready solutions that drive efficiency, growth, and long-term impact.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-bold text-cyan-400 font-display">100%</div>
                  <div className="text-xs text-slate-400 mt-1">Code & Ad Account Ownership</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-bold text-violet-400 font-display">24/7</div>
                  <div className="text-xs text-slate-400 mt-1">Global Async & Live Support</div>
                </div>
              </div>
            </div>

            <div className="relative p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/25 shadow-2xl backdrop-blur-xl space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white font-display">Our Mission</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To empower ambitious organizations with custom digital technologies, mathematical marketing funnels, and brand prestige that accelerate enterprise valuation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="w-5 h-5 text-violet-400" />
                  <h3 className="text-lg font-bold text-white font-display">Our Vision</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To redefine international digital agency standards by merging algorithmic machine intelligence with human-centered strategic storytelling.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white font-display">Our Approach</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Agile sprints, test-driven codebases, algorithmic media budget scaling, and continuous multi-variant experimentation.
                </p>
              </div>
            </div>
          </div>

          {/* Collaborative Engineering & Culture Full-Width Showcase */}
          <div className="mt-12 relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] bg-slate-950 flex items-center justify-center group">
            <img
              src="/assets/hero-team-work.png"
              alt="InfosBrain Collaborative Engineering Team Culture"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-contain md:object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/15 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 bg-slate-950/90 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
                InfosBrain Innovation Lab & Culture
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800">
                Continuous Collaborative Sprints
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#050816]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="OUR CODE OF CONDUCT"
            title="Values That Guide"
            highlightText="Every Execution"
            description="Our non-negotiable principles in engineering, client transparency, and creative exploration."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#070B1F] border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 mb-4">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Team Section */}
      <section className="py-20 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LEADERSHIP COLLECTIVE"
            title="Meet Our Strategy &"
            highlightText="Engineering Leads"
            description="A multidisciplinary executive cadre and engineering leadership combining deep technological expertise, global governance acumen, and commitment to client success."
          />

          {/* Full-Width Team & Leadership Banner */}
          <div className="mb-10 relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] bg-slate-950 flex items-center justify-center group">
            <img
              src="/assets/team-banner.png"
              alt="InfosBrain Executive Leadership and Engineering Team"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-contain object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/15 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 bg-slate-950/90 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
                InfosBrain Multidisciplinary Leadership Team
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800">
                100% In-House Strategy
              </span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {(
              [
                { id: 'all', label: `All Members (${allMembers.length})` },
                {
                  id: 'leadership',
                  label: `Executive Leadership (${allMembers.filter((m: any) => normalizeCat(m.category) === 'leadership').length})`,
                },
                {
                  id: 'team',
                  label: `Practice & Engineering Leads (${allMembers.filter((m: any) => normalizeCat(m.category) === 'team').length})`,
                },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-900/30'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {displayTeam.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
              <Users className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="text-sm">No team members currently published in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayTeam.map((member: any) => {
                const img = member.imageUrl || member.profileImage || '';
                const role = member.role || member.designation || '';
                const tags = Array.isArray(member.skills) && member.skills.length > 0
                  ? member.skills
                  : Array.isArray(member.achievements)
                  ? member.achievements
                  : [];

                return (
                  <div
                    key={member.id}
                    className="p-6 rounded-2xl bg-[#050816] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        {img ? (
                          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400/70 transition-all shadow-lg">
                            <img
                              src={img}
                              alt={member.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-violet-600 p-0.5 shadow-lg">
                            <div className="w-full h-full bg-[#070B1F] rounded-[14px] flex items-center justify-center font-display font-bold text-2xl text-cyan-400">
                              {member.name.slice(0, 2).toUpperCase()}
                            </div>
                          </div>
                        )}

                        {member.linkedinUrl && (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
                            aria-label={`${member.name} LinkedIn Profile`}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white font-display">
                        {member.name}
                      </h3>
                      <div className="text-xs font-semibold text-cyan-400 mb-1">
                        {role}
                      </div>
                      {member.qualification && (
                        <div className="text-[11px] font-mono text-slate-400 mb-3">
                          {member.qualification}
                        </div>
                      )}
                      {member.bio && (
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                        {tags.slice(0, 4).map((tag: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* About CTA */}
      <section className="py-16 bg-[#050816]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-display mb-4">
            Your Trusted Partner in Digital Innovation
          </h2>
          <p className="text-sm text-slate-300 mb-8 max-w-xl mx-auto">
            Directly connect with our strategy leads at <span className="text-[#00C9A7] font-mono">info@infosbrain.com</span> or schedule a discovery consultation today.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/contact')}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start A Conversation
          </Button>
        </div>
      </section>
    </div>
  );
};
