import { useUploadStore } from "../store/useUploadStore";

export type UploadOptions = {
  headers?: Record<string, string>;
  extraBody?: Record<string, string | Blob>;
  onSuccess?: (file: File, response: unknown) => void;
  onError?: (file: File, error: unknown) => void;
  onAbort?: (file: File) => void;
};

export const useBackgroundFileUpload = () => {
  const {
    uploads,
    addUpload,
    updateUpload,
    removeUpload,
    maxConcurrent,
    activeUploads,
    incrementActive,
    decrementActive,
    setMaxConcurrent,
  } = useUploadStore();

  const uploadFile = (
    id: string,
    file: File,
    url: string,
    options?: UploadOptions
  ) => {
    if (activeUploads >= maxConcurrent) return;

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        updateUpload(id, { progress, status: "uploading" });
      }
    };

    xhr.onload = () => {
      decrementActive();
      if (xhr.status >= 200 && xhr.status < 300) {
        updateUpload(id, { progress: 100, status: "success" });
        options?.onSuccess?.(file, xhr.response);
      } else {
        updateUpload(id, { status: "failed", error: "Upload failed" });
        options?.onError?.(file, xhr.statusText);
      }
      startNextUpload(url, options);
    };

    xhr.onerror = () => {
      decrementActive();
      updateUpload(id, { status: "failed", error: "Upload failed" });
      options?.onError?.(file, "Network error");
      startNextUpload(url, options);
    };

    xhr.onabort = () => {
      removeUpload(id);
      decrementActive();
      options?.onAbort?.(file);
      startNextUpload(url, options);
    };

    xhr.open("POST", url, true);

    // Set custom headers if provided
    if (options?.headers) {
      Object.entries(options.headers).forEach(([key, value]) =>
        xhr.setRequestHeader(key, value)
      );
    }

    const formData = new FormData();
    formData.append("file", file);

    // Append extra body fields if provided
    if (options?.extraBody) {
      Object.entries(options.extraBody).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    updateUpload(id, { xhr });
    incrementActive();
    xhr.send(formData);
  };

  const startNextUpload = (url: string, options?: UploadOptions) => {
    const { uploads, activeUploads, maxConcurrent } = useUploadStore.getState();
    const availableSlots = maxConcurrent - activeUploads;

    if (availableSlots > 0) {
      const pendingUploads = uploads
        .filter((upload) => upload.status === "pending")
        .slice(0, availableSlots);

      pendingUploads.forEach((upload) => {
        uploadFile(upload.id, upload.file, url, options);
      });
    }
  };

  const startUpload = (url: string, options?: UploadOptions) => {
    startNextUpload(url, options);
  };

  const cancelUpload = (id: string) => {
    const { uploads } = useUploadStore.getState();
    const upload = uploads.find((upload) => upload.id === id);
    if (upload?.xhr) {
      console.log(`Aborting upload: ${upload.file.name}`);
      upload.xhr.abort();
    }
  };

  return {
    uploads,
    addUpload,
    removeUpload,
    startUpload,
    cancelUpload,
    setMaxConcurrent,
    maxConcurrent,
  };
};
