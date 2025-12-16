import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArticleHeader } from "../components/BlogHeader";
import { ArticleContent } from "../components/BlogContent";
import { AuthorSidebar } from "../components/AuthorSidebar";

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  authorId: string;
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

    function getUserIdFromToken(): string | null {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const payload = token.split(".")[1];
            const decoded = JSON.parse(atob(payload));
            return decoded.id ?? null;
        } catch {
            return null;
        }
    }

    const currentUserId = getUserIdFromToken();

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
  console.log("blog.authorId:", blog.authorId);
  console.log("currentUserId:", currentUserId);

  const isOwner = blog.authorId === currentUserId;

  return (
    <div className="flex justify-center">
      <div className="grid w-full max-w-6xl grid-cols-12 gap-10 px-6 py-10">
        
        <div className="col-span-8">
          <div className="flex items-center justify-between mb-4">
            <ArticleHeader
              title={blog.title}
              createdAt={blog.createdAt}
            />
            <div>
                hi
            </div>
              {isOwner && (
                <Link
                    to={`/blog/${blog.id}/edit`}
                    className="text-sm text-gray-500 hover:text-black"
                    >
                    Edit
                </Link>

            )}

          </div>

          <ArticleContent content={blog.content} />
        </div>

        <div className="col-span-4">
          <AuthorSidebar author={blog.author} />
        </div>

      </div>
    </div>
  );
};
