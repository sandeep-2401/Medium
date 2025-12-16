import { Link, useLocation } from "react-router-dom";

export const FloatingWriteButton = () => {
  const location = useLocation();

  if (
    location.pathname.startsWith("/write") ||
    location.pathname.includes("/edit")
  ) {
    return null;
  }

  return (
    <Link
      to="/write"
      className="
        fixed bottom-6 right-6
        flex items-center gap-2
        rounded-full bg-black px-4 py-3
        text-white shadow-lg
        hover:bg-gray-800
        transition
      "
    >
      ✍️
      <span className="hidden sm:inline text-sm font-medium">
        Write
      </span>
    </Link>
  );
};
