import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontLayout from "./components/layout";
import HomePage from "./pages/public/home";
import AboutPage from "./pages/public/about";
import BlogPage from "./pages/public/blog";
import RegisterPage from "./pages/public/register";
import LoginPage from "./pages/public/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="aboutUs" element={<AboutPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
