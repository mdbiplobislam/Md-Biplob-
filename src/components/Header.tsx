import React, { useState } from "react";
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Sun, 
  Moon, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  GraduationCap, 
  Sparkles,
  Briefcase,
  BookOpen,
  Store,
  Layers,
  FileText,
  Terminal,
  Info,
  Phone,
  ChevronRight,
  HelpCircle,
  Zap,
  LayoutGrid
} from "lucide-react";
import { Service, Course, Product } from "../data";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  services: Service[];
  courses: Course[];
  products: Product[];
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  magicMode: boolean;
  setMagicMode: (val: boolean) => void;
  cartCount: number;
  setCartOpen: (val: boolean) => void;
  wishlistCount: number;
  setWishlistOpen: (val: boolean) => void;
  isLoggedIn: boolean;
  setLoginModalOpen: (val: boolean) => void;
  onSelectService: (id: string) => void;
}

export function Header({
  activeTab,
  setActiveTab,
  services,
  courses,
  products,
  darkMode,
  setDarkMode,
  magicMode,
  setMagicMode,
  cartCount,
  setCartOpen,
  wishlistCount,
  setWishlistOpen,
  isLoggedIn,
  setLoginModalOpen,
  onSelectService,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleServiceClick = (id: string) => {
    onSelectService(id);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileCategory = (catId: string) => {
    setMobileExpandedCategory(mobileExpandedCategory === catId ? null : catId);
  };

  const navCategories = [
    {
      id: "solutions",
      label: "Solutions & Services",
    },
    {
      id: "academy_shop",
      label: "Academy & Shop",
    },
    {
      id: "resources_tools",
      label: "Resources & Tools",
    },
    {
      id: "company",
      label: "Company",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-150 dark:border-slate-800 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          id="brand-logo-container"
          onClick={() => { setActiveTab("home"); setActiveDropdown(null); setMobileMenuOpen(false); }} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-secondary via-brand-accent to-brand-gold p-[2px] shadow-sm transform group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-display font-extrabold text-sm tracking-tighter text-white">
              MB
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base leading-tight tracking-tight text-slate-900 dark:text-white group-hover:text-brand-secondary transition-colors">
              MD BIPLOB
            </span>
            <span className="text-[9px] text-slate-500 font-mono tracking-widest font-bold">
              DIGITAL LEVERAGE
            </span>
          </div>
        </div>

        {/* Desktop Mega Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5" id="desktop-main-navigation">
          {/* Direct Home Link */}
          <button
            id="nav-link-home"
            onClick={() => { setActiveTab("home"); setActiveDropdown(null); }}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "home" 
                ? "text-brand-secondary bg-blue-500/5 dark:bg-blue-500/10" 
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            Home
          </button>

          {/* Mega Dropdown Categories */}
          {navCategories.map((cat) => {
            const isOpen = activeDropdown === cat.id;
            const isTabActive = 
              (cat.id === "solutions" && (activeTab === "services" || activeTab === "portfolio" || activeTab === "casestudies")) ||
              (cat.id === "academy_shop" && (activeTab === "academy" || activeTab === "shop" || activeTab === "dashboard")) ||
              (cat.id === "resources_tools" && (activeTab === "tools" || activeTab === "freeresources" || activeTab === "blog")) ||
              (cat.id === "company" && (activeTab === "about" || activeTab === "contact" || activeTab === "legal"));

            return (
              <div 
                key={cat.id} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  id={`nav-trigger-${cat.id}`}
                  onClick={() => {
                    setActiveDropdown(isOpen ? null : cat.id);
                  }}
                  className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                    isTabActive 
                      ? "text-brand-secondary bg-blue-500/5 dark:bg-blue-500/10 font-extrabold" 
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span>{cat.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${isOpen ? "rotate-180 text-brand-secondary" : "text-slate-400"}`} />
                </button>

                {/* Desktop Mega Menu Box */}
                {isOpen && (
                  <div 
                    id={`megamenu-panel-${cat.id}`}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[880px] bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-3xl shadow-2xl p-8 grid grid-cols-12 gap-8 animate-fade-in z-50 text-left"
                  >
                    {/* Render Solutions & Services */}
                    {cat.id === "solutions" && (
                      <>
                        {/* Col 1: Agency services */}
                        <div className="col-span-5 space-y-4">
                          <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5 font-mono border-b border-slate-100 dark:border-slate-900 pb-1.5">
                            <Cpu className="w-3.5 h-3.5 text-brand-secondary" /> Client Growth Solutions
                          </h4>
                          <div className="grid grid-cols-1 gap-2.5">
                            {services.map((svc) => (
                              <div
                                key={svc.id}
                                id={`megamenu-svc-${svc.id}`}
                                onClick={() => handleServiceClick(svc.id)}
                                className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                              >
                                <div className="flex items-center gap-2">
                                  {svc.id === "seo-agency" ? (
                                    <Search className="w-4 h-4 text-brand-secondary group-hover:scale-110 transition-transform" />
                                  ) : (
                                    <Cpu className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                                  )}
                                  <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-secondary transition-colors">
                                    {svc.title}
                                  </span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-secondary" />
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                                  {svc.tagline}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Col 2: Case studies & Portfolio */}
                        <div className="col-span-3 space-y-4 border-l border-slate-100 dark:border-slate-900 pl-6">
                          <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5 font-mono border-b border-slate-100 dark:border-slate-900 pb-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-brand-accent" /> Results & Work
                          </h4>
                          <div className="space-y-3">
                            <div 
                              id="megamenu-link-casestudies"
                              onClick={() => { setActiveTab("casestudies"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-accent flex items-center gap-1">
                                Case Study Dossiers
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Step-by-step breakdowns of direct pipeline growth.
                              </p>
                            </div>

                            <div 
                              id="megamenu-link-portfolio"
                              onClick={() => { setActiveTab("portfolio"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-accent flex items-center gap-1">
                                Client Work Gallery
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                High-performance live builds and Elementor templates.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Col 3: Consultation promo box */}
                        <div className="col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-2xl flex flex-col justify-between shadow-md">
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono self-start inline-block">
                              Free Strategic Audit
                            </span>
                            <h5 className="font-display font-extrabold text-sm mt-1 text-white leading-snug">
                              Enterprise Search & SEO Integrity Check
                            </h5>
                            <p className="text-[10.5px] text-blue-100 leading-relaxed">
                              Get an expert manual crawl analysis of your organic ranking hurdles and conversion pipelines.
                            </p>
                          </div>
                          <button
                            id="megamenu-audit-btn"
                            onClick={() => { setActiveTab("contact"); setActiveDropdown(null); }}
                            className="mt-4 w-full py-2 bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <span>Schedule Consultation</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}

                    {/* Render Academy & Shop */}
                    {cat.id === "academy_shop" && (
                      <>
                        {/* Col 1: Learning tracks */}
                        <div className="col-span-5 space-y-4">
                          <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5 font-mono border-b border-slate-100 dark:border-slate-900 pb-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-brand-secondary" /> flagship Mentor Academy
                          </h4>
                          <div className="grid grid-cols-1 gap-2.5">
                            {courses.map((course) => (
                              <div
                                key={course.id}
                                id={`megamenu-course-${course.id}`}
                                onClick={() => { setActiveTab("academy"); setActiveDropdown(null); }}
                                className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                              >
                                <div className="flex items-center gap-2">
                                  <GraduationCap className="w-4 h-4 text-brand-gold group-hover:rotate-12 transition-transform" />
                                  <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-secondary transition-colors">
                                    {course.title}
                                  </span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-secondary" />
                                </div>
                                <div className="flex gap-3 text-[9.5px] text-slate-400 mt-1 font-mono">
                                  <span>Duration: {course.duration}</span>
                                  <span>•</span>
                                  <span>{course.lessonsCount} Core Modules</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Col 2: Digital Store */}
                        <div className="col-span-3 space-y-4 border-l border-slate-100 dark:border-slate-900 pl-6">
                          <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5 font-mono border-b border-slate-100 dark:border-slate-900 pb-1.5">
                            <Store className="w-3.5 h-3.5 text-brand-accent" /> Premium Asset Store
                          </h4>
                          <div className="space-y-3">
                            <div 
                              id="megamenu-link-shop-all"
                              onClick={() => { setActiveTab("shop"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-accent flex items-center gap-1">
                                Checklists & SOP Kits
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Standard operating spreadsheets for operational scales.
                              </p>
                            </div>

                            <div 
                              id="megamenu-link-layouts"
                              onClick={() => { setActiveTab("shop"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-accent flex items-center gap-1">
                                Elementor & Astra Assets
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                High-speed compatible pre-built layout assets.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Col 3: Student promo box */}
                        <div className="col-span-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 rounded-2xl flex flex-col justify-between shadow-md">
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono self-start inline-block">
                              Client & Student Hub
                            </span>
                            <h5 className="font-display font-extrabold text-sm mt-1 text-white leading-snug">
                              Secure Member Workspace Node
                            </h5>
                            <p className="text-[10.5px] text-amber-50 leading-relaxed">
                              Sign in to monitor your customized learning tracks, fetch premium deliverables, and tap priority private Slack.
                            </p>
                          </div>
                          <button
                            id="megamenu-student-login-btn"
                            onClick={() => { 
                              setActiveDropdown(null);
                              if (isLoggedIn) {
                                setActiveTab("dashboard");
                              } else {
                                setLoginModalOpen(true);
                              }
                            }}
                            className="mt-4 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <User className="w-4 h-4 text-brand-gold" />
                            <span>{isLoggedIn ? "Go to Dashboard" : "Access Portal Node"}</span>
                          </button>
                        </div>
                      </>
                    )}

                    {/* Render Resources & Tools */}
                    {cat.id === "resources_tools" && (
                      <>
                        {/* Col 1: Playgrounds */}
                        <div className="col-span-5 space-y-4">
                          <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5 font-mono border-b border-slate-100 dark:border-slate-900 pb-1.5">
                            <Terminal className="w-3.5 h-3.5 text-brand-secondary" /> SEO & AI Playgrounds
                          </h4>
                          <div className="grid grid-cols-1 gap-2.5">
                            <div
                              id="megamenu-tool-auditor"
                              onClick={() => { setActiveTab("tools"); setActiveDropdown(null); }}
                              className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                            >
                              <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-secondary transition-colors block">
                                Core Web Vitals Auditor
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Analyze client-side speed scores and metadata schemas.
                              </p>
                            </div>

                            <div
                              id="megamenu-tool-transformer"
                              onClick={() => { setActiveTab("tools"); setActiveDropdown(null); }}
                              className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                            >
                              <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-secondary transition-colors block">
                                Prompt Engineering Canvas
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Refine autonomous instruction sets with schema validations.
                              </p>
                            </div>

                            <div
                              id="megamenu-tool-intent"
                              onClick={() => { setActiveTab("tools"); setActiveDropdown(null); }}
                              className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                            >
                              <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-secondary transition-colors block">
                                Search Intent Metric Tracker
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Evaluate semantic entity difficulty scores for keyword roots.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Col 2: Free Knowledge */}
                        <div className="col-span-3 space-y-4 border-l border-slate-100 dark:border-slate-900 pl-6">
                          <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5 font-mono border-b border-slate-100 dark:border-slate-900 pb-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-brand-accent" /> Knowledge Hub
                          </h4>
                          <div className="space-y-3">
                            <div 
                              id="megamenu-link-free"
                              onClick={() => { setActiveTab("freeresources"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-accent flex items-center gap-1">
                                Free Lead Magnets
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Instant downloads of structural search cheatsheets.
                              </p>
                            </div>

                            <div 
                              id="megamenu-link-blog"
                              onClick={() => { setActiveTab("blog"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-accent flex items-center gap-1">
                                Insiders Technical Blog
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Expert breakdowns of AI automation and ranking loops.
                              </p>
                            </div>

                            <div 
                              id="megamenu-link-drive"
                              onClick={() => { setActiveTab("drive"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-secondary flex items-center gap-1">
                                ✨ Enchanted Drive Vault
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Securely link Google Drive to store and deploy your audits.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Col 3: Insights Promo box */}
                        <div className="col-span-4 bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-5 rounded-2xl flex flex-col justify-between shadow-md">
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono self-start inline-block">
                              Special Release Guide
                            </span>
                            <h5 className="font-display font-extrabold text-sm mt-1 text-white leading-snug">
                              Vector Databases & Semantic Search AI
                            </h5>
                            <p className="text-[10.5px] text-purple-100 leading-relaxed">
                              Learn how to design context-grounded AI pipelines using node architecture frameworks for your brand.
                            </p>
                          </div>
                          <button
                            id="megamenu-read-blog-btn"
                            onClick={() => { setActiveTab("blog"); setActiveDropdown(null); }}
                            className="mt-4 w-full py-2 bg-white hover:bg-purple-50 text-purple-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <span>Read Journal Post</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}

                    {/* Render Company & Story */}
                    {cat.id === "company" && (
                      <>
                        {/* Col 1: About Biplob */}
                        <div className="col-span-5 space-y-4">
                          <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5 font-mono border-b border-slate-100 dark:border-slate-900 pb-1.5">
                            <Info className="w-3.5 h-3.5 text-brand-secondary" /> Brand Story & Journey
                          </h4>
                          <div 
                            id="megamenu-about-block"
                            onClick={() => { setActiveTab("about"); setActiveDropdown(null); }}
                            className="p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-pointer group transition-all"
                          >
                            <span className="font-display font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-brand-secondary transition-colors block">
                              Who is MD BIPLOB?
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                              An AI-Driven Growth Architect specializing in organic search positioning, custom pipeline integrations, and high-converting WordPress design assets. Learn about the complete agency history and milestones.
                            </p>
                            <span className="text-[10.5px] text-brand-secondary font-bold mt-3 inline-flex items-center gap-1 group-hover:underline">
                              Read timeline biography
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>

                        {/* Col 2: Connect & Legal */}
                        <div className="col-span-3 space-y-4 border-l border-slate-100 dark:border-slate-900 pl-6">
                          <h4 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5 font-mono border-b border-slate-100 dark:border-slate-900 pb-1.5">
                            <Phone className="w-3.5 h-3.5 text-brand-accent" /> Connect & Legal
                          </h4>
                          <div className="space-y-3">
                            <div 
                              id="megamenu-link-contact"
                              onClick={() => { setActiveTab("contact"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-accent flex items-center gap-1">
                                Strategic Call Booking
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Secure a private 1-on-1 strategy call with Biplob.
                              </p>
                            </div>

                            <div 
                              id="megamenu-link-legal"
                              onClick={() => { setActiveTab("legal"); setActiveDropdown(null); }}
                              className="group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all"
                            >
                              <span className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-brand-accent flex items-center gap-1">
                                Terms & Compliance
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </span>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Review corporate terms of service and GDRP compliance rules.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Col 3: Action box */}
                        <div className="col-span-4 bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-5 rounded-2xl flex flex-col justify-between shadow-md">
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono self-start inline-block">
                              Partnership Node
                            </span>
                            <h5 className="font-display font-extrabold text-sm mt-1 text-white leading-snug">
                              Scale Your Pipeline Revenue
                            </h5>
                            <p className="text-[10.5px] text-emerald-100 leading-relaxed">
                              Integrate real technical search models, custom CRM pipelines, and clean landing frames with zero operating loss.
                            </p>
                          </div>
                          <button
                            id="megamenu-partner-contact-btn"
                            onClick={() => { setActiveTab("contact"); setActiveDropdown(null); }}
                            className="mt-4 w-full py-2 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <span>Get In Touch Today</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Global Controls & Theme */}
        <div className="flex items-center gap-2 sm:gap-3" id="global-header-controls">
          {/* Search Toggle */}
          <button
            id="control-search-toggle"
            onClick={() => setGlobalSearchOpen(!globalSearchOpen)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Theme Toggler */}
          <button
            id="control-theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Magic Theme Toggler */}
          <button
            id="control-magic-toggle"
            onClick={() => setMagicMode(!magicMode)}
            className={`p-2 rounded-lg transition-all relative group cursor-pointer ${
              magicMode 
                ? "text-purple-500 hover:text-purple-400 bg-purple-500/10 shadow-[0_0_12px_rgba(139,92,246,0.3)] border border-purple-500/30" 
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            aria-label="Toggle magic"
            title={magicMode ? "Disenchant Website" : "Enchant Website (Cast Spell!)"}
          >
            <Sparkles className={`w-4.5 h-4.5 ${magicMode ? "text-amber-400 glow-purple" : "group-hover:animate-pulse"}`} />
            {magicMode && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
            )}
          </button>

          {/* Wishlist Indicator */}
          <button
            id="control-wishlist"
            onClick={() => setWishlistOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-brand-accent animate-ping" />
            )}
          </button>

          {/* Cart Icon */}
          <button
            id="control-cart"
            onClick={() => setCartOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-secondary text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-up">
                {cartCount}
              </span>
            )}
          </button>

          {/* Member Login Button */}
          <button
            id="control-login-dashboard"
            onClick={() => {
              if (isLoggedIn) {
                setActiveTab("dashboard");
              } else {
                setLoginModalOpen(true);
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
          >
            <User className="w-4 h-4 text-brand-secondary" />
            <span>{isLoggedIn ? "Dashboard" : "Client Login"}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="control-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brand-secondary" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Global Search Overlay Panel */}
      {globalSearchOpen && (
        <div id="search-overlay-panel" className="absolute top-16 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 shadow-lg animate-slide-down z-50">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search across courses, toolkits, case studies, or blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-sm text-slate-900 dark:text-white focus:outline-none placeholder-slate-400"
              autoFocus
            />
            {searchQuery && (
              <button 
                id="search-clear-btn"
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                Clear
              </button>
            )}
            <button
              id="search-submit-btn"
              onClick={() => {
                setGlobalSearchOpen(false);
                if (searchQuery.trim()) {
                  setActiveTab("shop");
                }
              }}
              className="px-3 py-1.5 bg-brand-secondary text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Search
            </button>
            <button
              id="search-close-btn"
              onClick={() => { setGlobalSearchOpen(false); setSearchQuery(""); }}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Accordion Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-drawer-navigation" className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-3 shadow-inner max-h-[calc(100vh-4rem)] overflow-y-auto animate-fade-in">
          
          {/* Direct Home Link */}
          <button
            id="mobile-nav-home"
            onClick={() => {
              setActiveTab("home");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
              activeTab === "home" 
                ? "text-brand-secondary bg-blue-500/5 dark:bg-blue-500/10" 
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            <span>Home Page</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-secondary" />
          </button>

          {/* Solutions & Services Accordion */}
          <div className="border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden">
            <button
              id="mobile-accordion-solutions"
              onClick={() => toggleMobileCategory("solutions")}
              className={`w-full text-left px-4 py-3 text-xs font-bold transition-all flex items-center justify-between ${
                mobileExpandedCategory === "solutions" 
                  ? "bg-slate-50 dark:bg-slate-900 text-brand-secondary" 
                  : "text-slate-800 dark:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-brand-secondary" /> Solutions & Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedCategory === "solutions" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpandedCategory === "solutions" && (
              <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 space-y-1.5 border-t border-slate-100 dark:border-slate-900">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    id={`mobile-sublink-${svc.id}`}
                    onClick={() => handleServiceClick(svc.id)}
                    className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                  >
                    <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">{svc.title}</span>
                    <span className="text-[9.5px] text-slate-400 mt-0.5 line-clamp-1">{svc.tagline}</span>
                  </button>
                ))}
                <button
                  id="mobile-sublink-casestudies"
                  onClick={() => { setActiveTab("casestudies"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                >
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-brand-accent" /> Case Study Dossiers
                  </span>
                </button>
                <button
                  id="mobile-sublink-portfolio"
                  onClick={() => { setActiveTab("portfolio"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                >
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-brand-accent" /> Client Work Gallery
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Academy & Shop Accordion */}
          <div className="border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden">
            <button
              id="mobile-accordion-academy-shop"
              onClick={() => toggleMobileCategory("academy_shop")}
              className={`w-full text-left px-4 py-3 text-xs font-bold transition-all flex items-center justify-between ${
                mobileExpandedCategory === "academy_shop" 
                  ? "bg-slate-50 dark:bg-slate-900 text-brand-secondary" 
                  : "text-slate-800 dark:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-brand-secondary" /> Academy & Shop</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedCategory === "academy_shop" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpandedCategory === "academy_shop" && (
              <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 space-y-1.5 border-t border-slate-100 dark:border-slate-900">
                <div className="px-4 py-1.5 text-[9px] uppercase tracking-widest font-extrabold text-slate-400 font-mono">flagship Masterclasses</div>
                {courses.map((course) => (
                  <button
                    key={course.id}
                    id={`mobile-sublink-course-${course.id}`}
                    onClick={() => { setActiveTab("academy"); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                  >
                    <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">{course.title}</span>
                    <span className="text-[9.5px] text-slate-400 mt-0.5">{course.lessonsCount} Core Syllabus Lessons</span>
                  </button>
                ))}
                <div className="px-4 py-1.5 text-[9px] uppercase tracking-widest font-extrabold text-slate-400 font-mono mt-2">Digital Store Assets</div>
                <button
                  id="mobile-sublink-shop-checklists"
                  onClick={() => { setActiveTab("shop"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-brand-accent" />
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">SOP Checklists & Templates</span>
                </button>
                <button
                  id="mobile-sublink-shop-layouts"
                  onClick={() => { setActiveTab("shop"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-brand-accent" />
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Elementor compatible packs</span>
                </button>
              </div>
            )}
          </div>

          {/* Resources & Tools Accordion */}
          <div className="border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden">
            <button
              id="mobile-accordion-resources-tools"
              onClick={() => toggleMobileCategory("resources_tools")}
              className={`w-full text-left px-4 py-3 text-xs font-bold transition-all flex items-center justify-between ${
                mobileExpandedCategory === "resources_tools" 
                  ? "bg-slate-50 dark:bg-slate-900 text-brand-secondary" 
                  : "text-slate-800 dark:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-brand-secondary" /> Resources & Tools</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedCategory === "resources_tools" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpandedCategory === "resources_tools" && (
              <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 space-y-1.5 border-t border-slate-100 dark:border-slate-900">
                <div className="px-4 py-1.5 text-[9px] uppercase tracking-widest font-extrabold text-slate-400 font-mono">Interactive Playgrounds</div>
                <button
                  id="mobile-sublink-tool-auditor"
                  onClick={() => { setActiveTab("tools"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                >
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Core Web Vitals Auditor</span>
                  <span className="text-[9.5px] text-slate-400 mt-0.5">Check speed and on-page integrity.</span>
                </button>
                <button
                  id="mobile-sublink-tool-transformer"
                  onClick={() => { setActiveTab("tools"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                >
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Prompt Engineering Canvas</span>
                  <span className="text-[9.5px] text-slate-400 mt-0.5">Test system prompts and variables.</span>
                </button>
                <div className="px-4 py-1.5 text-[9px] uppercase tracking-widest font-extrabold text-slate-400 font-mono mt-2">Knowledge Archives</div>
                <button
                  id="mobile-sublink-freeresources"
                  onClick={() => { setActiveTab("freeresources"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-brand-accent" />
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Free Download Checklists</span>
                </button>
                <button
                  id="mobile-sublink-blog-insiders"
                  onClick={() => { setActiveTab("blog"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-brand-accent" />
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Authoritative Insights Blog</span>
                </button>
                <button
                  id="mobile-sublink-drive-vault"
                  onClick={() => { setActiveTab("drive"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center gap-1.5"
                >
                  <span className="text-purple-500">✨</span>
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Enchanted Drive Vault</span>
                </button>
              </div>
            )}
          </div>

          {/* Company Accordion */}
          <div className="border border-slate-100 dark:border-slate-900 rounded-2xl overflow-hidden">
            <button
              id="mobile-accordion-company"
              onClick={() => toggleMobileCategory("company")}
              className={`w-full text-left px-4 py-3 text-xs font-bold transition-all flex items-center justify-between ${
                mobileExpandedCategory === "company" 
                  ? "bg-slate-50 dark:bg-slate-900 text-brand-secondary" 
                  : "text-slate-800 dark:text-slate-200"
              }`}
            >
              <span className="flex items-center gap-2"><Info className="w-4 h-4 text-brand-secondary" /> Company & Connect</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedCategory === "company" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpandedCategory === "company" && (
              <div className="bg-slate-50/50 dark:bg-slate-900/40 p-3 space-y-1.5 border-t border-slate-100 dark:border-slate-900">
                <button
                  id="mobile-sublink-about"
                  onClick={() => { setActiveTab("about"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                >
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Our Story Biography</span>
                  <span className="text-[9.5px] text-slate-400 mt-0.5">Biplob's journey and timeline highlights.</span>
                </button>
                <button
                  id="mobile-sublink-contact"
                  onClick={() => { setActiveTab("contact"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                >
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Book Strategy Consultation</span>
                  <span className="text-[9.5px] text-slate-400 mt-0.5">Secure a private 1-on-1 strategy audit.</span>
                </button>
                <button
                  id="mobile-sublink-legal"
                  onClick={() => { setActiveTab("legal"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all flex flex-col"
                >
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200">Compliance & Policies</span>
                  <span className="text-[9.5px] text-slate-400 mt-0.5">Review terms of service and GDPR compliance.</span>
                </button>
              </div>
            )}
          </div>

          {/* Member Portal Button in Mobile drawer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              id="mobile-nav-portal-login"
              onClick={() => {
                setMobileMenuOpen(false);
                if (isLoggedIn) {
                  setActiveTab("dashboard");
                } else {
                  setLoginModalOpen(true);
                }
              }}
              className="w-full py-3 bg-brand-primary dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <User className="w-4 h-4 text-brand-secondary" />
              <span>{isLoggedIn ? "Go to Dashboard Hub" : "Client Portal Login"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
