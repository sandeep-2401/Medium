import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
};

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://backend.sandeepr-cs24.workers.dev/api/v1/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        {/* Left: Brand */}
        <Link to="/blogs" className="text-xl font-bold">
          Ink
        </Link>

        {/* Right: My Blogs + Avatar */}
        <div className="flex items-center gap-5">
          <Link
            to="/my-blogs"
            className="text-sm font-medium text-slate-700 hover:text-black"
          >
            My Blogs
          </Link>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-semibold">
            {user ? user.name.charAt(0).toUpperCase() : "?"}
          </div>
        </div>

      </div>
    </header>
  );
};
