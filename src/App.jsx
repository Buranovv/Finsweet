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
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import NotFoundPage from "./pages/public/notFound/NotFoundPage";
import AccountPage from "./pages/account/user/AccountPage";

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
          <Route path="register" element={<RegisterPage />} />
          {isAuth ? (
            <Route path="account" element={<AccountPage />} />
          ) : (
            <Route path="login" element={<LoginPage />} />
          )}
        </Route>
        {isAuth && role === "admin" ? (
          <Route path="/dashboard" element={<DashboardPage />} />
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
