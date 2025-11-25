import KnowledgeBaseUploader from "@/components/admin/KnowledgeBaseUploader";

export default function KnowledgeBasePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          AI Tudásbázis Kezelő
        </h1>
        <p className="mt-2 text-gray-600">
          Tölts fel dokumentumokat (PDF, Word, TXT), hogy a chatbot megtanulja
          őket. A rendszer automatikusan feldarabolja és vektorizálja a
          tartalmat.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
        <KnowledgeBaseUploader />
      </div>
    </div>
  );
}
