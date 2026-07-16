import React, { useState } from "react";
import { Search, Cpu, Globe, CheckCircle2, ChevronDown, Calendar, DollarSign, ArrowRight, HelpCircle, Star, Sparkles } from "lucide-react";
import { Service } from "../data";

interface ServicesViewProps {
  services: Service[];
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
}

export function ServicesView({
  services,
  selectedServiceId,
  setSelectedServiceId,
  setActiveTab,
}: ServicesViewProps) {
  const currentServiceId = selectedServiceId || services[0].id;
  const activeSvc = services.find((s) => s.id === currentServiceId) || services[0];

  // Pricing calculator state
  const [calcService, setCalcService] = useState(currentServiceId);
  const [calcScope, setCalcScope] = useState("medium");
  const [calcTimeline, setCalcTimeline] = useState("standard");
  const [estimateResult, setEstimateResult] = useState<any | null>(null);

  const calculateEstimate = () => {
    let basePrice = 2000;
    let label = "Custom Strategy Package";
    
    if (calcService === "seo-agency") {
      basePrice = calcScope === "high" ? 5500 : calcScope === "medium" ? 3500 : 2500;
      label = "Search Authority System";
    } else if (calcService === "ai-consulting") {
      basePrice = calcScope === "high" ? 12000 : calcScope === "medium" ? 6800 : 4800;
      label = "Autonomous Workflow Agent System";
    } else {
      basePrice = calcScope === "high" ? 3800 : calcScope === "medium" ? 2500 : 1950;
      label = "High-Converting Web Ecosystem";
    }

    if (calcTimeline === "express") {
      basePrice = Math.floor(basePrice * 1.25);
    }

    setEstimateResult({
      price: basePrice,
      label,
      timeline: calcTimeline === "express" ? "Express (Priority Execution)" : "Standard Timeline",
      scopeLabel: calcScope === "high" ? "Enterprise Multi-Branch Scope" : calcScope === "medium" ? "Standard Growth Business" : "Starter Authority Hub"
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-16 animate-fade-in text-left">
      {/* 1. Service selector Tabs */}
      <section className="flex flex-col items-center space-y-4">
        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary bg-blue-500/5 px-3 py-1 rounded-full font-mono">
          Interactive Service Terminals
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
          Select an Authority Track
        </h1>
        
        <div className="flex flex-wrap justify-center gap-2 w-full max-w-2xl bg-slate-100 dark:bg-slate-850 p-1.5 rounded-2xl border border-slate-200/40 dark:border-slate-800">
          {services.map((svc) => (
            <button
              key={svc.id}
              onClick={() => {
                setSelectedServiceId(svc.id);
                setCalcService(svc.id);
              }}
              className={`flex-1 min-w-[150px] py-2.5 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                currentServiceId === svc.id
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {svc.id === "seo-agency" ? (
                <Search className="w-3.5 h-3.5 text-brand-secondary" />
              ) : svc.id === "ai-consulting" ? (
                <Cpu className="w-3.5 h-3.5 text-brand-accent" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-brand-gold" />
              )}
              {svc.id === "seo-agency" ? "SEO Agency" : svc.id === "ai-consulting" ? "AI Automation" : "WordPress Dev"}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Standalone Landing Page Structure for Selected Service */}
      <div className="space-y-16">
        {/* Service Hero */}
        <section className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden border border-slate-800/80">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-brand-secondary">
              {activeSvc.id === "seo-agency" ? (
                <Search className="w-6 h-6" />
              ) : activeSvc.id === "ai-consulting" ? (
                <Cpu className="w-6 h-6" />
              ) : (
                <Globe className="w-6 h-6" />
              )}
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl leading-tight">
              {activeSvc.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {activeSvc.tagline}
            </p>
          </div>
        </section>

        {/* Problem vs. Solution Block */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-bold text-red-500 font-mono uppercase tracking-wider">The Primary Friction</span>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Why Traditional Methods Fail</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {activeSvc.problem}
            </p>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-bold text-emerald-500 font-mono uppercase tracking-wider">The Strategic Fix</span>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Our Proprietary Framework</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {activeSvc.solution}
            </p>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="space-y-6">
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white text-center">
            Key Performance Dividends
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeSvc.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Implementation Process */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              The Execution Blueprint
            </h3>
            <p className="text-xs text-slate-500">Rigorous, transparent, and structured milestones designed for total alignment.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeSvc.process.map((step) => (
              <div key={step.step} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-brand-secondary font-mono text-xs font-bold flex items-center justify-center">
                  0{step.step}
                </div>
                <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Structured Pricing Packages */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Transparent Strategic Retainers
            </h3>
            <p className="text-xs text-slate-500">No hidden setup fees. Scale, pause, or upgrade your service package instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {activeSvc.pricing.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-200 dark:hover:border-slate-700 transition-all relative"
              >
                {idx === 1 && (
                  <span className="absolute -top-3 right-6 bg-brand-secondary text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">{tier.name}</h4>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">${tier.price}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">/ {tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 border-t border-slate-50 dark:border-slate-850 pt-4">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setActiveTab("contact")}
                  className="mt-8 w-full py-2.5 bg-brand-primary dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl transition-all hover:opacity-90 cursor-pointer"
                >
                  Initiate Project Scope
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic FAQ for this service */}
        <section className="space-y-6 max-w-3xl mx-auto">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-secondary" /> Service Inquiries FAQ
          </h3>
          <div className="space-y-4">
            {activeSvc.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2">
                <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white">
                  {faq.q}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 3. CRO: Interactive Service Pricing Calculator */}
      <section className="border-t border-slate-100 dark:border-slate-800/80 pt-16 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest font-mono bg-teal-500/5 px-3 py-1 rounded-full">
            CRO Pricing Widget
          </span>
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            Estimate Your Digital Budget Instantly
          </h3>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Input your expected business metrics to calculate recommended action budgets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-850">
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1.5">Target Track</label>
                <select
                  value={calcService}
                  onChange={(e) => setCalcService(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-950 dark:text-white focus:outline-none"
                >
                  <option value="seo-agency">Enterprise SEO</option>
                  <option value="ai-consulting">AI Consulting</option>
                  <option value="wordpress-development">WordPress & Elementor</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1.5">Project Scope</label>
                <select
                  value={calcScope}
                  onChange={(e) => setCalcScope(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-950 dark:text-white focus:outline-none"
                >
                  <option value="low">Starter Hub / Standard</option>
                  <option value="medium">Medium Growing Brand</option>
                  <option value="high">Enterprise Enterprise Scale</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1.5">Execution Speed</label>
                <select
                  value={calcTimeline}
                  onChange={(e) => setCalcTimeline(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-950 dark:text-white focus:outline-none"
                >
                  <option value="standard">Standard Execution</option>
                  <option value="express">Express Priority (+25%)</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateEstimate}
              className="w-full py-2.5 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Estimate Recommended Budget
            </button>
          </div>

          <div className="md:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-150 dark:border-slate-800 space-y-4 text-center">
            {estimateResult ? (
              <div className="space-y-4 animate-scale-up">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-brand-accent/10 text-teal-600">
                    {estimateResult.label}
                  </span>
                  <p className="text-xs text-slate-500 mt-2">{estimateResult.scopeLabel}</p>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">${estimateResult.price.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 font-mono">EST. TOTAL / MO</span>
                </div>
                <p className="text-[10px] text-slate-400">{estimateResult.timeline}</p>
                
                <button
                  onClick={() => setActiveTab("contact")}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Proceed with Estimate
                </button>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-slate-400 space-y-2">
                <DollarSign className="w-8 h-8 text-slate-300 animate-pulse" />
                <p className="text-xs font-medium">Select your project parameters to get an immediate custom strategic quote.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
