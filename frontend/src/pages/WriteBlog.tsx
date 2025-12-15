import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditorHeader } from "../components/EditorHeader";
import { TitleInput } from "../components/TitleInput";
import { ContentEditor } from "../components/ContentEditor";

export const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handlePublish = async () => {
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!content.trim()) {
      setError("Content cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://backend.sandeepr-cs24.workers.dev/api/v1/blog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to publish");
      }

      navigate(`/blog/${data.postId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <EditorHeader onPublish={handlePublish} loading={loading} />

      <div className="max-w-3xl mx-auto px-4 pt-10">
        <TitleInput value={title} onChange={setTitle} />
        <ContentEditor value={content} onChange={setContent} />

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};
