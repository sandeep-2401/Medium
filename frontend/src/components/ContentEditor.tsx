export const ContentEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <textarea
      placeholder="Tell your story..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-h-100 text-lg leading-relaxed outline-none resize-none placeholder-gray-400"
    />
  );
};
