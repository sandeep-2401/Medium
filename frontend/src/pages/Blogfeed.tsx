import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "../components/Blogcard";
import { FeedTabs } from "../components/FeedTabs";
import { useAuth } from "../components/AuthContext";

type BlogPost = {
  id: string;
  title: string;
  content: string;
  authorName: string;
};

export const BlogFeed: React.FC = () => {
  const { token } = useAuth();

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return; 

    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://backend.sandeepr-cs24.workers.dev/api/v1/blog/bulk",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch blogs");
        }

        const formatted = data.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          authorName: post.author?.name || "Unknown",
        }));

        setBlogs(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]); // 

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (blogs.length === 0) return <div>No blogs found.</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <FeedTabs />

        <div className="mt-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="block hover:bg-slate-50 transition rounded-lg"
            >
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
