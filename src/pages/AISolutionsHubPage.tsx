import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/siteConfig';
import { aiSolutionsData } from '../data/aiSolutionsData';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import {
  Cpu,
  TrendingUp,
  Search,
  Bot,
  Eye,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Server,
  Database,
  Lock,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Layers,
  BarChart3,
  Sliders,
  Terminal,
  Activity,
  ArrowUpRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  TrendingUp,
  Search,
  Bot,
  Eye,
  Sparkles,
};

export const AISolutionsHubPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive AI ROI Calculator state
  const [teamSize, setTeamSize] = useState<number>(25);
  const [avgHourlyCost, setAvgHourlyCost] = useState<number>(65);
  const [repetitiveHoursPerWeek, setRepetitiveHoursPerWeek] = useState<number>(10);

  // Calculator computations
  const totalRepetitiveHoursPerMonth = teamSize * repetitiveHoursPerWeek * 4;
  const currentMonthlyWaste = totalRepetitiveHoursPerMonth * avgHourlyCost;
  const projectedSavedHours = Math.round(totalRepetitiveHoursPerMonth * 0.72);
  const projectedAnnualSavings = Math.round(projectedSavedHours * avgHourlyCost * 12);

  const categories = [
    'All',
    'Automation',
    'Analytics',
    'Generative Search',
    'Agents & LLMs',
    'Vision & Documents',
    'Content Engines',
  ];

  const filteredSolutions =
    selectedCategory === 'All'
      ? aiSolutionsData
      : aiSolutionsData.filter((item) => item.category === selectedCategory);

  const generalAIFaqs = [
    {
      q: 'How does InfosBrain ensure enterprise data privacy and security?',
      a: 'We adhere to zero-data retention architectures and strict compliance standards (SOC2 Type II, HIPAA, GDPR). Models can be deployed inside your private VPC (AWS, GCP, Azure) or on-premises edge clusters. Your data is never used to train public foundational models.',
    },
    {
      q: 'What is the typical time-to-value for an AI solution deployment?',
      a: 'We follow a rapid prototype-to-production cadence. Functional proof-of-concept pipelines with live data validation are typically delivered in 2 to 4 weeks. Full enterprise integration, security hardening, and staff hand-off are completed within 8 to 12 weeks.',
    },
    {
      q: 'Do you work with open-source models or proprietary APIs?',
      a: 'We are model-agnostic and select the optimal architecture for your budget, latency, and confidentiality requirements. We routinely deploy fine-tuned open-source models (Llama 3, Mistral, Qwen, DeepSeek) on private infrastructure as well as high-capacity commercial models (GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet).',
    },
    {
      q: 'How do you prevent hallucinations in customer-facing applications?',
      a: 'We engineer deterministic Retrieval-Augmented Generation (RAG) frameworks with strict citation requirements, semantic distance thresholds, and negative constraints. If the knowledge base does not contain the answer with high statistical confidence, the agent gracefully escalates to a human operator.',
    },
    {
      q: 'Can these AI systems integrate with our existing ERP, CRM, and databases?',
      a: 'Yes. Every solution is equipped with secure REST/gRPC API connectors and webhook listeners compatible with Salesforce, HubSpot, NetSuite, SAP, PostgreSQL, Snowflake, and custom internal systems.',
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Enterprise AI Solutions & Autonomous Systems - InfosBrain"
        description="Explore InfosBrain's enterprise artificial intelligence solutions: autonomous agentic workflows, predictive analytics, GEO/SGE search, custom LLMs, computer vision, and generative engines."
      />

      {/* Hero Banner Section with Autonomous AI Imagery */}
      <PageHeroBanner
        badge="NEXT-GEN ARTIFICIAL INTELLIGENCE"
        badgeIcon={<Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
        title="Autonomous AI Systems Built for"
        highlightText="Enterprise Scale"
        description="Bridge the gap between theoretical AI models and measurable business ROI. We architect, train, and orchestrate production-grade multi-agent pipelines, predictive engines, and private LLMs."
        image={{
          src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Autonomous AI Neural Architecture',
          tag: 'Autonomous AI Practice',
          statPill: {
            value: 'Sub-100ms',
            label: 'Inference Latency',
            subtext: 'Zero-Data Retention Architecture',
          },
          secondaryPill: {
            text: 'SOC 2 Type II',
            icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        actions={
          <>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              className="shadow-[0_0_30px_rgba(6,182,212,0.35)]"
            >
              Request AI Architecture Review
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.getElementById('ai-calculator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Sliders className="w-4 h-4 mr-2 text-cyan-400" />
              Calculate AI Savings
            </Button>
          </>
        }
        keyPoints={[
          'Multi-Agent Workflow Pipelines',
          'Deterministic RAG & Citations',
          'Predictable Production ROAS',
        ]}
      />

      {/* Quick Metrics Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-3xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">72%</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Average Ops Speedup</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-violet-400 font-display">3.8x</div>
            <div className="text-xs text-slate-400 font-mono mt-1">ROAS Lift on Paid Media</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">99.4%</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Extraction Accuracy</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-display">SOC 2</div>
            <div className="text-xs text-slate-400 font-mono mt-1">Type II Compliant</div>
          </div>
        </div>
      </section>

      {/* Solutions Directory Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              // PRODUCTION PRACTICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mt-1">
              Core Enterprise AI Disciplines
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Select a category to explore our specialized AI systems, architectural blueprints, and client benchmarks.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* AI Solutions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((solution) => {
            const IconComponent = iconMap[solution.iconName] || Cpu;

            return (
              <div
                key={solution.id}
                className="group rounded-3xl p-6 bg-[#070B1F]/90 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image Banner */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 border border-slate-800 group-hover:border-cyan-500/30 transition-all">
                    <img
                      src={solution.imageUrl}
                      alt={solution.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B1F] via-[#070B1F]/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md font-semibold">
                        {solution.badge || solution.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <div className="px-3 py-1 rounded-full bg-slate-950/90 border border-slate-700 text-xs font-mono text-emerald-400 font-bold backdrop-blur-md">
                        {solution.statsMetric.value} {solution.statsMetric.label}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-violet-950/50 border border-violet-500/30 text-cyan-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        {solution.category}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                        {solution.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    {solution.shortDescription}
                  </p>

                  {/* Capabilities Checklist */}
                  <div className="space-y-2 mb-6 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold block mb-2">
                      Key Capabilities
                    </span>
                    {solution.capabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {solution.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-900 text-[11px] font-mono text-slate-400 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {solution.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[11px] font-mono text-slate-500">
                        +{solution.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => navigate(`/ai-solutions/${solution.slug}`)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  >
                    Explore AI Architecture
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enterprise AI Readiness Framework Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-950 via-[#070B1F] to-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              // IMPLEMENTATION ROADMAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mt-1">
              Enterprise AI Adoption Framework
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              From security audits to deterministic containerized deployment, our four-stage framework prevents costly dead ends and delivers immediate operational value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold">
                01
              </div>
              <h4 className="text-lg font-bold text-white font-display">Data & VPC Audit</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluation of existing data schemas, API readiness, access control boundaries, and private cloud VPC security requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono font-bold">
                02
              </div>
              <h4 className="text-lg font-bold text-white font-display">Architecture & Prototype</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Selection of foundational or open-weights models, vector index configuration, and functional sandbox pipeline delivery in 2-4 weeks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/30 text-violet-400 flex items-center justify-center font-mono font-bold">
                03
              </div>
              <h4 className="text-lg font-bold text-white font-display">Guardrails & Hardening</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Implementation of Pydantic validation gates, human-in-the-loop triggers, latency optimizations, and red-teaming audits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold">
                04
              </div>
              <h4 className="text-lg font-bold text-white font-display">Orchestration & Scale</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kubernetes cluster rollout, real-time telemetry tracing, continuous model drift monitoring, and comprehensive internal team training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI ROI Calculator Section */}
      <section id="ai-calculator" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 scroll-mt-24">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#06091D] border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  // INTERACTIVE BENCHMARKING TOOL
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                  Enterprise AI Automation ROI Estimator
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Adjust the sliders to estimate how much your organization can save each year by automating routine data entry, ticket resolution, and manual reconciliation workflows.
                </p>
              </div>

              {/* Slider 1: Team Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Team Members Impacted:</span>
                  <span className="text-cyan-400 font-bold">{teamSize} Specialists</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Repetitive Hours */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Repetitive Work per Employee / Week:</span>
                  <span className="text-cyan-400 font-bold">{repetitiveHoursPerWeek} Hours / Week</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={repetitiveHoursPerWeek}
                  onChange={(e) => setRepetitiveHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Hourly Cost */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Blended Fully Loaded Hourly Cost:</span>
                  <span className="text-cyan-400 font-bold">${avgHourlyCost} / Hour</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="5"
                  value={avgHourlyCost}
                  onChange={(e) => setAvgHourlyCost(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Right Display Cards */}
            <div className="lg:col-span-6 bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Productive Hours Reclaimed
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display mt-1">
                    {projectedSavedHours.toLocaleString()} hrs
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">per month at 72% automation</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Monthly Waste Prevented
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display mt-1">
                    ${Math.round(projectedSavedHours * avgHourlyCost).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">reinvestable capital monthly</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-r from-violet-950/40 via-blue-950/40 to-cyan-950/40 border border-cyan-500/30">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold block">
                  Projected Annual Net Savings
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-1">
                  ${projectedAnnualSavings.toLocaleString()} / year
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Based on industry benchmarks across automated loan underwriting, customer ticket triaging, and multimodal invoice verification.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/contact')}
                className="w-full"
              >
                Validate ROI with an AI Solutions Architect
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Sovereignty Guarantees */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/30 text-cyan-400 w-fit">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Zero Data Retention SLA</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We execute enforceable zero-data retention agreements. Your business secrets, client PII, and financial records are never saved on third-party inference clusters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-violet-950/60 border border-violet-500/30 text-violet-400 w-fit">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Private Cloud & On-Premises</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Air-gapped and private VPC architectures built on your own AWS, GCP, Azure, or on-premises GPU servers. Complete infrastructure sovereignty guaranteed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Deterministic Guardrails</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multi-tier validation layers including schema enforcement, hallucination checks, semantic distance tripwires, and human sign-off gates.
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise AI FAQs Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12">
        <SectionHeading
          badge="// FAQ"
          title="Frequently Asked Questions About Enterprise AI"
          description="Answers to common questions regarding enterprise integration, security, accuracy guarantees, and delivery timelines."
          align="center"
        />

        <div className="space-y-4 mt-8">
          {generalAIFaqs.map((faq, idx) => (
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

      {/* Grand AI Consultation Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-950/80 via-[#070B1F] to-violet-950/80 border border-cyan-500/30 text-center space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/50 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Confidential Consultation & Technical Feasibility
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-white font-display max-w-2xl mx-auto">
            Ready to Accelerate Your Enterprise with Custom AI?
          </h3>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Schedule a technical feasibility session with our AI engineering directors. We will analyze your workflows, evaluate data readiness, and provide a concrete deployment roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              className="shadow-[0_0_25px_rgba(6,182,212,0.4)]"
            >
              Schedule AI Architecture Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href={`mailto:${siteConfig.contact.primaryEmail}?subject=Enterprise AI Solutions Inquiry`}
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-cyan-400 text-sm font-semibold text-slate-300 hover:text-white transition-all"
            >
              Email Us: {siteConfig.contact.primaryEmail}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
