export interface Service {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  problem: string;
  solution: string;
  benefits: string[];
  process: { step: number; title: string; desc: string }[];
  pricing: { name: string; price: string; period: string; features: string[] }[];
  faqs: { q: string; a: string }[];
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  tagline: string;
  features: string[];
  whatsIncluded: string[];
  reviews: { author: string; rating: number; date: string; comment: string }[];
  faqs: { q: string; a: string }[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  lessonsCount: number;
  rating: number;
  price: number;
  students: number;
  tagline: string;
  curriculum: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  problem: string;
  research: string;
  strategy: string;
  implementation: string[];
  tools: string[];
  results: string[];
  testimonial: { author: string; role: string; content: string };
}

export interface CaseStudy {
  id: string;
  title: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  audit: string;
  strategy: string;
  execution: string[];
  growth: string;
  lessons: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: "seo-agency",
    title: "Enterprise SEO Agency Services",
    tagline: "Dominating search engines with highly technical, data-driven organic growth frameworks.",
    iconName: "Search",
    problem: "Most businesses waste thousands on search agency contracts that focus on vanity metrics rather than actual qualified organic pipeline, conversions, and revenue generation.",
    solution: "We build a hyper-focused Search Engine Domination Engine centered on deep intent mapping, entity-based topical authority, high-performance link-building, and continuous UX optimization.",
    benefits: [
      "Topical authority maps matching exact searcher intent",
      "Core Web Vitals & technical optimization audits",
      "High-end PR link-building and entity correlation",
      "Continuous Conversion Rate Optimization matching search layouts"
    ],
    process: [
      { step: 1, title: "Deep Intent Audit & Analytics Alignment", desc: "Mapping target keywords to purchasing stages." },
      { step: 2, title: "Topical Cluster Blueprinting", desc: "Designing structured content paths that establish unmatched authority." },
      { step: 3, title: "Technical Excellence Deployment", desc: "Maximizing site speed, structure, Schema markups, and crawl budget." },
      { step: 4, title: "PR Link Building & Amplification", desc: "Acquiring real context-based links from high-authority media outlets." }
    ],
    pricing: [
      {
        name: "Growth Engine",
        price: "2,500",
        period: "month",
        features: ["Topical Map for 50 Clusters", "Technical SEO Foundation", "5 Authority Editorial Links/mo", "Monthly Conversion Review", "Bi-weekly Strategy Reports"]
      },
      {
        name: "Enterprise Domination",
        price: "5,500",
        period: "month",
        features: ["Full Topical Domination Map", "Continuous Technical & Schema Dev", "15+ Authority Editorial Links/mo", "A/B Testing & CRO Suite", "Dedicated Slack & Weekly Syncs"]
      }
    ],
    faqs: [
      { q: "How long does it take to see organic revenue results?", a: "Initial visibility shifts usually show in 60-90 days, with exponential ROI starting around month 6 as search engines recognize topical authority." },
      { q: "Do you write the content or do we?", a: "We offer both. We can create completely optimized, editorially-vetted content or provide exact, detailed briefs for your internal writing team." }
    ]
  },
  {
    id: "ai-consulting",
    title: "AI Integration & Automation Consulting",
    tagline: "Re-architecting business processes using state-of-the-art AI automation and custom intelligence layers.",
    iconName: "Cpu",
    problem: "Organizations lose hundreds of hours weekly to manual, repetitive data entry, administrative tasks, and unoptimized customer support channels.",
    solution: "We deploy custom autonomous AI agents, semantic data retrievers, and prompt pipelines directly linked into your CRM, Slack, and email workflows to unlock massive operating leverage.",
    benefits: [
      "Up to 80% reduction in manual data processing times",
      "Seamless integration of proprietary AI agent workspaces",
      "Empowering internal teams to work alongside secure AI assistants",
      "Custom generative search & retrieval-augmented generation (RAG) systems"
    ],
    process: [
      { step: 1, title: "Automation Workflow Audit", desc: "Profiling key bottlenecks and time sinks across your organization." },
      { step: 2, title: "Custom Agent Blueprinting", desc: "Designing system prompts, API paths, and vector storage layouts." },
      { step: 3, title: "Secure Deployment", desc: "Developing and hosting enterprise-grade pipelines with guardrails." },
      { step: 4, title: "Team Training & Continuous Iteration", desc: "Onboarding employees to maximize generative daily productivity." }
    ],
    pricing: [
      {
        name: "Sprint Strategy & Setup",
        price: "4,800",
        period: "one-time",
        features: ["Custom workflow mapping & gap analysis", "2 Production-ready automated AI pipelines", "API connections with Make/Zapier", "30 Days Post-launch support"]
      },
      {
        name: "Full Enterprise Re-Architecture",
        price: "12,000",
        period: "one-time",
        features: ["Organization-wide AI feasibility roadmap", "5 Core AI Agents & autonomous custom nodes", "Full private database semantic search (RAG) setup", "90 Days Support & custom staff training"]
      }
    ],
    faqs: [
      { q: "Is our proprietary company data safe?", a: "Absolutely. We strictly build pipelines using enterprise API terms where data is never trained on, ensuring total data privacy and SOC2 level compliance workflows." },
      { q: "Do we need complex software engineers to maintain this?", a: "No. We hand over fully managed, robust low-code dashboards so your operations team can adjust rules easily." }
    ]
  },
  {
    id: "wordpress-development",
    title: "Premium WordPress & Elementor Pro Solutions",
    tagline: "Bespoke high-performance digital real estate designed for conversion and lightning-fast loading speeds.",
    iconName: "Globe",
    problem: "Unoptimized WordPress sites suffer from bloated page code, slow performance, poor Core Web Vitals, and horrible user experience that kills marketing conversion.",
    solution: "We develop hand-crafted, high-fidelity Elementor Pro structures engineered with custom clean code, caching logic, semantic headings, and a tailored visual layout.",
    benefits: [
      "95+ Google PageSpeed Performance score guaranteed",
      "Pixel-perfect responsive layout across mobile and desktop",
      "Pre-configured SEO metadata structures (Rank Math optimized)",
      "Interactive widgets designed for high product and course sign-ups"
    ],
    process: [
      { step: 1, title: "Interactive UI/UX Wireframing", desc: "Mapping visual conversions and buyer pathways." },
      { step: 2, title: "Clean Custom Theme Architecture", desc: "Setting up light, asset-optimized WordPress frameworks (like Astra Pro or Hello Elementor)." },
      { step: 3, title: "Elementor Pro Precision Build", desc: "Creating modular layouts, global styles, and responsive CSS overlays." },
      { step: 4, title: "Performance Engine Setup", desc: "Configuring CDN, lazy loading, and code minification." }
    ],
    pricing: [
      {
        name: "Premium Authority Hub",
        price: "1,950",
        period: "one-time",
        features: ["Up to 7 Core pages", "Bespoke Elementor Pro layout", "Rank Math SEO Integration", "Speed & Security hardening", "1 Year updates & hosting guidance"]
      },
      {
        name: "Ultimate Business Ecosystem",
        price: "3,800",
        period: "one-time",
        features: ["Unlimited custom layouts", "Full LMS or E-Commerce setup", "Advanced interactive schema custom fields", "Speed optimization (95+ score guarantee)", "60 days VIP technical maintenance"]
      }
    ],
    faqs: [
      { q: "Will I be able to edit the content myself later?", a: "Yes. Elementor Pro provides an intuitive, visual drag-and-drop builder. We provide personalized video guides showing you how to change text and images instantly." },
      { q: "Do you configure security patches?", a: "Yes, every custom build includes advanced firewall configuration, malware prevention, and auto-backup integrations." }
    ]
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "seo-toolkit",
    title: "The Ultimate Topical Authority SEO Toolkit",
    category: "SEO Templates",
    price: 49,
    rating: 4.9,
    reviewsCount: 148,
    badge: "Bestseller",
    tagline: "The exact workspace spreadsheet templates, intent map guides, and Rank Math setups used to grow clients past 1M+ organic visits.",
    features: [
      "Topical Mapping cluster spreadsheet with custom priority formulas",
      "Click-through-rate (CTR) Booster optimization checklist",
      "Schema markup JSON-LD generator worksheets",
      "Anchor text planning and backlink audit system"
    ],
    whatsIncluded: [
      "Google Sheets Topical Mapping Template",
      "10 Exclusive Video Overviews showing how to build clustering charts",
      "Rank Math SEO Advanced Import Settings profile",
      "Lifetime access and free updates"
    ],
    reviews: [
      { author: "Sarah Jenkins", rating: 5, date: "June 12, 2026", comment: "This single template saved our agency at least 40 hours of keyword analysis. Truly brilliant prioritization formulas!" },
      { author: "Rashid K.", rating: 5, date: "May 28, 2026", comment: "The video guide itself is worth 5 times the price. Cleanest SEO sheet I have ever seen." }
    ],
    faqs: [
      { q: "Is this compatible with Microsoft Excel?", a: "Yes, we provide both native Google Sheets format and a highly formatted Excel download." },
      { q: "How do I get future updates?", a: "Any updates made to the toolkit are automatically pushed to your member account with no additional charges." }
    ]
  },
  {
    id: "ai-prompt-library",
    title: "Enterprise AI & ChatGPT Prompt Library",
    category: "Prompt Packs",
    price: 29,
    rating: 4.8,
    reviewsCount: 92,
    badge: "Trending",
    tagline: "Unleash extreme operating leverage with 250+ production-tested mega-prompts for marketing, coding, content cluster writing, and cold outreach.",
    features: [
      "Engineered mega-prompts with strict output style instructions",
      "JSON structure specifications for API calls",
      "Role-playing system configuration copy-pastes",
      "Automation-ready variables optimized for Claude, Gemini, and GPT-4"
    ],
    whatsIncluded: [
      "Access to MD BIPLOB Notion Prompt Hub",
      "Direct copy-paste system code blocks",
      "Step-by-step video instructions for setting up agents",
      "Prompt updates delivered monthly"
    ],
    reviews: [
      { author: "Michael Chang", rating: 5, date: "April 15, 2026", comment: "These are not the typical generic prompts you see online. These are massive system instructions that return stellar, production-ready outputs." }
    ],
    faqs: [
      { q: "Can I use these with the free version of ChatGPT?", a: "Yes! While they perform best on premium models (Gemini Pro, GPT-4, Claude Opus), they are fully compatible with free modern LLM endpoints." }
    ]
  },
  {
    id: "canva-marketing-templates",
    title: "Premium SaaS & Digital Brand Canva Kit",
    category: "Canva Templates",
    price: 39,
    rating: 4.9,
    reviewsCount: 64,
    tagline: "120+ High-end modern social assets, pitch deck templates, and resource lead magnets optimized for conversion, framed in absolute luxury style.",
    features: [
      "Pre-formatted with modern typography & clean negative space layouts",
      "Easily adjustable custom brand colors and logo slots",
      "Optimized for LinkedIn Carousel posts, Instagram posts, and X threads",
      "Includes fully layered high-end digital ebook mockups"
    ],
    whatsIncluded: [
      "Canva Pro Shareable Links for 120+ Assets",
      "Visual Brand Alignment Checklist",
      "Free high-end sans-serif typography pairing list",
      "SaaS pitch deck layout framework"
    ],
    reviews: [
      { author: "Elena Rostova", rating: 5, date: "March 10, 2026", comment: "Elegant, clean, minimal. Perfect for showcasing high-ticket digital consulting services." }
    ],
    faqs: [
      { q: "Do I need a Canva Pro subscription?", a: "No! All elements are selected to work perfectly with a free Canva account, though Canva Pro unlocks advanced editing speed." }
    ]
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: "seo-masterclass",
    title: "SEO Topical Authority Masterclass",
    category: "SEO",
    duration: "18 Hours",
    lessonsCount: 42,
    rating: 4.9,
    price: 199,
    students: 1250,
    tagline: "The definitive blueprint to outranking multi-million dollar corporations using semantic content models and modern entity alignment.",
    curriculum: [
      "Introduction to Modern Entity-Based Search Engines",
      "Architecting the Ultimate Topical Authority Map",
      "Rank Math Pro Setup & Custom Schema Implementations",
      "The Editorial Link Outreach Engine: Cold-Pitching to High DR Blogs",
      "Creating Real-Time Performance & Core Web Vitals Dashboards"
    ]
  },
  {
    id: "ai-marketing-automation",
    title: "AI Automation & No-Code Consulting",
    category: "AI",
    duration: "14 Hours",
    lessonsCount: 30,
    rating: 4.8,
    price: 149,
    students: 840,
    tagline: "Learn how to build, sell, and support advanced automated AI workflows using Make, Zapier, and custom Gemini API nodes.",
    curriculum: [
      "Mapping Complex Business Automations",
      "Leveraging Webhooks and Custom API Payloads",
      "Designing Semantic Vector Search Databases (Pinecone & Supabase)",
      "Selling AI Consultations: Pricing and Retainer Frameworks",
      "Deploying secure client-facing WhatsApp & Slack Assistant bots"
    ]
  },
  {
    id: "wordpress-elementor-mastery",
    title: "WordPress & Elementor Pro High-Converting Web Design",
    category: "WordPress",
    duration: "16 Hours",
    lessonsCount: 35,
    rating: 4.9,
    price: 129,
    students: 2100,
    tagline: "Go from blank canvas to award-winning visual layouts. Learn how to optimize speed, implement custom CSS, and engineer extreme site conversions.",
    curriculum: [
      "UX/UI Principles for Conversion Optimization",
      "Advanced Elementor Pro Theme Builder, Loop Templates & Custom Query Filters",
      "Bypassing Bloat: How to get a 99/100 PageSpeed Rating",
      "Dynamic data integrations using ACF (Advanced Custom Fields)",
      "Launching and Scaling a Freelance High-Ticket Web Agency"
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "project-1",
    title: "Fintech SaaS Organic Scale-up",
    category: "Enterprise SEO",
    client: "CapitalFlow Inc.",
    problem: "The client relied heavily on expensive PPC advertising which drove down margins and offered poor long-term acquisition stability.",
    research: "Analysis of major competitors showed that while they had high backlink profiles, their content structure was extremely thin and did not match specific informational intent.",
    strategy: "Constructed an exhaustive topical authority map containing 120 key informational clusters, pairing each with micro-interactive pricing widgets and Rank Math FAQ schemas.",
    implementation: [
      "Designed clean, responsive SaaS blog layout with fast custom WordPress nodes",
      "Authored 60 high-quality semantic articles with zero AI fluff",
      "Launched systematic high-DR PR editorial links pitch campaign"
    ],
    tools: ["Ahrefs", "Rank Math Pro", "Elementor Pro", "Screaming Frog", "Gemini API Builder"],
    results: [
      "+450% growth in organic traffic within 6 months",
      "Over $35,000 monthly PPC budget saved",
      "Ranked #1 for 18 high-intent fintech search terms"
    ],
    testimonial: {
      author: "Marcus Vance",
      role: "VP of Growth, CapitalFlow",
      content: "MD BIPLOB doesn't just do basic keyword research; he re-architects how your business displays on Google. The organic growth has completely shifted our profitability."
    }
  },
  {
    id: "project-2",
    title: "AI Automated Customer Success Hub",
    category: "AI consulting",
    client: "Nexus Logistics",
    problem: "Nexus was experiencing heavy support backlog volumes, resulting in a 24-hour response average and increased client churn.",
    research: "Determined that 70% of inbound tickets were related to shipping status tracking, simple pricing quotes, and standardized customs document requests.",
    strategy: "Engineered an autonomous AI agent workflow integrating real-time logistics APIs with semantic search vector repositories to answer complex support queries instantly.",
    implementation: [
      "Developed custom Slack and WhatsApp enterprise bot flows",
      "Configured robust fallbacks to live human agents for high-value contracts",
      "Implemented full pipeline dashboard for team audit reviews"
    ],
    tools: ["Make.com", "Vector Databases", "Google Gemini API SDK", "Retool", "Node.js"],
    results: [
      "Response times dropped from 24 hours to less than 15 seconds",
      "78% of support tickets resolved with zero human intervention",
      "Client churn reduced by over 12% in the first quarter"
    ],
    testimonial: {
      author: "Sofia Rodriguez",
      role: "Operations Director, Nexus",
      content: "The custom automation ecosystem built by MD BIPLOB has transformed our customer satisfaction metrics. Our staff is now freed to work on high-ticket sales."
    }
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "case-1",
    title: "Zero to 1.2M Organic Traffic Blueprint",
    metric: "1.2M+",
    metricLabel: "Monthly Organic Visitors",
    challenge: "An e-commerce directory brand struggled with stagnant search traffic due to duplicate category pages and massive technical indexing errors across 45,000 products.",
    audit: "Identified massive crawl budget wastage, severe keyword cannibalization across major parent paths, and missing structured schema tags on search listings.",
    strategy: "Conducted a complete index clean-up, deployed dynamic custom automated JSON-LD schemas, and reconstructed searcher pathways using beautiful, light visual layouts.",
    execution: [
      "Redirected or merged 1,200 thin-content listings to high-authority pillar pages",
      "Injected automated Product Schema structures dynamically",
      "Engineered an automated outreach process to acquire contextually matching mentions"
    ],
    growth: "Within 9 months, monthly organic clicks rose from 14k to 1.24 million, resulting in an additional $180k in monthly product sales revenue.",
    lessons: [
      "Search engines heavily prioritize clean site architecture over raw link volume",
      "Dynamic schema helps Google interpret semantic elements with pristine precision",
      "Mobile page load velocity directly correlates with higher search crawler visits"
    ]
  },
  {
    id: "case-2",
    title: "Re-platforming 100k Course Academy System",
    metric: "4.2X",
    metricLabel: "Increase in Course Enrollment",
    challenge: "A global marketing academy suffered from an outdated, extremely slow LMS platform that resulted in high video buffering complaints and low checkout success.",
    audit: "Discovered that average page load speeds were over 8.5 seconds, and checkout forms contained 14 unnecessary fields, causing a 65% drop-off rate.",
    strategy: "Designed and deployed a stunning, high-fidelity custom WordPress ecosystem running Astra Pro and Tutor LMS with optimized Stripe payment pathways.",
    execution: [
      "Reduced CSS and script footprint by over 80% with custom Elementor assets",
      "Integrated secure global video content delivery network (CDN) streams",
      "Created highly responsive user dashboards with simple gamified progress bars"
    ],
    growth: "Academy loading speeds jumped from 8.5s to 1.1s. Enrollment increased by 420% and student completion rates doubled due to the premium learning dashboard UX.",
    lessons: [
      "LMS conversion relies heavily on eliminating any friction during checkout and onboarding",
      "Video stream delivery must be decoupled from the server host to maintain high speeds",
      "Elegant dark-mode learning options reduce student fatigue and increase engagement"
    ]
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Death of Traditional Keywords: Navigating Google's Semantic Search",
    category: "SEO",
    date: "June 25, 2026",
    readTime: "7 Min Read",
    excerpt: "Why targeting simple high-volume keywords is no longer enough. Learn how search engines use entities, topical clusters, and semantic relationships to determine organic dominance.",
    content: "Google's search algorithm has transformed from a simple keyword matching system into a highly intelligent semantic engine powered by advanced natural language processing. In this deep dive, we break down how to establish topical maps that signal absolute subject authority. We cover setting up relational node structures, mapping high-intent content clusters, and writing for semantic entities rather than simple exact keyword strings.",
    author: "MD BIPLOB"
  },
  {
    id: "blog-2",
    title: "Building a Secure, High-Performance Generative AI Agent with Gemini & Node.js",
    category: "AI",
    date: "June 18, 2026",
    readTime: "9 Min Read",
    excerpt: "Step-by-step developer guide to configuring secure, context-aware AI assistants that connect directly with your company's live APIs without leaking private data.",
    content: "Deploying generative AI inside an enterprise workspace requires robust, production-tested guardrails. In this tutorial, we construct a scalable Node.js server that leverages the official @google/genai SDK. We show you how to structure system instructions to enforce output rules, feed semantic vector databases safely, and integrate instant real-time API tools while maintaining complete SOC2 level customer privacy guidelines.",
    author: "MD BIPLOB"
  },
  {
    id: "blog-3",
    title: "Elementor Speed Blueprint: Achieving a 99/100 Mobile PageSpeed Score",
    category: "WordPress",
    date: "June 05, 2026",
    readTime: "6 Min Read",
    excerpt: "Stop letting slow plugins destroy your Google rankings. These are the advanced performance tweaks, asset rules, and server configurations to make WordPress fast.",
    content: "Slow loading speeds are the #1 killer of digital marketing campaigns. While page builders like Elementor offer extreme visual design flexibility, they can easily cause massive asset bloat if unoptimized. We reveal our internal agency speed optimization playbook, showing you how to defer scripts, eliminate render-blocking elements, serve next-gen AVIF images, and utilize lightweight servers like LiteSpeed to get near-instant mobile loads.",
    author: "MD BIPLOB"
  }
];

export const FREE_RESOURCES_DATA = [
  {
    id: "res-1",
    title: "The Complete 120-Point Technical SEO Audit Checklist",
    desc: "The exact, step-by-step auditing spreadsheet MD BIPLOB uses to diagnose technical crawl errors and keyword drops for global enterprise clients.",
    type: "Audit Template",
    downloads: "4.8k+"
  },
  {
    id: "res-2",
    title: "Enterprise AI Prompt Pack & Agent Blueprints",
    desc: "A highly curated collection of 50+ mega-prompts and custom automation logic structures designed to save you over 15 hours of operations work every week.",
    type: "Prompt Pack",
    downloads: "3.2k+"
  },
  {
    id: "res-3",
    title: "High-Ticket SaaS Consulting Pitch Deck & SOP Library",
    desc: "Ready-to-use Canva templates and client onboarding Standard Operating Procedures that have closed over $500,000 in agency SEO contracts.",
    type: "Canva Template",
    downloads: "2.1k+"
  }
];

export const CLIENT_LOGOS = [
  { name: "Semrush", logo: "📊" },
  { name: "HubSpot", logo: "🎯" },
  { name: "Ahrefs", logo: "🔍" },
  { name: "Notion", logo: "📝" },
  { name: "ClickUp", logo: "⚡" },
  { name: "Astra Theme", logo: "🎨" }
];
