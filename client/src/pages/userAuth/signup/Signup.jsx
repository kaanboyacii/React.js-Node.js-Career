import "./signup.scss";
import React, { useState } from "react";
import axios from "axios";
import Logo from "../../../img/logo-back.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import {
  register,
  registerFailure,
  registerSuccess,
} from "../../../redux/userSlice.js";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [checked, setChecked] = React.useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage1, setErrorMessage1] = useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(register());
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      dispatch(registerSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(registerFailure());
      setErrorMessage1("Invalid user registration");
    }
  };

  return (
    <motion.div
      className="signup"
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
          <h1>Üye ol</h1>
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
          <button onClick={handleRegister} className="signup-button">Üye Ol</button>
          <div className="signup-link">
            <span>Zaten bir hesabınız var mı ?</span>
            <a href="/login">Giriş Yap</a>
            <br />
            <Link to="/company-signup">
              <button className="company-signup-button">
                Şirket Olarak Katıl
              </button>
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
