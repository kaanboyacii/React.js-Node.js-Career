import "./panel.scss";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import Profile from "../../components/panel/profile/Profile";
import Settings from "../../components/panel/settings/Settings";
import Applications from "../../components/panel/applications/Applications";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice.js";
import axios from "axios";

const Panel = () => {
  const [selectedItem, setSelectedItem] = useState("Profil");
  const dispatch = useDispatch();

  const selectItem = (itemName) => {
    setSelectedItem(itemName);
  };

  let selectedContent;
  if (selectedItem === "Profil") {
    selectedContent = <Profile />;
  } else if (selectedItem === "Ayarlar") {
    selectedContent = <Settings />;
  } else if (selectedItem === "Başvurularım") {
    selectedContent = <Applications />;
  }

  const handleLogout = async (e) => {
    window.location.href = "/";
    e.preventDefault();
    dispatch(logout());
    const res = await axios.post("/auth/logout");
  };

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
            <AccountCircleIcon />
            <span>Profil</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => selectItem("Başvurularım")}
          >
            <WorkIcon />
            <span>Başvurularım</span>
          </div>
          <div className="sidebar-item" onClick={() => selectItem("Ayarlar")}>
            <SettingsIcon />
            <span>Ayarlar</span>
          </div>
          <div className="sidebar-item" onClick={handleLogout}>
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
