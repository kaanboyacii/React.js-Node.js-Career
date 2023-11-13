import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./references.scss";
import Logo1 from "../../img/logo.png";
import Logo2 from "../../img/udemy-logo.png";
import Logo3 from "../../img/medium.png";
import { motion } from "framer-motion";

const References = () => {
  const logos = [Logo1, Logo2 , Logo3, Logo1 , Logo2, Logo3 ];

  const settings = {
    infinite: true,
    slidesToShow:5, 
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
  };

  return (
    <div className="references">
      <motion.div className="slider-container"           initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}>
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <div key={index}>
              <img src={logo} alt={`Logo ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
};

export default References;
