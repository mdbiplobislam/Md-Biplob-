import React, { useState } from "react";
import { GraduationCap, BookOpen, Clock, Award, Star, Download, PlayCircle, CheckCircle2, ChevronDown, Filter, ShieldCheck } from "lucide-react";
import { Course } from "../data";

interface AcademyViewProps {
  courses: Course[];
  courseProgress: Record<string, number>;
  onUpdateProgress: (courseId: string, percentage: number) => void;
  isLoggedIn: boolean;
  setLoginModalOpen: (val: boolean) => void;
}

export function AcademyView({
  courses,
  courseProgress,
  onUpdateProgress,
  isLoggedIn,
  setLoginModalOpen,
}: AcademyViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCourseDetails, setActiveCourseDetails] = useState<string | null>(null);
  const [showCertId, setShowCertId] = useState<string | null>(null);

  const categories = ["all", "SEO", "AI", "WordPress", "Google Ads", "Freelancing", "Business"];

  const filteredCourses = selectedCategory === "all"
    ? courses
    : courses.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleMarkComplete = (courseId: string) => {
    const current = courseProgress[courseId] || 0;
    const next = Math.min(current + 20, 100);
    onUpdateProgress(courseId, next);
  };

  const handleResetProgress = (courseId: string) => {
    onUpdateProgress(courseId, 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-12 animate-fade-in text-left">
      {/* 1. Header Block */}
      <section className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold bg-amber-500/5 px-3 py-1 rounded-full font-mono">
          Online Academy Terminal
        </span>
        <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
          Academy & Tutor LMS Platform
        </h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto">
          Equipping you with the exact technical skills to scale search rankings, design gorgeous code layouts, and wire automated agent flows.
        </p>
      </section>

      {/* 2. LMS Student Dashboard Terminal (Visible to all, encourages login/enrollment) */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-brand-gold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Student Dashboard Workspace</h3>
              <p className="text-[10px] text-slate-400">Manage active tracks, print certificates, and grab lecture spreadsheets.</p>
            </div>
          </div>
          {!isLoggedIn ? (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="px-4 py-1.5 bg-brand-primary dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg cursor-pointer"
            >
              Sign In to Save Progress
            </button>
          ) : (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-mono">
              ● Connected Workspace Active
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => {
            const prog = courseProgress[course.id] ?? (course.id === "seo-masterclass" ? 80 : course.id === "ai-marketing-automation" ? 100 : 20);
            const isCompleted = prog >= 100;

            return (
              <div 
                key={course.id} 
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span className="truncate max-w-[150px]">{course.title}</span>
                    <span className="font-bold">{prog}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${isCompleted ? "bg-emerald-500" : "bg-brand-secondary"}`}
                      style={{ width: `${prog}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold">
                    <button
                      onClick={() => handleMarkComplete(course.id)}
                      disabled={isCompleted}
                      className="py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isCompleted ? "Completed" : "Next Lesson"}
                    </button>
                    {isCompleted ? (
                      <button
                        onClick={() => setShowCertId(course.id)}
                        className="py-1.5 bg-brand-gold/10 text-amber-600 rounded-lg hover:bg-brand-gold/20 transition-colors font-bold cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        Certificate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResetProgress(course.id)}
                        className="py-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer text-center"
                      >
                        Reset Track
                      </button>
                    )}
                  </div>

                  {/* Course downloadables mock */}
                  <div className="pt-2 border-t border-slate-50 dark:border-slate-800/80 flex justify-between items-center text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3 text-brand-accent" />
                      Spreadsheet Assets
                    </span>
                    <a 
                      href="#download" 
                      onClick={(e) => { e.preventDefault(); alert("Lecture notes and sheet templates downloaded successfully!"); }}
                      className="text-brand-secondary hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Course Category Filter Slider */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-brand-secondary" /> Browse Category Catalog
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? "bg-brand-secondary text-white border-brand-secondary"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Course Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course) => {
            const isExpanded = activeCourseDetails === course.id;

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-850 text-slate-400 px-2.5 py-1 rounded">
                      {course.category} Track
                    </span>
                    <span className="text-sm font-black text-brand-secondary font-mono">${course.price}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {course.tagline}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1">⏱️ {course.duration}</span>
                    <span>📚 {course.lessonsCount} Lect.</span>
                  </div>

                  {/* Syllabus / Curriculum Accordion */}
                  <div className="border-t border-slate-50 dark:border-slate-800/80 pt-4">
                    <button
                      onClick={() => setActiveCourseDetails(isExpanded ? null : course.id)}
                      className="w-full flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-secondary transition-colors cursor-pointer"
                    >
                      <span>Explore Core Lesson Chapters</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2 pl-3 border-l-2 border-slate-100 dark:border-slate-800 animate-slide-down">
                        {course.curriculum.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <PlayCircle className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => alert(`Successfully enrolled in ${course.title}! Go to the student dashboard above to study.`)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Custom Printable Certificate Generator Popup */}
      {showCertId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-950 border-4 border-double border-brand-gold max-w-2xl w-full p-8 rounded-2xl shadow-2xl relative text-center space-y-6 animate-scale-up">
            <button
              onClick={() => setShowCertId(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">Certificate of Achievement</span>
              <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">ONLINE ACADEMY VERIFICATION</h2>
            </div>

            <p className="text-xs text-slate-500 italic">This official digital document certifies that</p>
            
            <p className="font-display font-bold text-xl text-brand-primary dark:text-white underline decoration-brand-gold decoration-2 underline-offset-4">
              MD BIPLOB Global Member
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              has successfully completed all modules, practical implementations, and technical worksheets for the enterprise track:
            </p>

            <p className="font-display font-extrabold text-base text-brand-secondary">
              {courses.find((c) => c.id === showCertId)?.title}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-slate-850 text-xs">
              <div className="space-y-1">
                <span className="block font-mono text-[10px] text-slate-400 uppercase">Verification ID</span>
                <span className="font-semibold text-slate-900 dark:text-white">MB-AC-940284</span>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[10px] text-slate-400 uppercase">Authorized Endorsement</span>
                <span className="font-bold text-brand-gold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" /> MD BIPLOB SIGNED
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => { window.print(); }}
                className="px-6 py-2 bg-brand-primary dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Print Certificate PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
