import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import Logo from "../../img/logo.png"

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="nav-links">
          <a href="/">Anasayfa</a>
          <a href="/">İş İlanları</a>
          <a href="/">Etkinlikler</a>
          <a href="/">Kurslarım</a>
          <a href="/">Hakkımızda</a>
          {/* Add more navigation links as needed */}
        </div>
        <div className="user-actions">
          <a href="/">Giriş Yap</a>
          <a href="/">Üye Ol</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
