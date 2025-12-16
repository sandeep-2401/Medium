import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup.tsx'
import { Signin } from './pages/Signin.tsx'
import { BlogFeed } from './pages/Blogfeed.tsx'
import { BlogPage } from './pages/Blogpage.tsx'
import { WriteBlog } from './pages/WriteBlog.tsx'
import { EditBlog } from './pages/EditBlog.tsx'
import { FloatingWriteButton } from './components/FloatingButton.tsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<BlogFeed />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/write" element={<WriteBlog />} />
          <Route path="/blog/:id/edit" element={<EditBlog />} />
        </Routes>
        <FloatingWriteButton/>
      </BrowserRouter>
    </>
  )
}

export default App