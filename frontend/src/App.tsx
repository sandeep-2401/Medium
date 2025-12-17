import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { BlogFeed } from "./pages/Blogfeed";
import { BlogPage } from "./pages/Blogpage";
import { WriteBlog } from "./pages/WriteBlog";
import { EditBlog } from "./pages/EditBlog";
import { FloatingWriteButton } from "./components/FloatingButton";
import { MyBlogs } from "./pages/MyBlogs";
import { Header } from "./components/Header";
import { ProtectedRoute } from "./pages/ProtectedRoutes";
import { AuthProvider } from "./components/AuthContext";

const AppLayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  return (
    <>
      {/* Header */}
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />

        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected */}
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <BlogFeed />
            </ProtectedRoute>
          }
        />

        <Route path="/blog/:id" element={<BlogPage />} />

        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WriteBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog/:id/edit"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-blogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Floating write button */}
      {!isAuthPage && <FloatingWriteButton />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
