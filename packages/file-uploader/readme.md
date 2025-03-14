# react-background-file-uploader

A powerful React file uploader with background upload support, resumable uploads, and progress tracking.

## 🚀 Features
- 📂 **Background uploads** – Upload files even while navigating between pages.
- ⏸️ **Pause & Resume** – Supports resumable uploads.
- ⚡ **Concurrent uploads** – Control max concurrent uploads.
- ✅ **Progress tracking** – Track file upload progress in real-time.
- ❌ **Cancel uploads** – Abort uploads on demand.

## 📦 Installation

```sh
pnpm add react-background-file-uploader
```

or using npm:

```sh
npm install react-background-file-uploader
```

## 🛠 Usage

### Basic Example

```tsx
import { useFileUpload } from "react-background-file-uploader";

const FileUploader = () => {
  const { uploads, addUpload, startUpload, cancelUpload } = useFileUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        addUpload(file);
      });
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

### `useFileUpload()`
This hook provides all the necessary upload functions.

#### **Methods**

| Method         | Description |
|---------------|-------------|
| `addUpload(file: File)` | Adds a file to the upload queue. |
| `startUpload(url: string)` | Starts uploading queued files. |
| `cancelUpload(id: string)` | Cancels an active upload. |

#### **Upload Object**

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique file identifier. |
| `file` | `File` | File object being uploaded. |
| `progress` | `number` | Upload progress percentage. |
| `status` | `'pending' | 'uploading' | 'success' | 'failed'` | Current upload status. |

## ⚙ Configuration

You can customize the uploader with options such as **headers**, **body parameters**, and **error handling**:

```tsx
startUpload("https://your-upload-endpoint.com", {
  headers: { Authorization: "Bearer token" },
  onSuccess: (file, response) => console.log("Upload Success", file, response),
  onError: (file, error) => console.error("Upload Failed", file, error),
});
```

## 🤝 Contributing

1. Fork this repository
2. Clone it: `git clone https://github.com/akshays-repo/react-background-file-uploader`
3. Install dependencies: `pnpm install`
4. Make your changes and submit a PR 🚀

## 📜 License

MIT License © 2025 akshay-s

