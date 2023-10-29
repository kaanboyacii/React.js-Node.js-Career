import "./signup.scss";
import PeopleImage from "../../img/people.webp";
import Logo from "../../img/logo.png";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import { motion } from "framer-motion";

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
      className="signup"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="left-side">
        <img src={PeopleImage} alt="Resim" />
      </div>
      <div className="right-side">
        <div className="form-container">
          <form>
            <a href="/">
              <img className="form-image" src={Logo} alt="Logo" />
            </a>
            <h1>
              ineedcareer'e <br /> Üye Ol
            </h1>
            <hr />
            <div className="form-group">
              <input type="email" name="email" placeholder="E-posta" required />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                required
              />
            </div>
            <div className="checkbox-group">
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
            <button className="signup-button">Üye Ol</button>
            <div className="signup-link">
              <span>Zaten hesabınız var mı ?</span>
              <a href="/login">Giriş Yap</a>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
