export const TitleInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <input
      type="text"
      placeholder="Title"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-4xl font-serif outline-none mb-6 placeholder-gray-400"
    />
  );
};
