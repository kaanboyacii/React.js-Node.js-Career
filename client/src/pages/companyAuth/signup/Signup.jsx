import "./signup.scss";
import React, { useState , useEffect} from "react";
import axios from "axios";
import Logo from "../../../img/logo-back.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import {
  companyRegister,
  companyRegisterFailure,
  companyRegisterSuccess,
} from "../../../redux/companySlice.js";
import { logout } from "../../../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [newsletterChecked, setNewsletterChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage1, setErrorMessage1] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!termsChecked || !newsletterChecked) {
      setErrorMessage1(
        "Lütfen hizmet sözleşmesini ve iletişim iznini onaylayın."
      );
      return;
    }

    dispatch(companyRegister());
    try {
      const res = await axios.post("/auth/company-signup", {
        name,
        email,
        password,
      });
      dispatch(companyRegisterSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(companyRegisterFailure());
      setErrorMessage1("Geçersiz şirket kaydı");
    }
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(logout());
    }
  }, [currentUser, dispatch]);

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
              type="name"
              name="name"
              label="İsim"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              control={
                <Checkbox
                  checked={termsChecked}
                  onChange={() => setTermsChecked(!termsChecked)}
                />
              }
              label="Hizmet Sözleşmesini onaylıyorum."
              labelPlacement="end"
              required
            />
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  checked={newsletterChecked}
                  onChange={() => setNewsletterChecked(!newsletterChecked)}
                />
              }
              label="İletişim bilgilerime e-ileti gönderilmesine izin veriyorum."
              labelPlacement="end"
              required
            />
          </div>
          <button onClick={handleRegister} className="signup-button">
            Oluştur
          </button>
          <div className="signup-link">
            <span>Zaten bir hesabınız var mı ?</span>
            <a href="/company-login">Giriş Yap</a>
            <br />
            <Link to="/signup">
              <button className="company-signup-button">
                Kullanıcı Olarak Katıl
              </button>
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
