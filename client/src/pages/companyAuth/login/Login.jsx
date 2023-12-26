import "./login.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "../../../img/logo-back.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import {
  companyLoginFailure,
  companyLoginStart,
  companyLoginSuccess,
} from "../../../redux/companySlice.js";
import { logout } from "../../../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);
  const [errorMessage1, setErrorMessage1] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(companyLoginStart());
    try {
      const res = await axios.post("/auth/company-login", { email, password });
      dispatch(companyLoginSuccess(res.data));
      if (checked) {
        localStorage.setItem("rememberMe", JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/");
    } catch (err) {
      dispatch(companyLoginFailure());
      setErrorMessage1("Invalid company information");
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

  useEffect(() => {
    if (currentUser) {
      dispatch(logout());
    }
  }, [currentUser, dispatch]);

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
