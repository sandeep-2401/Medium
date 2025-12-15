import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { BlogCard } from '../components/Blogcard.tsx';
import { FeedTabs } from '../components/FeedTabs.tsx';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  authorName: string;
};

export const BlogFeed: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token'); 
            if (!token) throw new Error('No auth token found');

            const res = await fetch('https://backend.sandeepr-cs24.workers.dev/api/v1/blog/bulk', {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });

            console.log('Status:', res.status, 'OK?', res.ok);

            const data = await res.json();

            if (!res.ok) throw new Error(`Failed to fetch blogs. Status: ${res.status}`);

            const formatted = data.map((post: any) => ({
                id: post.id,
                title: post.title,
                content: post.content,
                authorName: post.author?.name || 'Unknown',
            }));

            setBlogs(formatted);
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (blogs.length === 0) return <div>No blogs found.</div>;

  return (
    <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 pt-8">
            <FeedTabs />

            <div className="mt-6">
            {blogs.map(blog => (
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
