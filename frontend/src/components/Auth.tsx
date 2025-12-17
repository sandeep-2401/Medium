import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://backend.sandeepr-cs24.workers.dev/api/v1/user/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            type === "signup"
              ? { name : username, email, password }
              : { email, password }
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setToken(data.jwt);

      navigate("/bulk");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-black mb-1">
          {type === "signup" ? "Create an account" : "Sign in"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="ml-1 underline text-gray-700"
          >
            {type === "signup" ? "Login" : "Sign up"}
          </Link>
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {type === "signup" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm py-2 rounded-md disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : type === "signup"
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};
