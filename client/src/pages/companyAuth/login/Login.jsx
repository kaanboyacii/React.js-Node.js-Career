import "./login.scss";
import React from "react";
import Logo from "../../../img/logo-back.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";

const Login = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className="company-login"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="form-container">
        <form>
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <h2>Şirket Hesabım</h2>
          <h1>Giriş Yap</h1>
          <hr />
          <div className="form-group">
            <TextField
              type="email"
              name="email"
              label="E-posta"
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <TextField
              type="password"
              name="password"
              label="Şifre"
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="Beni Hatırla"
              labelPlacement="end"
            />
            <Link to="/sifremi-unuttum" className="forgot-password-link">
              Şifremi Unuttum
            </Link>
          </div>
          <button className="login-button">Giriş Yap</button>
          <div className="signup-link">
            <span>Hesabınız yok mu ?</span>
            <a href="/company-signup">Üye Ol</a>
            <br />
            <Link to="/login">
              <button className="company-login-button">Kullanıcı Giriş</button>
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default Login;
