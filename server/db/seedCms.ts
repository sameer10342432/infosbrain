import type { Database } from 'better-sqlite3';

export function seedCmsData(db: Database) {
  // 1. Team & Leadership Members (Managed purely via Admin CMS and persistent database; do NOT re-seed demo members)

  // 2. Services
  const serviceCount = db.prepare('SELECT COUNT(*) as count FROM services').get() as { count: number };
  if (serviceCount.count === 0) {
    const insertService = db.prepare(`
      INSERT INTO services (
        id, slug, title, category, iconName, featured, imageUrl, shortDescription,
        heroSubtitle, description, features, benefits, deliverables, technologies,
        process, faqs, ctaText, metaTitle, metaDescription, focusKeyword,
        displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const services = [
      {
        id: 'service-software-development',
        slug: 'software-development',
        title: 'Software Development',
        category: 'Development',
        iconName: 'Code2',
        featured: 1,
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Custom web, mobile, and enterprise applications designed to support performance, flexibility, scalability, and long-term growth.',
        heroSubtitle: 'Engineering resilient, scalable, and high-performance digital products engineered for long-term operational excellence.',
        description: 'At InfosBrain, our Software Development practice builds robust, modular, and cloud-native software solutions tailored to enterprise workflows and rapid-growth ventures. From full-stack web platforms and native mobile applications to enterprise service-oriented architectures, we write clean, maintainable, and high-velocity code designed to adapt as your organization scales.',
        features: [
          'Full-stack custom web & SaaS application engineering',
          'Cross-platform & native mobile app development (iOS & Android)',
          'Microservices & resilient API architecture design',
          'Legacy software modernization & cloud re-platforming',
          'Automated CI/CD pipelines & comprehensive QA test suites',
        ],
        benefits: [
          'High-concurrency architecture that scales seamlessly with demand',
          'Reduced technical debt through clean, modular codebases',
          'Rapid time-to-market with iterative agile sprint deliveries',
          '100% intellectual property and complete source code ownership',
        ],
        deliverables: [
          'Fully documented enterprise codebase in client-owned repositories',
          'Modular API specifications & OpenAPI / Swagger docs',
          'Automated test coverage reports (Unit, Integration, E2E)',
        ],
        technologies: ['TypeScript', 'React / Next.js', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'Docker', 'AWS'],
        process: [
          { phase: 'Discovery & Architecture', description: 'Domain mapping, architecture blueprinting, and schema design.' },
          { phase: 'Sprint-Based Engineering', description: 'Agile 2-week sprints with automated CI/CD and continuous demos.' },
          { phase: 'Security & QA Audits', description: 'Penetration testing, load testing under high concurrency, and mitigation.' },
          { phase: 'Deployment & Support', description: 'Zero-downtime deployment, APM telemetry, and proactive SLAs.' },
        ],
        faqs: [
          { q: 'Who owns the intellectual property?', a: 'You retain 100% ownership of all source code, assets, and databases.' },
          { q: 'Can you modernize existing legacy software?', a: 'Yes. We refactor legacy monoliths into scalable modern microservices.' },
        ],
        ctaText: 'Start Your Software Project',
        metaTitle: 'Custom Software Development Services | InfosBrain',
        metaDescription: 'Scalable custom web, mobile, and enterprise software engineering built for performance, security, and long-term growth.',
        focusKeyword: 'software development company',
        displayOrder: 1,
        status: 'published',
      },
      {
        id: 'service-ai-automation',
        slug: 'artificial-intelligence-automation',
        title: 'Artificial Intelligence & Automation',
        category: 'Technology',
        iconName: 'Sparkles',
        featured: 1,
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Intelligent systems that streamline workflows, improve decision-making, reduce repetitive work, and unlock new opportunities for innovation.',
        heroSubtitle: 'Practical, secure, and production-grade artificial intelligence workflows built for measurable enterprise efficiency.',
        description: 'InfosBrain builds bespoke artificial intelligence systems that move beyond experimental novelty into mission-critical production operations. We engineer secure agentic workflows, domain-specialized language model pipelines, computer vision systems, and automated data pipelines designed with deterministic validation and role-based access controls.',
        features: [
          'Custom autonomous AI agents & multi-agent workflow orchestration',
          'Domain-grounded Retrieval-Augmented Generation (RAG) knowledge systems',
          'Computer vision for document intelligence and OCR extraction',
          'Predictive modeling for customer churn and demand forecasting',
          'Strict data privacy guardrails with zero third-party model data retention',
        ],
        benefits: [
          'Up to 70% reduction in manual document and ticket processing times',
          'Near-instant access to verified internal institutional knowledge',
          'Zero risk to proprietary IP with strictly compartmentalized deployments',
          'Seamless integration with existing ERP, CRM, and communication platforms',
        ],
        deliverables: [
          'Private LLM or RAG pipeline hosted in your dedicated cloud infrastructure',
          'Deterministic evaluation test suite with hallucination rate telemetry',
          'Enterprise administration console with token usage and audit logs',
        ],
        technologies: ['Python', 'LangChain', 'LlamaIndex', 'FastAPI', 'PyTorch', 'Qdrant / Pinecone', 'OpenAI / Anthropic APIs', 'Docker'],
        process: [
          { phase: 'Feasibility & Data Audit', description: 'Analyze workflows, data quality, security criteria, and ROI.' },
          { phase: 'Prototype & Guardrails', description: 'Develop private benchmark harnesses and deterministic safety filters.' },
          { phase: 'Enterprise Integration', description: 'Embed AI endpoints into production databases and internal tools.' },
          { phase: 'Telemetry & Refinement', description: 'Continuous fine-tuning, latency optimization, and accuracy metrics.' },
        ],
        faqs: [
          { q: 'Will our proprietary corporate data be used to train external models?', a: 'No. We configure zero-retention enterprise API endpoints and private self-hosted models.' },
          { q: 'How do you prevent AI hallucinations?', a: 'We use structured validation schemas, source-grounded vector retrieval, and deterministic verification gates.' },
        ],
        ctaText: 'Deploy Enterprise AI Solutions',
        metaTitle: 'Enterprise AI & Automation Services | InfosBrain',
        metaDescription: 'Deploy production AI systems, autonomous agents, and intelligent workflow automation to accelerate operational speed.',
        focusKeyword: 'artificial intelligence consulting',
        displayOrder: 2,
        status: 'published',
      },
      {
        id: 'service-cloud-solutions',
        slug: 'cloud-solutions',
        title: 'Cloud Solutions',
        category: 'Technology',
        iconName: 'Cloud',
        featured: 1,
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Secure, scalable cloud architecture, migration, optimization, and infrastructure solutions that help organizations operate with greater agility.',
        heroSubtitle: 'Architecting resilient, cost-optimized, and compliant multi-cloud foundations for high-velocity organizations.',
        description: 'Our Cloud Solutions practice designs and manages cloud infrastructures across AWS, Google Cloud, and Microsoft Azure. We transition organizations away from fragile legacy environments into fault-tolerant, automated, and secure multi-region cloud topologies.',
        features: [
          'Cloud readiness assessment and zero-downtime database migration',
          'Multi-region high availability and automated disaster recovery setup',
          'Infrastructure as Code (IaC) with Terraform and AWS CloudFormation',
          'Cloud cost governance (FinOps) to eliminate runaway computing bills',
          'Container orchestration with Kubernetes (EKS, GKE, AKS)',
        ],
        benefits: [
          'Guaranteed 99.99% uptime with automated self-healing clusters',
          'Average 30-45% reduction in monthly cloud expenditure through FinOps',
          'Rapid environment provisioning in minutes rather than days',
          'Strict compliance with ISO 27001, SOC 2, HIPAA, and GDPR',
        ],
        deliverables: [
          'Modular Terraform / OpenTofu infrastructure repository',
          'Live cloud observability dashboards (Datadog / Prometheus / Grafana)',
          'Comprehensive disaster recovery playbook with documented RTO/RPO',
        ],
        technologies: ['AWS', 'Google Cloud Platform', 'Microsoft Azure', 'Terraform', 'Kubernetes', 'Docker', 'Prometheus', 'Datadog'],
        process: [
          { phase: 'Cloud Architecture Review', description: 'Audit workloads, network security, IAM policies, and cloud expenditure.' },
          { phase: 'IaC Blueprinting', description: 'Write modular Terraform templates and zero-trust VPC networking.' },
          { phase: 'Staged Migration', description: 'Execute parallel database synchronization with zero downtime cutover.' },
          { phase: 'FinOps & Observability', description: 'Establish automated autoscaling, cost caps, and 24/7 APM alerting.' },
        ],
        faqs: [
          { q: 'Can you migrate our live systems without downtime?', a: 'Yes. We use active-active database replication and blue-green DNS cutovers.' },
          { q: 'How does InfosBrain reduce existing cloud bills?', a: 'We analyze idle resources, rightsizing instances, and configure reserved instances.' },
        ],
        ctaText: 'Modernize Your Cloud Infrastructure',
        metaTitle: 'Enterprise Cloud Architecture & DevOps Solutions | InfosBrain',
        metaDescription: 'Secure multi-cloud migration, infrastructure as code, and FinOps optimization across AWS, Azure, and Google Cloud.',
        focusKeyword: 'cloud migration consulting',
        displayOrder: 3,
        status: 'published',
      },
      {
        id: 'service-cybersecurity',
        slug: 'cybersecurity',
        title: 'Cybersecurity',
        category: 'Technology',
        iconName: 'ShieldCheck',
        featured: 1,
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Risk-focused security solutions that protect digital assets, strengthen organizational resilience, and support compliance requirements.',
        heroSubtitle: 'Proactive zero-trust defense, vulnerability remediation, and continuous compliance governance for enterprise systems.',
        description: 'InfosBrain provides cybersecurity assessments, defense architectures, and incident readiness to safeguard your sensitive business data, intellectual property, and customer trust against modern cyber threats.',
        features: [
          'Full-scope penetration testing (Web, Mobile, Cloud, Network)',
          'Zero-Trust network architecture and IAM least-privilege enforcement',
          'Continuous vulnerability scanning and automated patch management',
          'Compliance readiness for SOC 2 Type II, ISO 27001, and GDPR',
          'Incident response planning, simulated table-top drills, and forensics',
        ],
        benefits: [
          'Proactive elimination of exploitable attack vectors before adversaries find them',
          'Uninterrupted customer trust and protection against reputational damages',
          'Accelerated sales cycles by satisfying enterprise vendor security questionnaires',
          'Guaranteed business continuity with rapid containment protocols',
        ],
        deliverables: [
          'Executive and technical penetration test reports with verified proof-of-concept exploits',
          'Prioritized CVE vulnerability remediation roadmap with verified patch guidance',
          'Formal security policies and evidence documentation for compliance auditors',
        ],
        technologies: ['OWASP Top 10', 'Burp Suite Pro', 'Wazuh', 'Trivy', 'Wireshark', 'HashiCorp Vault', 'AWS GuardDuty', 'Cloudflare WAF'],
        process: [
          { phase: 'Threat Modeling & Reconnaissance', description: 'Map attack surface, digital footprints, and external exposures.' },
          { phase: 'Deep Penetration Testing', description: 'Perform ethical exploitation across APIs, applications, and networks.' },
          { phase: 'Collaborative Remediation', description: 'Guide your engineers through verified code patches and hardening.' },
          { phase: 'Re-testing & Attestation', description: 'Verify fixes and issue an executive security attestation report.' },
        ],
        faqs: [
          { q: 'Will penetration testing disrupt our live services?', a: 'No. We conduct testing safely with throttling and out-of-band protocols.' },
          { q: 'Can you help us pass vendor security questionnaires?', a: 'Yes. We prepare complete security documentation and audit readiness packages.' },
        ],
        ctaText: 'Secure Your Digital Perimeter',
        metaTitle: 'Cybersecurity & Penetration Testing Services | InfosBrain',
        metaDescription: 'Zero-trust architecture, web and cloud penetration testing, and compliance readiness for enterprise organizations.',
        focusKeyword: 'cybersecurity services company',
        displayOrder: 4,
        status: 'published',
      },
      {
        id: 'service-seo-growth',
        slug: 'seo-digital-growth',
        title: 'SEO & Digital Growth',
        category: 'Marketing',
        iconName: 'TrendingUp',
        featured: 1,
        imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Data-driven search, content, conversion, and customer acquisition strategies designed to increase visibility, improve conversions, and generate sustainable revenue growth.',
        heroSubtitle: 'Systematic search dominance, semantic entity optimization, and conversion engineering that scales inbound revenue.',
        description: 'InfosBrain combines deep technical SEO engineering with semantic topical authority to turn your digital presence into a compounding customer acquisition channel. We audit site architecture, optimize Core Web Vitals, build high-authority backlinks, and structure content to capture high-intent commercial searches.',
        features: [
          'Exhaustive technical SEO audits & Core Web Vitals performance tuning',
          'Semantic keyword mapping, search intent clustering, and topic graphs',
          'Generative Search Optimization (GEO) for Google AI Overviews and Perplexity',
          'High-authority digital PR, editorial outreach, and ethical link acquisition',
          'Conversion Rate Optimization (CRO) with multivariate A/B testing',
        ],
        benefits: [
          'Sustainable, compounding organic traffic that reduces reliance on paid media',
          'Higher conversion rates from qualified commercial searchers ready to transact',
          'Protection against volatile search algorithm shifts with future-proof white-hat methods',
          'Clear attribution visibility showing exactly which search queries generate revenue',
        ],
        deliverables: [
          'Comprehensive 60+ point technical SEO audit with prioritized action items',
          '12-month semantic content and topical authority roadmap',
          'Custom Looker Studio attribution dashboard tracking conversions and rankings',
        ],
        technologies: ['Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console', 'Google Analytics 4', 'Schema.org JSON-LD', 'Looker Studio'],
        process: [
          { phase: 'Technical & Log File Audit', description: 'Identify crawl waste, indexation bottlenecks, and schema gaps.' },
          { phase: 'Topical Graph Architecture', description: 'Cluster keywords into comprehensive pillar-and-cluster hierarchies.' },
          { phase: 'On-Page & Core Web Vitals', description: 'Optimize code, inline critical CSS, and implement JSON-LD data.' },
          { phase: 'Digital PR & CRO Sprints', description: 'Acquire authoritative contextual links and run iterative conversion tests.' },
        ],
        faqs: [
          { q: 'How long does it take to see tangible SEO results?', a: 'Technical fixes often produce indexing gains in 4-6 weeks; substantive revenue compounding appears in 3-6 months.' },
          { q: 'Do you optimize for AI search like Perplexity and Google AI Overviews?', a: 'Yes. We implement Generative Engine Optimization (GEO) and structured schema.' },
        ],
        ctaText: 'Scale Your Organic Search Revenue',
        metaTitle: 'Enterprise Technical SEO & Organic Growth Services | InfosBrain',
        metaDescription: 'Drive sustainable revenue with data-backed technical SEO, Core Web Vitals acceleration, and Generative Engine Optimization.',
        focusKeyword: 'enterprise technical seo agency',
        displayOrder: 5,
        status: 'published',
      },
      {
        id: 'service-digital-transformation',
        slug: 'digital-transformation-consulting',
        title: 'Digital Transformation Consulting',
        category: 'Consulting',
        iconName: 'Layers',
        featured: 1,
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Strategic technology consulting that helps organizations modernize legacy systems, improve operational workflows, adopt emerging technologies, and build scalable digital capabilities.',
        heroSubtitle: 'Bridging high-level corporate strategy and rigorous technical execution to modernize operations and drive long-term impact.',
        description: 'InfosBrain partners with leadership teams at enterprises, institutions, and high-growth businesses to navigate complex technological shifts. We design actionable modernization blueprints that align stakeholders, modernize legacy software stacks, automate operational bottlenecks, and cultivate durable digital capabilities.',
        features: [
          'Enterprise digital maturity diagnostics and technology stack audits',
          'Multi-year digital transformation roadmaps with phased investment gates',
          'Legacy monolith decompilation and microservices migration strategy',
          'Business process automation and workflow redesign',
          'Executive technology steering, change management, and team upskilling',
        ],
        benefits: [
          'Elimination of multi-million dollar software licensing waste and redundancy',
          'Dramatically accelerated agility to launch new digital products and services',
          'Alignment between board-level business objectives and engineering priorities',
          'Sustainable digital operational resilience that withstands market disruption',
        ],
        deliverables: [
          'Executive Technology Modernization Blueprint & ROI Analysis',
          'Enterprise Architecture Reference Models & Integration Standards',
          'Organizational Change Management Playbook with training curricula',
        ],
        technologies: ['Enterprise Architecture', 'TOGAF', 'BPMN 2.0', 'API Gateway Topology', 'Microservices', 'ERP Modernization', 'Jira / Confluence'],
        process: [
          { phase: 'Executive Discovery & Audit', description: 'Interview key leadership, map business processes, and evaluate IT debt.' },
          { phase: 'Strategic Roadmap Design', description: 'Formulate milestone-driven transformation phases with financial models.' },
          { phase: 'Agile Implementation Oversight', description: 'Direct cross-functional squads to execute modern architectural patterns.' },
          { phase: 'Capability Transfer & Scale', description: 'Upskill internal teams and establish governance councils for autonomy.' },
        ],
        faqs: [
          { q: 'Why do most digital transformations fail, and how does InfosBrain prevent that?', a: 'Transformations fail due to poor change management and monolithic scopes. We use modular incremental deliveries with continuous ROI proofs.' },
          { q: 'Does InfosBrain stay involved through execution?', a: 'Yes. We combine advisory strategy with hands-on senior engineering delivery.' },
        ],
        ctaText: 'Transform Your Organization',
        metaTitle: 'Digital Transformation Consulting & Strategy | InfosBrain',
        metaDescription: 'Strategic advisory and technical execution helping enterprises modernize legacy systems and build scalable digital capabilities.',
        focusKeyword: 'digital transformation consulting',
        displayOrder: 6,
        status: 'published',
      },
    ];

    services.forEach((s) => {
      insertService.run(
        s.id,
        s.slug,
        s.title,
        s.category,
        s.iconName,
        s.featured,
        s.imageUrl,
        s.shortDescription,
        s.heroSubtitle,
        s.description,
        JSON.stringify(s.features),
        JSON.stringify(s.benefits),
        JSON.stringify(s.deliverables),
        JSON.stringify(s.technologies),
        JSON.stringify(s.process),
        JSON.stringify(s.faqs),
        s.ctaText,
        s.metaTitle,
        s.metaDescription,
        s.focusKeyword,
        s.displayOrder,
        s.status,
        now,
        now
      );
    });
  }

  // 3. Statistics
  const statCount = db.prepare('SELECT COUNT(*) as count FROM statistics').get() as { count: number };
  if (statCount.count === 0) {
    const insertStat = db.prepare(`
      INSERT INTO statistics (id, number, label, suffix, icon, displayOrder, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const stats = [
      { id: 'stat-1', number: '25', label: 'Countries Served', suffix: '+', icon: 'Globe', displayOrder: 1 },
      { id: 'stat-2', number: '100', label: 'Projects Delivered', suffix: '+', icon: 'CheckCircle2', displayOrder: 2 },
      { id: 'stat-3', number: '98', label: 'Client Satisfaction', suffix: '%', icon: 'Star', displayOrder: 3 },
      { id: 'stat-4', number: '50', label: 'Global Strategic Partners', suffix: '+', icon: 'Building2', displayOrder: 4 },
      { id: 'stat-5', number: '100', label: 'Enterprise Security SLA', suffix: '%', icon: 'ShieldCheck', displayOrder: 5 },
      { id: 'stat-6', number: '24/7', label: 'Global Support & Advisory', suffix: '', icon: 'Clock', displayOrder: 6 },
    ];

    stats.forEach((s) => {
      insertStat.run(s.id, s.number, s.label, s.suffix, s.icon, s.displayOrder, 'published', now, now);
    });
  }

  // 4. Testimonials
  const testCount = db.prepare('SELECT COUNT(*) as count FROM testimonials').get() as { count: number };
  if (testCount.count === 0) {
    const insertTestimonial = db.prepare(`
      INSERT INTO testimonials (
        id, clientName, company, designation, country, flag, rating, avatarText,
        avatarUrl, testimonial, videoThumbnail, videoUrl, displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const testimonials = [
      {
        id: 't-1',
        clientName: 'Robert Anderson',
        company: 'Global Advisory & Capital Partners',
        designation: 'Chief Executive Officer',
        country: 'United Kingdom',
        flag: '🇬🇧',
        rating: 5,
        avatarText: 'RA',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        testimonial: 'InfosBrain guided us through a complete digital transformation journey. Their team combined technical expertise with a deep understanding of our business objectives. The results exceeded our expectations.',
        videoThumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        displayOrder: 1,
      },
      {
        id: 't-2',
        clientName: 'Jessica Williams',
        company: 'Northern Tech Innovations',
        designation: 'Managing Director',
        country: 'Canada',
        flag: '🇨🇦',
        rating: 5,
        avatarText: 'JW',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        testimonial: 'What sets InfosBrain apart is their commitment to innovation and client success. They became more than a service provider; they became a trusted strategic partner.',
        videoThumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        displayOrder: 2,
      },
      {
        id: 't-3',
        clientName: 'Ahmed Khan',
        company: 'Emirates Digital Logistics',
        designation: 'Operations Director',
        country: 'United Arab Emirates',
        flag: '🇦🇪',
        rating: 5,
        avatarText: 'AK',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        testimonial: 'The custom software solution developed by InfosBrain streamlined our operations and significantly improved efficiency across multiple departments.',
        displayOrder: 3,
      },
      {
        id: 't-4',
        clientName: 'Peter Müller',
        company: 'Bavaria Industrie Systems',
        designation: 'Business Development Manager',
        country: 'Germany',
        flag: '🇩🇪',
        rating: 5,
        avatarText: 'PM',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        testimonial: 'Working with InfosBrain was a seamless experience. Their professionalism, communication, and attention to detail were outstanding throughout the project lifecycle.',
        displayOrder: 4,
      },
      {
        id: 't-5',
        clientName: 'Sophie Taylor',
        company: 'Oceania Ventures & Digital',
        designation: 'Chief Innovation Officer',
        country: 'Australia',
        flag: '🇦🇺',
        rating: 5,
        avatarText: 'ST',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        testimonial: 'InfosBrain introduced innovative technologies that transformed the way we engage with customers and manage operations. Their solutions have become an essential part of our growth strategy.',
        displayOrder: 5,
      },
    ];

    testimonials.forEach((t) => {
      insertTestimonial.run(
        t.id,
        t.clientName,
        t.company,
        t.designation,
        t.country,
        t.flag,
        t.rating,
        t.avatarText,
        t.avatarUrl,
        t.testimonial,
        t.videoThumbnail || null,
        t.videoUrl || null,
        t.displayOrder,
        'published',
        now,
        now
      );
    });
  }

  // 5. FAQs
  const faqCount = db.prepare('SELECT COUNT(*) as count FROM faqs').get() as { count: number };
  if (faqCount.count === 0) {
    const insertFaq = db.prepare(`
      INSERT INTO faqs (id, question, answer, category, displayOrder, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const faqs = [
      {
        id: 'faq-1',
        question: 'What services does InfosBrain provide?',
        answer: 'InfosBrain is an end-to-end digital technology and growth agency. We provide comprehensive Web & App Development, Artificial Intelligence & Automation, Cloud Solutions, Cybersecurity, Technical SEO, and Digital Transformation Consulting.',
        category: 'Services',
        displayOrder: 1,
      },
      {
        id: 'faq-2',
        question: 'How does the project process work?',
        answer: 'Our project lifecycle follows our proven 4-stage framework: Discover (goals & landscape audits), Design (UX & visual prototypes), Develop (modular code & automated test suites), and Optimize (continuous data analysis & scaling).',
        category: 'Process',
        displayOrder: 2,
      },
      {
        id: 'faq-3',
        question: 'How long does a custom development project take?',
        answer: 'Timelines depend on scope and technical complexity. Standard custom corporate websites typically launch in 4 to 6 weeks. Complex enterprise platforms or full-stack SaaS applications range from 8 to 14 weeks.',
        category: 'Project Lifecycle',
        displayOrder: 3,
      },
      {
        id: 'faq-4',
        question: 'Do you provide enterprise SEO & AI Search Optimization?',
        answer: 'Yes. We provide full-suite technical SEO, Core Web Vitals speed tuning, high-authority digital PR, semantic schema markup, and Generative Engine Optimization (GEO) for Google AI Overviews and Perplexity.',
        category: 'SEO',
        displayOrder: 4,
      },
      {
        id: 'faq-5',
        question: 'Can you work with international clients in different time zones?',
        answer: 'Absolutely. InfosBrain works with clients across North America, Europe, the Middle East, Asia-Pacific, and Africa. We operate asynchronously with dedicated regional time-zone overlaps and 24/7 client communication channels.',
        category: 'General',
        displayOrder: 5,
      },
    ];

    faqs.forEach((f) => {
      insertFaq.run(f.id, f.question, f.answer, f.category, f.displayOrder, 'published', now, now);
    });
  }

  // 6. Global Locations
  const locationCount = db.prepare('SELECT COUNT(*) as count FROM locations').get() as { count: number };
  if (locationCount.count === 0) {
    const insertLoc = db.prepare(`
      INSERT INTO locations (
        id, city, country, region, role, flag, address, teamSize, contactEmail,
        contactPhone, localSuccessStory, coordinates, imageUrl, displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const locations = [
      {
        id: 'dublin-hq',
        city: 'Dublin',
        country: 'Ireland',
        region: 'Europe',
        role: 'Global Headquarters & Strategic Innovation Hub',
        flag: '🇮🇪',
        address: 'Grand Canal Dock, Innovation Corridor, Dublin 2, Ireland',
        teamSize: '35+ Specialists',
        contactEmail: 'dublin@infosbrain.com',
        contactPhone: '+353 1 800 9234',
        localSuccessStory: 'Engineered European NGO digital transformation delivering 300% donor engagement increase.',
        coordinates: { x: 47, y: 31 },
        imageUrl: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=800&q=80',
        displayOrder: 1,
      },
      {
        id: 'amsterdam-eu',
        city: 'Amsterdam',
        country: 'Netherlands',
        region: 'Europe',
        role: 'European Operations & Digital Transformation Hub',
        flag: '🇳🇱',
        address: 'Zuidas Financial & Tech District, 1082 MD Amsterdam, Netherlands',
        teamSize: '28+ Specialists',
        contactEmail: 'amsterdam@infosbrain.com',
        contactPhone: '+31 20 794 8812',
        localSuccessStory: 'Modernized financial services core processing pipeline saving 4,000+ manual audit hours.',
        coordinates: { x: 49.5, y: 32 },
        imageUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
        displayOrder: 2,
      },
      {
        id: 'lahore-islamabad',
        city: 'Lahore / Islamabad',
        country: 'Pakistan',
        region: 'South Asia',
        role: 'South Asia Technology & Engineering R&D Center',
        flag: '🇵🇰',
        address: 'Technology Park, F-7 / Gulberg III, Lahore & Islamabad, Pakistan',
        teamSize: '65+ Software Engineers & Data Scientists',
        contactEmail: 'southasia@infosbrain.com',
        contactPhone: '+92 51 844 7210',
        localSuccessStory: 'Built scalable high-volume fintech and edtech platforms serving 10,000+ active users with 99.99% uptime.',
        coordinates: { x: 67, y: 44 },
        imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
        displayOrder: 3,
      },
      {
        id: 'accra-west-africa',
        city: 'Accra',
        country: 'Ghana',
        region: 'West Africa',
        role: 'West Africa Regional Delivery & Community Hub',
        flag: '🇬🇭',
        address: 'Airport City Tech Center, Accra, Ghana',
        teamSize: '22+ Specialists',
        contactEmail: 'accra@infosbrain.com',
        contactPhone: '+233 30 299 4411',
        localSuccessStory: 'Deployed remote digital learning platforms empowering educational institutions across the region.',
        coordinates: { x: 48, y: 55 },
        imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
        displayOrder: 4,
      },
    ];

    locations.forEach((loc) => {
      insertLoc.run(
        loc.id,
        loc.city,
        loc.country,
        loc.region,
        loc.role,
        loc.flag,
        loc.address,
        loc.teamSize,
        loc.contactEmail,
        loc.contactPhone,
        loc.localSuccessStory,
        JSON.stringify(loc.coordinates),
        loc.imageUrl,
        loc.displayOrder,
        'published',
        now,
        now
      );
    });
  }

  // 7. Case Studies
  const caseCount = db.prepare('SELECT COUNT(*) as count FROM case_studies').get() as { count: number };
  if (caseCount.count === 0) {
    const insertCase = db.prepare(`
      INSERT INTO case_studies (
        id, slug, title, client, industry, category, imageUrl, challenge, strategy,
        solution, services, results, technologies, testimonial, metaTitle, metaDescription,
        displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const caseStudies = [
      {
        id: 'cs-1',
        slug: 'enterprise-cloud-modernization-financial-services',
        title: 'Enterprise Cloud Modernization & Real-Time Processing for Financial Services',
        client: 'Apex Financial Technologies [Demo Client]',
        industry: 'FinTech',
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        challenge: 'Apex Financial was experiencing significant latency bottlenecks and high infrastructure costs due to legacy monolithic servers unable to handle peak trading transaction volumes.',
        strategy: 'Decomposed the core processing monolith into scalable event-driven microservices on AWS with automated Kubernetes container orchestration and automated Redis caching layers.',
        solution: 'Engineered a real-time reactive dashboard with bi-directional WebSocket streaming, sub-45ms latency SLAs, and zero-trust IAM authentication meeting international banking compliance.',
        services: ['Software Development', 'Cloud Solutions', 'Cybersecurity', 'Microservices'],
        results: [
          { label: 'Latency Reduction', value: '78%' },
          { label: 'Uptime SLA', value: '99.99%' },
          { label: 'Cloud Cost Savings', value: '42%' },
          { label: 'Transactions/sec', value: '15,000+' },
        ],
        technologies: ['AWS', 'Kubernetes', 'Node.js', 'TypeScript', 'Redis', 'Docker'],
        testimonial: {
          quote: 'InfosBrain executed our cloud migration with precision. Zero downtime, flawless security compliance, and exceptional speed enhancements.',
          author: 'Siddharth Nair',
          role: 'Chief Technology Officer, Apex Financial',
        },
        metaTitle: 'FinTech Cloud Modernization Case Study | InfosBrain',
        metaDescription: 'How InfosBrain helped Apex Financial modernize legacy systems into a high-availability cloud microservices platform.',
        displayOrder: 1,
      },
      {
        id: 'cs-2',
        slug: 'ngo-digital-transformation-donor-engagement',
        title: 'Global NGO Digital Transformation & Donor Engagement Acceleration',
        client: 'International Community Alliance [Demo Client]',
        industry: 'Nonprofit',
        category: 'Digital Marketing',
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
        challenge: 'Dispersed regional operations, disconnected donor management databases, and an outdated web presence led to severe donor drop-offs and administrative overhead.',
        strategy: 'Consolidated five fragmented portals into a unified multilingual web platform integrated with real-time donor CRM, automated impact reporting, and streamlined payment gateways.',
        solution: 'Delivered an accessible, responsive web platform featuring personalized donor dashboards, transparent funding tracking, and targeted multi-channel digital campaigns.',
        services: ['Digital Transformation', 'Web Development', 'SEO & Digital Growth', 'UI/UX Design'],
        results: [
          { label: 'Donor Engagement', value: '+300%' },
          { label: 'Online Donations', value: '+185%' },
          { label: 'Admin Time Saved', value: '60 hrs/mo' },
        ],
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Stripe API', 'PostgreSQL'],
        testimonial: {
          quote: 'The transformation engineered by InfosBrain transformed our ability to mobilize international support and communicate our real-world impact.',
          author: 'Grace Ndlovu',
          role: 'Program Director, International Community Alliance',
        },
        metaTitle: 'NGO Digital Transformation Case Study | InfosBrain',
        metaDescription: 'Discover how InfosBrain rebuilt global donor engagement and operations for an international alliance.',
        displayOrder: 2,
      },
    ];

    caseStudies.forEach((cs) => {
      insertCase.run(
        cs.id,
        cs.slug,
        cs.title,
        cs.client,
        cs.industry,
        cs.category,
        cs.imageUrl,
        cs.challenge,
        cs.strategy,
        cs.solution,
        JSON.stringify(cs.services),
        JSON.stringify(cs.results),
        JSON.stringify(cs.technologies),
        JSON.stringify(cs.testimonial),
        cs.metaTitle,
        cs.metaDescription,
        cs.displayOrder,
        'published',
        now,
        now
      );
    });
  }

  // 8. Careers
  const careerCount = db.prepare('SELECT COUNT(*) as count FROM careers').get() as { count: number };
  if (careerCount.count === 0) {
    const insertCareer = db.prepare(`
      INSERT INTO careers (
        id, title, department, type, location, experience, description,
        requirements, responsibilities, applicationEmail, displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const careers = [
      {
        id: 'job-1',
        title: 'Senior Full-Stack Engineer (React / Node / TypeScript)',
        department: 'Engineering',
        type: 'Full-time / Remote',
        location: 'Global Remote',
        experience: '4+ years',
        description: 'Architect and deploy high-performance web applications, SaaS platforms, and custom digital experiences using Next.js, React, Node.js, and modern cloud infrastructure.',
        requirements: [
          'Expert proficiency in TypeScript, React, and Node.js',
          'Strong knowledge of state management, REST APIs, and database schema design',
          'Passion for sub-second web performance and clean modular architecture',
          'Comfortable working in an asynchronous, distributed agile team',
        ],
        responsibilities: [
          'Design and build high-throughput client platforms and APIs',
          'Write comprehensive unit and integration test suites',
          'Collaborate with product designers and solution architects',
        ],
        applicationEmail: 'careers@infosbrain.com',
        displayOrder: 1,
      },
      {
        id: 'job-2',
        title: 'Senior Technical SEO Specialist',
        department: 'Search Marketing',
        type: 'Full-time / Remote',
        location: 'Global Remote',
        experience: '3+ years',
        description: 'Lead comprehensive technical audits, semantic keyword clustering, Core Web Vitals optimization, and enterprise ranking strategies for high-growth global clients.',
        requirements: [
          'Proven track record of moving competitive keywords to top 3 search positions',
          'Deep mastery of Screaming Frog, Ahrefs, Search Console, and schema markup',
          'Ability to communicate technical recommendations directly to engineering teams',
          'Experience with programmatic SEO and international multi-lingual indexing',
        ],
        responsibilities: [
          'Conduct deep technical SEO audits and code reviews',
          'Build authoritative topical graph structures for client sites',
          'Monitor algorithm updates and execute Generative Search Optimization',
        ],
        applicationEmail: 'careers@infosbrain.com',
        displayOrder: 2,
      },
      {
        id: 'job-3',
        title: 'Lead AI & Automation Engineer',
        department: 'AI & Data Science',
        type: 'Full-time / Remote',
        location: 'Global Remote',
        experience: '4+ years',
        description: 'Architect and build production agentic workflows, private RAG knowledge retrieval systems, and custom LLM inference pipelines for enterprise clients.',
        requirements: [
          'Proficiency with Python, LangChain, LlamaIndex, and vector databases',
          'Demonstrated track record deploying real-world AI applications to production',
          'Deep understanding of embedding spaces, deterministic guardrails, and latency optimization',
        ],
        responsibilities: [
          'Design multi-agent orchestrations and autonomous pipelines',
          'Optimize vector indexing and document intelligence models',
          'Benchmark hallucination rates and implement strict deterministic gates',
        ],
        applicationEmail: 'careers@infosbrain.com',
        displayOrder: 3,
      },
    ];

    careers.forEach((c) => {
      insertCareer.run(
        c.id,
        c.title,
        c.department,
        c.type,
        c.location,
        c.experience,
        c.description,
        JSON.stringify(c.requirements),
        JSON.stringify(c.responsibilities),
        c.applicationEmail,
        c.displayOrder,
        'published',
        now,
        now
      );
    });
  }

  // 9. Partnerships & Strategic Alliances
  const partnerCount = db.prepare('SELECT COUNT(*) as count FROM partnerships').get() as { count: number };
  if (partnerCount.count === 0) {
    const insertPartner = db.prepare(`
      INSERT INTO partnerships (
        id, partnerName, logo, website, description, category, displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const partnerships = [
      {
        id: 'part-1',
        partnerName: 'Corporate Enterprises',
        logo: '/assets/partner-enterprise.png',
        website: 'https://infosbrain.com',
        description: 'Co-developing custom enterprise platforms, intelligent automation, and cloud systems.',
        category: 'Enterprise',
        displayOrder: 1,
      },
      {
        id: 'part-2',
        partnerName: 'Academic & Research Institutions',
        logo: '/assets/partner-academic.png',
        website: 'https://infosbrain.com',
        description: 'Collaborative applied research in artificial intelligence, digital ethics, and workforce modernization.',
        category: 'Research',
        displayOrder: 2,
      },
      {
        id: 'part-3',
        partnerName: 'Nonprofit & Impact Organizations',
        logo: '/assets/partner-impact.png',
        website: 'https://infosbrain.com',
        description: 'Building technology capacity and community platforms to accelerate humanitarian missions.',
        category: 'Nonprofit',
        displayOrder: 3,
      },
      {
        id: 'part-4',
        partnerName: 'Technology & Cloud Alliances',
        logo: '/assets/partner-cloud.png',
        website: 'https://infosbrain.com',
        description: 'Partnering with premier cloud and infrastructure providers to ensure high-performance deployments.',
        category: 'Cloud',
        displayOrder: 4,
      },
    ];

    partnerships.forEach((p) => {
      insertPartner.run(p.id, p.partnerName, p.logo, p.website, p.description, p.category, p.displayOrder, 'published', now, now);
    });
  }

  // 10. Major Website Sections (Show / Hide + Editable Content)
  const sectionCount = db.prepare('SELECT COUNT(*) as count FROM sections').get() as { count: number };
  if (sectionCount.count === 0) {
    const insertSection = db.prepare(`
      INSERT INTO sections (
        id, sectionKey, page, title, subtitle, badge, highlightText, description,
        primaryCtaText, primaryCtaUrl, secondaryCtaText, secondaryCtaUrl, image,
        status, contentJson, displayOrder, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    const sections = [
      {
        id: 'sec_home_hero',
        sectionKey: 'home_hero',
        page: 'home',
        badge: 'DIGITAL TRANSFORMATION & TECHNOLOGY SOLUTIONS',
        title: 'Transforming Ideas into',
        highlightText: 'Intelligent Digital Solutions',
        subtitle: 'Build Smarter. Scale Faster. Grow with Confidence.',
        description: 'InfosBrain helps businesses, nonprofits, institutions, and government organizations turn complex challenges into practical, measurable digital solutions. From software development and AI to cloud solutions, cybersecurity, and digital growth, we combine technology and strategic expertise to help organizations lead.',
        primaryCtaText: 'Start Your Digital Transformation',
        primaryCtaUrl: '/contact',
        secondaryCtaText: 'Explore Our Services',
        secondaryCtaUrl: '/services',
        image: '/assets/hero-illustration.png',
        status: 'visible',
        displayOrder: 1,
      },
      {
        id: 'sec_home_metrics',
        sectionKey: 'home_metrics',
        page: 'home',
        badge: 'TRUST & SCALE',
        title: 'Delivering Solutions Across Continents',
        status: 'visible',
        displayOrder: 2,
      },
      {
        id: 'sec_home_about',
        sectionKey: 'home_about',
        page: 'home',
        badge: 'WHO WE ARE',
        title: 'A Global Technology Partner Committed to',
        highlightText: 'Measurable Outcomes',
        description: 'InfosBrain was founded on a simple conviction: technology should create clarity, not complexity. We partner with organizations worldwide to design and engineer scalable digital solutions that drive operational resilience and sustainable growth.',
        primaryCtaText: 'Discover Our Story',
        primaryCtaUrl: '/about',
        status: 'visible',
        displayOrder: 3,
      },
      {
        id: 'sec_home_services',
        sectionKey: 'home_services',
        page: 'home',
        badge: 'END-TO-END CAPABILITIES',
        title: 'Comprehensive Technology Practices Built for',
        highlightText: 'Scalable Impact',
        description: 'Six core technology practices designed to modernize operations, safeguard digital assets, and drive sustainable growth.',
        primaryCtaText: 'View All Practices',
        primaryCtaUrl: '/services',
        status: 'visible',
        displayOrder: 4,
      },
      {
        id: 'sec_home_why_us',
        sectionKey: 'home_why_us',
        page: 'home',
        badge: 'THE INFOSBRAIN ADVANTAGE',
        title: 'Why Global Organizations Choose',
        highlightText: 'InfosBrain',
        status: 'visible',
        displayOrder: 5,
      },
      {
        id: 'sec_home_process',
        sectionKey: 'home_process',
        page: 'home',
        badge: 'PROVEN METHODOLOGY',
        title: 'From Concept to Continuous Scale: Our',
        highlightText: 'Engineering Process',
        status: 'visible',
        displayOrder: 6,
      },
      {
        id: 'sec_home_industries',
        sectionKey: 'home_industries',
        page: 'home',
        badge: 'INDUSTRY EXPERTISE',
        title: 'Tailored Digital Solutions for',
        highlightText: 'High-Stakes Sectors',
        status: 'visible',
        displayOrder: 7,
      },
      {
        id: 'sec_home_case_studies',
        sectionKey: 'home_case_studies',
        page: 'home',
        badge: 'PROVEN OUTCOMES',
        title: 'Measurable Client Results in',
        highlightText: 'Action',
        status: 'visible',
        displayOrder: 8,
      },
      {
        id: 'sec_home_partnerships',
        sectionKey: 'home_partnerships',
        page: 'home',
        badge: 'STRATEGIC ALLIANCES',
        title: 'Building Strategic Partnerships',
        highlightText: 'Across Continents',
        status: 'visible',
        displayOrder: 9,
      },
      {
        id: 'sec_home_ai_tools',
        sectionKey: 'home_ai_tools',
        page: 'home',
        badge: 'INTELLIGENT SYSTEMS',
        title: 'Explore Our Suite of',
        highlightText: 'Enterprise AI Tools',
        status: 'visible',
        displayOrder: 10,
      },
      {
        id: 'sec_home_global_presence',
        sectionKey: 'home_global_presence',
        page: 'home',
        badge: 'GLOBAL REACH',
        title: 'Worldwide Presence with',
        highlightText: 'Local Insight',
        status: 'visible',
        displayOrder: 11,
      },
      {
        id: 'sec_home_innovations',
        sectionKey: 'home_innovations',
        page: 'home',
        badge: 'R&D LAB',
        title: 'Pioneering Innovations from Our',
        highlightText: 'Technology Center',
        status: 'visible',
        displayOrder: 12,
      },
      {
        id: 'sec_home_leadership',
        sectionKey: 'home_leadership',
        page: 'home',
        badge: 'EXECUTIVE LEADERSHIP & ADVISORY',
        title: 'Meet the Visionaries',
        highlightText: 'Behind InfosBrain',
        description: 'A multidisciplinary executive cadre combining deep technological expertise, global governance acumen, and an uncompromising commitment to client success.',
        status: 'visible',
        displayOrder: 13,
      },
      {
        id: 'sec_home_thought_leadership',
        sectionKey: 'home_thought_leadership',
        page: 'home',
        badge: 'INSIGHTS & INTELLIGENCE',
        title: 'Research, Whitepapers &',
        highlightText: 'Strategic Briefings',
        status: 'visible',
        displayOrder: 14,
      },
      {
        id: 'sec_home_testimonials',
        sectionKey: 'home_testimonials',
        page: 'home',
        badge: 'GLOBAL SOCIAL PROOF',
        title: 'Trusted by Leaders',
        highlightText: 'Worldwide',
        description: 'Discover how organizations across continents partner with InfosBrain to accelerate their digital capabilities.',
        status: 'visible',
        displayOrder: 15,
      },
      {
        id: 'sec_home_careers',
        sectionKey: 'home_careers',
        page: 'home',
        badge: 'CAREERS & CULTURE',
        title: 'Join Our Mission to Build the',
        highlightText: 'Future of Digital Solutions',
        status: 'visible',
        displayOrder: 16,
      },
      {
        id: 'sec_home_cta',
        sectionKey: 'home_cta',
        page: 'home',
        badge: 'READY TO SCALE & INNOVATE',
        title: 'Let\'s Build Something Extraordinary',
        highlightText: 'Together',
        description: 'From software development and artificial intelligence to cloud solutions, cybersecurity, digital strategy, and performance marketing, we combine technology and strategic expertise to help organizations improve performance, strengthen customer engagement, and build future-ready operations.',
        primaryCtaText: 'Start A Conversation',
        primaryCtaUrl: '/contact',
        secondaryCtaText: 'Schedule Consultation',
        secondaryCtaUrl: '/contact',
        status: 'visible',
        displayOrder: 17,
      },
      {
        id: 'sec_home_contact',
        sectionKey: 'home_contact',
        page: 'home',
        badge: 'START A CONVERSATION',
        title: 'Connect with Our',
        highlightText: 'Strategy Leads',
        status: 'visible',
        displayOrder: 18,
      },
      // Page Banners
      {
        id: 'banner_about',
        sectionKey: 'banner_about',
        page: 'about',
        badge: 'ABOUT INFOSBRAIN',
        title: 'Global Technology & Digital Transformation',
        subtitle: 'Empowering organizations to build smarter, scale faster, and grow with confidence.',
        image: '/assets/team-banner.png',
        status: 'visible',
        displayOrder: 19,
      },
      {
        id: 'banner_services',
        sectionKey: 'banner_services',
        page: 'services',
        badge: 'PRACTICES & CAPABILITIES',
        title: 'End-to-End Technology Solutions',
        subtitle: 'Scalable engineering, intelligent automation, cloud resilience, and digital growth strategies.',
        image: '/assets/team-banner.png',
        status: 'visible',
        displayOrder: 20,
      },
      {
        id: 'banner_careers',
        sectionKey: 'banner_careers',
        page: 'careers',
        badge: 'GLOBAL TALENT',
        title: 'Build the Future with InfosBrain',
        subtitle: 'Join an international team of architects, engineers, and digital strategists.',
        image: '/assets/team-banner.png',
        status: 'visible',
        displayOrder: 21,
      },
      {
        id: 'banner_contact',
        sectionKey: 'banner_contact',
        page: 'contact',
        badge: 'DIRECT ADVISORY',
        title: 'Start Your Digital Transformation',
        subtitle: 'Consult directly with our practice directors in Dublin, Amsterdam, and globally.',
        image: '/assets/team-banner.png',
        status: 'visible',
        displayOrder: 22,
      },
    ];

    sections.forEach((sec) => {
      insertSection.run(
        sec.id,
        sec.sectionKey,
        sec.page,
        sec.title || null,
        sec.subtitle || null,
        sec.badge || null,
        sec.highlightText || null,
        sec.description || null,
        sec.primaryCtaText || null,
        sec.primaryCtaUrl || null,
        sec.secondaryCtaText || null,
        sec.secondaryCtaUrl || null,
        sec.image || null,
        sec.status,
        null,
        sec.displayOrder,
        now
      );
    });
  }
}
