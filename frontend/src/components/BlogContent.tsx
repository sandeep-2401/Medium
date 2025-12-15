type ArticleContentProps = {
  content: string;
};

export const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <div className="prose prose-lg max-w-none text-gray-800">
      {content.split("\n").map((paragraph, index) => {
        if (!paragraph.trim()) return null;
        return <p key={index}>{paragraph}</p>;
      })}
    </div>
  );
};
