"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button"; // Feltételezem, hogy van Catalyst/Shadcn gombod
import {
  ArrowUpTrayIcon,
  DocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { processDocument } from "@/app/actions/ingest"; // Ezt a következő lépésben hozzuk létre!

export default function KnowledgeBaseUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    setStatus("Feldolgozás indítása...");

    try {
      // Egyesével küldjük fel a fájlokat
      for (const file of files) {
        setStatus(`Feldolgozás alatt: ${file.name}...`);

        const formData = new FormData();
        formData.append("file", file);

        // Server Action hívása (következő lépésben írjuk meg)
        const result = await processDocument(formData);

        if (!result.success) {
          throw new Error(result.error);
        }
      }
      setStatus("✅ Minden fájl sikeresen feldolgozva és vektorizálva!");
      setFiles([]);
    } catch (error: any) {
      console.error(error);
      setStatus(`❌ Hiba: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-300 hover:border-indigo-400"
        }`}
      >
        <input {...getInputProps()} />
        <ArrowUpTrayIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        {isDragActive ? (
          <p className="text-indigo-600 font-medium">Húzd ide a fájlokat...</p>
        ) : (
          <div className="space-y-1">
            <p className="text-gray-700 font-medium">
              Kattints vagy húzz ide fájlokat a feltöltéshez
            </p>
            <p className="text-sm text-gray-500">Támogatott: PDF, DOCX, TXT</p>
          </div>
        )}
      </div>

      {/* Fájl lista */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Kiválasztott fájlok:</h3>
          <ul className="divide-y divide-gray-100 bg-white rounded-lg border border-gray-200">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <DocumentIcon className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm text-gray-700 truncate max-w-xs">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? "Feldolgozás..." : "Tudásbázis Feltöltése"}
            </Button>
          </div>
        </div>
      )}

      {/* Státusz üzenet */}
      {status && (
        <div
          className={`p-4 rounded-lg text-sm font-medium ${
            status.startsWith("❌")
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
}
