import * as React from "react";
import "./settings.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handlePasswordChange = () => {
    if (oldPassword && newPassword && newPassword === confirmPassword) {
      // Şifre değiştirme işlemi başarılı
      alert("Şifre değiştirme başarılı!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      // Şifre değiştirme işlemi başarısız
      alert(
        "Şifre değiştirme işlemi başarısız. Lütfen girdiğiniz bilgileri kontrol edin."
      );
    }
  };

  return (
    <div className="settings-card">
      <h1>Ayarlar</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Üyelik Ayarları" {...a11yProps(0)} />
            <Tab label="İletişim Ayarları" {...a11yProps(1)} />
            <Tab label="Uygulama Ayarları" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
            <h2>Şifre Değiştir</h2>
            <input
              type="password"
              placeholder="Eski Şifre"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Yeni Şifre"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Yeni Şifre Onayı"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="save-button" onClick={handlePasswordChange}>
              Şifre Değiştir
            </button>
          </div>
          <div>
            <h2>E-posta Değiştir</h2>
            <input type="email" placeholder="Mevcut E-posta" />
            <button className="save-button">Gönder</button>
          </div>
          <div className="div">
            <h2>Üyeliğimi Sil</h2>
            <button className="delete-button">Üyeliği Sil</button>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Settings;
