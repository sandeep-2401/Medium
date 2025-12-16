import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorHeader } from "../components/EditorHeader";
import { TitleInput } from "../components/TitleInput";
import { ContentEditor } from "../components/ContentEditor";

export const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://backend.sandeepr-cs24.workers.dev/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load blog");

        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch {
        setError("Unable to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(
        "https://backend.sandeepr-cs24.workers.dev/api/v1/blog",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id,
            title,
            content,
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      navigate(`/blog/${id}`);
    } catch {
      setError("Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <EditorHeader
        onPublish={handleUpdate}
        loading={saving}
        mode="edit"
      />

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
