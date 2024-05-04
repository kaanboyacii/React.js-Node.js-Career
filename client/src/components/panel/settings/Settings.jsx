import React, { useEffect, useState } from "react";
import "./settings.scss";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../redux/userSlice";

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
  const { currentUser } = useSelector((state) => state.user);
  const [emailSet, setEmailSet] = useState(false);
  const [smsSet, setSmsSet] = useState(false);
  const [notificationSet, setNotificationSet] = useState(false);
  const [colorSet, setColorSet] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${currentUser._id}`);
        const userData = response.data;
        setEmailSet(userData.emailSet);
        setSmsSet(userData.smsSet);
        setNotificationSet(userData.notificationSet);
        setColorSet(userData.colorSet);
      } catch (error) {
        console.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [currentUser._id]);

  const handleEmailToggle = async () => {
    try {
      const response = await axios.put(`/users/${currentUser._id}`, {
        emailSet: !emailSet,
      });

      if (response.status === 200) {
        setEmailSet(!emailSet);
      } else {
        console.error("Failed to update email settings");
      }
    } catch (error) {
      console.error("Failed to update email settings", error);
    }
  };

  const handleSmsToggle = async () => {
    try {
      const response = await axios.put(`/users/${currentUser._id}`, {
        smsSet: !smsSet,
      });

      if (response.status === 200) {
        setSmsSet(!smsSet);
      } else {
        console.error("Failed to update SMS settings");
      }
    } catch (error) {
      console.error("Failed to update SMS settings", error);
    }
  };

  const handleNotificationToggle = async () => {
    try {
      const response = await axios.put(`/users/${currentUser._id}`, {
        notificationSet: !notificationSet,
      });

      if (response.status === 200) {
        setNotificationSet(!notificationSet);
      } else {
        console.error("Failed to update notification settings");
      }
    } catch (error) {
      console.error("Failed to update notification settings", error);
    }
  };

  const handleColorToggle = async () => {
    try {
      const response = await axios.put(`/users/${currentUser._id}`, {
        colorSet: !colorSet,
      });

      if (response.status === 200) {
        setColorSet(!colorSet);
      } else {
        console.error("Failed to update color settings");
      }
    } catch (error) {
      console.error("Failed to update color settings", error);
    }
  };

  const handleChangeEmail = async () => {
    try {
      if (!newEmail) {
        alert("Lütfen yeni e-posta adresini girin");
        return;
      }
      const response = await axios.put(`/users/${currentUser._id}`, {
        email: newEmail,
      });
      if (response.status === 200) {
        dispatch(
          updateProfile({
            ...currentUser,
            email: newEmail,
          })
        );
        console.log("E-posta başarıyla değiştirildi");
      } else {
        console.error("Failed to update email");
      }
    } catch (error) {
      console.error("Failed to update email", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      // Check if the old password is correct
      const checkPasswordResponse = await axios.post(
        `/users/check-password/${currentUser._id}`,
        {
          oldPassword: oldPassword,
        }
      );

      if (!oldPassword || !newPassword || !confirmPassword) {
        alert("Lütfen tüm alanları doldurun");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Şifreler uyuşmuyor");
        return;
      }

      if (checkPasswordResponse.data.success) {
        // If old password is correct, proceed to update the password
        const updatePasswordResponse = await axios.put(
          `/users/${currentUser._id}`,
          {
            password: newPassword,
          }
        );

        if (updatePasswordResponse.status === 200) {
          dispatch(
            updateProfile({
              ...currentUser,
              password: newPassword,
            })
          );
          console.log(
            "Şifre başarıyla değiştirildi",
            updatePasswordResponse.data
          );
          navigate("/panel");
          window.location.reload();
        } else {
          console.error("Failed to update user profile");
        }
      } else {
        alert("Eski şifre yanlış");
      }
    } catch (error) {
      setErrorMessage("Eski şifre yanlış");
    }
  };

  const handleAccountDeletion = async () => {
    const isConfirmed = window.confirm(
      "Üyeliğinizi silmek istediğinize emin misiniz?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(`/users/${currentUser._id}`);
        if (response.status === 200) {
          navigate("/login");
        } else {
          console.error("Failed to delete account");
        }
      } catch (error) {
        console.error("Failed to delete account", error);
      }
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
            <TextField
              type="password"
              label="Eski Şifre"
              variant="outlined"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <TextField
              type="password"
              label="Yeni Şifre"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              type="password"
              label="Yeni Şifre Onayı"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="save-button" onClick={handleChangePassword}>
              Şifre Değiştir
            </button>
          </div>
          <div>
            <h2>E-posta Değiştir</h2>
            <TextField
              type="email"
              label="Yeni E-posta"
              variant="outlined"
              fullWidth
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button className="save-button" onClick={handleChangeEmail}>
              Gönder
            </button>
          </div>
          <div className="div">
            <h2>Üyeliğimi Sil</h2>
            <button className="delete-button" onClick={handleAccountDeletion}>
              Üyeliği Sil
            </button>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <FormGroup>
            <h3>E-posta Ayarları</h3>
            <FormControlLabel
              control={
                <Switch checked={emailSet} onChange={handleEmailToggle} />
              }
              label="Yeni iş fırsatları hakkında e-posta almak istiyorum."
            />
            <hr />
            <h3>SMS Ayarları</h3>
            <FormControlLabel
              control={<Switch checked={smsSet} onChange={handleSmsToggle} />}
              label="Yeni iş fırsatları hakkında SMS almak istiyorum."
            />
            <hr />
            <h3>Bildirim Ayarları</h3>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSet}
                  onChange={handleNotificationToggle}
                />
              }
              label="Yeni iş fırsatları hakkında bildirim almak istiyorum."
            />
          </FormGroup>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <h3>Renk Ayarları</h3>
          <FormControlLabel
            control={<Switch checked={colorSet} onChange={handleColorToggle} />}
            label="Karanlık Mod"
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Settings;
