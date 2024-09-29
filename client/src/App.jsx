import { BrowserRouter, Routes, Route } from "react-router-dom";

import E404 from "./pages/E404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Travel from "./pages/Travel";
import Profile from "./pages/Profile";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Register from "./pages/Register";
import Politics from "./pages/Politics";
import SingleBlog from "./pages/SingleBlog";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="*" element={<E404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
