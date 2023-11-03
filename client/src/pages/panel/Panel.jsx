import "./panel.scss";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Panel = () => {
  return (
    <div className="panel">
      <Navbar />
      <div className="panel-container"></div>
      <Footer />
    </div>
  );
};

export default Panel;
