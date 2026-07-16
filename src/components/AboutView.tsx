import React from "react";
import { Award, Briefcase, Calendar, CheckSquare, Clock, Globe, ShieldCheck, Sparkles, Star, Terminal } from "lucide-react";
import { CLIENT_LOGOS } from "../data";

interface AboutViewProps {
  setActiveTab: (tab: string) => void;
}

export function AboutView({ setActiveTab }: AboutViewProps) {
  const values = [
    { title: "Topical Honesty", desc: "No vanity metrics. We track qualified pipeline clicks, transactional conversions, and actual bottom-line revenue." },
    { title: "Technical Perfection", desc: "Every element on our page assets must be clean, structured, crawl-budget friendly, and responsive." },
    { title: "AI-Native Innovation", desc: "We actively re-engineer workflows using semantic AI, ensuring we operate at 10x leverage." }
  ];

  const timeline = [
    { year: "2024 - Present", title: "Founder & Chief Architect", company: "MD BIPLOB Digital Agency", desc: "Scaling digital pipelines and automation modules for global brands. Managing a private student academy of 1,000+ members." },
    { year: "2021 - 2024", title: "Principal Enterprise SEO Lead", company: "RankScale Analytics", desc: "Orchestrated organic search strategies for global finance and SaaS networks. Scaled client traffic from stagnant pools to 1M+ monthly organic clicks." },
    { year: "2018 - 2021", title: "WordPress Engineer & CRO Strategist", company: "PixelPerfekt Agency", desc: "Developed highly optimized Astra and Elementor Pro themes, maintaining average PageSpeed scores of 98+." },
    { year: "2016 - 2018", title: "Local SEO Specialist", company: "LaunchLocal Consulting", desc: "Optimized geographic citation pipelines, local schema structures, and Google Business profiles for 150+ regional business networks." }
  ];

  const certifications = [
    "Google Search Analytics Certified Professional",
    "Semrush Topical Authority Specialist Gold Rank",
    "Advanced HubSpot Growth & Inbound Marketing Consultant",
    "Elementor Pro Developer Network Endorsed Specialist",
    "DeepLearning.AI Prompt Engineering for Developers certification"
  ];

  const skills = [
    { name: "Topical Authority Planning & Semantic Maps", level: 98 },
    { name: "WordPress Core & Elementor Pro Architecture", level: 96 },
    { name: "Generative AI Agents & API Pipeline (Gemini/Node.js)", level: 92 },
    { name: "Local SEO, Schema Markup & JSON-LD Graphing", level: 95 },
    { name: "Conversion Rate Optimization (CRO) & User Flows", level: 90 }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-20 animate-fade-in text-left">
      {/* 1. Header & Story Block */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-brand-secondary text-xs font-semibold uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Architect Behind The Method</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
            I build search dominance, custom intelligence nodes, and premium visual interfaces.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            I am <strong>MD BIPLOB</strong>, a global SEO strategist, WordPress architect, AI consultant, and digital business builder. Over the last decade, I have focused on solving a major business challenge: <em>building digital assets that actually convert organic traffic into bottom-line revenue.</em>
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            By combining advanced topical mapping, responsive clean WordPress coding, and autonomous AI automation workflows, I eliminate the expensive, unoptimized visual and technical bloat that causes traditional digital campaigns to fail.
          </p>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[280px] aspect-square bg-gradient-to-tr from-blue-600 via-teal-500 to-amber-500 rounded-3xl p-[2px] shadow-xl">
            <div className="w-full h-full bg-slate-900 rounded-[22px] flex flex-col items-center justify-center p-6 text-center space-y-3">
              <span className="text-4xl">🧑‍💻</span>
              <h3 className="font-display font-bold text-white text-base">MD BIPLOB</h3>
              <p className="text-[10px] text-brand-accent font-mono font-semibold uppercase tracking-wider">Founded Ecosystem in 2016</p>
              <div className="border-t border-slate-800 pt-3 w-full">
                <p className="text-[11px] text-slate-400">"True authority is earned when technical excellence meets clear, helpful content."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission, Vision, and Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Global Focus</span>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Our Master Mission</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            To empower 1,000,000 businesses and digital professionals globally to bypass bloated, expensive marketing strategies. We achieve this by deploying responsive search blueprints, clean code architectures, and scalable AI workflows that capture compounding organic dividends.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Future Landscape</span>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Our Strategic Vision</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            To create the premier personal brand ecosystem where technical SEO strategy, responsive WordPress design, and autonomous AI automation converge, providing actionable knowledge, premium tooling, and consulting assets.
          </p>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="space-y-6">
        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white text-center">
          The Foundations of Our Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-brand-secondary">0{idx+1} .</span>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">{val.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Professional Skill Progress Bars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-[9px] uppercase font-bold text-brand-accent tracking-widest font-mono bg-teal-500/5 px-3 py-1 rounded-full">
            Engineering Matrix
          </span>
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            Pristine Skill Performance
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Our capabilities are backed by rigorous technical execution. We do not specialize in high-level theories; we design production-ready, fully compliant code schemas and semantic pathways.
          </p>
        </div>

        <div className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          {skills.map((skill, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                <span className="font-mono text-[10px] text-brand-secondary font-bold">{skill.level}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-secondary to-brand-accent rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Career Chronology Timeline */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            Operational History & Achievements
          </h3>
          <p className="text-xs text-slate-500">Compounding authority across a decade of hands-on strategy implementation.</p>
        </div>

        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-32 space-y-8">
          {timeline.map((event, idx) => (
            <div key={idx} className="relative pl-6">
              {/* Timeline marker */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-brand-secondary rounded-full border-2 border-white dark:border-slate-950" />
              
              {/* Year Label left-aligned on large screens */}
              <div className="md:absolute md:-left-32 md:top-1 w-24 text-right text-[10px] font-mono font-bold uppercase text-slate-400">
                {event.year}
              </div>

              <div className="space-y-1 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-850 shadow-sm">
                <span className="text-[10px] font-mono text-slate-400 md:hidden">{event.year}</span>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {event.title}
                </h4>
                <p className="text-[11px] font-semibold text-brand-secondary uppercase tracking-wider font-mono">
                  {event.company}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Verifiable Credentials & Certifications */}
      <section className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 md:p-8 text-white space-y-6">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-brand-gold animate-bounce" />
          <h3 className="font-display font-bold text-lg">Official Platform Endorsements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <span className="text-brand-accent text-sm">✓</span>
              <p className="text-xs font-semibold leading-relaxed">{cert}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Action CTA */}
      <section className="text-center p-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-4">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
          Interested in learning more about our custom strategic blueprints?
        </p>
        <button
          onClick={() => setActiveTab("contact")}
          className="px-6 py-2.5 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Book a strategy session with MD BIPLOB
        </button>
      </section>
    </div>
  );
}
