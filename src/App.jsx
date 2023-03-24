import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Menu from './menu';
import FeaturedPost from './pages/FeaturedPost';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null && token.startsWith('Bearer');
  };

  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route
            path="featured-post"
            element={isAuthenticated() ? <FeaturedPost /> : <Navigate to="/" />}
          />
          <Route
            path="post"
            element={isAuthenticated() ? <PostPage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
