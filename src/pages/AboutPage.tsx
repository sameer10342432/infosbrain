import React from 'react';
import { useRouter } from '../context/RouterContext';
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
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

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
          src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Strategic Digital Innovation Team',
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
              Partner With Us
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
          '95+ Google Core Web Vitals Score',
          'Data-Driven ROAS Optimization',
        ]}
      />

      {/* Who We Are & What We Do */}
      <section className="py-16 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                // ORIGIN & ETHOS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                Engineered For The New Digital Economy
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Founded to bridge the disconnect between creative design studios that lack deep technical chops and developer agencies that neglect conversion psychology, InfosBrain unites both worlds.
              </p>

              {/* Agency Atmosphere Feature Image */}
              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="InfosBrain Collaborative Digital Studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-[#070B1F]/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-cyan-300 bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
                  InfosBrain Distributed Tech Ecosystem
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                We work with international startups, scale-ups, and established enterprises who require more than just a vendor—they require a dedicated digital technology co-pilot to outpace market competitors.
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

      {/* Leadership / Team Section with clearly marked demo profiles */}
      <section className="py-20 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LEADERSHIP COLLECTIVE"
            title="Meet Our Strategy &"
            highlightText="Engineering Leads"
            description="*Clearly marked placeholder profiles representing our multidisciplinary leadership structure. Easily customized for your leadership team."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-2xl bg-[#050816] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {member.imageUrl ? (
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-5 border-2 border-cyan-500/30 group-hover:border-cyan-400/70 transition-all shadow-lg">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-violet-600 p-0.5 mb-5 shadow-lg">
                      <div className="w-full h-full bg-[#070B1F] rounded-[14px] flex items-center justify-center font-display font-bold text-2xl text-cyan-400">
                        {member.name.slice(0, 2)}
                      </div>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white font-display">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mb-3">
                    {member.role}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                  {member.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="py-16 bg-[#050816]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white font-display mb-4">
            Partner With InfosBrain On Your Next Breakthrough
          </h2>
          <p className="text-sm text-slate-400 mb-8 max-w-xl mx-auto">
            Directly connect with our strategy leads at <span className="text-cyan-300 font-mono">info@infosbrain.com</span> or schedule a discovery call today.
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
