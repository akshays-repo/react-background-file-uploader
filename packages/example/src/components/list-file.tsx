import { useBackgroundFileUpload } from "react-background-file-uploader";


const ListFile = () => {
    const { uploads, cancelUpload } = useBackgroundFileUpload();
    return (
        <div className="p-4 border border-gray-300 rounded-lg">

            <ul className="mt-4">
                {uploads.map((upload) => (
                    <li key={upload.id} className="flex justify-between items-center p-2 border-b">
                        <span>{upload.file.name}</span>
                        <span>{upload.progress}%</span>
                        <span className="capitalize">{upload.status}</span>
                        {upload.status === "uploading" && <span className="text-blue-500">Uploading...</span>}
                        <button onClick={() => cancelUpload(upload.id)} className="text-red-500">
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListFile;
