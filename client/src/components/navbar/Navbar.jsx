import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../../img/logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";


const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ekran genişliği değiştiğinde durumu izlemek için useEffect kullanıyoruz.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
        <Link to="/">

          <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <a href="/">Anasayfa</a>
          <a href="/job-list">İş İlanları</a>
          <a href="/events">Etkinlikler</a>
          <a href="/courses">Kurslarım</a>
          <a href="/aboutus">Hakkımızda</a>
        </div>
        <div className="user-actions">
          <a href="/login">Giriş Yap</a>
          <a href="/signup">Üye Ol</a>
        </div>
        <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {/* Mobil menü içeriği */}
            <a href="/">Anasayfa</a>
            <a href="/">İş İlanları</a>
            <a href="/">Etkinlikler</a>
            <a href="/">Kurslarım</a>
            <a href="/">Hakkımızda</a>
            <a href="/">Giriş Yap</a>
            <a href="/">Üye Ol</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
