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
