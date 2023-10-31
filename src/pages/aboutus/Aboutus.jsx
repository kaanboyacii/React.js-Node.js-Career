import React from "react";
import "./aboutus.scss";
import About from "../../components/about/About";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Aboutus = () => {
  return (
    <div className="aboutus">
      <Navbar/>
      <div className="aboutus-container">
      <About />
      </div>
      <Footer/>
    </div>
  );
};

export default Aboutus;
