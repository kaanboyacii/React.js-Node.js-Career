import "./navbar.scss";
import { useState, useEffect } from "react";
import Logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Menu,
  MenuItem,
  Avatar,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice.js";
import axios from "axios";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openMenu = Boolean(anchorEl);

  const handleLogout = async (e) => {
    window.location.href = "/";
    e.preventDefault();
    dispatch(logout());
    const res = await axios.post("/auth/logout");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
          <a href="/aboutus">Hakkımızda</a>
          <a href="/contact">İletişim</a>
        </div>
        <div className="user-actions">
          {currentUser ? (
            <>
              <Avatar
                alt={currentUser.name}
                src={currentUser.img}
                onClick={handleMenuClick}
                disableScrollLock
              />
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                disableScrollLock
              >
                <MenuItem component={Link} to="/panel">
                  <Typography>Profilim</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/panel">
                  <Typography>Ayarlar</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography>Çıkış Yap</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link to="/login">Giriş Yap</Link>
              <Link to="/signup">Üye Ol</Link>
            </>
          )}
        </div>
        <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {/* Mobil menü içeriği */}
            <a href="/">Anasayfa</a>
            <a href="/job-list">İş İlanları</a>
            <a href="/events">Etkinlikler</a>
            <a href="/courses">Kurslarım</a>
            <a href="/aboutus">Hakkımızda</a>
            <a href="/contact">İletişim</a>
            <a href="/login">Giriş Yap</a>
            <a href="/signup">Üye Ol</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
