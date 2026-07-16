import React from "react";
import { ArrowRight, Search, Cpu, Globe, GraduationCap, Sparkles, Star, Quote, ArrowUpRight, ShieldCheck, Mail, CheckCircle } from "lucide-react";
import { Service, Course, Product, BlogPost, Project, CLIENT_LOGOS } from "../data";

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setSelectedServiceId: (id: string | null) => void;
  setSelectedProductId: (id: string | null) => void;
  setSelectedProjectId: (id: string | null) => void;
  services: Service[];
  courses: Course[];
  products: Product[];
  blogs: BlogPost[];
  projects: Project[];
  onAddToCart: (prod: Product) => void;
  onAddToWishlist: (prod: Product) => void;
}

export function HomeView({
  setActiveTab,
  setSelectedServiceId,
  setSelectedProductId,
  setSelectedProjectId,
  services,
  courses,
  products,
  blogs,
  projects,
  onAddToCart,
  onAddToWishlist,
}: HomeViewProps) {
  const stats = [
    { value: "1,000+", label: "Students Trained" },
    { value: "2,000+", label: "Projects Completed" },
    { value: "10+", label: "Years Experience" },
    { value: "100+", label: "Enterprise Clients" },
  ];

  return (
    <div className="space-y-24 pb-20 animate-fade-in">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_50%)]" />
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-brand-secondary text-xs font-semibold tracking-wide uppercase border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Ecosystem Builder & Strategy Architect</span>
              </div>
              
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Helping Businesses & Professionals Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-gold">Digital Authority</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Deploying enterprise-grade SEO frameworks, autonomous AI processes, and conversion-first custom WordPress systems that transform raw attention into recurring pipelines.
              </p>

              {/* Action Buttons Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <button
                  onClick={() => setActiveTab("contact")}
                  className="w-full px-6 py-3.5 bg-brand-primary dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer border border-transparent"
                >
                  Book Private Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab("academy")}
                  className="w-full px-6 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-semibold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Academy Courses
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab("freeresources")}
                  className="w-full px-6 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-semibold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Download Free Checklists
                </button>
                <button
                  onClick={() => setActiveTab("shop")}
                  className="w-full px-6 py-3.5 bg-blue-500/5 hover:bg-blue-500/10 text-brand-secondary border border-blue-500/20 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Browse Strategy Toolkits
                </button>
              </div>
            </div>

            {/* Right Visual Graphic Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[3/4] bg-gradient-to-tr from-brand-primary via-slate-800 to-slate-950 rounded-2xl p-0.5 shadow-2xl overflow-hidden group">
                {/* Dynamic grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Avatar Initial Art */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent flex items-center justify-center text-3xl font-black text-white shadow-xl animate-pulse">
                    MB
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-white">MD BIPLOB</h3>
                    <p className="text-[10px] text-brand-accent uppercase tracking-widest font-mono font-bold">SEO & AI Strategist</p>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs">
                    "We do not build generic pages. We craft revenue models that rank, scale, and automate digital authority."
                  </p>
                  <div className="flex gap-1.5 pt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                </div>

                {/* Floating Micro tags */}
                <div className="absolute top-4 left-4 glass-effect px-2.5 py-1 rounded-lg text-[9px] font-mono text-slate-800 dark:text-slate-200 font-bold shadow-sm flex items-center gap-1.5 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  99+ Core Web Vitals
                </div>
                <div className="absolute bottom-4 right-4 glass-effect px-2.5 py-1 rounded-lg text-[9px] font-mono text-slate-800 dark:text-slate-200 font-bold shadow-sm flex items-center gap-1.5 border border-white/20">
                  🚀 10X Search ROI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Metrics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Rolling Logo Track */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
          Ecosystem Integrations & Endorsed Frameworks
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
          {CLIENT_LOGOS.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-semibold text-sm">
              <span className="text-lg">{logo.logo}</span>
              <span className="font-display tracking-tight font-medium">{logo.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] uppercase font-bold text-brand-secondary tracking-widest font-mono bg-blue-500/5 px-3 py-1 rounded-full">
            Our Specialties
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Enterprise Digital Growth Capabilities
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            We operate at the convergence of advanced keyword targeting, custom machine-learning automations, and bespoke structural coding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-brand-secondary">
                  {svc.id === "seo-agency" ? (
                    <Search className="w-6 h-6" />
                  ) : svc.id === "ai-consulting" ? (
                    <Cpu className="w-6 h-6" />
                  ) : (
                    <Globe className="w-6 h-6" />
                  )}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {svc.tagline}
                </p>
                <div className="space-y-2 pt-2">
                  {svc.benefits.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedServiceId(svc.id);
                  setActiveTab("services");
                }}
                className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Explore Landing Page
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest font-mono bg-teal-500/5 px-3 py-1 rounded-full">
              Premium Store
            </span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
              Instant-Download Digital Strategy Toolkits
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Stop guessing. Unlock immediate operational growth with MD BIPLOB's field-tested worksheets and prompts.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("shop")}
            className="px-5 py-2.5 bg-brand-primary dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:opacity-90"
          >
            Explore Full Store
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {prod.category}
                  </span>
                  {prod.badge && (
                    <span className="text-[9px] font-bold uppercase bg-brand-gold/10 text-amber-600 px-2.5 py-0.5 rounded-full">
                      {prod.badge}
                    </span>
                  )}
                </div>
                <h3 
                  onClick={() => { setSelectedProductId(prod.id); setActiveTab("shop"); }}
                  className="font-display font-bold text-base text-slate-900 dark:text-white hover:text-brand-secondary transition-colors cursor-pointer"
                >
                  {prod.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                  {prod.tagline}
                </p>
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">({prod.reviewsCount})</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">One-Time Download</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">${prod.price}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onAddToWishlist(prod)}
                    className="p-2 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                    aria-label="Add to Wishlist"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="px-3.5 py-2 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Academy Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest font-mono bg-amber-500/5 px-3 py-1 rounded-full">
            Online Academy
          </span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
            Master Premium Skills Online
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Learn exact, enterprise-grade strategies from a professional with 10+ years of agency execution experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {course.category} Track
                  </span>
                  <span className="text-xs font-bold text-brand-secondary font-mono">${course.price}</span>
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {course.tagline}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                  <span>⏱️ {course.duration}</span>
                  <span>📚 {course.lessonsCount} Modules</span>
                  <span>🧑‍🎓 {course.students}+ Students</span>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setActiveTab("academy")}
                  className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  View Curriculum & Enroll
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Client Success & Project Spotlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-[10px] uppercase font-bold text-brand-secondary tracking-widest font-mono bg-blue-500/5 px-3 py-1 rounded-full">
              Case Spotlights
            </span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
              Real Impact, Verifiable Authority
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Examine deep insights from our portfolio. We build results, not promises.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("portfolio")}
            className="px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
          >
            Explore Case Files
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    Client: {proj.client}
                  </span>
                  <span className="text-[10px] font-mono text-brand-secondary bg-blue-500/10 px-2 py-0.5 rounded-full font-bold uppercase">
                    {proj.category}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">
                  {proj.title}
                </h3>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">The Impact</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {proj.results.map((res, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-l-2 border-brand-accent pl-4 py-1 italic text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  "{proj.testimonial.content}"
                  <span className="block mt-1 text-[10px] font-bold text-slate-500 not-italic uppercase font-mono">
                    — {proj.testimonial.author}, {proj.testimonial.role}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedProjectId(proj.id);
                    setActiveTab("portfolio");
                  }}
                  className="text-xs font-semibold text-brand-secondary hover:underline cursor-pointer flex items-center gap-1"
                >
                  Read full breakdown
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Latest Insights & Technical Journal (Blog Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-[10px] uppercase font-bold text-brand-secondary tracking-widest font-mono bg-blue-500/5 px-3 py-1 rounded-full">
              Authority Journal
            </span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
              Latest Insights & Strategy Playbooks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Unpacking advanced search engines, automatic workflows, and conversion architecture. Written directly by MD BIPLOB.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab("blog");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-5 py-2.5 bg-brand-primary dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-all shadow-sm"
          >
            Explore All Guides
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span className="font-bold text-brand-secondary uppercase tracking-wider">{post.category}</span>
                  <span>⏱️ {post.readTime}</span>
                </div>

                <h3
                  onClick={() => {
                    setActiveTab("blog");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="font-display font-extrabold text-base text-slate-900 dark:text-white hover:text-brand-secondary cursor-pointer transition-colors leading-snug line-clamp-2"
                >
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-850 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400 font-mono">
                  {post.date}
                </span>
                <button
                  onClick={() => {
                    setActiveTab("blog");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-brand-secondary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Read Guide
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. Conversion Newsletter Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 md:p-12 text-center md:text-left relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-accent/5 rounded-full blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[9px] font-mono uppercase tracking-widest font-extrabold px-3 py-1 bg-brand-secondary/30 text-blue-300 rounded-full">
                Join 10k+ Decision Makers
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Get the Private Organic Authority Newsletter
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                Weekly masterclass emails covering SEO entity mapping, automated agent flows, and technical audit breakdowns. No fluff. Strictly data.
              </p>
            </div>

            <div className="lg:col-span-5 w-full">
              <form 
                onSubmit={(e) => { e.preventDefault(); alert("Successfully joined the MD BIPLOB VIP Newsletter network!"); }} 
                className="flex flex-col sm:flex-row gap-2.5"
              >
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-slate-800/80 text-white border border-slate-700 placeholder-slate-400 focus:outline-none focus:border-brand-accent"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer whitespace-nowrap transition-colors"
                >
                  Join VIP Access
                </button>
              </form>
              <p className="text-[10px] text-slate-500 mt-2 text-center md:text-left">
                🔒 Privacy guaranteed. Unsubscribe with 1 click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final Strategic CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-10">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
          Ready to scale your digital presence?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Secure your private 45-minute growth review where we audit your organic pipeline, review technical schema opportunities, and map high-leverage workflows.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab("contact")}
            className="px-8 py-3.5 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Claim 45-Min Growth Audit
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className="px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Try Our Free SEO Tools
          </button>
        </div>
      </section>
    </div>
  );
}
