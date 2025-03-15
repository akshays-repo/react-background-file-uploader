import { useUploadStore } from "../store/useUploadStore";

export type UploadOptions = {
  headers?: Record<string, string>;
  extraBody?: Record<string, string | Blob>;
  onSuccess?: (file: File, response: unknown) => void;
  onError?: (file: File, error: unknown) => void;
  onAbort?: (file: File) => void;
};

/**
 * A hook to manage background file uploads with resumable support,
 * real-time progress tracking, and concurrent uploads.
 *
 * Provides functions to start, cancel, and manage uploads, as well as
 * to configure the maximum number of concurrent uploads.
 *
 * Returns an object with the current upload state and actions to manage
 * uploads.
 *
 * Functions:
 * - startUpload: Initiates pending uploads based on available slots.
 * - cancelUpload: Cancels a specific upload by ID.
 * - cancelAllUploads: Cancels all ongoing uploads.
 * - setMaxConcurrent: Sets the maximum number of concurrent uploads.
 *
 * State:
 * - uploads: List of current uploads with their status and progress.
 * - maxConcurrent: Maximum number of concurrent uploads allowed.
 * - addUpload: Adds a new upload entry.
 * - removeUpload: Removes an upload entry by ID.
 */
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

  /**
   * Starts a new upload with the given file and options.
   *
   * @param id Unique ID for the upload entry
   * @param file The file to upload
   * @param url The URL to upload to
   * @param options Additional options for the upload
   *
   * The `options` object can contain the following properties:
   *
   * - `headers`: An object of custom headers to set on the request
   * - `extraBody`: An object of additional form data fields to append to the request
   * - `onSuccess`: A callback function to call when the upload is successful
   * - `onError`: A callback function to call when the upload fails
   * - `onAbort`: A callback function to call when the upload is canceled
   */
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

    /**
     * Initiates uploads for pending files based on available slots.
     * 
     * Retrieves the current state of uploads, calculates the available slots
     * by subtracting active uploads from the maximum allowed concurrent uploads.
     * If slots are available, it filters the pending uploads and starts uploading
     * them up to the number of available slots.
     * 
     * @param url - The URL to which the files should be uploaded.
     * @param options - Optional configurations for the upload, including headers,
     *                  additional body fields, and callback functions for success,
     *                  error, and abort events.
     */
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

  /**
   * Initiates an upload for the provided URL and options.
   * 
   * If there are available slots, it will start uploading immediately.
   * Otherwise, it will add the file to the pending uploads list and
   * wait for an available slot.
   * 
   * @param url - The URL to which the files should be uploaded.
   * @param options - Optional configurations for the upload, including headers,
   *                  additional body fields, and callback functions for success,
   *                  error, and abort events.
   */
  const startUpload = (url: string, options?: UploadOptions) => {
    startNextUpload(url, options);
  };

  /**
   * Cancels an upload that is in progress or pending.
   * 
   * If the upload is in progress, it will be aborted.
   * If the upload is pending, it will be removed from the list of pending uploads.
   * 
   * @param id - The ID of the upload to cancel.
   */
  const cancelUpload = (id: string) => {
    const { uploads } = useUploadStore.getState();
    const upload = uploads.find((upload) => upload.id === id);
    if (upload?.xhr) {
      console.log(`Aborting upload: ${upload.file.name}`);
      upload.xhr.abort();
    }else{
      removeUpload(id);
    }
  };

  /**
   * Cancels all uploads that are in progress or pending.
   * 
   * If an upload is in progress, it will be aborted.
   * If an upload is pending, it will be removed from the list of pending uploads.
   * 
   * @returns void
   */
  const cancelAllUploads = () => {
    const { uploads } = useUploadStore.getState();
    uploads.forEach((upload) => {
      if (upload.xhr) {
        console.log(`Aborting upload: ${upload.file.name}`);
        upload.xhr.abort();
      } else {
        removeUpload(upload.id);
      }
    });
  };

  return {
    uploads,
    maxConcurrent,
    addUpload,
    removeUpload,
    startUpload,
    cancelUpload,
    setMaxConcurrent,
    cancelAllUploads,
  };
};
