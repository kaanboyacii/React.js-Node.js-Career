import "./signup.scss";
import React from "react";
import Logo from "../../../img/logo-back.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";

const Signup = () => {
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
      className="company-signup"
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
          <h1>Şirket Hesabı Oluştur</h1>
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
              label="Hizmet Sözleşmesini onaylıyorum. "
              labelPlacement="end"
              required
            />
            <FormControlLabel
              value="end"
              control={<Checkbox />}
              label="İletişim bilgilerime e-ileti gönderilmesine izin veriyorum. "
              labelPlacement="end"
              required
            />
          </div>
          <button className="signup-button">Oluştur</button>
          <div className="signup-link">
            <span>Zaten bir hesabınız var mı ?</span>
            <a href="/company-login">Giriş Yap</a>
            <br />
            <Link to="/signup">
              <button className="company-signup-button">Kullanıcı Olarak Katıl</button>
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
