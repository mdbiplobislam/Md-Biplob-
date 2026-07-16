import React, { useState, useEffect } from "react";
import { 
  Folder, 
  File, 
  Upload, 
  Trash2, 
  Search, 
  Sparkles, 
  Lock, 
  LogOut, 
  ArrowRight, 
  Plus, 
  FileText, 
  Image, 
  Video, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Database,
  RefreshCw,
  HardDrive
} from "lucide-react";
import { User } from "firebase/auth";
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  listDriveFiles, 
  createFolder, 
  uploadFileToDrive, 
  deleteFileFromDrive, 
  DriveFile 
} from "../lib/driveService";

export function DriveVaultView() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // File operations states
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [folderHistory, setFolderHistory] = useState<{ id: string; name: string }[]>([
    { id: "root", name: "My Drive" }
  ]);

  // Upload state
  const [uploading, setUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Modal / Interaction states
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [showFolderModal, setShowFolderModal] = useState<boolean>(false);
  const [creatingFolder, setCreatingFolder] = useState<boolean>(false);
  const [deleteConfirmFile, setDeleteConfirmFile] = useState<DriveFile | null>(null);
  const [deletingFile, setDeletingFile] = useState<boolean>(false);

  // Automated custom campaigns creation
  const [campaignCreating, setCampaignCreating] = useState<boolean>(false);
  const [campaignSuccess, setCampaignSuccess] = useState<boolean>(false);

  // Initialize Auth listeners
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setLoading(false);
        fetchFiles(accessToken, "root");
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch file directory
  const fetchFiles = async (accessToken: string, folderId: string, searchVal?: string) => {
    setLoadingFiles(true);
    setError(null);
    try {
      const driveFiles = await listDriveFiles(accessToken, searchVal, folderId);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error("Fetch files error:", err);
      setError(err?.message || "Failed to list Google Drive files.");
    } finally {
      setLoadingFiles(false);
    }
  };

  // Sign in Trigger
  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        fetchFiles(result.accessToken, "root");
      }
    } catch (err: any) {
      console.error("Sign-in failed:", err);
      setError(err?.message || "Sign-in authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Sign out Trigger
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      setToken(null);
      setFiles([]);
      setFolderHistory([{ id: "root", name: "My Drive" }]);
      setCurrentFolderId("root");
    } catch (err: any) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search Files Trigger
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      fetchFiles(token, currentFolderId, searchQuery);
    }
  };

  // Reset Search
  const handleResetSearch = () => {
    setSearchQuery("");
    if (token) {
      fetchFiles(token, currentFolderId, "");
    }
  };

  // Navigate deeper into a subfolder
  const handleNavigateFolder = (folderId: string, folderName: string) => {
    const updatedHistory = [...folderHistory, { id: folderId, name: folderName }];
    setFolderHistory(updatedHistory);
    setCurrentFolderId(folderId);
    if (token) {
      fetchFiles(token, folderId);
    }
  };

  // Navigate to previous folders via breadcrumbs
  const handleBreadcrumbClick = (index: number) => {
    const updatedHistory = folderHistory.slice(0, index + 1);
    const targetFolder = updatedHistory[updatedHistory.length - 1];
    setFolderHistory(updatedHistory);
    setCurrentFolderId(targetFolder.id);
    if (token) {
      fetchFiles(token, targetFolder.id);
    }
  };

  // Create a new folder
  const handleCreateFolderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newFolderName.trim()) return;

    setCreatingFolder(true);
    try {
      await createFolder(token, newFolderName, currentFolderId);
      setShowFolderModal(false);
      setNewFolderName("");
      fetchFiles(token, currentFolderId);
    } catch (err: any) {
      setError(err?.message || "Failed to create folder.");
    } finally {
      setCreatingFolder(false);
    }
  };

  // Create standard multi-folder SEO campaign structure in parent folder
  const handleCreateSeoCampaignStructure = async () => {
    if (!token) return;
    setCampaignCreating(true);
    setCampaignSuccess(false);
    setError(null);

    try {
      // 1. Create Main Campaign Folder
      const mainFolderId = await createFolder(token, "MD Biplob SEO Campaign 🚀", currentFolderId);
      
      // 2. Create subfolders
      await createFolder(token, "1. Site Audits & Technical Reports 📄", mainFolderId);
      await createFolder(token, "2. Keyword Clusters & Mapping 🎯", mainFolderId);
      await createFolder(token, "3. Content Briefs & Copy ✍️", mainFolderId);
      await createFolder(token, "4. Competitor Backlink Gap Graphs 🔗", mainFolderId);

      setCampaignSuccess(true);
      fetchFiles(token, currentFolderId);
      
      // Reset success status after a delay
      setTimeout(() => setCampaignSuccess(false), 5000);
    } catch (err: any) {
      setError(err?.message || "Failed to create full campaign folder structure.");
    } finally {
      setCampaignCreating(false);
    }
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0] && token) {
      const file = e.dataTransfer.files[0];
      await handleUpload(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && token) {
      const file = e.target.files[0];
      await handleUpload(file);
    }
  };

  // Upload actual file to Drive
  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      await uploadFileToDrive(token!, file, currentFolderId);
      fetchFiles(token!, currentFolderId);
    } catch (err: any) {
      setError(err?.message || "Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  // Delete file (requires user confirmation)
  const handleDeleteFileConfirm = async () => {
    if (!token || !deleteConfirmFile) return;

    setDeletingFile(true);
    try {
      await deleteFileFromDrive(token, deleteConfirmFile.id);
      setDeleteConfirmFile(null);
      fetchFiles(token, currentFolderId);
    } catch (err: any) {
      setError(err?.message || "Failed to delete file.");
    } finally {
      setDeletingFile(false);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType === "application/vnd.google-apps.folder") {
      return <Folder className="w-8 h-8 text-amber-400 fill-amber-400" />;
    }
    if (mimeType.includes("image")) {
      return <Image className="w-8 h-8 text-emerald-500" />;
    }
    if (mimeType.includes("video")) {
      return <Video className="w-8 h-8 text-pink-500" />;
    }
    if (mimeType.includes("pdf") || mimeType.includes("document") || mimeType.includes("vnd.google-apps.document")) {
      return <FileText className="w-8 h-8 text-blue-500" />;
    }
    return <File className="w-8 h-8 text-slate-400" />;
  };

  const formatSize = (bytesStr?: string) => {
    if (!bytesStr) return "N/A";
    const bytes = parseInt(bytesStr, 10);
    if (isNaN(bytes)) return "N/A";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Format modification timestamps
  const formatTimestamp = (timeStr?: string) => {
    if (!timeStr) return "N/A";
    return new Date(timeStr).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-left relative" id="drive-vault-stage">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-purple-400" /> Google Workspace Integration
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Enchanted SEO Drive Vault
          </h1>
          <p className="text-xs text-slate-500 max-w-xl">
            Securely link your Google Drive to store, structure, and download strategic SEO checklists, keyword audit maps, and client asset files automatically.
          </p>
        </div>

        {user && token && (
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-2xl border border-slate-150 dark:border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center font-bold text-purple-400 border border-purple-500/20 shadow-sm">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ""} className="w-full h-full rounded-xl object-cover referrerPolicy='no-referrer'" />
              ) : (
                user.email?.[0].toUpperCase()
              )}
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200">{user.displayName || "Drive Custodian"}</p>
              <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer"
              title="Disconnect Google Drive"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        )}
      </div>

      {/* Error notification alert */}
      {error && (
        <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-xs rounded-xl flex items-start gap-2.5 animate-shake">
          <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Integration Encountered an Issue</p>
            <p className="text-red-400 mt-1 leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Initial state: Locked / Not signed in with Google */}
      {!user || !token ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-3xl shadow-xl text-center space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/10 animate-pulse">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-sm">
            <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Activate Your Secure Vault</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Connect your Google Workspace account with read, write, and file-creation permissions to organize organic SEO growth assets inside your own drive container.
            </p>
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="gsi-material-button relative cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 py-3 px-6 font-semibold text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                Contacting Google Identity Service...
              </div>
            ) : (
              <div className="gsi-material-button-state"></div>
            )}
            {!loading && (
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents font-semibold text-xs text-slate-800">Sign in with Google</span>
              </div>
            )}
          </button>

          <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
            Locked using standard HTTPS Bearer Vault protocols.<br />
            Access tokens are cached safely in system memory and never stored in cookies or web storage.
          </p>
        </div>
      ) : (
        /* Authenticated: Real File Explorer and Uploader */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: File explorer stage */}
          <div className="lg:col-span-8 space-y-6">
            {/* Control Toolbar / Searching */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search files inside this folder..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-24 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="absolute right-16 top-1 px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[10px] text-slate-500 dark:text-slate-400 rounded transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-1 top-1 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Search
                </button>
              </form>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setShowFolderModal(true)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-purple-500" />
                  <span>New Folder</span>
                </button>
              </div>
            </div>

            {/* Breadcrumb Navigation Trail */}
            <nav className="flex items-center flex-wrap gap-1 text-xs font-semibold text-slate-500">
              {folderHistory.map((folder, index) => {
                const isLast = index === folderHistory.length - 1;
                return (
                  <React.Fragment key={folder.id}>
                    {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                    <button
                      onClick={() => handleBreadcrumbClick(index)}
                      disabled={isLast}
                      className={`hover:text-purple-500 transition-colors cursor-pointer ${
                        isLast ? "text-slate-900 dark:text-white font-bold cursor-default" : ""
                      }`}
                    >
                      {folder.name}
                    </button>
                  </React.Fragment>
                );
              })}
            </nav>

            {/* Grid display for files & folders */}
            {loadingFiles ? (
              <div className="h-64 flex flex-col items-center justify-center bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-2xl">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-2" />
                <p className="text-xs text-slate-500 font-mono">Fetching Drive assets...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-2xl text-center p-6 space-y-2">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <HardDrive className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white">This Folder is Empty</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Drag & drop files onto the uploader on the right or tap the button to add checklists, brand guides, or project drafts here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="drive-files-grid">
                {files.map((file) => {
                  const isFolder = file.mimeType === "application/vnd.google-apps.folder";
                  return (
                    <div
                      key={file.id}
                      className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all group border-glow-purple"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          {getFileIcon(file.mimeType)}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-slate-400 hover:text-purple-500 hover:bg-purple-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Open in Google Drive"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => setDeleteConfirmFile(file)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete File"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p 
                            className={`text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug ${
                              isFolder ? "cursor-pointer hover:text-purple-500 group-hover:underline" : ""
                            }`}
                            onClick={() => {
                              if (isFolder) {
                                handleNavigateFolder(file.id, file.name);
                              }
                            }}
                          >
                            {file.name}
                          </p>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {isFolder ? "Folder" : formatSize(file.size)}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-50 dark:border-slate-850 pt-2.5 mt-3 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                        <span>Modified:</span>
                        <span>{formatTimestamp(file.modifiedTime)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right panel: Uploads, Campaigns & Integration widgets */}
          <div className="lg:col-span-4 space-y-6">
            {/* Drag & Drop Upload Zone */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`bg-white dark:bg-slate-900 border-2 border-dashed rounded-3xl p-6 text-center transition-all flex flex-col items-center justify-center min-h-[220px] ${
                dragActive
                  ? "border-purple-500 bg-purple-500/5 shadow-inner scale-102"
                  : "border-slate-200 dark:border-slate-800 hover:border-purple-400"
              }`}
            >
              {uploading ? (
                <div className="space-y-3">
                  <RefreshCw className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Uploading File...</p>
                  <p className="text-[10px] text-slate-400 font-mono">Sending multi-part binary data payload safely to Google Cloud storage node.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mx-auto">
                    <Upload className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Drag & Drop SEO Assets</p>
                    <p className="text-[10px] text-slate-400 max-w-[180px] mx-auto leading-relaxed">
                      Accepts PDFs, audit sheets, content documents, or image mockups.
                    </p>
                  </div>
                  <div>
                    <label className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold rounded-xl transition-all shadow-sm cursor-pointer inline-block">
                      <span>Select File</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Campaign Creator Widget */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4.5 h-4.5 text-purple-500" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                  SEO Campaign Structurer
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Need to launch a new client or internal brand audit campaign? Instantiate the standardized, professional 4-tier subfolder ecosystem with one single click.
              </p>

              {campaignSuccess ? (
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-xs rounded-xl flex items-start gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Campaign Deployed!</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">Campaign directory hierarchy initialized perfectly on Drive.</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleCreateSeoCampaignStructure}
                  disabled={campaignCreating}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.15)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {campaignCreating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Allocating Nodes...
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      Instantiate SEO Campaign
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Integration info box */}
            <div className="bg-gradient-to-tr from-purple-950/10 to-indigo-950/10 border border-purple-500/10 rounded-3xl p-5 space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">Enterprise-Grade Storage Node</h4>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-300 leading-relaxed">
                Every asset uploaded here or structured via the Campaign Structurer goes directly to your secure Google Drive. No proxy relays process your file data, ensuring complete compliance and intellectual confidentiality.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* New Folder Creation Dialog Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-3xl max-w-sm w-full p-6 space-y-4 animate-scale-up text-left">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Create New Folder</h3>
            <form onSubmit={handleCreateFolderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1 font-semibold">Folder Name</label>
                <input
                  type="text"
                  placeholder="e.g., SEO Checklists"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowFolderModal(false)}
                  className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingFolder}
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                >
                  {creatingFolder && <Loader2 className="w-3 h-3 animate-spin" />}
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STAGE-SENSITIVE DESTRUCTION WARNING DIALOG MODAL (STRICTLY REQUIRED FOR MUTATION SAFETY) */}
      {deleteConfirmFile && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-red-500/20 rounded-3xl max-w-sm w-full p-6 space-y-4 animate-scale-up text-left shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <Trash2 className="w-5.5 h-5.5" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">Delete Drive Asset?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you absolutely sure you want to delete <span className="font-bold text-slate-800 dark:text-white">"{deleteConfirmFile.name}"</span>? 
                This action is destructive and will modify data directly on your Google Drive.
              </p>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmFile(null)}
                className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFileConfirm}
                disabled={deletingFile}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                {deletingFile && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
