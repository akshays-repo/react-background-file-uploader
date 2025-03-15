import { create } from "zustand";

export type UploadStatus =
  | "pending"
  | "uploading"
  | "success"
  | "failed"
  | "paused";

export type UploadFile = {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  xhr?: XMLHttpRequest | null;
  error?: string;
};

/**
 * Represents the state and actions related to file uploads.
 *
 * Properties:
 * - uploads: An array of UploadFile objects representing the current uploads.
 * - maxConcurrent: The maximum number of concurrent uploads allowed.
 * - activeUploads: The current number of active uploads.
 * 
 * Functions:
 * - addUpload: Adds a new upload entry and returns its unique ID.
 * - updateUpload: Updates an existing upload entry with the given partial data.
 * - removeUpload: Removes an upload entry by its unique ID.
 * - setMaxConcurrent: Sets the maximum number of concurrent uploads.
 * - incrementActive: Increments the count of active uploads.
 * - decrementActive: Decrements the count of active uploads.
 */
type UploadState = {
  uploads: UploadFile[];
  maxConcurrent: number;
  activeUploads: number;
  addUpload: (file: File) => string;
  updateUpload: (id: string, updates: Partial<UploadFile>) => void;
  removeUpload: (id: string) => void;
  setMaxConcurrent: (max: number) => void;
  incrementActive: () => void;
  decrementActive: () => void;
};

export const useUploadStore = create<UploadState>((set) => ({
  uploads: [],
  maxConcurrent: 3, // Default: 3 concurrent uploads
  activeUploads: 0,

  /**
   * Adds a new upload entry and returns its unique ID.
   *
   * @param file The file to upload.
   * @returns The unique ID of the new upload entry.
   */
  addUpload: (file) => {
    const id =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    set((state) => ({
      uploads: [
        ...state.uploads,
        { id, file, progress: 0, status: "pending", xhr: null },
      ],
    }));
    return id;
  },

  updateUpload: (id, updates) => {
    set((state) => ({
      uploads: state.uploads.map((upload) =>
        upload.id === id ? { ...upload, ...updates } : upload
      ),
    }));
  },

  removeUpload: (id) => {
    set((state) => {
      return {
        uploads: state.uploads.filter((upload) => upload.id !== id),
      };
    });
  },

  setMaxConcurrent: (max) => set({ maxConcurrent: max }),

  incrementActive: () =>
    set((state) => ({ activeUploads: state.activeUploads + 1 })),

  decrementActive: () =>
    set((state) => ({ activeUploads: Math.max(0, state.activeUploads - 1) })),
}));
