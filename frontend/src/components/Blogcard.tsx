type BlogPost = {
  title: string;
  content: string;
  authorName: string;
};

export const BlogCard = ({ blog }: { blog: BlogPost }) => {
  return (
    <div className="flex justify-between gap-6 py-6 border-b border-slate-200">
      
      <div className="flex-1">
        
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
          <div className="h-6 w-6 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold">
            {blog.authorName[0]}
          </div>
          <span className="font-medium text-slate-900">
            {blog.authorName}
          </span>
          <span>·</span>
          <span>Dec 3, 2025</span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 leading-snug mb-2">
          {blog.title}
        </h2>

        <p className="text-slate-600 text-lg leading-relaxed mb-4 line-clamp-2">
          {blog.content}
        </p>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
              Technology
            </span>
            <span>3 min read</span>
          </div>

          <div className="flex items-center gap-4 text-lg">
            <button>🔖</button>
            <button>⋯</button>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-32 h-24 bg-slate-200 rounded-md shrink-0"></div>
    </div>
  );
};
