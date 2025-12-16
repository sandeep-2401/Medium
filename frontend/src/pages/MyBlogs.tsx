import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


type Blog = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export const MyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    fetch("https://backend.sandeepr-cs24.workers.dev/api/v1/blog/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserId(data.user.id));
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch("https://backend.sandeepr-cs24.workers.dev/api/v1/blog/bulk", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const myBlogs = data.filter(
          (blog: Blog) => blog.authorId === userId
        );
        setBlogs(myBlogs);
      });
  }, [userId]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">My Blogs</h1>

      {blogs.length === 0 && (
        <p className="text-slate-500">You haven’t written any blogs yet.</p>
      )}

      {blogs.map((blog) => (
        <Link
            to={`/blog/${blog.id}`}
            key={blog.id}
            className="block border-b border-slate-200 py-4 hover:bg-slate-50 transition"
        >
            <h2 className="text-lg font-semibold">
            {blog.title}
            </h2>

            <p className="text-slate-600 line-clamp-2">
            {blog.content}
            </p>
        </Link>
        ))}
    </div>
  );
};
