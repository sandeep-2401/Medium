import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup.tsx'
import { Signin } from './pages/Signin.tsx'
import { BlogFeed } from './pages/Blogfeed.tsx'
import { BlogPage } from './pages/Blogpage.tsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<BlogFeed />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App