import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const NotFound = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      <Navbar />
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}>Sayfa bulunamadı 404</h1>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
