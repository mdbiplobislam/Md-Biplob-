import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider
const provider = new GoogleAuthProvider();

// Add essential scopes for complete Google Drive interaction
provider.addScope("https://www.googleapis.com/auth/drive");
provider.addScope("https://www.googleapis.com/auth/drive.file");
provider.addScope("https://www.googleapis.com/auth/drive.metadata.readonly");

// Keep state tracking variables
let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize Auth listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Access token is only returned during signInWithPopup, so we need to log in again if not cached
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Google Sign In trigger
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get access token from Google Auth Provider.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Access Token Getter
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

// Log Out Handler
export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// ================= GOOGLE DRIVE API HANDLERS =================

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  size?: string;
  modifiedTime?: string;
}

/**
 * Lists files from Google Drive
 * Supports filtering by name/query, mimeType, or folder
 */
export async function listDriveFiles(
  token: string,
  searchQuery?: string,
  folderId: string = "root"
): Promise<DriveFile[]> {
  try {
    let q = `'${folderId}' in parents and trashed = false`;
    if (searchQuery) {
      q += ` and name contains '${searchQuery.replace(/'/g, "\\'")}'`;
    }

    const fields = "files(id, name, mimeType, webViewLink, iconLink, thumbnailLink, size, modifiedTime)";
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=${encodeURIComponent(fields)}&orderBy=folder,name`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || "Failed to retrieve Google Drive files.");
    }

    const data = await response.json();
    return data.files || [];
  } catch (error: any) {
    console.error("listDriveFiles error:", error);
    throw error;
  }
}

/**
 * Creates a new folder in Google Drive
 */
export async function createFolder(token: string, folderName: string, parentId: string = "root"): Promise<string> {
  try {
    const url = "https://www.googleapis.com/drive/v3/files";
    const body = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || "Failed to create folder.");
    }

    const data = await response.json();
    return data.id;
  } catch (error: any) {
    console.error("createFolder error:", error);
    throw error;
  }
}

/**
 * Uploads a file to Google Drive
 */
export async function uploadFileToDrive(
  token: string,
  file: File,
  parentId: string = "root"
): Promise<DriveFile> {
  try {
    // 1. Metadata part
    const metadata = {
      name: file.name,
      parents: [parentId],
    };

    // 2. Multi-part form creation
    const boundary = "-------314159265358979323846";
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const fileReader = new FileReader();
    const fileDataPromise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsBinaryString(file);
    });

    const fileData = await fileDataPromise;
    if (typeof fileData !== "string") {
      throw new Error("Failed to read file as binary string.");
    }

    const multipartRequestBody =
      delimiter +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      `Content-Type: ${file.type || "application/octet-stream"}\r\n` +
      "Content-Transfer-Encoding: base64\r\n\r\n" +
      btoa(fileData) +
      closeDelimiter;

    const url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,iconLink,thumbnailLink,size,modifiedTime";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || "Failed to upload file to Google Drive.");
    }

    return await response.json();
  } catch (error: any) {
    console.error("uploadFileToDrive error:", error);
    throw error;
  }
}

/**
 * Deletes a file from Google Drive
 * Requires explicit user confirmation in the UI before triggering this!
 */
export async function deleteFileFromDrive(token: string, fileId: string): Promise<boolean> {
  try {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || "Failed to delete file.");
    }

    return true;
  } catch (error: any) {
    console.error("deleteFileFromDrive error:", error);
    throw error;
  }
}
