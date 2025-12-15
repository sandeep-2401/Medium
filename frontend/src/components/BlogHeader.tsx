type ArticleHeaderProps = {
  title: string;
  createdAt?: string;
};

export const ArticleHeader = ({ title, createdAt }: ArticleHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-5xl font-extrabold leading-tight text-black">
        {title}
      </h1>

      <p className="mt-4 text-gray-500 text-sm">
        {createdAt
          ? `Posted on ${new Date(createdAt).toDateString()}`
          : "Posted recently"}
      </p>
    </div>
  );
};
