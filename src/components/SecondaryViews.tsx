import React, { useState, useEffect } from "react";
import { 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  ThumbsUp, 
  ShieldCheck, 
  Download, 
  CheckSquare, 
  Clock, 
  Filter, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  HelpCircle,
  Plus,
  MessageSquare,
  Bookmark,
  User,
  Share2,
  Check,
  X,
  Sparkles
} from "lucide-react";
import { BlogPost, Project, CaseStudy, FREE_RESOURCES_DATA } from "../data";

// ================= BLOG VIEW =================
interface BlogViewProps {
  blogs: BlogPost[];
}

export function BlogView({ blogs }: BlogViewProps) {
  // State for blog posts (loaded from localStorage or defaults)
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem("mdb_blogs");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to load mdb_blogs:", e);
      }
    }
    return blogs;
  });

  // State for active article detail view (null means index list)
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest");

  // Local Storage synchronizations for interactive engagement
  const [comments, setComments] = useState<Record<string, { author: string; text: string; date: string }[]>>(() => {
    const stored = localStorage.getItem("mdb_blog_comments");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to load mdb_blog_comments:", e);
      }
    }
    return {
      "blog-1": [
        { author: "Zahid Hasan", text: "This is a masterpiece on topical mapping. I implemented entity clusters and our organic search traffic doubled in 3 weeks!", date: "June 26, 2026" },
        { author: "Sarah Jenkins", text: "Brilliant analysis of Google's semantic index. Do you recommend any automated tools for entity extraction?", date: "June 25, 2026" }
      ],
      "blog-2": [
        { author: "Arman Khan", text: "Excellent guide. The developer instructions for the @google/genai SDK are exactly what I was looking for.", date: "June 20, 2026" }
      ],
      "blog-3": [
        { author: "Michael Chang", text: "Near-instant mobile loads with Elementor are rare. These asset rules work like magic. Thanks Biplob!", date: "June 08, 2026" }
      ]
    };
  });

  const [claps, setClaps] = useState<Record<string, number>>(() => {
    const stored = localStorage.getItem("mdb_blog_claps");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to load mdb_blog_claps:", e);
      }
    }
    return {
      "blog-1": 142,
      "blog-2": 98,
      "blog-3": 174
    };
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const stored = localStorage.getItem("mdb_blog_bookmarks");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Failed to load mdb_blog_bookmarks:", e);
      }
    }
    return [];
  });

  // Composer panel state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    category: "SEO",
    readTime: "5 Min Read",
    excerpt: "",
    content: "",
    author: "MD BIPLOB"
  });

  // Comments form state
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Toast notice state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state modifications to localStorage
  useEffect(() => {
    localStorage.setItem("mdb_blogs", JSON.stringify(allBlogs));
  }, [allBlogs]);

  useEffect(() => {
    localStorage.setItem("mdb_blog_comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("mdb_blog_claps", JSON.stringify(claps));
  }, [claps]);

  useEffect(() => {
    localStorage.setItem("mdb_blog_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Utility toast dispatcher
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Upvote clapping action
  const handleClap = (id: string) => {
    setClaps(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    showToast("👏 Clapped for this article!");
  };

  // Bookmarking action
  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(prev => prev.filter(bId => bId !== id));
      showToast("🔖 Removed from bookmarks");
    } else {
      setBookmarks(prev => [...prev, id]);
      showToast("🔖 Saved to reading list");
    }
  };

  // Article Publishing Logic
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.excerpt.trim()) {
      alert("Please fill in all composition fields before publishing.");
      return;
    }

    const createdPost: BlogPost = {
      id: `blog-custom-${Date.now()}`,
      title: newPost.title.trim(),
      category: newPost.category,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: newPost.readTime.trim() || "5 Min Read",
      excerpt: newPost.excerpt.trim(),
      content: newPost.content.trim(),
      author: newPost.author.trim() || "MD BIPLOB"
    };

    setAllBlogs(prev => [createdPost, ...prev]);
    setIsComposerOpen(false);
    setNewPost({
      title: "",
      category: "SEO",
      readTime: "5 Min Read",
      excerpt: "",
      content: "",
      author: "MD BIPLOB"
    });
    showToast("🚀 Strategy Guide published successfully!");
  };

  // Comment Posting Logic
  const handlePostComment = (e: React.FormEvent, blogId: string) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      author: commentName.trim(),
      text: commentText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    };

    setComments(prev => ({
      ...prev,
      [blogId]: [...(prev[blogId] || []), newComment]
    }));

    setCommentName("");
    setCommentText("");
    showToast("💬 Comment posted to thread");
  };

  // Copy shareable link simulation
  const handleShare = (title: string) => {
    const fakeUrl = `${window.location.origin}/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    navigator.clipboard.writeText(fakeUrl).then(() => {
      showToast("🔗 Article link copied to clipboard!");
    }).catch(() => {
      showToast("🔗 Copying not supported on this browser context");
    });
  };

  // Filter and sort blog index list
  const filteredBlogs = allBlogs.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || 
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Sort array depending on criteria
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === "popular") {
      const clapsA = claps[a.id] || 0;
      const clapsB = claps[b.id] || 0;
      return clapsB - clapsA;
    } else if (sortBy === "oldest") {
      return a.id.localeCompare(b.id);
    } else {
      // default: newest first (custom are chronologically newer, default sorted by id desc)
      return b.id.localeCompare(a.id);
    }
  });

  const categories = ["all", "SEO", "AI", "WordPress", "Client Strategy"];
  const activeBlog = allBlogs.find(b => b.id === activeBlogId);

  // Helper color gradient class mapper based on categories
  const getCategoryTheme = (cat: string) => {
    const normalized = cat.toLowerCase();
    if (normalized === "seo") {
      return {
        badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/10",
        bg: "from-blue-600 to-indigo-700",
        border: "border-blue-150 dark:border-blue-900/30",
        hover: "group-hover:text-blue-600",
        accent: "text-blue-500"
      };
    }
    if (normalized === "ai") {
      return {
        badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/10",
        bg: "from-purple-600 to-indigo-800",
        border: "border-purple-150 dark:border-purple-900/30",
        hover: "group-hover:text-purple-600",
        accent: "text-purple-500"
      };
    }
    if (normalized === "wordpress") {
      return {
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10",
        bg: "from-amber-500 to-orange-600",
        border: "border-amber-150 dark:border-amber-900/30",
        hover: "group-hover:text-amber-600",
        accent: "text-amber-500"
      };
    }
    return {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10",
      bg: "from-emerald-600 to-teal-800",
      border: "border-emerald-150 dark:border-emerald-900/30",
      hover: "group-hover:text-emerald-600",
      accent: "text-emerald-500"
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-2 space-y-10 animate-fade-in text-left relative">
      {/* Absolute Toast Notification node */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-850 dark:border-slate-100 animate-slide-up text-xs font-bold">
          <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Reader View Context */}
      {activeBlog ? (
        <div className="space-y-8 animate-fade-in">
          {/* Back Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-4">
            <button
              onClick={() => { setActiveBlogId(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xs font-bold text-slate-500 hover:text-brand-secondary transition-colors cursor-pointer flex items-center gap-1.5 py-1.5"
            >
              ← Back to Authority Journal
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">Bookmark Post</span>
              <button
                onClick={() => toggleBookmark(activeBlog.id)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  bookmarks.includes(activeBlog.id)
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                    : "border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare(activeBlog.title)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                title="Share Article Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Immersive Splash Hero Header */}
          <section className={`rounded-2xl p-6 md:p-10 text-white bg-gradient-to-br ${getCategoryTheme(activeBlog.category).bg} relative overflow-hidden border ${getCategoryTheme(activeBlog.category).border} shadow-md`}>
            <div className="absolute inset-0 bg-slate-950/20 mix-blend-overlay" />
            <div className="relative space-y-4 max-w-4xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-white/20 rounded-full">
                {activeBlog.category}
              </span>
              <h1 className="font-display font-black text-2xl sm:text-4xl leading-tight">
                {activeBlog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/80 font-mono">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> By {activeBlog.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Published {activeBlog.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {activeBlog.readTime}</span>
              </div>
            </div>
          </section>

          {/* Primary Layout Block split into content and sidebar actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Main formatted content panel */}
            <article className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Introduction callout */}
              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border-l-4 border-brand-secondary text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{activeBlog.excerpt}"
              </div>

              {/* Rich parser of markdown mock */}
              <div className="space-y-5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                {activeBlog.content.split("\n\n").map((para, index) => {
                  const trimmed = para.trim();
                  
                  // Check if header
                  if (trimmed.startsWith("#")) {
                    const level = trimmed.match(/^#+/)?.[0].length || 1;
                    const text = trimmed.replace(/^#+\s*/, "");
                    if (level === 1) {
                      return <h2 key={index} className="font-display font-extrabold text-xl text-slate-900 dark:text-white pt-4">{text}</h2>;
                    }
                    return <h3 key={index} className="font-display font-bold text-base text-slate-900 dark:text-white pt-3">{text}</h3>;
                  }

                  // Check if blockquote
                  if (trimmed.startsWith(">")) {
                    const text = trimmed.replace(/^>\s*/, "");
                    return (
                      <div key={index} className="p-4 my-4 bg-blue-500/5 dark:bg-blue-500/10 border-l-4 border-brand-accent text-xs font-medium text-slate-700 dark:text-slate-300 rounded-r-xl">
                        {text}
                      </div>
                    );
                  }

                  // Standard paragraphs
                  return <p key={index} className="indent-0">{trimmed}</p>;
                })}
              </div>

              {/* Interactive Bottom Engagement Module */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleClap(activeBlog.id)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-secondary to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-102"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Clap for Guide ({claps[activeBlog.id] || 0})</span>
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">Show appreciation to author!</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      showToast("🔗 Shared to Twitter (simulated)");
                    }}
                    className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold rounded-lg text-slate-600 dark:text-slate-400 transition-all cursor-pointer"
                  >
                    Twitter
                  </button>
                  <button 
                    onClick={() => {
                      showToast("🔗 Shared to LinkedIn (simulated)");
                    }}
                    className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold rounded-lg text-slate-600 dark:text-slate-400 transition-all cursor-pointer"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

            </article>

            {/* Right side: Comments system sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Comment listing box */}
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-4.5 h-4.5 text-brand-secondary" />
                    <span>Technical Discussions</span>
                  </h3>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {(comments[activeBlog.id] || []).length}
                  </span>
                </div>

                {/* Comment feeds container */}
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                  {((comments[activeBlog.id]) || []).length === 0 ? (
                    <div className="text-center py-6 text-slate-400 space-y-1.5">
                      <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-[11px] font-medium">No comments posted yet.</p>
                      <p className="text-[9.5px]">Be the first to start the engineering debrief below!</p>
                    </div>
                  ) : (
                    (comments[activeBlog.id] || []).map((cmt, idx) => {
                      const initials = cmt.author.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
                      const colors = [
                        "bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-amber-500", "bg-teal-500", "bg-rose-500"
                      ];
                      const avatarBg = colors[idx % colors.length];

                      return (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-850/60 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800 text-left">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-extrabold ${avatarBg}`}>
                              {initials}
                            </div>
                            <div className="flex-1">
                              <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200 block leading-tight">{cmt.author}</span>
                              <span className="text-[9px] text-slate-400 font-mono">{cmt.date}</span>
                            </div>
                          </div>
                          <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-normal pl-1.5">
                            {cmt.text}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Post comment form */}
                <form onSubmit={(e) => handlePostComment(e, activeBlog.id)} className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-1.5">
                    <label className="block text-[9.5px] font-bold uppercase text-slate-400 font-mono">Your Name / Handle</label>
                    <input
                      type="text"
                      placeholder="e.g., Engineer Zahid"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-950 dark:text-white focus:outline-none focus:border-brand-secondary"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[9.5px] font-bold uppercase text-slate-400 font-mono">Comment Content</label>
                    <textarea
                      placeholder="Ask a technical question or add your strategic feedback..."
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-950 dark:text-white focus:outline-none focus:border-brand-secondary resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-955 text-xs font-bold rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    Submit Debrief Comment
                  </button>
                </form>
              </div>

              {/* Secure Compliance notice widget */}
              <div className="p-4 border border-blue-500/10 bg-blue-500/5 rounded-xl flex items-start gap-2.5 text-xs text-slate-500">
                <ShieldCheck className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[10.5px]">
                  Comment submissions are client-side filtered for spam protection under MD BIPLOB standard security templates.
                </p>
              </div>

            </div>

          </div>
        </div>
      ) : (
        // Blog Index List View
        <div className="space-y-10 animate-fade-in">
          
          {/* Top Main Banner & dynamic statistics dashboard */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-150 dark:border-slate-850 pb-8">
            <div className="space-y-2 text-left">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary bg-blue-500/5 px-3 py-1 rounded-full font-mono">
                Ecosystem Insights
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                The Authority Journal
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Step-by-step technical blueprints, system guides, algorithm breakdowns, and search positioning models written by MD BIPLOB.
              </p>
            </div>

            {/* Strategy Composer activation button */}
            <button
              onClick={() => setIsComposerOpen(!isComposerOpen)}
              className="px-4 py-2.5 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer self-start md:self-auto shrink-0"
            >
              {isComposerOpen ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Close Compose Panel</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 animate-pulse" />
                  <span>Compose Strategy Guide</span>
                </>
              )}
            </button>
          </section>

          {/* Metrics Analytics Widget */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-855 p-4 rounded-2xl text-center">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Core Playbooks</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">{allBlogs.length}</span>
            </div>
            <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Community Claps</span>
              <span className="text-lg font-extrabold text-brand-secondary">
                {Object.keys(claps).reduce((sum, key) => sum + (claps[key] || 0), 0)}
              </span>
            </div>
            <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Discussion Comments</span>
              <span className="text-lg font-extrabold text-brand-accent">
                {Object.keys(comments).reduce((sum, key) => sum + (comments[key]?.length || 0), 0)}
              </span>
            </div>
            <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Saved Guides</span>
              <span className="text-lg font-extrabold text-amber-500">{bookmarks.length}</span>
            </div>
          </section>

          {/* Animated Write-A-Post composing panel block */}
          {isComposerOpen && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl animate-slide-down grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form details */}
              <form onSubmit={handlePublish} className="space-y-4 lg:col-span-7">
                <h3 className="font-display font-black text-lg text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <Plus className="w-5 h-5 text-brand-secondary" />
                  <span>Draft New Authority Article</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase font-mono">Article Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Vector Embeddings & Shopify SEO"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-855 text-slate-900 dark:text-white focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase font-mono">Category Node</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-855 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="SEO">SEO (Search Engine Optimization)</option>
                      <option value="AI">AI & Machine Automation</option>
                      <option value="WordPress">WordPress / Elementor Layouts</option>
                      <option value="Client Strategy">Client Strategy & SOPs</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase font-mono">Read Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 5 Min Read"
                      value={newPost.readTime}
                      onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-855 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase font-mono">Author Node</label>
                    <input
                      type="text"
                      placeholder="e.g., MD BIPLOB"
                      value={newPost.author}
                      onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-855 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase font-mono">Short Excerpt (Card Preview Text)</label>
                  <input
                    type="text"
                    placeholder="Provide a compelling 1-sentence outline of what the reader will achieve..."
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-855 text-slate-900 dark:text-white focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase font-mono">Full Content (Supports Paragraph breaks)</label>
                  <span className="text-[9px] text-slate-400 block pb-1">Tip: Use double enter to separate paragraphs. Use "# " for subheadings and "&gt; " for callouts.</span>
                  <textarea
                    placeholder="Write your high-ticket technical knowledge here. Add full steps, SOP lists, or instructions..."
                    rows={8}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-855 text-slate-900 dark:text-white focus:outline-none resize-none font-mono"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish & Push to Feed Node</span>
                </button>
              </form>

              {/* Live Card Mockup sidebar preview */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Instant Live Grid Preview</span>
                </h4>

                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-5 shadow-sm text-left space-y-3 pointer-events-none opacity-80 scale-98 transition-all">
                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span className="font-bold text-brand-secondary uppercase">{newPost.category || "SEO"}</span>
                    <span>⏱️ {newPost.readTime || "5 Min Read"}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {newPost.title || "Your Engaging Title Here..."}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {newPost.excerpt || "Your compelling, brief outline snippet will dynamically update and render in this block."}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[9.5px] font-mono text-slate-400">
                    <span>By {newPost.author || "MD BIPLOB"}</span>
                    <span className="text-brand-secondary font-bold hover:underline flex items-center gap-0.5">
                      Read Guide →
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-[10.5px] text-slate-500 leading-normal">
                  Our system stores newly written articles directly inside the secure browser local environment. Cleared cache may reset state.
                </div>
              </div>

            </div>
          )}

          {/* Filtering, Search & Sorting Controls Grid */}
          <section className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="w-full md:w-72 flex items-center gap-2.5 px-3 py-2 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search blueprints, codes, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-xs text-slate-950 dark:text-white focus:outline-none placeholder-slate-400 w-full"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category horizontal scroll */}
            <div className="flex gap-1.5 overflow-x-auto max-w-full no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer capitalize shrink-0 ${
                    selectedCategory === cat
                      ? "bg-brand-secondary text-white border-brand-secondary"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {cat === "all" ? "All Modules" : cat}
                </button>
              ))}
            </div>

            {/* Sorting Select drop */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest Guides</option>
                <option value="oldest">Historical Order</option>
                <option value="popular">Popular (Most Clapped)</option>
              </select>
            </div>

          </section>

          {/* Core Blog Article Feed Grid */}
          <section className="space-y-6">
            {sortedBlogs.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">No Strategy Guides Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We couldn't match your keyword/filter constraints. Try resetting the criteria or drafting a custom technical guide.
                </p>
                <button
                  onClick={() => { setSelectedCategory("all"); setSearchQuery(""); setSortBy("newest"); }}
                  className="px-4 py-2 bg-brand-secondary text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-blue-700"
                >
                  Reset Filtering Queries
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedBlogs.map((post) => {
                  const commentsCount = (comments[post.id] || []).length;
                  const clapsCount = claps[post.id] || 0;
                  const isBookmarked = bookmarks.includes(post.id);
                  const theme = getCategoryTheme(post.category);

                  return (
                    <article 
                      key={post.id} 
                      className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all flex flex-col justify-between text-left group"
                    >
                      <div className="space-y-3.5">
                        {/* Meta Category and bookmark */}
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                          <span className={`font-extrabold px-2 py-0.5 rounded border uppercase ${theme.badge}`}>
                            {post.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span>⏱️ {post.readTime}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(post.id);
                              }}
                              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer ${
                                isBookmarked ? "text-amber-500" : "text-slate-300 hover:text-slate-500"
                              }`}
                              title={isBookmarked ? "Remove bookmark" : "Bookmark guide"}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Title click enters reader */}
                        <h2 
                          onClick={() => { setActiveBlogId(post.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className={`font-display font-black text-sm text-slate-950 dark:text-white group-hover:text-brand-secondary cursor-pointer transition-colors leading-snug line-clamp-2`}
                        >
                          {post.title}
                        </h2>

                        {/* Description excerpt */}
                        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer: Date / Claps / Comments Count & Action */}
                      <div className="mt-5 pt-3 border-t border-slate-50 dark:border-slate-850 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                          <span>{post.date}</span>
                          {clapsCount > 0 && (
                            <span className="flex items-center gap-0.5 text-slate-500">
                              👏 {clapsCount}
                            </span>
                          )}
                          {commentsCount > 0 && (
                            <span className="flex items-center gap-0.5 text-slate-500">
                              💬 {commentsCount}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => { setActiveBlogId(post.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="text-xs font-bold text-brand-secondary hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          Read Guide →
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* Saved Guides Panel if any bookmarks exist */}
          {bookmarks.length > 0 && (
            <section className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl space-y-3 text-left">
              <h3 className="font-display font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 font-mono uppercase tracking-wider">
                <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Your Saved Reading List ({bookmarks.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bookmarks.map((bId) => {
                  const bPost = allBlogs.find((x) => x.id === bId);
                  if (!bPost) return null;
                  return (
                    <div 
                      key={bId}
                      onClick={() => { setActiveBlogId(bId); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="p-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl hover:border-amber-300 dark:hover:border-amber-800 transition-all cursor-pointer flex justify-between items-center"
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200 line-clamp-1">{bPost.title}</span>
                        <span className="text-[9.5px] text-slate-400 uppercase font-mono">{bPost.category} • {bPost.readTime}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}

// ================= PORTFOLIO VIEW =================
interface PortfolioViewProps {
  projects: Project[];
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}
export function PortfolioView({ projects, selectedProjectId, setSelectedProjectId }: PortfolioViewProps) {
  const activeProj = projects.find((p) => p.id === selectedProjectId) || null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-12 animate-fade-in text-left">
      {activeProj ? (
        <div className="space-y-10 animate-fade-in">
          <button
            onClick={() => setSelectedProjectId(null)}
            className="text-xs font-semibold text-slate-400 hover:text-brand-secondary transition-colors cursor-pointer flex items-center gap-1"
          >
            ← Back to Works
          </button>

          <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden border border-slate-800">
            <span className="text-[10px] font-mono text-brand-accent uppercase font-bold tracking-widest">{activeProj.category}</span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl mt-2">{activeProj.title}</h1>
            <p className="text-xs text-slate-400 mt-1">Client partner: {activeProj.client}</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">1. The Challenge (Problem)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{activeProj.problem}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">2. Competitive Research</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{activeProj.research}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">3. Strategic Deployment</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{activeProj.strategy}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">4. Core Implementation Phases</h3>
                <ul className="space-y-2.5 pl-4 list-decimal text-xs text-slate-600 dark:text-slate-400">
                  {activeProj.implementation.map((phase, i) => (
                    <li key={i} className="leading-relaxed">{phase}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Engineered Outcomes</span>
                <div className="space-y-2">
                  {activeProj.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-150 dark:border-slate-850">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Stack Applied</span>
                <div className="flex flex-wrap gap-1">
                  {activeProj.tools.map((tool, i) => (
                    <span key={i} className="text-[10px] font-mono bg-blue-500/10 text-brand-secondary px-2 py-0.5 rounded font-bold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-150 dark:border-slate-850 italic text-xs text-slate-500">
                "{activeProj.testimonial.content}"
                <span className="block mt-2 font-bold text-[10px] text-slate-400 uppercase font-mono">
                  — {activeProj.testimonial.author}, {activeProj.testimonial.role}
                </span>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-12 animate-fade-in">
          <section className="text-center space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary bg-blue-500/5 px-3 py-1 rounded-full font-mono">
              Ecosystem Portfolio
            </span>
            <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
              Enterprise Project Files
            </h1>
            <p className="text-xs text-slate-500">Documented blueprints outlining how we design traffic, automation, and speed solutions.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>Client: {proj.client}</span>
                    <span className="bg-brand-secondary/10 text-brand-secondary px-2 py-0.5 rounded uppercase font-bold">{proj.category}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {proj.problem}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProjectId(proj.id)}
                  className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  Explore Project File
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ================= CASE STUDIES VIEW =================
interface CaseStudiesViewProps {
  cases: CaseStudy[];
}
export function CaseStudiesView({ cases }: CaseStudiesViewProps) {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  const selectedCase = cases.find((c) => c.id === activeCaseId) || null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-12 animate-fade-in text-left">
      {selectedCase ? (
        <div className="space-y-10 animate-fade-in">
          <button
            onClick={() => setActiveCaseId(null)}
            className="text-xs font-semibold text-slate-400 hover:text-brand-secondary transition-colors cursor-pointer flex items-center gap-1"
          >
            ← Back to Case Studies
          </button>

          <section className="p-6 md:p-8 bg-slate-900 rounded-2xl border border-slate-850 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[9px] uppercase tracking-wider bg-brand-secondary text-white px-2 py-0.5 rounded font-mono font-bold">
                Enterprise Case file
              </span>
              <h1 className="font-display font-extrabold text-2xl mt-2">{selectedCase.title}</h1>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-brand-accent font-display">{selectedCase.metric}</span>
              <p className="text-[10px] text-slate-400 font-mono font-bold uppercase mt-1">{selectedCase.metricLabel}</p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">1. Core Bottlenecks & Challenge</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{selectedCase.challenge}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">2. Action Auditing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{selectedCase.audit}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">3. Proposed Growth Strategy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{selectedCase.strategy}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">4. Chronological Execution</h3>
              <ul className="space-y-2 pl-4 list-disc text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedCase.execution.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">5. compounding Organic Growth</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{selectedCase.growth}</p>
            </div>

            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-2">
              <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-brand-secondary" /> Key Strategic Lessons learned
              </h4>
              <ul className="space-y-1.5 pl-4 list-decimal text-xs text-slate-700 dark:text-slate-300">
                {selectedCase.lessons.map((lesson, i) => (
                  <li key={i} className="leading-relaxed">{lesson}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-12 animate-fade-in">
          <section className="text-center space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent bg-teal-500/5 px-3 py-1 rounded-full font-mono">
              Growth Blueprints
            </span>
            <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
              Case Study Dossiers
            </h1>
            <p className="text-xs text-slate-500">Unpacking deep-dive operational reviews. Verifiable metrics showing how we scale pipelines.</p>
          </section>

          <div className="grid grid-cols-1 gap-6">
            {cases.map((cs) => (
              <div 
                key={cs.id} 
                className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white hover:text-brand-secondary transition-colors cursor-pointer" onClick={() => setActiveCaseId(cs.id)}>
                    {cs.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-50 dark:border-slate-800">
                  <div className="text-left md:text-right">
                    <span className="text-2xl font-black text-brand-accent font-display">{cs.metric}</span>
                    <p className="text-[9px] text-slate-400 uppercase font-mono font-bold">{cs.metricLabel}</p>
                  </div>
                  <button
                    onClick={() => setActiveCaseId(cs.id)}
                    className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1 hover:opacity-90"
                  >
                    View Dossier
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ================= FREE RESOURCES VIEW =================
export function FreeResourcesView() {
  const [emailsCollected, setEmailsCollected] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentResource, setCurrentResource] = useState<string | null>(null);

  const handleDownloadTrigger = (resTitle: string) => {
    setCurrentResource(resTitle);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmail.trim()) return;

    setEmailsCollected([...emailsCollected, currentEmail]);
    alert(`Success! We have unlocked access to "${currentResource}". Your high-resolution spreadsheet copy has been emailed directly to: ${currentEmail}`);
    setCurrentEmail("");
    setCurrentResource(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-12 animate-fade-in text-left">
      <section className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold bg-amber-500/5 px-3 py-1 rounded-full font-mono">
          Free Strategy Leads
        </span>
        <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
          Exclusive Lead Magnets & Playbooks
        </h1>
        <p className="text-xs text-slate-500">Unlocking professional spreadsheet structures and SOP guidelines directly. Enter your email to grant access.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FREE_RESOURCES_DATA.map((res) => (
          <div 
            key={res.id} 
            className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400 uppercase">
                <span>{res.type}</span>
                <span className="text-brand-accent">📥 {res.downloads} Grabbed</span>
              </div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug">
                {res.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {res.desc}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleDownloadTrigger(res.title)}
                className="w-full py-2 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Asset Free
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lead capture modal */}
      {currentResource && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 text-center space-y-4 animate-scale-up">
            <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">Unlock Digital Asset Access</h3>
            <p className="text-xs text-slate-500">To download <strong>"{currentResource}"</strong>, enter your professional work email below.</p>
            
            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="you@company.com"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-950 dark:text-white focus:outline-none"
                required
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentResource(null)}
                  className="flex-1 py-2 bg-slate-50 dark:bg-slate-850 text-slate-500 rounded-lg text-xs font-bold cursor-pointer hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-brand-secondary text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-700"
                >
                  Unlock spreadsheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= CONTACT VIEW =================
export function ContactView() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");

  const slots = ["Mon - 10:00 AM EST", "Mon - 02:00 PM EST", "Wed - 11:00 AM EST", "Thu - 04:00 PM EST"];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    alert(`Strategic session requested successfully! We have reserved "${selectedSlot || "ASAP Review Slot"}" for ${formName}. A private calendar invite link has been emailed to: ${formEmail}`);
    setFormName("");
    setFormEmail("");
    setFormMsg("");
    setSelectedSlot(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-12 animate-fade-in text-left">
      <section className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary bg-blue-500/5 px-3 py-1 rounded-full font-mono">
          Communication Terminal
        </span>
        <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
          Secure Your Strategic Consultation
        </h1>
        <p className="text-xs text-slate-500">Submit an agency proposal brief or reserve a private calendar slot directly.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Social redirects */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Submit Project Brief</h3>
          
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g., Mark J."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  placeholder="e.g., mark@company.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Simulated Calendar Scheduler */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300">Select Available Strategy Slot (Optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 text-[10px] font-semibold border rounded-lg transition-all cursor-pointer ${
                      selectedSlot === slot
                        ? "border-brand-secondary bg-blue-500/5 text-brand-secondary font-bold"
                        : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">Project Brief / Scope Details</label>
              <textarea
                placeholder="Briefly describe your traffic benchmarks, site tech, or pipeline bottlenecks..."
                rows={4}
                value={formMsg}
                onChange={(e) => setFormMsg(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-primary dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg cursor-pointer hover:opacity-90 transition-colors"
            >
              Submit Brief & Request Invite
            </button>
          </form>
        </div>

        {/* Right Column: Instant social handles */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-150 dark:border-slate-800 space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Instant Channels</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Need answers immediately? Reach our direct desk via authenticated social links:</p>
            
            <div className="space-y-2 text-xs font-semibold">
              <a 
                href="https://wa.me/something" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-emerald-500/10 text-emerald-600 rounded-lg hover:bg-emerald-500/20 transition-colors"
              >
                <span>💬 WhatsApp Strategic Desk</span>
                <span>Connect →</span>
              </a>
              <a 
                href="https://m.me/something" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-blue-500/10 text-brand-secondary rounded-lg hover:bg-blue-500/20 transition-colors"
              >
                <span>👤 Facebook Messenger</span>
                <span>Chat →</span>
              </a>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg flex justify-between items-center">
                <span>📧 support@mdbiplob.com</span>
                <span className="font-mono text-[9px] text-slate-400 font-bold uppercase">Average response: 2h</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-blue-500/10 bg-blue-500/5 rounded-xl flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-5 h-5 text-brand-accent shrink-0 mt-0.5 animate-pulse" />
            <p className="leading-relaxed">
              Your details are managed securely under MD BIPLOB strict enterprise NDA agreements. We never sell or share raw proposal details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= LEGAL VIEW =================
export function LegalView() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8 animate-fade-in text-left">
      <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Legal Disclosures & Schema Configurations</h1>
      
      <div className="space-y-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">1. Terms of Service</h3>
          <p>
            By accessing the files, toolkits, and academy resources hosted on <code>mdbiplob.com</code>, you agree to adhere to strict single-user licensing terms. Any secondary redistribution, resale, or white-labeling of the digital assets without written consent from MD BIPLOB is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">2. Privacy & Cookie Policies</h3>
          <p>
            We process lead magnet email addresses solely to deliver technical checklists and strategic insights. We utilize secure, cookie-less browser analytics to optimize Core Web Vitals speed performance and layout conversions.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">3. Search Schema & Entity Mapping</h3>
          <p>
            This website incorporates structured microdata JSON-LD schemas representing MD BIPLOB as a registered <code>ProfessionalService</code>, <code>Consultant</code>, and <code>EducationalOrganization</code>.
          </p>
          <pre className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-[10px] font-mono overflow-x-auto text-slate-500">
{`{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "MD BIPLOB",
  "url": "https://mdbiplob.com",
  "logo": "https://mdbiplob.com/logo.png",
  "sameAs": [
    "https://linkedin.com/in/mdbiplob",
    "https://github.com/mdbiplob"
  ]
}`}
          </pre>
        </section>
      </div>
    </div>
  );
}
