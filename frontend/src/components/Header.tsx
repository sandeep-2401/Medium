import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
export const Header = () => {
  const { user } = useAuth();
  

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        <Link to="/blogs" className="text-xl font-bold">
          Ink
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to="/my-blogs"
            className="text-sm font-medium text-slate-700 hover:text-black"
          >
            My Blogs
          </Link>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-semibold">
            {user ? (
              user!.name!.charAt(0).toUpperCase()
            ) : (
              <div className="h-4 w-4 rounded-full bg-slate-400 animate-pulse" />
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
