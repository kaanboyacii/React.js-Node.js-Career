import React from "react";
import "./event.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../img/logo.png";

const Event = () => {
  return (
    <div className="event">
      <Navbar />
      <div className="event-container">
      <motion.div
          className="left-side"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Etkinlik Başlığı</h1>
          <h2>Kimler Katılmalı ?</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates alias ullam eius aliquid, cum quam expedita ipsum maxime molestiae ipsa cupiditate magnam nesciunt debitis repellat est aspernatur inventore sapiente facilis!</p>
          <h3>Etkinlik Detayları</h3>
          <p>Etkinlik ilanı hakkında açıklamalar burada olacak.</p>
          <h3>İstenen Nitelikler</h3>
          <p>İşe alım için gereken nitelikler burada listelenecek.</p>
          <h3>Başvuru Süreci</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quas
            doloribus necessitatibus, magnam modi pariatur iste numquam vel
            quidem dolorum iusto tempore labore aperiam natus exercitationem
            possimus architecto blanditiis totam earum vitae tenetur? Porro
            sapiente dolorem optio, velit culpa consectetur quos? Enim nesciunt
            rem rerum ex modi autem dignissimos fugit harum, delectus id
            cupiditate eos voluptate expedita distinctio iste ullam tempore,
            accusamus quod voluptates? Sunt neque aperiam iure accusamus
            perferendis eius eos blanditiis. 
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod
            nesciunt aliquam a mollitia obcaecati. Dolorem totam nulla voluptate
            debitis consequuntur quasi? Tenetur exercitationem dolore soluta
            delectus doloribus nesciunt accusamus aliquid. Tempore, debitis
            illum aliquid error beatae eveniet quod amet ab officia ipsa odio
            maiores. Corrupti neque sequi reiciendis! Maiores quasi sunt maxime
            voluptate doloribus aut eius tenetur eum modi architecto deserunt,
            iusto officia porro.
          </p>
        </motion.div>
        <motion.div
          className="right-side"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="apply-job-button">
            <Link to="/job">
              <button className="apply-job">Şimdi Başvur</button>
            </Link>
          </div>
          <div className="logo-company">
            <Link to="/job">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="features">
            <div className="feature">
              <span>Konum</span>
              <p>Antalya / Turkey</p>
            </div>
            <div className="feature">
              <span>Tarih</span>
              <p>10.10.2024 10.00-18.00</p>
            </div>
            <div className="feature">
              <span>Mekan</span>
              <p>Antalya Akdeniz Üniversitesi</p>
            </div>
            <div className="feature">
              <span>Kimler Başvurabilir</span>
              <p>Üniversite Öğrencileri</p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Event;
