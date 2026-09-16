import {
  ServiceItem,
  IndustryItem,
  CaseStudyItem,
  TestimonialItem,
  BlogPostItem,
  FAQItem,
  CareerPosition,
  TeamMember,
} from '../types';

export const siteConfig = {
  brand: {
    name: 'InfosBrain',
    legalName: 'InfosBrain Digital Technology & Marketing Agency',
    tagline: 'Transforming Ideas Into Digital Growth',
    secondaryTagline: 'Digital Solutions. Creative Strategy. Measurable Growth.',
    description:
      'InfosBrain is a modern digital agency providing technology, web development, digital marketing, SEO, design, and growth solutions for businesses worldwide.',
    badge: 'SMART STRATEGY. POWERFUL TECHNOLOGY. MEASURABLE GROWTH.',
    establishedYear: 2021,
    url: 'https://infosbrain.com',
  },

  contact: {
    primaryEmail: 'info@infosbrain.com',
    secondaryEmail: 'contact@infosbrain.com',
    phone: '+4915206777889',
    phoneDisplay: '+49 1520 6777889',
    whatsapp: '+4915206777889',
    whatsappDisplay: '+49 1520 6777889',
    whatsappUrl: 'https://wa.me/4915206777889?text=Hello%20InfosBrain!%20I%20am%20interested%20in%20discussing%20a%20project.',
    address: 'Global Operations & Distributed Digital Delivery [Germany / Remote]',
    hours: '24/7 Global Client Support & Strategy Consultation',
    social: {
      linkedin: 'https://linkedin.com/company/infosbrain-placeholder',
      facebook: 'https://facebook.com/infosbrain-placeholder',
      instagram: 'https://instagram.com/infosbrain-placeholder',
      x: 'https://x.com/infosbrain-placeholder',
      github: 'https://github.com/infosbrain-placeholder',
    },
  },

  stats: [
    { value: '100+', label: 'Projects Delivered', suffix: '+' },
    { value: '25+', label: 'Countries Reached', suffix: '+' },
    { value: '50+', label: 'Digital Experts', suffix: '+' },
    { value: '95%', label: 'Client Satisfaction', suffix: '%' },
    { value: '24/7', label: 'Support & Advisory', suffix: '' },
  ],

  trustStatement: 'Helping Businesses Build, Grow & Scale Digitally',

  technologies: [
    { name: 'React', category: 'Frontend', icon: 'Code2' },
    { name: 'Next.js', category: 'Fullstack', icon: 'Layers' },
    { name: 'Node.js', category: 'Backend', icon: 'Server' },
    { name: 'TypeScript', category: 'Language', icon: 'Cpu' },
    { name: 'WordPress', category: 'CMS', icon: 'Globe' },
    { name: 'Shopify', category: 'E-commerce', icon: 'ShoppingBag' },
    { name: 'MongoDB', category: 'Database', icon: 'Database' },
    { name: 'PHP & Laravel', category: 'Backend', icon: 'Terminal' },
    { name: 'Google Ads', category: 'Marketing', icon: 'Search' },
    { name: 'Meta Ads', category: 'Social Ads', icon: 'Share2' },
    { name: 'Google Analytics', category: 'Analytics', icon: 'BarChart3' },
    { name: 'Search Console', category: 'SEO', icon: 'LineChart' },
  ],

  whyChooseUs: [
    {
      title: 'Results-Driven Approach',
      description:
        'Every campaign and line of code is measured by tangible ROI, user engagement, and measurable revenue growth for your company.',
      icon: 'TrendingUp',
    },
    {
      title: 'Experienced Professionals',
      description:
        'A multidisciplinary collective of senior engineers, certified marketing specialists, technical SEOs, and creative art directors.',
      icon: 'Users',
    },
    {
      title: 'Modern Technology',
      description:
        'We harness high-performance tech stacks, microservices, headless CMS architectures, and intelligent workflows that scale seamlessly.',
      icon: 'Cpu',
    },
    {
      title: 'Creative Thinking',
      description:
        'Blending aesthetic sophistication with deep cognitive psychology to build digital identities that capture attention and command respect.',
      icon: 'Sparkles',
    },
    {
      title: 'Transparent Communication',
      description:
        'Real-time sprint dashboards, clear deliverables, weekly milestone debriefs, and proactive direct channels with your dedicated lead.',
      icon: 'MessageSquare',
    },
    {
      title: 'Data-Driven Decisions',
      description:
        'Zero guesswork. We leverage statistical A/B split testing, behavioral heatmaps, and algorithmic analytics to steer every optimization.',
      icon: 'BarChart2',
    },
    {
      title: 'Scalable Solutions',
      description:
        'From high-growth seed startups to multinational enterprises, our digital architectures are built to effortlessly handle peak loads.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Long-Term Partnership',
      description:
        'We do not disappear after deployment. InfosBrain serves as your embedded ongoing technology and marketing innovation partner.',
      icon: 'Repeat',
    },
  ],

  processSteps: [
    {
      number: '01',
      title: 'Discover',
      subtitle: 'Understand the business, audience and goals',
      description:
        'Comprehensive discovery workshops, competitor landscape audits, audience persona profiling, and KPI benchmark mapping.',
    },
    {
      number: '02',
      title: 'Strategize',
      subtitle: 'Create a data-driven digital strategy',
      description:
        'Custom tactical roadmap defining architectural architecture, conversion funnels, SEO keyword clusters, and media spend budgets.',
    },
    {
      number: '03',
      title: 'Design',
      subtitle: 'Build the creative direction and user experience',
      description:
        'Interactive wireframing, design system specification, futuristic visual polish, and conversion-optimized user journeys.',
    },
    {
      number: '04',
      title: 'Develop',
      subtitle: 'Turn strategy into high-performance digital experiences',
      description:
        'Clean, modular, and fully tested codebases. Mobile-first engineering, API orchestration, and technical SEO compliance.',
    },
    {
      number: '05',
      title: 'Launch',
      subtitle: 'Deploy and optimize the final solution',
      description:
        'Rigorous cross-browser QA, Core Web Vitals calibration, security hardening, analytics instrumentation, and seamless release.',
    },
    {
      number: '06',
      title: 'Grow',
      subtitle: 'Continuously analyze, improve and scale results',
      description:
        'Continuous sprint-based conversion rate optimization, campaign retargeting, algorithm adaptation, and scaling advisory.',
    },
  ],

  services: [
    {
      id: 's1',
      slug: 'digital-marketing',
      title: 'Digital Marketing',
      category: 'Marketing',
      iconName: 'Megaphone',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'Comprehensive 360-degree digital marketing strategies that attract qualified prospects, build brand authority, and maximize revenue.',
      features: [
        'Integrated multi-channel digital marketing strategy',
        'Omni-channel funnel architecture & lead capture',
        'Data-backed performance marketing campaigns',
        'Customer journey mapping & cohort analysis',
        'Conversion rate optimization (CRO) & A/B testing',
        'Holistic attribution tracking & ROI analytics',
      ],
      benefits: [
        'Higher conversion velocity across touchpoints',
        'Predictable customer acquisition costs (CAC)',
        'Maximized client lifetime value (LTV)',
        'Unified cross-channel brand presence',
      ],
      ctaText: 'Build Your Digital Growth Strategy',
    },
    {
      id: 's2',
      slug: 'seo',
      title: 'SEO (Search Engine Optimization)',
      category: 'Marketing',
      iconName: 'Search',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'Dominating organic search results through deep technical SEO, authoritative semantic content architecture, and clean link acquisitions.',
      features: [
        'Technical SEO audits & Core Web Vitals optimization',
        'Deep intent-driven keyword research & cluster mapping',
        'On-page content optimization & semantic entity schema',
        'High-authority white-hat digital PR and backlink building',
        'Local SEO, Google Business Profile & geo-targeted ranking',
        'Transparent automated ranking & organic revenue reporting',
      ],
      benefits: [
        'Sustainable compounding organic traffic stream',
        'First-page ranking for high-intent purchase keywords',
        'Zero reliance on continuous ad spend for organic leads',
        'Superior search engine crawler accessibility and indexing',
      ],
      ctaText: 'Improve Your Search Visibility',
    },
    {
      id: 's3',
      slug: 'graphic-design',
      title: 'Graphic Design & Branding',
      category: 'Design',
      iconName: 'Palette',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'High-impact visual identities, modern UI/UX design systems, and stunning marketing collateral crafted to command industry respect.',
      features: [
        'End-to-end brand identity & visual guideline books',
        'Logo design & versatile vector brand asset suites',
        'High-converting social media creatives & ad banners',
        'Pitch decks, whitepapers & corporate presentations',
        'Modern product UI/UX graphics & component design',
        'Packaging, merchandise & print collateral systems',
      ],
      benefits: [
        'Instantly recognizable premium brand prestige',
        'Consistent visual tone across all customer touchpoints',
        'Up to 3x higher click-through rates on ad creatives',
        'Design systems that scale across future collateral',
      ],
      ctaText: 'Elevate Your Visual Identity',
    },
    {
      id: 's4',
      slug: 'wordpress-development',
      title: 'WordPress Development',
      category: 'Development',
      iconName: 'Globe',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'High-performance custom WordPress and WooCommerce platforms engineered for speed, enterprise security, and effortless publishing.',
      features: [
        'Bespoke WordPress theme creation (zero bloated builders)',
        'High-scale WooCommerce e-commerce development',
        'Custom plugin development & third-party API integrations',
        'Sub-second page load times with Redis & advanced caching',
        'Enterprise hardening, automated backups & security suites',
        'Intuitive Gutenberg custom block editors for content teams',
      ],
      benefits: [
        '100% ownership of your content management system',
        'Lightning-fast page speeds for Google PageSpeed 95+',
        'Effortless editing without technical dependency',
        'Scalable architecture accommodating millions of views',
      ],
      ctaText: 'Launch Your Custom WordPress Platform',
    },
    {
      id: 's5',
      slug: 'shopify-development',
      title: 'Shopify Development',
      category: 'Development',
      iconName: 'ShoppingBag',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'Next-generation Shopify and Shopify Plus storefronts tailored to boost average order value (AOV) and streamline checkout conversion.',
      features: [
        'Custom Liquid theme engineering & headless Hydrogen builds',
        'Frictionless checkout optimization & 1-click upsells',
        'ERP, CRM, inventory & logistics API integrations',
        'Mobile-first responsive commerce UI architectures',
        'Catalog migrations with zero loss of rankings or data',
        'Automated abandoned cart & retention trigger setups',
      ],
      benefits: [
        'Increased checkout completion and lower abandonment',
        'Ultra-fast product browsing and facet filtering',
        'Seamless integration with global payment gateways',
        'Turnkey scalability during viral sales and flash drops',
      ],
      ctaText: 'Scale Your E-commerce Store',
    },
    {
      id: 's6',
      slug: 'mern-stack-development',
      title: 'MERN Stack Development',
      category: 'Development',
      iconName: 'Code2',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'Full-stack web applications, SaaS dashboards, and reactive real-time portals built with MongoDB, Express.js, React, and Node.js.',
      features: [
        'Single Page Applications (SPA) with React & TypeScript',
        'Robust RESTful and GraphQL API backends with Express & Node',
        'Flexible, high-throughput MongoDB database schema design',
        'Role-based access control (RBAC), JWT & OAuth2 auth flows',
        'Real-time WebSocket notifications & interactive dashboards',
        'Microservices architecture & containerized Docker deployments',
      ],
      benefits: [
        'Single language (JavaScript/TypeScript) throughout stack',
        'High-concurrency performance with asynchronous Node events',
        'Rapid time-to-market for modern digital SaaS products',
        'Modular, maintainable codebases ready for venture scale',
      ],
      ctaText: 'Engineer Your Custom Web Application',
    },
    {
      id: 's7',
      slug: 'php-development',
      title: 'PHP & Laravel Development',
      category: 'Development',
      iconName: 'Terminal',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'Enterprise-grade custom PHP web applications and Laravel backends engineered for mission-critical business automation.',
      features: [
        'Modern Laravel framework architecture (Eloquent ORM, Blade)',
        'Custom business ERP, CRM, and portal systems',
        'Relational MySQL/PostgreSQL schema modeling & index tuning',
        'Secure RESTful API gateways for third-party mobile apps',
        'Legacy PHP modernization, security patches & refactoring',
        'Queue workers, automated scheduling & background jobs',
      ],
      benefits: [
        'Extremely reliable enterprise server-side performance',
        'Built-in protection against SQL injection and CSRF',
        'Smooth migration and integration with legacy databases',
        'Battle-tested architecture trusted by global brands',
      ],
      ctaText: 'Build Scalable PHP Solutions',
    },
    {
      id: 's8',
      slug: 'content-marketing',
      title: 'Content Marketing',
      category: 'Marketing',
      iconName: 'FileText',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'Data-informed storytelling, thought leadership articles, and content funnels that nurture prospects from curiosity to purchase.',
      features: [
        'Editorial calendar planning aligned with buyer journey stages',
        'Deep-dive thought leadership essays & industry reports',
        'Lead-magnet creation (eBooks, whitepapers, checklist tools)',
        'SEO-optimized blog strategy targeting bottom-of-funnel keywords',
        'Content repurposing across newsletters, social, and audio',
        'Distribution strategy across top syndication platforms',
      ],
      benefits: [
        'Positions your brand as the undisputed authority in your niche',
        'Builds a permanent library of evergreen inbound traffic assets',
        'Pre-educates prospects so sales cycles close faster',
        'Substantially lowers cost per acquisition over time',
      ],
      ctaText: 'Ignite Your Content Engine',
    },
    {
      id: 's9',
      slug: 'email-marketing',
      title: 'Email Marketing & Automation',
      category: 'Marketing',
      iconName: 'Mail',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'High-converting lifecycle email campaigns, behavioral triggers, and automated nurture sequences that turn subscribers into repeat buyers.',
      features: [
        'Automated welcome, onboarding & re-engagement workflows',
        'Advanced subscriber segmentation based on purchase behavior',
        'Dynamic personalized email templates with responsive coding',
        'Dedicated deliverability optimization & DKIM/SPF/DMARC setup',
        'Continuous subject line, copy, and send-time split testing',
        'Klaviyo, Mailchimp, ActiveCampaign & HubSpot integrations',
      ],
      benefits: [
        'Direct communication channel unaffected by social algorithms',
        'Average return of $36+ for every $1 invested',
        'Automatic 24/7 revenue generation via behavioral flows',
        'Dramatically increased repeat purchases and client retention',
      ],
      ctaText: 'Maximize Email Revenue',
    },
    {
      id: 's10',
      slug: 'social-media-marketing',
      title: 'Social Media Marketing',
      category: 'Marketing',
      iconName: 'Share2',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'Strategic organic social growth, community building, and viral content formats that position your brand at the center of culture.',
      features: [
        'Cross-platform brand positioning (LinkedIn, Instagram, X, TikTok)',
        'Scroll-stopping visual design and short-form video hooks',
        'Proactive community engagement & brand conversation monitoring',
        'Influencer partnerships and micro-creator outreach programs',
        'Detailed monthly social sentiment & audience growth analytics',
        'Social listening and competitor tactic tracking',
      ],
      benefits: [
        'Active and enthusiastic community of loyal brand advocates',
        'Direct social proof that accelerates ad campaign conversions',
        'Enhanced organic referral volume from loyal followers',
        'Authentic human connection with your target demographics',
      ],
      ctaText: 'Amplify Your Social Presence',
    },
    {
      id: 's11',
      slug: 'paid-ads',
      title: 'Paid Advertising (PPC)',
      category: 'Advertising',
      iconName: 'TrendingUp',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'High-precision cross-channel paid media campaigns engineered to yield predictable ROAS and flood your business with qualified leads.',
      features: [
        'Omni-channel paid media architecture & budget optimization',
        'Audience intent mapping & custom retargeting matrices',
        'High-velocity creative testing (copy, hooks, angles, visuals)',
        'Server-side Conversion API (CAPI) & tracking pixel setups',
        'Real-time automated bid adjustments and CPA capping',
        'Transparent weekly ROAS & blended acquisition dashboards',
      ],
      benefits: [
        'Immediate stream of qualified, in-market prospective buyers',
        'Predictable pipeline that scales proportionally with budget',
        'Actionable consumer insight gathered from creative data',
        'Maximum return on ad spend through strict ROAS benchmarks',
      ],
      ctaText: 'Launch High-ROAS Paid Campaigns',
    },
    {
      id: 's12',
      slug: 'facebook-meta-ads',
      title: 'Facebook & Meta Ads',
      category: 'Advertising',
      iconName: 'Target',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'Hyper-targeted Meta advertising across Facebook and Instagram leveraging algorithmic machine learning and creative-first scaling.',
      features: [
        'Meta Advantage+ Shopping & Catalog campaign setups',
        'Custom Lookalike and behavioral audience modeling',
        'Direct response video creative & interactive carousel ads',
        'First-party Conversions API (CAPI) tracking architecture',
        'Middle-of-funnel retargeting & social proof cascades',
        'Micro-budget creative sandbox testing for winning angles',
      ],
      benefits: [
        'Access to over 3 billion active global monthly users',
        'Visual storytelling that sparks spontaneous desire to buy',
        'Resilient tracking immune to iOS privacy changes',
        'Rapid creative iteration to conquer ad fatigue',
      ],
      ctaText: 'Scale Your Meta Ad Campaigns',
    },
    {
      id: 's13',
      slug: 'google-ads',
      title: 'Google Ads & Search Marketing',
      category: 'Advertising',
      iconName: 'Zap',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
      shortDescription:
        'High-intent Google Search, Performance Max, Display, and YouTube advertising that captures prospects at the exact moment of intent.',
      features: [
        'Targeted Google Search campaigns targeting high commercial intent',
        'Performance Max (PMax) multi-channel conversion campaigns',
        'Google Shopping feed optimization & Merchant Center management',
        'Negative keyword sculpting to eliminate ad spend waste',
        'High-converting landing page alignment for Quality Score 10/10',
        'Dynamic search ads & YouTube video engagement campaigns',
      ],
      benefits: [
        'Capture customers at the exact millisecond they search for you',
        'Substantially reduced Cost Per Click through high Quality Scores',
        'Dominance across Google Search, Maps, Shopping, and YouTube',
        'Clear tracking directly connected to closed sales revenue',
      ],
      ctaText: 'Capture High-Intent Google Searchers',
    },
  ] as ServiceItem[],

  industries: [
    {
      id: 'ind-1',
      name: 'E-commerce & D2C',
      iconName: 'ShoppingBag',
      tagline: 'High-speed storefronts and conversion engines that maximize Average Order Value.',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'High customer acquisition costs (CAC)',
        'Cart abandonment and checkout friction',
        'Inventory synchronization across multiple channels',
      ],
      solutions: [
        'Custom Shopify & headless commerce builds with sub-second page loads',
        'Full-funnel Meta and Google Performance Max campaigns',
        'Post-purchase email automation sequences driving repeat orders',
      ],
      relevantServices: ['Shopify Development', 'Meta Ads', 'Email Marketing', 'CRO'],
    },
    {
      id: 'ind-2',
      name: 'SaaS & Cloud Software',
      iconName: 'Cpu',
      tagline: 'Customer acquisition pipelines that turn trial signups into expansion revenue.',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Explaining complex technical value propositions',
        'Long B2B enterprise sales cycles',
        'High trial churn before activation milestone',
      ],
      solutions: [
        'MERN & Next.js dashboard development with responsive product demos',
        'Bottom-of-funnel SEO keyword clusters targeting software alternatives',
        'High-converting product landing pages with interactive feature previews',
      ],
      relevantServices: ['MERN Stack Development', 'SEO', 'Content Marketing', 'Google Ads'],
    },
    {
      id: 'ind-3',
      name: 'Real Estate & PropTech',
      iconName: 'Building',
      tagline: 'Qualified investor and buyer lead generation with modern property showcases.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Sifting serious buyers from casual online browsers',
        'Local market competition for prime geographic keywords',
        'Outdated MLS and IDX feed integrations',
      ],
      solutions: [
        'Custom interactive property map portals with real-time lead capture',
        'Hyper-local SEO dominating neighborhood search phrases',
        'Targeted Facebook Lead Ads targeting high-net-worth demographics',
      ],
      relevantServices: ['WordPress Development', 'Local SEO', 'Paid Ads', 'Graphic Design'],
    },
    {
      id: 'ind-4',
      name: 'Healthcare & Medical Tech',
      iconName: 'Activity',
      tagline: 'HIPAA-conscious digital experiences and trustworthy patient acquisition.',
      imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Strict regulatory compliance and data privacy standards',
        'Building patient trust through digital channels',
        'Managing appointment scheduling systems efficiently',
      ],
      solutions: [
        'Encrypted, accessible healthcare portals and responsive clinic websites',
        'Reputation management and authoritative local medical SEO',
        'Transparent patient onboarding funnels with automated confirmations',
      ],
      relevantServices: ['PHP Development', 'Local SEO', 'Graphic Design', 'Content Marketing'],
    },
    {
      id: 'ind-5',
      name: 'Financial Services & FinTech',
      iconName: 'DollarSign',
      tagline: 'Secure, high-trust digital solutions for banks, wealth managers, and FinTech.',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Stringent financial compliance and data security requirements',
        'Skepticism and fear regarding online financial transactions',
        'Complex underwriting or onboarding user journeys',
      ],
      solutions: [
        'Hardened full-stack portals with bank-grade security protocols',
        'Thought-leadership content establishing institutional credibility',
        'High-intent Google Search advertising capturing active financial seekers',
      ],
      relevantServices: ['MERN Stack Development', 'Google Ads', 'SEO', 'Branding'],
    },
    {
      id: 'ind-6',
      name: 'Education & EdTech',
      iconName: 'GraduationCap',
      tagline: 'Engaging learning management systems and predictable student enrollments.',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Seasonal enrollment surges and enrollment drop-offs',
        'User engagement retention across lengthy digital courses',
        'Mobile optimization for students worldwide',
      ],
      solutions: [
        'Custom LMS platforms with progress tracking and gamified interfaces',
        'Targeted student enrollment ads on Instagram and YouTube',
        'Automated onboarding email sequences reducing course dropouts',
      ],
      relevantServices: ['WordPress Development', 'Meta Ads', 'Email Marketing', 'UI/UX Design'],
    },
    {
      id: 'ind-7',
      name: 'Professional Services',
      iconName: 'Briefcase',
      tagline: 'Client acquisition engines for law firms, consultancies, and accounting practices.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Differentiating from generic regional competitors',
        'High cost per lead in competitive legal and consulting niches',
        'Demonstrating proven authority before initial contact',
      ],
      solutions: [
        'Authoritative brand websites with published case summaries and whitepapers',
        'High-precision Google Search campaigns targeting decision-makers',
        'LinkedIn B2B outreach and executive thought leadership branding',
      ],
      relevantServices: ['SEO', 'Google Ads', 'Content Marketing', 'Graphic Design'],
    },
    {
      id: 'ind-8',
      name: 'Retail & Multi-Location',
      iconName: 'Store',
      tagline: 'Bridging online discovery with brick-and-mortar foot traffic and store sales.',
      imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Managing consistent business listings across dozens of store locations',
        'Competing against national retail behemoths',
        'Tracking offline store visits driven by online campaigns',
      ],
      solutions: [
        'Multi-location Local SEO and Google Business Profile optimization',
        'Geo-fenced mobile ads driving local store promotions and coupons',
        'Omni-channel click-and-collect e-commerce architectures',
      ],
      relevantServices: ['Shopify Development', 'Local SEO', 'Paid Ads', 'Social Media Marketing'],
    },
    {
      id: 'ind-9',
      name: 'Hospitality & Travel',
      iconName: 'Compass',
      tagline: 'Direct booking engines that reduce reliance on high-commission travel agencies.',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Hefty 15-25% commissions paid to third-party travel aggregators',
        'Seasonal demand swings and perishable inventory',
        'High website bounce rate for prospective travelers',
      ],
      solutions: [
        'Sensory-rich visual web design with integrated direct booking engines',
        'Retargeting campaigns with dynamic rate parity and special perks',
        'Localized multi-language SEO capturing international travelers',
      ],
      relevantServices: ['Web Development', 'Paid Advertising', 'SEO', 'Graphic Design'],
    },
    {
      id: 'ind-10',
      name: 'High-Growth Startups',
      iconName: 'Rocket',
      tagline: 'Rapid MVP engineering and scalable traction channels for venture-backed teams.',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Urgent pressure to demonstrate product-market fit and MRR growth',
        'Tight capital runway demanding hyper-efficient spend',
        'Evolving product scope and pivoting feature sets',
      ],
      solutions: [
        'Agile 4-week MERN/Next.js MVP launches with modular architecture',
        'Lean customer acquisition testing across Meta and Google Search',
        'Investor-ready pitch decks and sleek futuristic design systems',
      ],
      relevantServices: ['MERN Stack Development', 'Paid Ads', 'Branding', 'CRO'],
    },
    {
      id: 'ind-11',
      name: 'Technology & Hardware',
      iconName: 'Laptop',
      tagline: 'Interactive 3D product showcases and global partner distribution portals.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Communicating intricate technical hardware specifications clearly',
        'Global distributor portal management and dealer locator needs',
        'Extended enterprise procurement review processes',
      ],
      solutions: [
        'Interactive 3D web showcases highlighting hardware engineering',
        'B2B gated distributor portals with real-time inventory checks',
        'Global technical SEO and authoritative whitepaper campaigns',
      ],
      relevantServices: ['Custom Development', 'Technical SEO', 'UI/UX Design', 'Content Strategy'],
    },
    {
      id: 'ind-12',
      name: 'Small & Medium Businesses (SMB)',
      iconName: 'Users',
      tagline: 'Cost-effective digital transformation that levels the playing field against giants.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      challenges: [
        'Limited internal marketing and IT personnel',
        'Confusion over where to allocate digital marketing budget',
        'Outdated websites losing mobile inquiries to competitors',
      ],
      solutions: [
        'Turnkey high-converting business website with easy content updates',
        'Focused local search marketing and Google review generation',
        'Dedicated monthly support ensuring constant uptime and security',
      ],
      relevantServices: ['WordPress Development', 'SEO', 'Google Ads', 'Social Media'],
    },
  ] as IndustryItem[],

  caseStudies: [
    {
      id: 'cs-1',
      slug: 'lumina-saas-scaling',
      title: 'Scaling Cloud Workflow Platform by +310% MRR via Technical SEO & Paid Search',
      client: 'Lumina Cloud [Demo Client]',
      industry: 'SaaS / Enterprise Software',
      category: 'SEO',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
      challenge:
        'Lumina suffered from high customer acquisition costs through unoptimized broad search terms, while their website failed to rank organically for core high-intent enterprise workflow keywords.',
      strategy:
        'Engineered an authoritative programmatic SEO architecture targeting 450+ workflow integrations, restructured Google Search campaigns into tightly-themed single keyword ad groups (SKAGs), and optimized the demo request funnel.',
      services: ['Technical SEO', 'Google Ads', 'Conversion Rate Optimization', 'Next.js Dev'],
      solution:
        'A sub-second Next.js web portal with instant interactive sandbox previews, connected with a tailored search strategy capturing enterprise procurement search intent.',
      results: [
        { label: 'Organic Traffic Increase', value: '+310%' },
        { label: 'Cost Per Acquisition (CAC)', value: '-48%' },
        { label: 'Qualified Demo Signups', value: '4.2x' },
        { label: 'Google PageSpeed Score', value: '99/100' },
      ],
      technologies: ['Next.js', 'TypeScript', 'Google Ads', 'Search Console', 'Tailwind CSS'],
      testimonial: {
        quote:
          'InfosBrain transformed our digital presence completely. Our inbound pipeline went from sporadic inquiries to a reliable flow of enterprise buyers every single week.',
        author: 'Marcus Vance',
        role: 'VP of Growth, Lumina Cloud',
      },
    },
    {
      id: 'cs-2',
      slug: 'apex-luxury-ecommerce',
      title: 'Re-engineering High-Volume Shopify Store to Drive $4.8M in Direct Online Sales',
      client: 'Apex Living Goods [Demo Client]',
      industry: 'E-commerce & Retail',
      category: 'E-commerce',
      imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
      challenge:
        'A sluggish monolithic legacy store was experiencing high checkout abandonment (74%) and declining return on ad spend on Meta channels following tracking privacy changes.',
      strategy:
        'Complete replatforming to a custom headless Shopify storefront, first-party Server-Side Conversions API (CAPI) implementation, and dynamic 1-click checkout upsell modules.',
      services: ['Shopify Development', 'Meta Ads', 'Email Marketing', 'UI/UX Redesign'],
      solution:
        'A luxury digital shopping experience with instant drawer carts, personalized cross-sells, and automated Klaviyo post-purchase lifecycle flows.',
      results: [
        { label: 'Mobile Checkout Conversion', value: '+62%' },
        { label: 'Average Order Value (AOV)', value: '+$38.50' },
        { label: 'Return On Ad Spend (ROAS)', value: '5.2x' },
        { label: 'Email Channel Revenue', value: '38% of Total' },
      ],
      technologies: ['Shopify Plus', 'Liquid', 'Klaviyo', 'Meta CAPI', 'Tailwind CSS'],
      testimonial: {
        quote:
          'Our previous store was leaving money on the table every minute. The new storefront built by InfosBrain is lightning-fast, and our conversion rate skyrocketed immediately.',
        author: 'Elena Rostova',
        role: 'Co-Founder & CEO, Apex Living',
      },
    },
    {
      id: 'cs-3',
      slug: 'veritas-legal-brand-transformation',
      title: 'Modernizing Corporate Brand Identity & Web Platform for Global Advisory Firm',
      client: 'Veritas Global Partners [Demo Client]',
      industry: 'Professional Services',
      category: 'Branding',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
      challenge:
        'An established 15-year-old advisory firm had an outdated digital presence that failed to convey their international stature to prospective Fortune 500 partners.',
      strategy:
        'Created a futuristic yet authoritative visual design system, custom typography guidelines, dynamic interactive case study filters, and a high-security WordPress backend.',
      services: ['Brand Identity', 'Graphic Design', 'WordPress Development', 'Content Strategy'],
      solution:
        'A refined digital corporate identity featuring dark navy architectural lines, subtle cyan accents, interactive partner bios, and private client portal access.',
      results: [
        { label: 'Average Time On Site', value: '+140%' },
        { label: 'Inbound Inquiries from Global Orgs', value: '+85%' },
        { label: 'Bounce Rate Reduction', value: '-35%' },
        { label: 'International Reach', value: '18 Countries' },
      ],
      technologies: ['WordPress', 'PHP', 'Custom Gutenberg Blocks', 'Figma Design System'],
      testimonial: {
        quote:
          'InfosBrain understood our high-stakes market immediately. The new website commands instant respect and positions us at the pinnacle of modern international advisory.',
        author: 'Arthur Pendelton',
        role: 'Senior Managing Director, Veritas',
      },
    },
    {
      id: 'cs-4',
      slug: 'finpulse-mern-dashboard',
      title: 'Engineering a Real-Time MERN Stack Analytics Platform for FinTech Startup',
      client: 'FinPulse Systems [Demo Client]',
      industry: 'FinTech',
      category: 'Web Development',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      challenge:
        'FinPulse needed a production-ready, high-throughput reactive analytics dashboard capable of rendering streaming transaction data with zero latency lag.',
      strategy:
        'Architected a MERN stack application with optimized MongoDB aggregation pipelines, WebSocket bi-directional streaming, and modular React state management.',
      services: ['MERN Stack Development', 'UI/UX Design', 'API Integration', 'Security Hardening'],
      solution:
        'An ultra-responsive dark-mode financial dashboard featuring real-time charting, customizable widget grids, and role-based access security.',
      results: [
        { label: 'Dashboard Latency', value: '<45ms' },
        { label: 'Daily Active Users (DAU)', value: '25,000+' },
        { label: 'System Uptime SLA', value: '99.99%' },
        { label: 'Codebase Test Coverage', value: '94%' },
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'Tailwind'],
      testimonial: {
        quote:
          'The technical caliber of the InfosBrain development team is world-class. They delivered our core platform ahead of schedule with spotless code architecture.',
        author: 'Siddharth Nair',
        role: 'Chief Technology Officer, FinPulse',
      },
    },
  ] as CaseStudyItem[],

  testimonials: [
    {
      id: 't-1',
      clientName: 'Alexander Hayes',
      company: 'Vanguard Health Technologies [Demo Client]',
      role: 'Chief Executive Officer',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      testimonial:
        'InfosBrain delivered far more than just a new website—they built a complete digital engine for our company. Their blend of cutting-edge technology, striking design, and data-driven marketing made an immediate impact on our bottom line.',
      rating: 5,
      avatarText: 'AH',
    },
    {
      id: 't-2',
      clientName: 'Sophia Lin',
      company: 'Aura Luxe Brands [Demo Client]',
      role: 'Director of Digital Marketing',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      testimonial:
        'Working with InfosBrain has been an absolute game-changer for our e-commerce performance. Our ROAS on paid campaigns jumped from 2.1x to over 4.8x within 90 days of implementing their creative and tracking strategy.',
      rating: 5,
      avatarText: 'SL',
    },
    {
      id: 't-3',
      clientName: 'David K. O’Connor',
      company: 'Synapse Data Networks [Demo Client]',
      role: 'Founder & Managing Partner',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      testimonial:
        'The engineering discipline and attention to detail from the InfosBrain team is exceptional. They modernized our entire MERN stack architecture while maintaining 100% uptime throughout the transition.',
      rating: 5,
      avatarText: 'DO',
    },
    {
      id: 't-4',
      clientName: 'Camila Rodriguez',
      company: 'Solaria Global Logistics [Demo Client]',
      role: 'VP of Commercial Strategy',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      testimonial:
        'From our very first strategy consultation, InfosBrain demonstrated deep commercial understanding. Their SEO and content team pushed us to page one for our most competitive industry terms in under six months.',
      rating: 5,
      avatarText: 'CR',
    },
  ] as TestimonialItem[],

  faqs: [
    {
      id: 'faq-1',
      question: 'What services does InfosBrain provide?',
      answer:
        'InfosBrain is an end-to-end digital technology and growth agency. We provide comprehensive Web & App Development (MERN stack, WordPress, Shopify, PHP/Laravel), Search Marketing & SEO, Digital Advertising (Google Ads, Meta/Facebook Ads, Cross-channel PPC), Graphic Design & Brand Identity, Content Marketing, and Email Automation.',
    },
    {
      id: 'faq-2',
      question: 'How does the project process work?',
      answer:
        'Our project lifecycle follows our proven 6-step framework: 01 Discover (goals & landscape audits), 02 Strategize (data-backed roadmap), 03 Design (high-fidelity UX & visual prototypes), 04 Develop (clean modular code & testing), 05 Launch (QA, performance optimization & deployment), and 06 Grow (continuous data analysis, CRO & scaling).',
    },
    {
      id: 'faq-3',
      question: 'How long does a website project take?',
      answer:
        'Timeline depends on scope and technical complexity. Standard custom corporate websites typically launch in 4 to 6 weeks. Complex e-commerce platforms or full-stack MERN/SaaS applications range from 8 to 14 weeks. We provide clear milestone schedules and weekly demos throughout.',
    },
    {
      id: 'faq-4',
      question: 'Do you provide SEO services?',
      answer:
        'Yes. We provide full-suite technical SEO, on-page optimization, content architecture, semantic schema markup, Core Web Vitals speed tuning, high-authority digital PR backlink building, and local Google Business Profile ranking strategies.',
    },
    {
      id: 'faq-5',
      question: 'Do you manage Google Ads?',
      answer:
        'Yes. Our certified Google Ads specialists manage Google Search campaigns, Performance Max (PMax), Google Shopping, Display network, and YouTube video ads with dedicated negative keyword sculpting, conversion tracking, and continuous ROAS optimization.',
    },
    {
      id: 'faq-6',
      question: 'Do you manage Meta Ads?',
      answer:
        'Yes. We architect high-converting paid campaigns across Facebook and Instagram utilizing Advantage+ Shopping campaigns, Server-Side Conversions API (CAPI) for accurate tracking, dynamic creative sandboxing, and full-funnel retargeting.',
    },
    {
      id: 'faq-7',
      question: 'Do you provide Shopify development?',
      answer:
        'Yes. We build custom high-converting Shopify and Shopify Plus storefronts, headless commerce setups with Hydrogen/Next.js, custom Liquid theme engineering, frictionless 1-click checkouts, and seamless ERP/CRM integrations.',
    },
    {
      id: 'faq-8',
      question: 'Do you provide WordPress development?',
      answer:
        'Yes. We engineer high-performance bespoke WordPress websites and WooCommerce platforms using zero bloated page builders. Our builds feature custom Gutenberg blocks, Redis caching, and enterprise security suites built for sub-second speeds.',
    },
    {
      id: 'faq-9',
      question: 'Can you work with international clients?',
      answer:
        'Absolutely. InfosBrain works with clients across North America, Europe, the Middle East, Asia-Pacific, and globally. We operate asynchronously with dedicated regional time-zone overlaps and 24/7 client communication channels.',
    },
    {
      id: 'faq-10',
      question: 'How can I request a quote?',
      answer:
        'You can request a free consultation or custom quote directly through our Contact form, or by emailing our strategy leads directly at info@infosbrain.com or contact@infosbrain.com. We respond within 24 business hours with an initial project breakdown.',
    },
  ] as FAQItem[],

  blogPosts: [
    {
      id: 'bp-1',
      slug: 'future-of-technical-seo-core-web-vitals',
      title: 'The Future of Technical SEO: How Core Web Vitals and Semantic Search Drive Organic Dominance',
      excerpt:
        'Explore how modern search engines evaluate site architecture, interaction to next paint (INP), and structured entity schema to award first-page rankings in competitive markets.',
      category: 'SEO',
      readTime: '6 min read',
      date: 'Oct 24, 2025',
      author: 'InfosBrain SEO Strategy Team',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
      tags: ['SEO', 'Core Web Vitals', 'Search Engine Optimization', 'Google Algorithms'],
      content: [
        'Search engine optimization has transformed from superficial keyword density into a sophisticated discipline governed by machine learning algorithms and real-world user experience signals.',
        'Technical performance is the foundation of modern search visibility. With Google weighting Core Web Vitals heavily, slow server response times and layout shifts directly suppress rankings.',
        'To outrank established competitors, modern enterprises must build semantic content clusters supported by JSON-LD structured data that clearly maps out their organizational entities and topical authority.',
      ],
    },
    {
      id: 'bp-2',
      slug: 'scaling-paid-ads-post-cookie-era',
      title: 'Mastering Paid Advertising in the Post-Cookie Era: First-Party Data & Server-Side Tracking',
      excerpt:
        'A comprehensive guide to configuring Meta CAPI, Google Enhanced Conversions, and predictive creative testing to maintain 5x+ ROAS despite browser privacy restrictions.',
      category: 'Paid Advertising',
      readTime: '8 min read',
      date: 'Nov 02, 2025',
      author: 'InfosBrain Media Buying Unit',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      tags: ['Paid Media', 'Meta Ads', 'Google Ads', 'ROAS', 'Tracking'],
      content: [
        'Browser restrictions and tracking limitations have permanently changed the paid media landscape. Agencies still relying solely on client-side browser pixels are flying blind with underreported conversion data.',
        'Server-Side Conversions API (CAPI) connects your CRM and web server directly to advertising platform algorithms, recovering up to 35% of lost attribution data and enabling intelligent automated bidding.',
        'High-velocity creative testing remains the ultimate leverage. By testing varied video hooks, problem-centric headlines, and contrasting visual aesthetics, brands can overcome ad fatigue and scale budgets profitably.',
      ],
    },
    {
      id: 'bp-3',
      slug: 'why-headless-architecture-wins-ecommerce',
      title: 'Why Headless E-commerce Architecture is the Secret Weapon for High-Volume Brands',
      excerpt:
        'Discover how separating your frontend storefront from your backend e-commerce engine unlocks unmatched page speed, total design freedom, and elevated average order values.',
      category: 'E-commerce',
      readTime: '7 min read',
      date: 'Nov 14, 2025',
      author: 'InfosBrain Engineering Group',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      tags: ['E-commerce', 'Shopify Plus', 'Headless Commerce', 'Next.js'],
      content: [
        'Traditional monolithic e-commerce platforms bundle the frontend display and backend database together. While convenient for beginners, high-volume stores quickly hit performance ceilings.',
        'Headless architectures pair modern frameworks like Next.js with robust commerce backends like Shopify Plus, delivering instantaneous page transitions and custom checkout flows that boost conversion rates by 20-50%.',
        'Investing in clean modular codebases protects brands against platform lock-in, enabling frictionless omnichannel expansion into mobile apps, smart devices, and international localized storefronts.',
      ],
    },
    {
      id: 'bp-4',
      slug: 'crafting-high-conversion-b2b-digital-experiences',
      title: 'Designing Digital Experiences that Convert: Psychology, Micro-Interactions, and Flow',
      excerpt:
        'Learn the visual hierarchy principles, dark mode neon accents, and cognitive friction reductions that transform casual website visitors into high-ticket enterprise inquiries.',
      category: 'Digital Marketing',
      readTime: '5 min read',
      date: 'Dec 05, 2025',
      author: 'InfosBrain UI/UX Design Lab',
      imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
      tags: ['UI/UX', 'Conversion Optimization', 'Web Design', 'Branding'],
      content: [
        'Conversion rate optimization begins long before the checkout or contact form. It is established the moment a user lands on your screen and subconsciously evaluates your credibility.',
        'Strategic use of negative space, mathematical typography scaling, and high-contrast glowing accents directs user focus toward core value propositions without cognitive overload.',
        'By streamlining forms into multi-step interactive workflows and offering transparent expectations, agencies can dramatically increase completion rates while collecting higher-quality prospect data.',
      ],
    },
  ] as BlogPostItem[],

  careers: [
    {
      id: 'job-1',
      title: 'Senior Full-Stack Engineer (React / Node / TypeScript)',
      department: 'Engineering',
      type: 'Full-time / Remote',
      location: 'Global Remote',
      experience: '4+ years',
      description:
        'Architect and deploy high-performance web applications, SaaS platforms, and custom digital experiences using Next.js, React, Node.js, and modern cloud infrastructure.',
      requirements: [
        'Expert proficiency in TypeScript, React, and Node.js',
        'Strong knowledge of state management, REST APIs, and database schema design',
        'Passion for sub-second web performance and clean modular architecture',
        'Comfortable working in an asynchronous, distributed agile team',
      ],
    },
    {
      id: 'job-2',
      title: 'Senior Technical SEO Specialist',
      department: 'Search Marketing',
      type: 'Full-time / Remote',
      location: 'Global Remote',
      experience: '3+ years',
      description:
        'Lead comprehensive technical audits, semantic keyword clustering, Core Web Vitals optimization, and enterprise ranking strategies for high-growth global clients.',
      requirements: [
        'Proven track record of moving competitive keywords to top 3 search positions',
        'Deep mastery of Screaming Frog, Ahrefs, Search Console, and schema markup',
        'Ability to communicate technical recommendations directly to engineering teams',
        'Experience with programmatic SEO and international multi-lingual indexing',
      ],
    },
    {
      id: 'job-3',
      title: 'Performance Marketing Lead (Google & Meta Ads)',
      department: 'Paid Media',
      type: 'Full-time / Remote',
      location: 'Global Remote',
      experience: '4+ years',
      description:
        'Manage high-six-figure monthly ad budgets across Google Search/PMax and Meta channels, driving predictable ROAS and scaling client revenue.',
      requirements: [
        'Demonstrated experience managing significant monthly ad spends profitably',
        'Mastery of server-side tracking (Meta CAPI, Google Enhanced Conversions)',
        'Strong creative instinct for direct-response video hooks and ad angles',
        'Advanced data analytical skills with Google Analytics 4 and spreadsheet modeling',
      ],
    },
    {
      id: 'job-4',
      title: 'Lead UI/UX & Visual Brand Designer',
      department: 'Creative & Design',
      type: 'Full-time / Remote',
      location: 'Global Remote',
      experience: '3+ years',
      description:
        'Create futuristic visual design systems, interactive web prototypes, and compelling brand collateral that elevate our agency and client brands.',
      requirements: [
        'Outstanding portfolio showcasing modern SaaS and high-tech digital aesthetics',
        'Expertise in Figma design systems, responsive component tokens, and motion',
        'Deep understanding of cognitive UX psychology and conversion optimization',
        'Ability to translate complex technological concepts into sleek visual metaphors',
      ],
    },
  ] as CareerPosition[],

  teamMembers: [
    {
      id: 'tm-1',
      name: 'Elena Vance [Demo Profile]',
      role: 'Principal Digital Strategist & Co-Founder',
      imageUrl: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=400&q=80',
      bio: '12+ years orchestrating digital growth strategies, brand scaling, and technology initiatives for international businesses.',
      skills: ['Growth Strategy', 'Brand Architecture', 'CRO'],
    },
    {
      id: 'tm-2',
      name: 'Kaelen Thorne [Demo Profile]',
      role: 'Head of Web Engineering & Architecture',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Full-stack systems architect specializing in high-throughput MERN, headless Next.js platforms, and cloud resilience.',
      skills: ['MERN Stack', 'Next.js', 'System Architecture'],
    },
    {
      id: 'tm-3',
      name: 'Nadia Chen [Demo Profile]',
      role: 'Director of Performance Media & SEO',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      bio: 'Data-driven performance marketer with expertise in algorithmic search optimization and multi-million dollar paid campaigns.',
      skills: ['Technical SEO', 'Google Ads', 'Meta CAPI'],
    },
    {
      id: 'tm-4',
      name: 'Liam Sterling [Demo Profile]',
      role: 'Creative Director & Brand Designer',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      bio: 'Award-winning visual designer shaping cyber-modern design systems, high-converting UI/UX, and distinctive digital identities.',
      skills: ['UI/UX Systems', 'Futuristic Visuals', 'Motion'],
    },
  ] as TeamMember[],
};
