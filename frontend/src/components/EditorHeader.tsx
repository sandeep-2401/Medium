export const EditorHeader = ({
  onPublish,
  loading,
}: {
  onPublish: () => void;
  loading?: boolean;
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b">
      <div className="text-lg font-medium text-gray-700">
        Your Blog
      </div>

      <button
        onClick={onPublish}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </header>
  );
};
