export const EditorHeader = ({
  onPublish,
  loading,
  mode = "create",
}: {
  onPublish: () => void;
  loading: boolean;
  mode?: "create" | "edit";
}) => {
  return (
    <header className="sticky top-0 bg-white border-b">
      <div className="max-w-5xl mx-auto flex justify-between px-6 py-3">
        <span className="text-gray-500">
          {mode === "edit" ? "Editing" : "Write"}
        </span>

        <button
          onClick={onPublish}
          disabled={loading}
          className="bg-black text-white px-4 py-1.5 rounded-full text-sm disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : mode === "edit"
            ? "Save changes"
            : "Publish"}
        </button>
      </div>
    </header>
  );
};
