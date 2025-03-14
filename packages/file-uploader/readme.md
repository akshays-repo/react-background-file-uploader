# React File Uploader - Seamless Background Uploads

Easily upload files in the background while navigating between pages—just like Google Drive! 🚀

## 🌟 Features

- 📂 **Background Uploads** – Continue uploading files even when navigating between pages.
- ⚡ **Concurrent Uploads** – Control the number of parallel uploads.
- 📊 **Progress Tracking** – Real-time upload progress for each file.
- ❌ **Cancel Uploads** – Stop an ongoing upload anytime.

## 📦 Installation

```sh
pnpm add react-background-file-uploader
```

or using npm:

```sh
npm install react-background-file-uploader
```

## 🚀 Quick Start

```tsx
import { useBackgroundFileUpload } from "react-background-file-uploader";

const FileUploader = () => {
  const { uploads, addUpload, startUpload, cancelUpload } = useBackgroundFileUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => addUpload(file));
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={() => startUpload("https://your-upload-endpoint.com")}>Upload</button>
      <ul>
        {uploads.map((upload) => (
          <li key={upload.id}>
            {upload.file.name} - {upload.progress}%
            <button onClick={() => cancelUpload(upload.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploader;
```

## 🎛 API Reference

### `useBackgroundFileUpload()`

This hook provides all the necessary upload functions.

#### **Methods**

| Method                                              | Description                                    |
| --------------------------------------------------- | ---------------------------------------------- |
| `addUpload(file: File)`                             | Adds a file to the upload queue.               |
| `startUpload(url: string, options?: UploadOptions)` | Starts uploading queued files.                 |
| `cancelUpload(id: string)`                          | Cancels an active upload.                      |
| `setMaxConcurrent(count: number)`                   | Sets the maximum number of concurrent uploads. |

#### **Upload Object**

| Property   | Type        | Description                 |
| ---------- | ----------- | --------------------------- |
| `id`       | `string`    | Unique file identifier.     |
| `file`     | `File`      | File object being uploaded. |
| `progress` | `number`    | Upload progress percentage. |
| `status`   | `'pending'` `'uploading'` `'success'` `'failed'` | Current upload status. |

## ⚙ Configuration

You can customize the uploader with options such as **headers**, **body parameters**, and **error handling**:

```tsx
startUpload("https://your-upload-endpoint.com", {
  headers: { Authorization: "Bearer token" },
  extraBody: { folder: "uploads" },
  onSuccess: (file, response) => console.log("Upload Success", file, response),
  onError: (file, error) => console.error("Upload Failed", file, error),
  onAbort: (file) => console.warn("Upload Aborted", file),
});
```

## 🌐 Live Example

Check out the live example: [React Background File Uploader Example](https://react-background-file-uploader-example.vercel.app/)

Explore the example code: [GitHub Example](https://github.com/akshays-repo/react-background-file-uploader/tree/main/packages/example)

## 🤝 Contributing

1. Fork this repository
2. Clone it: `git clone https://github.com/akshays-repo/react-background-file-uploader`
3. Install dependencies: `pnpm install`
4. Make your changes and submit a PR 🚀

## 📜 License

MIT License © 2025 Akshay S

## 👨‍💻 Author

- **Akshay S**
- 📧 Email: [akshayshan28@gmail.com](mailto:akshayshan28@gmail.com)

## 🔍 Keywords

React file uploader, background file upload, resumable upload, React file upload hook, concurrent file upload, real-time file upload, cancel file upload, upload progress tracking, seamless file upload, React background uploader

