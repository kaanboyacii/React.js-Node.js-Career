import React from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Events from "../../components/events/Events";
import About from "../../components/about/About";

const Home = () => {

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <Hero/>
      </div>
      <div className="events">
        <Events/>
      </div>
      <div className="about">
        <About/>
      </div>
    
    </div>
  );
};

export default Home;
