import "./panel.scss";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import Profile from "../../components/panel/profile/Profile";
import Settings from "../../components/panel/settings/Settings";
import Inbox from "../../components/panel/inbox/Inbox";

const Panel = () => {
  const [selectedItem, setSelectedItem] = useState("Profil");

  const selectItem = (itemName) => {
    setSelectedItem(itemName);
  };

  let selectedContent;
  if (selectedItem === "Profil") {
    selectedContent = <Profile />;
  } else if (selectedItem === "Ayarlar") {
    selectedContent = <Settings />;
  } else if (selectedItem === "GelenKutusu") {
    selectedContent = <Inbox />;
  }

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
          <div className="sidebar-item" onClick={() => selectItem("Profil")}>
            {" "}
            <AccountCircleIcon />
            <span>Profil</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => selectItem("CV Oluştur")}
          >
            {" "}
            <DescriptionIcon />
            <span>CV Oluştur</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => selectItem("Başvurularım")}
          >
            {" "}
            <WorkIcon />
            <span>Başvurularım</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => selectItem("Kişisel Gelişim Planı")}
          >
            {" "}
            <RocketLaunchIcon />
            <span>Kişisel Gelişim Planı</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => selectItem("GelenKutusu")}
          >
            {" "}
            <EmailIcon />
            <span>Gelen Kutusu</span>
          </div>
          <div className="sidebar-item" onClick={() => selectItem("Ayarlar")}>
            {" "}
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
          {selectedContent}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Panel;
