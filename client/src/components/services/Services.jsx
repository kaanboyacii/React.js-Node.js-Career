import React from "react";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";
import "./services.scss";

const Services = () => {
  return (
    <div className="container">
      <motion.div
        className="card"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 80,
        }}
      >
        <h3>İş İlanları</h3>
        <p>Size uygun iş pozisyonlarını bul.</p>
      </motion.div>

      <motion.div
        className="card"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 80,
        }}
      >
        <h3>CV Hazırlama</h3>
        <p>Sizi ön plana çıkaracak CV'yi oluştur.</p>
      </motion.div>

      <motion.div
        className="card"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 80,
        }}
      >
        <h3>Kariyer Etkinlikleri</h3>
        <p>Büyük kariyer etkinlerine katıl.</p>
      </motion.div>

      <motion.div
        className="card"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 80,
        }}
      >
        <h3>Şirketler</h3>
        <p>Sektörünün önde gelen firmalarıyla tanış.</p>
      </motion.div>

      <motion.div
        className="card"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 80,
        }}
      >
        <h3>Yetenek Programları</h3>
        <p>Kendinizi geliştirebileceğin programlara katıl.</p>
      </motion.div>
    </div>
  );
};

export default Services;
