import { useState } from "react";

export const FeedTabs = () => {
  const [active, setActive] = useState<"for-you" | "following">("for-you");

  return (
    <div className="flex items-center gap-8 border-b border-slate-200">
      
      <button
        onClick={() => setActive("for-you")}
        className={`pb-3 text-sm font-medium ${
          active === "for-you"
            ? "text-slate-900 border-b-2 border-slate-900"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        For you
      </button>

      <button
        onClick={() => setActive("following")}
        className={`pb-3 text-sm font-medium ${
          active === "following"
            ? "text-slate-900 border-b-2 border-slate-900"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Following
      </button>
    </div>
  );
};
