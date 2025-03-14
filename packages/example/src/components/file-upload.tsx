import { useBackgroundFileUpload } from "react-background-file-uploader";

const FileUploader = () => {
    const {
        uploads,
        addUpload,
        cancelUpload,
        startUpload,
        maxConcurrent,
        setMaxConcurrent,
    } = useBackgroundFileUpload();

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const files = Array.from(event.target.files);
        files.forEach((file) => addUpload(file));
    };

    const handleStartUpload = () => {
        startUpload("/api/upload", {
            extraBody: {
                key: "value",
            },
            onSuccess: (file, response) => {
                console.log("Success:", file, response);
            },
            onError: (file, error) => {
                console.log("Error:", file, error);
            },
            onAbort: (file) => {
                console.log("Abort:", file);
            },
        });
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg">
            <input type="file" multiple onChange={handleFileSelect} />
            <button
                onClick={handleStartUpload}
                className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
                Start Upload
            </button>

            <div className="mt-2">
                <label>Max Concurrent Uploads: </label>
                <input
                    type="number"
                    value={maxConcurrent}
                    onChange={(e) => setMaxConcurrent(Number(e.target.value))}
                    className="border px-2 py-1 w-16"
                    min={1}
                    max={10}
                />
            </div>

            <ul className="mt-4">
                {uploads.map((upload) => (
                    <li
                        key={upload.id}
                        className="flex justify-between items-center p-2 border-b"
                    >
                        <span>{upload.file.name}</span>
                        <span>{upload.progress}%</span>
                        <span className="capitalize">{upload.status}</span>
                        {upload.status === "uploading" && (
                            <span className="text-blue-500">Uploading...</span>
                        )}
                        <button
                            onClick={() => cancelUpload(upload.id)}
                            className="text-red-500"
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileUploader;
