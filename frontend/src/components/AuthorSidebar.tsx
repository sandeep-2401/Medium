type AuthorSidebarProps = {
  author: {
    name: string;
    bio?: string;
  };
};

export const AuthorSidebar = ({ author }: AuthorSidebarProps) => {
  return (
    <div className="sticky top-24">
      <p className="text-sm text-gray-500 mb-3">Author</p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200" >
            
        </div>

        <div>
          <p className="font-semibold text-black">{author.name}</p>
        </div>
      </div>

      {author.bio && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {author.bio}
        </p>
      )}
    </div>
  );
};
