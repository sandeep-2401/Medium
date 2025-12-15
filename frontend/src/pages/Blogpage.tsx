import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ArticleHeader } from "../components/BlogHeader";
import { ArticleContent } from "../components/BlogContent";
import { AuthorSidebar } from "../components/AuthorSidebar";

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  author: {
    name: string;
    bio?: string;
  };
};

export const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
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

        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await res.json();
        setBlog(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!blog) return <div className="p-10">Blog not found</div>;

  return (
    <div className="flex justify-center">
      <div className="grid w-full max-w-6xl grid-cols-12 gap-10 px-6 py-10">
        
        {/* Main article */}
        <div className="col-span-8">
          <ArticleHeader
            title={blog.title}
            createdAt={blog.createdAt}
          />
          <ArticleContent content={blog.content} />
        </div>

        {/* Author sidebar */}
        <div className="col-span-4">
          <AuthorSidebar author={blog.author} />
        </div>

      </div>
    </div>
  );
};
