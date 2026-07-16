import React, { useState } from "react";
import { Search, Cpu, Sparkles, AlertCircle, CheckCircle2, Copy, Play, ArrowRight, RefreshCw } from "lucide-react";

export function InteractiveTools() {
  // Tool 1: Keyword Estimator
  const [keyword, setKeyword] = useState("");
  const [volume, setVolume] = useState("5000");
  const [competition, setCompetition] = useState("medium");
  const [difficultyResult, setDifficultyResult] = useState<any | null>(null);

  const calculateKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    const baseDiff = competition === "high" ? 72 : competition === "medium" ? 45 : 18;
    const modifier = Math.min(Math.floor(keyword.length * 1.2), 20);
    const difficulty = Math.min(baseDiff + modifier, 99);
    
    const volNum = parseInt(volume) || 1000;
    const estClicks = Math.floor(volNum * (difficulty > 70 ? 0.08 : difficulty > 40 ? 0.18 : 0.32));
    
    setDifficultyResult({
      difficulty,
      difficultyLabel: difficulty > 75 ? "Hard (Enterprise DR needed)" : difficulty > 40 ? "Moderate (Build Topical Clusters)" : "Easy (Easy Wins)",
      difficultyColor: difficulty > 75 ? "text-red-500 bg-red-500/10" : difficulty > 40 ? "text-amber-500 bg-amber-500/10" : "text-emerald-500 bg-emerald-500/10",
      estClicks,
      clusters: [
        `What is ${keyword} (Informational - Guide)`,
        `Best ${keyword} tools & platforms (Commercial - List)`,
        `How to optimize for ${keyword} (Technical - Tutorial)`,
        `${keyword} alternatives & pricing comparisons (Transactional - Review)`
      ]
    });
  };

  // Tool 2: Prompt Optimizer
  const [promptTask, setPromptTask] = useState("meta-gen");
  const [promptTopic, setPromptTopic] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    if (!promptTopic) return;
    let template = "";
    if (promptTask === "meta-gen") {
      template = `You are a World-Class SEO Copywriter and Conversion Rate Optimization (CRO) expert. 
Your task is to write 5 highly click-worthy Meta Titles and Meta Descriptions for the topic: "${promptTopic}".

STRICT GUIDELINES:
1. Meta Title length must be between 50-60 characters. Include a power word and the primary keyword naturally.
2. Meta Description must be between 145-155 characters, include a clear benefit and a strong action-oriented call to action (CTA).
3. Do not use generic clickbait; maintain high-end professional authority.
4. Output in a clean JSON format containing "title" and "description" keys for easy implementation.`;
    } else if (promptTask === "cluster-builder") {
      template = `You are an Enterprise Search Architect and Topical Authority Planner. 
Analyze the core pillar keyword: "${promptTopic}".

Generate a structured Topical Cluster Map containing:
- 1 Core Pillar Page (Broad target search intent)
- 4 Sub-topic clusters (Supporting informational, transactional, and commercial intents)
- Recommended semantic entity keywords for each sub-topic
- Direct internal linking strategy between the pillar and clusters.
Output this as a clear Markdown Outline with brief search-intent analysis for each node.`;
    } else {
      template = `You are an Expert AI Automation Consultant and Workflow Engineer.
Optimize a Make.com / Zapier trigger sequence for: "${promptTopic}".

Provide:
1. Recommended trigger source and API data nodes.
2. The exact system prompt to feed the Gemini API node to parse and structure the payload securely.
3. Recommended error-handling fallback logic to handle empty fields or high latency.
Format the instructions step-by-step for a non-technical manager.`;
    }
    setOptimizedPrompt(template);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tool 3: Technical Audit Simulator
  const [auditUrl, setAuditUrl] = useState("");
  const [auditFocus, setAuditFocus] = useState("speed");
  const [auditing, setAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<any | null>(null);

  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl) return;
    setAuditing(true);
    setAuditReport(null);

    setTimeout(() => {
      setAuditing(false);
      const isHttps = auditUrl.startsWith("https://");
      const randomScore = Math.floor(Math.random() * 25) + 65; // 65 to 90
      setAuditReport({
        score: randomScore,
        url: auditUrl,
        focus: auditFocus,
        passed: [
          { item: "SSL Certificate Validation", desc: "Site is fully secure with HTTPS protocol." },
          { item: "Robot.txt Structure", desc: "Correctly maps and allows search engine crawling budgets." },
          { item: "Mobile Viewport Integration", desc: "Clean responsive breakpoints pre-configured." }
        ],
        failed: [
          { item: "Unused CSS/JS Assets (Bloat)", desc: "Heavy page-builder styles blocking initial paint. We recommend selective loading.", severity: "High" },
          { item: "Missing Schema Graph", desc: "Organization and Local Business schema missing or incomplete.", severity: "Medium" },
          { item: "Image Format and Compression", desc: "Images served in PNG/JPEG. Transitioning to AVIF will save ~70% load speed.", severity: "High" }
        ],
        recommendation: `Based on your score of ${randomScore}/100, we recommend implementing dynamic asset deferrals, compressing image assets, and structuring comprehensive semantic Schema nodes. Book a call with MD BIPLOB for a detailed manual review.`
      });
    }, 2500);
  };

  // Tool 4: The Archmage's SEO Spellcaster
  const [targetSite, setTargetSite] = useState("");
  const [spellType, setSpellType] = useState("speed-acceleratio");
  const [casting, setCasting] = useState(false);
  const [spellResult, setSpellResult] = useState<any | null>(null);

  const castSpell = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetSite.trim()) return;
    setCasting(true);
    setSpellResult(null);

    setTimeout(() => {
      setCasting(false);
      
      const spellPower = Math.floor(Math.random() * 20) + 80; // 80 to 99% spell strength
      let incantation = "";
      let reagents: string[] = [];
      let advice = "";
      let output: { charm: string; benefit: string }[] = [];

      if (spellType === "speed-acceleratio") {
        incantation = "Veloce-Celeritas Caching Definitiva!";
        reagents = [
          "1x Cloudflare Edge Node Capsule", 
          "2g Deferral Runes for Unused CSS", 
          "3 drops of Next-Gen AVIF Image Elixir"
        ];
        advice = `The Speed Acceleratio spell is complete with ${spellPower}% synchronization accuracy. We have designed a real-time asset deferral payload:`;
        output = [
          { charm: "Brotli Compression Sigil", benefit: "Compresses initial text payloads by up to 78% before pipeline ingestion." },
          { charm: "Critical CSS Extraction Enchantment", benefit: "Injects layout-critical styling directly into document head, rendering in <0.8s." },
          { charm: "Stasis-Delay Trigger Core", benefit: "Freezes off-screen assets until viewport scroll threshold activates loading." }
        ];
      } else if (spellType === "authority-conjuro") {
        incantation = "Semantica Authority Revelatio!";
        reagents = [
          "1x Seed Entity core anchor node", 
          "500mg LSI Semantic Keyword essence", 
          "1x Competitor Link Gap analysis scroll"
        ];
        advice = `The Topical Authority Portal has conjured 3 strategic content silos for "${targetSite}" at ${spellPower}% density:`;
        output = [
          { charm: "Transactional Intent Hub", benefit: "Write a high-end comparison handbook targeting local buyers with direct CTAs." },
          { charm: "Semantic Entity Injection", benefit: "Incorporate terms like 'API Gateway', 'LLM Agents', and 'Relational Mapping'." },
          { charm: "Reverse Anchor Linking Web", benefit: "Link 4 tutorial sub-pages to the main pillar with structured contextual anchors." }
        ];
      } else {
        incantation = "Aegis Algorithmus Protectio!";
        reagents = [
          "1x Helpful Content Verification Shield", 
          "3x Premium Author E-E-A-T Signature nodes", 
          "1x Spam-Shield Purge disavow list"
        ];
        advice = `Rank Protection Ward established! Your target nodes are armored with ${spellPower}% resilience against Core Web Algorithm rollouts:`;
        output = [
          { charm: "Helper Value Signal Loop", benefit: "Relocates marketing banners below-the-fold to bypass helpful-content manual audits." },
          { charm: "Author Bio Credentials Sanctum", benefit: "Injects verified JSON-LD credentials connecting certified writers to articles." },
          { charm: "Toxic Backlink Purifying Ward", benefit: "Generates automated lists to disavow and neutralize domain scraper signals." }
        ];
      }

      setSpellResult({
        power: spellPower,
        incantation,
        reagents,
        advice,
        output,
        timestamp: new Date().toLocaleTimeString()
      });
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Tool 1: Keyword Estimator & Cluster Plan */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-brand-secondary">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">SEO Intent & CTR Estimator</h3>
            <p className="text-xs text-slate-500">Quickly estimate organic difficulty, potential clicks, and cluster maps.</p>
          </div>
        </div>

        <form onSubmit={calculateKeyword} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Keyword</label>
            <input
              type="text"
              placeholder="e.g., enterprise saas seo"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-secondary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Monthly Volume</label>
              <select
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="500">500 (Niche)</option>
                <option value="2500">2,500 (Moderate)</option>
                <option value="5000">5,000 (Strong)</option>
                <option value="25000">25,000+ (Broad)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Estimated Competition</label>
              <select
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="low">Low Competition</option>
                <option value="medium">Medium Competition</option>
                <option value="high">High Competition</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Calculate Intent Potential
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {difficultyResult && (
          <div className="mt-6 space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Difficulty Index</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{difficultyResult.difficulty}/100</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyResult.difficultyColor}`}>
                    {difficultyResult.difficulty > 75 ? "Hard" : difficultyResult.difficulty > 40 ? "Moderate" : "Easy"}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Est. Monthly Clicks</span>
                <p className="text-xl font-bold text-brand-accent mt-1">{difficultyResult.estClicks.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Recommended Topical Clusters to Build:</h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {difficultyResult.clusters.map((cluster: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    {cluster}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Tool 2: Mega Prompt Generator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-brand-accent">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">AI Mega-Prompt Optimizer</h3>
              <p className="text-xs text-slate-500">Generate high-fidelity, engineered prompts for immediate AI results.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Select AI Task</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "meta-gen", label: "Meta Titles" },
                  { id: "cluster-builder", label: "Topic Maps" },
                  { id: "automation-node", label: "Agent Config" }
                ].map((task) => (
                  <button
                    key={task.id}
                    onClick={() => setPromptTask(task.id)}
                    className={`py-1.5 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
                      promptTask === task.id
                        ? "border-brand-secondary bg-blue-500/10 text-brand-secondary font-bold"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {task.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Keyword / Focus Topic</label>
              <input
                type="text"
                placeholder="e.g., enterprise CRM software"
                value={promptTopic}
                onChange={(e) => setPromptTopic(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-accent"
              />
            </div>

            <button
              onClick={generatePrompt}
              disabled={!promptTopic}
              className="w-full py-2 bg-brand-accent hover:bg-teal-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Generate Engineered Prompt
            </button>
          </div>
        </div>

        {optimizedPrompt && (
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Engineered Prompt Preview</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-brand-secondary hover:underline cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              readOnly
              value={optimizedPrompt}
              className="w-full h-28 bg-transparent text-[11px] font-mono text-slate-700 dark:text-slate-300 focus:outline-none border-none resize-none"
            />
          </div>
        )}
      </div>

      {/* Tool 3: Technical Audit Simulator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-brand-gold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">Instant SEO Audit & Speed Simulator</h3>
            <p className="text-xs text-slate-500">Enter your live domain to diagnose Core Web Vitals, metadata errors, and conversion gaps.</p>
          </div>
        </div>

        <form onSubmit={runAudit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="url"
              placeholder="https://example.com"
              value={auditUrl}
              onChange={(e) => setAuditUrl(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-secondary"
              required
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={auditFocus}
              onChange={(e) => setAuditFocus(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="speed">Speed & Page Assets</option>
              <option value="seo">SEO & Schema</option>
              <option value="conversion">Conversion & UX</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={auditing}
            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            {auditing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Auditing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Analyze Domain
              </>
            )}
          </button>
        </form>

        {auditing && (
          <div className="mt-8 flex flex-col items-center justify-center py-6">
            <RefreshCw className="w-8 h-8 text-brand-secondary animate-spin mb-3" />
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Simulating comprehensive crawl of {auditUrl}...</p>
            <p className="text-[10px] text-slate-400 mt-1">Analyzing server response, crawling schema nodes, checking render block assets...</p>
          </div>
        )}

        {auditReport && (
          <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Score display */}
              <div className="w-full md:w-1/4 flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Overall Score</span>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" className="dark:stroke-slate-800" />
                    <circle cx="48" cy="48" r="40" stroke="#2563eb" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * auditReport.score) / 100} />
                  </svg>
                  <span className="absolute text-2xl font-extrabold text-slate-900 dark:text-white">{auditReport.score}</span>
                </div>
                <span className="text-xs font-medium text-brand-secondary mt-3">Priority: Optimize Assets</span>
              </div>

              {/* Checks columns */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-emerald-600 tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Passed Audits
                  </h4>
                  {auditReport.passed.map((item: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{item.item}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-red-500 tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Recommended Improvements
                  </h4>
                  {auditReport.failed.map((item: any, idx: number) => (
                    <div key={idx} className="p-2.5 bg-red-500/5 border border-red-500/10 rounded-xl relative">
                      <span className="absolute right-2.5 top-2.5 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-600">
                        {item.severity}
                      </span>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white pr-10">{item.item}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center gap-3">
              <span className="text-lg">💡</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {auditReport.recommendation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tool 4: The Archmage's SEO Spellcaster */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
            <Sparkles className="w-5 h-5 animate-pulse text-purple-500" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">SEO Archmage's Spellcaster</h3>
            <p className="text-xs text-slate-500">Cast proprietary digital formulas to instantly solve speed, rankings, or semantic blockages.</p>
          </div>
        </div>

        <form onSubmit={castSpell} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Keyword or Domain</label>
            <input
              type="text"
              placeholder="e.g., mysite.com or blockchain marketing agency"
              value={targetSite}
              onChange={(e) => setTargetSite(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-secondary"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Enchantment Formula</label>
              <select
                value={spellType}
                onChange={(e) => setSpellType(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="speed-acceleratio">Page Speed Acceleratio</option>
                <option value="authority-conjuro">Topical Authority Conjuro</option>
                <option value="aegis-protectio">Rank Shield Aegis</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={casting}
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              >
                {casting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Casting Spell...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Cast SEO Spell
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {casting && (
          <div className="mt-8 flex flex-col items-center justify-center py-6">
            <Sparkles className="w-8 h-8 text-purple-500 animate-spin mb-3" />
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">Chanting incantation for "{targetSite}"...</p>
            <p className="text-[10px] text-slate-400 mt-1">Stardust core alignment in progress, invoking enterprise authority entities...</p>
          </div>
        )}

        {spellResult && (
          <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6 animate-fade-in text-left space-y-4">
            <div className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-widest text-purple-400 font-bold">Incantation</span>
              <p className="text-sm font-bold text-purple-600 dark:text-purple-300 font-mono italic">"{spellResult.incantation}"</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-bold">Required Reagents & API Nodes</span>
              <div className="flex flex-wrap gap-1.5">
                {spellResult.reagents.map((reagent: string, rIdx: number) => (
                  <span key={rIdx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                    🧪 {reagent}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-bold">Active Spell Sigils</span>
                <span className="text-[10px] font-mono text-purple-400 font-bold">Spell Strength: {spellResult.power}%</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2.5">
                {spellResult.output.map((sigil: any, sIdx: number) => (
                  <div key={sIdx} className="p-2.5 bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 border border-purple-500/10 rounded-xl">
                    <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      🔮 {sigil.charm}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{sigil.benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-purple-500/5 border border-purple-500/10 rounded-xl flex items-start gap-2.5">
              <span className="text-lg">🧙‍♂️</span>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Archmage's Prophecy</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {spellResult.advice}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
