import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { aiSolutionsData } from '../data/aiSolutionsData';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import {
  Cpu,
  TrendingUp,
  Search,
  Bot,
  Eye,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Server,
  Zap,
  Terminal,
  Activity,
  Layers,
  FileCheck,
  Send,
  Sliders,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  TrendingUp,
  Search,
  Bot,
  Eye,
  Sparkles,
};

interface AISolutionDetailPageProps {
  slug: string;
}

export const AISolutionDetailPage: React.FC<AISolutionDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Quote / Consultation Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Find solution by slug
  const solution = aiSolutionsData.find((item) => item.slug === slug);

  // If not found, show graceful 404
  if (!solution) {
    return (
      <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto text-center space-y-6">
        <SEOHead
          title="AI Solution Not Found - InfosBrain"
          description="The requested enterprise AI solution page could not be located."
        />
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 w-fit mx-auto text-cyan-400">
          <Cpu className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-white font-display">AI Solution Practice Not Found</h1>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          The AI discipline you requested does not exist or may have been relocated. Browse our full directory of enterprise AI capabilities.
        </p>
        <Button variant="primary" onClick={() => navigate('/ai-solutions')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          View All AI Solutions
        </Button>
      </div>
    );
  }

  const IconComponent = iconMap[solution.iconName] || Cpu;

  // Find previous and next solutions for continuous browsing
  const currentIndex = aiSolutionsData.findIndex((s) => s.slug === slug);
  const prevSolution = aiSolutionsData[(currentIndex - 1 + aiSolutionsData.length) % aiSolutionsData.length];
  const nextSolution = aiSolutionsData[(currentIndex + 1) % aiSolutionsData.length];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setFormSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title={`${solution.title} - Enterprise AI Solutions - InfosBrain`}
        description={solution.shortDescription}
      />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8" aria-label="Breadcrumb">
          <button onClick={() => navigate('/')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate('/ai-solutions')} className="hover:text-cyan-300 transition-colors cursor-pointer">
            AI Solutions
          </button>
          <span>/</span>
          <span className="text-cyan-300 font-semibold">{solution.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Title & Brief */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-violet-950/80 text-violet-300 border border-violet-500/30 backdrop-blur-md font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {solution.badge || solution.category}
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
                Category: {solution.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
              {solution.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {solution.tagline}
            </p>

            {/* High-Impact Stat Highlight Pill */}
            <div className="inline-flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-display">
                  {solution.statsMetric.value}{' '}
                  <span className="text-xs font-normal text-slate-400 font-sans">
                    ({solution.statsMetric.label})
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">Production Benchmark across enterprise pilots</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('consultation-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Initiate Project Scoping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/ai-solutions')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All AI Practices
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Cover Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative group w-full max-w-[540px] mx-auto">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-violet-600/30 to-blue-600/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                <div className="relative h-72 sm:h-84 md:h-96 w-full overflow-hidden bg-slate-900">
                  <img
                    src={solution.imageUrl}
                    alt={solution.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
                  
                  {/* Top Bar Tag & Live Status Indicator */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-xs font-mono font-semibold text-cyan-300 bg-slate-950/85 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
                      InfosBrain AI Practice
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Production</span>
                    </div>
                  </div>

                  {/* Tech Badge Float */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 border border-slate-700/80 backdrop-blur-xl">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                        Live Architecture
                      </span>
                      <span>Zero-Data Retention</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {solution.techStack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep-Dive Executive Overview */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="rounded-3xl p-8 sm:p-10 bg-[#070B1F]/80 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              // EXECUTIVE BRIEFING & ENGINEERING ARCHITECTURE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Solving Critical Workflow Friction with Purpose-Built AI
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {solution.fullDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            {solution.architectureHighlights.map((arch, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">{arch}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities Breakdown */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="mb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            // CAPABILITIES SPECTRUM
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
            Production Engineering Capabilities
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Every module is engineered for strict enterprise reliability, deterministic behavior, and rapid API connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solution.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white font-display">{cap}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Engineered with automated telemetry tracing, regression test suites, and strict PII protection protocols.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Case Studies & Measured Impact */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="mb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            // REAL-WORLD VALIDATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
            Enterprise Client Impact & Benchmark Metrics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solution.useCases.map((uc, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 bg-[#070B1F] border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-violet-400 uppercase tracking-wider block">
                  Use Case #{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white font-display">{uc.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{uc.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Measured Business Outcome:
                </div>
                <div className="text-xs font-bold text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
                  {uc.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="rounded-3xl p-8 bg-slate-950 border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              // TECH STACK
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-1">
              Production Frameworks & Infrastructure
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Tested for enterprise high concurrency, zero memory leaks, and sub-100ms vector lookups.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {solution.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/50 flex items-center gap-2 text-xs font-mono text-slate-200 transition-all shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{tech}</span>
              </div>
            ))}
          </div>

          {/* Deliverables Checklist */}
          <div className="mt-10 pt-8 border-t border-slate-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 text-center mb-6">
              Included Enterprise Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {solution.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            // TECHNICAL FAQS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
            Questions About {solution.title}
          </h2>
        </div>

        <div className="space-y-4">
          {solution.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
              >
                <span className="font-semibold text-white text-sm sm:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-cyan-400 transition-transform duration-200 flex-shrink-0 ${
                    activeFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Scoping Form */}
      <section id="consultation-form" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 scroll-mt-24">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#070B1F] via-slate-950 to-[#070B1F] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              // TECHNICAL FEASIBILITY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Request Scoping for {solution.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Submit your project context to receive an engineering architectural breakdown and implementation timeline within 24 hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-white font-display">Feasibility Request Received</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, {clientName}. An AI Systems Architect has received your request for{' '}
                <span className="text-cyan-300 font-semibold">{solution.title}</span> and will respond to{' '}
                <span className="text-cyan-300 font-semibold">{clientEmail}</span> shortly.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setFormSubmitted(false);
                  setClientName('');
                  setClientEmail('');
                  setCompanyName('');
                  setProjectBrief('');
                }}
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. s.jenkins@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Health Technologies"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">
                  Current Workflow Bottlenecks & Integration Goals
                </label>
                <textarea
                  rows={4}
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  placeholder={`Describe your current data pipelines, tools in use (e.g. Salesforce, Postgres), and target outcome for ${solution.title}...`}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Strict NDA & Zero Data Sharing Guaranteed</span>
                </div>

                <Button variant="primary" size="lg" type="submit">
                  Send Scoping Request
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Prev / Next AI Practice Quick-Switcher */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate(`/ai-solutions/${prevSolution.slug}`)}
            className="w-full sm:w-auto p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
          >
            <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Previous AI Discipline
            </div>
            <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
              {prevSolution.title}
            </div>
          </button>

          <button
            onClick={() => navigate('/ai-solutions')}
            className="px-4 py-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 uppercase tracking-wider"
          >
            All AI Solutions
          </button>

          <button
            onClick={() => navigate(`/ai-solutions/${nextSolution.slug}`)}
            className="w-full sm:w-auto p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 text-right transition-all group cursor-pointer"
          >
            <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-end gap-1">
              Next AI Discipline
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
              {nextSolution.title}
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
