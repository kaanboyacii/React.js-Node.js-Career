import "./login.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "../../../img/logo-back.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../../redux/userSlice.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);
  const [errorMessage1, setErrorMessage1] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/login", { email, password });
      dispatch(loginSuccess(res.data));
  
      if (checked) {
        // If "Beni Hatırla" is checked, store user credentials securely
        localStorage.setItem("rememberMe", JSON.stringify({ email, password }));
      } else {
        // If not checked, clear the stored credentials
        localStorage.removeItem("rememberMe");
      }
  
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      setErrorMessage1("Invalid user information");
    }
  };
  useEffect(() => {
    const rememberMeData = localStorage.getItem("rememberMe");
    if (rememberMeData) {
      const { email, password } = JSON.parse(rememberMeData);
      setEmail(email);
      setPassword(password);
    }
  }, []);
  


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage1 && <div>{errorMessage1}</div>}
          <div className="form-group">
            <FormControlLabel
              value="end"
              control={<Checkbox checked={checked} onChange={handleChange} />}
              label="Beni Hatırla"
              labelPlacement="end"
            />
            <Link to="/sifremi-unuttum" className="forgot-password-link">
              Şifremi Unuttum
            </Link>
          </div>
          <button onClick={handleLogin} className="login-button">
            Giriş Yap
          </button>
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
