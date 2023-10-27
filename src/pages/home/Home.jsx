import React from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import Services from "../../components/services/Services"; // Services bileşenini içeri aktardığınızdan emin olun

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <Hero />
      </div>
      <div className="services">
        <Services />
      </div>
      <div className="about">
        <About />
      </div>
    </div>
  );
};

export default Home;
