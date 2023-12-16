import "./login.scss";
import React from "react";
import Logo from "../../img/logo-back.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className="login"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="form-container">
        <form>
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
          <h1>
            ineedcareer'e <br /> Giriş Yap
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
          <div className="form-group">
            <div className="remember-me">
              <label htmlFor="rememberMe">Beni Hatırla</label>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
            </div>
            <a href="/sifremi-unuttum">Şifremi Unuttum</a>
          </div>
          <button className="login-button">Giriş Yap</button>
          <div className="signup-link">
            <span>Hesabınız yok mu ?</span>
            <a href="/signup">Üye Ol</a>
            <br />
            <Link to="/company-login">
              <button className="company-login-button">Şirket Giriş</button>
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default Login;
