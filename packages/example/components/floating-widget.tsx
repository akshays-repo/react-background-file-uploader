"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useBackgroundFileUpload } from "react-background-file-uploader";
import { UploadProgress } from "./upload-progress";

export default function FloatingComponent() {
    const { uploads, cancelUpload } = useBackgroundFileUpload();

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
        );
    };

    const handleCancelUpload = (id: string) => {
        cancelUpload(id);
    };
    return (
        <div className="fixed bottom-5 right-5 w-96 h-96 overflow-auto">
            {uploads.length > 0 && (
                <div className="mb-6 rounded-lg border bg-background p-4">
                    <h2 className="mb-2 font-semibold">
                        Uploading {uploads.length} file(s)
                    </h2>
                    <div className="space-y-3">
                        {uploads.map((upload) => (
                            <UploadProgress
                                key={upload.id}
                                fileName={upload.file.name}
                                progress={upload.progress}
                                size={formatFileSize(upload.file.size)}
                                onRemove={() => handleCancelUpload(upload.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
