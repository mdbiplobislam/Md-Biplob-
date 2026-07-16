import React, { useState } from "react";
import { ShoppingBag, Star, HelpCircle, CheckSquare, Sparkles, Image, ArrowRight, ShieldCheck, ArrowLeft, Heart } from "lucide-react";
import { Product } from "../data";

interface ShopViewProps {
  products: Product[];
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  onAddToCart: (prod: Product) => void;
  onAddToWishlist: (prod: Product) => void;
}

export function ShopView({
  products,
  selectedProductId,
  setSelectedProductId,
  onAddToCart,
  onAddToWishlist,
}: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePreviewTab, setActivePreviewTab] = useState("preview-1");

  const categories = ["all", "SEO Templates", "Prompt Packs", "Canva Templates", "Bundles"];

  const filteredProducts = products.filter((prod) => {
    const matchesCat = selectedCategory === "all" || prod.category === selectedCategory;
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeProduct = products.find((p) => p.id === selectedProductId) || null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-12 animate-fade-in text-left">
      {/* If a product is selected, display the Product Detail Page */}
      {activeProduct ? (
        <div className="space-y-16 animate-fade-in">
          {/* Back button */}
          <button
            onClick={() => setSelectedProductId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Digital Store
          </button>

          {/* Product Hero & Details */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Gallery & Previews */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900 rounded-2xl aspect-video p-6 text-white flex flex-col justify-between relative overflow-hidden border border-slate-800">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.15),transparent_40%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20" />
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-mono tracking-widest text-brand-accent uppercase font-bold">Document Hub Premium</span>
                  <span className="text-[10px] uppercase bg-brand-gold/10 text-amber-500 px-2 py-0.5 rounded font-bold font-mono">
                    {activeProduct.category}
                  </span>
                </div>

                <div className="space-y-2 relative z-10 text-center max-w-md mx-auto">
                  <h2 className="font-display font-black text-xl tracking-tight text-white">{activeProduct.title}</h2>
                  <p className="text-[11px] text-slate-400">Verifiable high-performance operations file</p>
                </div>

                <div className="flex justify-between items-center relative z-10 text-[10px] font-mono text-slate-400">
                  <span>Size: ~12.4 MB</span>
                  <span className="text-brand-accent">99.8% Download Safety Check</span>
                </div>
              </div>

              {/* Gallery Preview tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setActivePreviewTab("preview-1")}
                  className={`p-2.5 rounded-xl border text-center font-mono text-[10px] cursor-pointer transition-all ${
                    activePreviewTab === "preview-1"
                      ? "border-brand-secondary bg-blue-500/5 text-brand-secondary font-bold"
                      : "border-slate-150 dark:border-slate-800 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  📄 File Contents
                </button>
                <button
                  onClick={() => setActivePreviewTab("preview-2")}
                  className={`p-2.5 rounded-xl border text-center font-mono text-[10px] cursor-pointer transition-all ${
                    activePreviewTab === "preview-2"
                      ? "border-brand-secondary bg-blue-500/5 text-brand-secondary font-bold"
                      : "border-slate-150 dark:border-slate-800 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  ⚡ Features preview
                </button>
                <button
                  onClick={() => setActivePreviewTab("preview-3")}
                  className={`p-2.5 rounded-xl border text-center font-mono text-[10px] cursor-pointer transition-all ${
                    activePreviewTab === "preview-3"
                      ? "border-brand-secondary bg-blue-500/5 text-brand-secondary font-bold"
                      : "border-slate-150 dark:border-slate-800 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  💬 Reviews ({activeProduct.reviewsCount})
                </button>
              </div>

              {/* Snippet / preview box depending on activePreviewTab */}
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl space-y-4">
                {activePreviewTab === "preview-1" && (
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Simulated Spreadsheet Node Outlines</span>
                    <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300 space-y-1">
                      <p>➤ [TAB 1]: Pillar Entity Keyword Core Index (Priority Formulation)</p>
                      <p>➤ [TAB 2]: Supporting Cluster Maps & URL Mapping Architectures</p>
                      <p>➤ [TAB 3]: Search Intent Classification (Info, Comm, Nav, Trans)</p>
                      <p>➤ [TAB 4]: Internal Anchors planning node & Schema XML setups</p>
                    </div>
                  </div>
                )}
                {activePreviewTab === "preview-2" && (
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">System Instructions</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      This template is engineered with strict logical prioritization. It evaluates average search volume, click coefficients, and direct competitor topical densities to prioritize content pipelines instantly.
                    </p>
                  </div>
                )}
                {activePreviewTab === "preview-3" && (
                  <div className="space-y-4">
                    {activeProduct.reviews.map((rev, i) => (
                      <div key={i} className="space-y-2 pb-3 border-b border-slate-50 dark:border-slate-800 last:border-none last:pb-0">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{rev.author}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(rev.rating)].map((_, r) => (
                            <Star key={r} className="w-3 h-3 fill-brand-gold text-brand-gold" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Checkout triggers */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-brand-secondary font-mono tracking-widest bg-blue-500/5 px-2.5 py-1 rounded">
                  Instant Access
                </span>
                <h1 className="font-display font-extrabold text-xl text-slate-900 dark:text-white leading-tight">
                  {activeProduct.title}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">({activeProduct.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <div className="border-t border-b border-slate-50 dark:border-slate-850 py-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">One-Time Price</span>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">${activeProduct.price}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                  ✓ Available Instantly
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onAddToCart(activeProduct)}
                  className="w-full py-3 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Shopping Cart
                </button>
                <button
                  onClick={() => onAddToWishlist(activeProduct)}
                  className="w-full py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Add to Personal Wishlist
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-brand-accent animate-pulse" />
                <span>Secure 256-bit SSL checkout processing</span>
              </div>
            </div>
          </section>

          {/* Core Features list */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Core File Capabilities</h3>
              <div className="space-y-2">
                {activeProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="text-brand-accent font-bold mt-0.5">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">What's Included in the Download Folder</h3>
              <div className="space-y-2">
                {activeProduct.whatsIncluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="text-brand-secondary font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Product FAQ Accordion */}
          <section className="max-w-3xl space-y-6">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-secondary" /> Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {activeProduct.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2">
                  <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white">{faq.q}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-12 animate-fade-in">
          {/* Header & Controls */}
          <section className="text-center space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary bg-blue-500/5 px-3 py-1 rounded-full font-mono">
              Premium Store
            </span>
            <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
              MD BIPLOB Digital Product Store
            </h1>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Skip weeks of operations planning. Build instant pipelines using our pre-formatted enterprise sheets, Canva layouts, and prompt libraries.
            </p>
          </section>

          {/* Search bar & Category filters */}
          <section className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="w-full sm:w-80">
              <input
                type="text"
                placeholder="Search premium tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer capitalize ${
                    selectedCategory === cat
                      ? "bg-brand-secondary text-white border-brand-secondary"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-450"
                  }`}
                >
                  {cat === "all" ? "All assets" : cat}
                </button>
              ))}
            </div>
          </section>

          {/* Product Gallery Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-200 dark:hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-2">
                    <span>{prod.category}</span>
                    {prod.badge && (
                      <span className="text-[9px] font-bold uppercase bg-brand-gold/10 text-amber-600 px-2 py-0.5 rounded-full">
                        {prod.badge}
                      </span>
                    )}
                  </div>
                  <h3
                    onClick={() => setSelectedProductId(prod.id)}
                    className="font-display font-extrabold text-sm text-slate-900 dark:text-white hover:text-brand-secondary transition-colors cursor-pointer leading-snug"
                  >
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {prod.tagline}
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">({prod.reviewsCount})</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-mono">Single Payment</span>
                    <span className="text-base font-black text-slate-900 dark:text-white">${prod.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAddToWishlist(prod)}
                      className="p-2 border border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="px-3 py-1.5 bg-brand-secondary hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
