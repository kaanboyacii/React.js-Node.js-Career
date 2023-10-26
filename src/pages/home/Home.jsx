import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";

import "./home.scss";

const Home = () => {

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <Hero/>
      </div>
    
    </div>
  );
};

export default Home;
