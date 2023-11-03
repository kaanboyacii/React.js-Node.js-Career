import "./panel.scss";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import Profile from "../../components/panel/profile/Profile";

const Panel = () => {
  return (
    <div className="panel">
      <Navbar />
      <div className="panel-container">
        <motion.div
          className="sidebar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1>Yönetim</h1>
          <div className="sidebar-item">
            <HomeIcon />
            <span>Panel</span>
          </div>
          <div className="sidebar-item">
            <DescriptionIcon />
            <span>CV Oluştur</span>
          </div>
          <div className="sidebar-item">
            <WorkIcon />
            <span>Başvurularım</span>
          </div>
          <div className="sidebar-item">
            <RocketLaunchIcon />
            <span>Kişisel Gelişim Planı</span>
          </div>
          <div className="sidebar-item">
            <EmailIcon />
            <span>Gelen Kutusu</span>
          </div>
          <div className="sidebar-item">
            <AccountCircleIcon />
            <span>Profil</span>
          </div>
          <div className="sidebar-item">
            <SettingsIcon />
            <span>Ayarlar</span>
          </div>
          <div className="sidebar-item">
            <LogoutIcon />
            <span>Çıkış Yap</span>
          </div>
        </motion.div>
        <motion.div
          className="content"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Profile/>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Panel;
