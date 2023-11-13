import React, { useState } from "react";
import "./contactPage.scss";
import Contact from "../../components/contact/Contact";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import References from "../../components/references/References";

const ContactPage = () => {
  return (
    <div className="contactPage">
      <Navbar />
      <div className="contactpage-container">
        <Contact />
      </div>
      <References />

      <Footer />
    </div>
  );
};

export default ContactPage;
