import React from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import Services from "../../components/services/Services";
import EventSlider from "../../components/eventslider/EventSlider";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/contact/Contact";
import References from "../../components/references/References";

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
      <div className="eventSlider">
        <EventSlider />
      </div>
      <div className="references">
        <References />
      </div>
      <div className="about">
        <About />
      </div>
      <div className="contact">
        <Contact />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
