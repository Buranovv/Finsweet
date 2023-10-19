import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontLayout from "./components/layout";
import HomePage from "./pages/public/home";
import AboutPage from "./pages/public/about";
import BlogPage from "./pages/public/blog";
import SinglePage from "./pages/public/single";
import CategoryPage from "./pages/public/category";
import RegisterPage from "./pages/public/auth/register";
import LoginPage from "./pages/public/auth/login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import MyPostsPage from "./pages/user/my-posts/MyPostsPage";
import NotFoundPage from "./pages/public/notFound/NotFoundPage";
import AccountPage from "./pages/account/AccountPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminLayout from "./components/layout/admin-layout/AdminLayout";
import UserControl from "./pages/admin/UserControl";
import CategoryControl from "./pages/admin/CategoryControl";
import PostControl from "./pages/admin/PostControl";
import CommentControl from "./pages/admin/CommentControl";

function App() {
  const { isAuth, role } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="" element={<HomePage />} />
          {isAuth === true && role === "user" ? (
            <Route path="myPosts" element={<MyPostsPage />} />
          ) : null}
          <Route path="/:postId" element={<SinglePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:ctgrId" element={<CategoryPage />} />
          <Route path="aboutUs" element={<AboutPage />} />
          {isAuth ? null : <Route path="register" element={<RegisterPage />} />}
          {isAuth ? (
            <Route path="account" element={<AccountPage />} />
          ) : (
            <Route path="login" element={<LoginPage />} />
          )}
        </Route>
        {isAuth && role === "admin" ? (
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="userControl" element={<UserControl />} />
            <Route path="categoryControl" element={<CategoryControl />} />
            <Route path="postControl" element={<PostControl />} />
            <Route path="commentControl" element={<CommentControl />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
