import React, { useState } from "react";
import "./contact.scss";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import contactImage from "../../img/contact.png";
import { motion } from "framer-motion";
import References from "../references/References";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form gönderildi. Veriler:", formData);
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="contact-info">
            <h1>Bizimle İletişime Geçin</h1>
            <img src={contactImage} alt="" />
            <span>
              <EmailIcon className="email-icon" />
              E-posta: info@ineedcareer.com
            </span>
            <span>
              <PhoneAndroidIcon className="phone-icon" />
              Telefon: 0232 555 11 22
            </span>
            <span>
              <BusinessIcon className="address-icon" />
              Adres: Mimar Sinan cd. Ahmet Bey mh. Tekno Park no :76/1 İzmir /
              Turkey
            </span>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="contact-form">
              <label>
                Ad Soyad:
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                E-posta:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Telefon:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Mesaj:
                <br style={{ marginBottom: "5px" }} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <button type="submit">Gönder</button>
            </form>
          </div>
        </motion.div>
      </div>{" "}
    </div>
  );
};

export default Contact;
