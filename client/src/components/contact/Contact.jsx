import React from "react";
import "./contact.scss";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import contactImage from "../../img/contact.png";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-columns">
          <div className="left-column">
            <motion.div
              className="contact-info-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1>Bizimle <br /> İletişime Geçin</h1>
              <div className="contact-info">
                <div className="contact-row">
                  <EmailIcon className="email-icon" />
                  <span>E-posta: info@ineedcareer.com</span>
                </div>
                <div className="contact-row">
                  <PhoneAndroidIcon className="phone-icon" />
                  <span>Telefon: 0232 555 11 22</span>
                </div>
                <div className="contact-row">
                  <BusinessIcon className="address-icon" />
                  <span>
                    Adres: Mimar Sinan cd. Ahmet Bey mh. Tekno Park no :76/1 İzmir / Turkey
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="right-column">
            <div className="contact-image">
              <img src={contactImage} alt="Contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
