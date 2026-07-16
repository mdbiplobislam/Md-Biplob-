import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomeView } from "./components/HomeView";
import { AboutView } from "./components/AboutView";
import { ServicesView } from "./components/ServicesView";
import { AcademyView } from "./components/AcademyView";
import { ShopView } from "./components/ShopView";
import { InteractiveTools } from "./components/InteractiveTools";
import { DriveVaultView } from "./components/DriveVaultView";
import { BlogView, PortfolioView, CaseStudiesView, FreeResourcesView, ContactView, LegalView } from "./components/SecondaryViews";
import { CartSlideout, WishlistSlideout, LoginModal } from "./components/ModalsAndSlideouts";
import { MagicalBackground } from "./components/MagicalBackground";
import { SERVICES_DATA, COURSES_DATA, PRODUCTS_DATA, BLOG_POSTS_DATA, PROJECTS_DATA, CASE_STUDIES_DATA, Product, Course } from "./data";
import { GraduationCap, Award, ShieldCheck, Mail, ArrowRight, Download, BookOpen, Clock, Heart, ShoppingBag, User } from "lucide-react";

export default function App() {
  // Global View / Navigation States
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // E-Commerce Cart & Wishlist States
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Theme & Magical Theme Toggling States
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [magicMode, setMagicMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("mdb_magic_mode");
    return stored === null ? true : stored === "true"; // Defaults to true for maximum magical impact!
  });

  // Auth / Member State
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Course progress tracking simulation
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({
    "seo-masterclass": 80,
    "ai-marketing-automation": 100,
    "wordpress-elementor-mastery": 20,
  });

  // Dark Mode application
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Magic Mode application
  useEffect(() => {
    localStorage.setItem("mdb_magic_mode", String(magicMode));
    if (magicMode) {
      document.body.classList.add("magic-mode");
    } else {
      document.body.classList.remove("magic-mode");
    }
  }, [magicMode]);

  // E-Commerce Helper Handlers
  const handleAddToCart = (prod: Product) => {
    if (cartItems.find((item) => item.id === prod.id)) {
      alert(`"${prod.title}" is already in your cart.`);
      setCartOpen(true);
      return;
    }
    setCartItems([...cartItems, prod]);
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddToWishlist = (prod: Product) => {
    if (wishlistItems.find((item) => item.id === prod.id)) {
      alert(`"${prod.title}" is already in your wishlist.`);
      setWishlistOpen(true);
      return;
    }
    setWishlistItems([...wishlistItems, prod]);
    setWishlistOpen(true);
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (prod: Product) => {
    handleAddToCart(prod);
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setActiveTab("dashboard");
    alert(`Welcome back to MD BIPLOB Member Hub, ${email}!`);
  };

  const handleSelectServiceFromHeader = (id: string) => {
    setSelectedServiceId(id);
    setActiveTab("services");
  };

  const handleUpdateCourseProgress = (courseId: string, percentage: number) => {
    setCourseProgress({
      ...courseProgress,
      [courseId]: percentage
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors font-sans antialiased selection:bg-brand-secondary selection:text-white relative">
      {/* Magical Canvas Starry Constellation Backdrop */}
      <MagicalBackground magicMode={magicMode} />

      {/* Sticky Header Navigation bar with Mega Menu & state controls */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Auto scroll to top on tab changes
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        services={SERVICES_DATA}
        courses={COURSES_DATA}
        products={PRODUCTS_DATA}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        magicMode={magicMode}
        setMagicMode={setMagicMode}
        cartCount={cartItems.length}
        setCartOpen={setCartOpen}
        wishlistCount={wishlistItems.length}
        setWishlistOpen={setWishlistOpen}
        isLoggedIn={isLoggedIn}
        setLoginModalOpen={setLoginModalOpen}
        onSelectService={handleSelectServiceFromHeader}
      />

      {/* Primary Workspace Stage */}
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeTab === "home" && (
            <HomeView
              setActiveTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              setSelectedServiceId={setSelectedServiceId}
              setSelectedProductId={setSelectedProductId}
              setSelectedProjectId={setSelectedProjectId}
              services={SERVICES_DATA}
              courses={COURSES_DATA}
              products={PRODUCTS_DATA}
              blogs={BLOG_POSTS_DATA}
              projects={PROJECTS_DATA}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          )}

          {activeTab === "about" && <AboutView setActiveTab={setActiveTab} />}

          {activeTab === "services" && (
            <ServicesView
              services={SERVICES_DATA}
              selectedServiceId={selectedServiceId}
              setSelectedServiceId={setSelectedServiceId}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "academy" && (
            <AcademyView
              courses={COURSES_DATA}
              courseProgress={courseProgress}
              onUpdateProgress={handleUpdateCourseProgress}
              isLoggedIn={isLoggedIn}
              setLoginModalOpen={setLoginModalOpen}
            />
          )}

          {activeTab === "shop" && (
            <ShopView
              products={PRODUCTS_DATA}
              selectedProductId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          )}

          {activeTab === "blog" && <BlogView blogs={BLOG_POSTS_DATA} />}

          {activeTab === "portfolio" && (
            <PortfolioView
              projects={PROJECTS_DATA}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
            />
          )}

          {activeTab === "casestudies" && <CaseStudiesView cases={CASE_STUDIES_DATA} />}

          {activeTab === "freeresources" && <FreeResourcesView />}

          {activeTab === "tools" && (
            <div className="space-y-12 animate-fade-in text-left">
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary bg-blue-500/5 px-3 py-1 rounded-full font-mono">
                  Operational Toolkits
                </span>
                <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                  Free SEO & AI Workspace Tools
                </h1>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">
                  Try our responsive client-side audit modules, prompt engineering transformers, and keyword difficulty checkers designed to save hours of operations.
                </p>
              </div>
              <InteractiveTools />
            </div>
          )}

          {activeTab === "drive" && (
            <div className="animate-fade-in">
              <DriveVaultView />
            </div>
          )}

          {activeTab === "contact" && <ContactView />}

          {activeTab === "legal" && <LegalView />}

          {/* Member Workspace Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-12 animate-fade-in text-left max-w-5xl mx-auto">
              {/* Profile Bar */}
              <section className="p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-secondary to-brand-accent flex items-center justify-center text-xl font-bold text-white shadow">
                    {userEmail ? userEmail[0].toUpperCase() : "U"}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-brand-accent uppercase font-bold tracking-wider">Premium Member Node</span>
                    <h1 className="font-display font-extrabold text-lg text-slate-900 dark:text-white mt-0.5">{userEmail || "partner@brand.com"}</h1>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserEmail("");
                    setActiveTab("home");
                    alert("Logged out of member workspace successfully.");
                  }}
                  className="px-4 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-500"
                >
                  Disconnect Workspace
                </button>
              </section>

              {/* Active course study progress trackers */}
              <section className="space-y-6">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-brand-gold animate-bounce" /> Your Active Learning Tracks
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {COURSES_DATA.map((course) => {
                    const prog = courseProgress[course.id] ?? 20;
                    return (
                      <div key={course.id} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">{course.category} Track</span>
                          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-1">{course.title}</h4>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                            <span>Syllabus Progress</span>
                            <span className="font-bold text-brand-secondary">{prog}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-secondary rounded-full" style={{ width: `${prog}%` }} />
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveTab("academy")}
                          className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Continue Learning Track
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Downloadable toolkits bought list */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Active downloads */}
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-brand-secondary" /> Downloaded Toolkit Archives
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Access and download fully formatted spreadsheets, checklists, and prompt configurations bought under this member node:</p>
                  
                  <div className="space-y-2 pt-2 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 dark:text-slate-200">topical_authority_blueprint.zip</span>
                        <p className="text-[10px] text-slate-400 font-mono">Size: 4.8 MB | Includes 5 spreadsheet tabs</p>
                      </div>
                      <button onClick={() => alert("Downloading topical_authority_blueprint.zip file folder...")} className="p-2 bg-brand-secondary/10 hover:bg-brand-secondary/20 rounded-lg text-brand-secondary text-xs font-bold cursor-pointer">
                        Download
                      </button>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 dark:text-slate-200">chatgpt_megaprompts_notion.json</span>
                        <p className="text-[10px] text-slate-400 font-mono">Size: 1.2 MB | 250+ prompt nodes</p>
                      </div>
                      <button onClick={() => alert("Downloading chatgpt_megaprompts_notion.json data document...")} className="p-2 bg-brand-secondary/10 hover:bg-brand-secondary/20 rounded-lg text-brand-secondary text-xs font-bold cursor-pointer">
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Strategic Licensing Node Details</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200/40 font-mono text-[11px] text-slate-500">
                      <span>Node Status</span>
                      <span className="text-emerald-500 font-bold uppercase">● Authenticated Active</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/40 font-mono text-[11px] text-slate-500">
                      <span>Verification ID</span>
                      <span className="text-slate-700 dark:text-white font-bold">MB-CL-940284</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/40 font-mono text-[11px] text-slate-500">
                      <span>License Type</span>
                      <span className="text-slate-700 dark:text-white font-bold">Single Brand Commercial</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/40 font-mono text-[11px] text-slate-500">
                      <span>Support Status</span>
                      <span className="text-slate-700 dark:text-white font-bold">24h Priority Slack Deck Access</span>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-secondary/10 rounded-xl flex items-center gap-3">
                    <span className="text-xl">🏆</span>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                      Your commercial nodes are active. Join MD BIPLOB private Discord development circle using your Slack credentials.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

        </div>
      </main>

      {/* Premium, comprehensive enterprise-grade footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900/80">
          
          {/* Col 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-secondary to-brand-accent p-[1px]">
                <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center font-display font-extrabold text-xs text-white">
                  MB
                </div>
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-white">
                MD BIPLOB
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premium, multi-channel personal brand ecosystem for high-ticket organic search scale, automated pipeline integrations, and high-converting WordPress design assets.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-500 space-y-1">
              <p>🌐 Built on Astra Theme & Elementor Pro compatible layouts</p>
              <p>⚡ Optimized under strict Core Web Vitals schema criteria</p>
            </div>
          </div>

          {/* Col 2: Shortcuts */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Strategic Shortcuts</h4>
            <div className="grid grid-cols-1 gap-2 text-xs text-slate-400 font-semibold">
              <button onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Enterprise Home</button>
              <button onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Story & Timeline</button>
              <button onClick={() => { setActiveTab("services"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Agency Services</button>
              <button onClick={() => { setActiveTab("academy"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Tutor Academy</button>
              <button onClick={() => { setActiveTab("shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Digital Store</button>
            </div>
          </div>

          {/* Col 3: Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Resources</h4>
            <div className="grid grid-cols-1 gap-2 text-xs text-slate-400 font-semibold">
              <button onClick={() => { setActiveTab("tools"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">SEO & AI Tools</button>
              <button onClick={() => { setActiveTab("freeresources"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Lead Magnets</button>
              <button onClick={() => { setActiveTab("casestudies"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Case Dossiers</button>
              <button onClick={() => { setActiveTab("blog"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Insights Blog</button>
              <button onClick={() => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Strategic Call</button>
            </div>
          </div>

          {/* Col 4: Legal */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Compliance</h4>
            <div className="grid grid-cols-1 gap-2 text-xs text-slate-400 font-semibold">
              <button onClick={() => { setActiveTab("legal"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Terms of Service</button>
              <button onClick={() => { setActiveTab("legal"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Privacy Policies</button>
              <button onClick={() => { setActiveTab("legal"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-left hover:text-brand-secondary cursor-pointer">Schema Markups</button>
            </div>
          </div>

        </div>

        {/* Copywrite details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 font-semibold">
          <p>© 2026 MD BIPLOB Digital Agency. All rights reserved globally.</p>
          <div className="flex gap-4">
            <span>Enterprise Authorized License</span>
            <span>Ver. 4.2.1-SPA</span>
          </div>
        </div>
      </footer>

      {/* Global Interactive Drawer Modals & Slideouts */}
      <CartSlideout
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistSlideout
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
