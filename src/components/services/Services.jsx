import React from "react";
import { motion } from "framer-motion"; // Import the motion component
import "./services.scss";

const cardContents = [
  {
    title: "CV Hazırlama",
    content: "Sizi ön plana çıkaracak CV'yi oluştur.",
  },
  {
    title: "İş İlanlar",
    content: "Size uygun iş pozisyonlarını bul.",
  },
  {
    title: "Kariyer Etkinlikleri",
    content: "Büyük kariyer etkinlerine katıl.",
  },
  {
    title: "Şirketler",
    content: "Sektörünün önde gelen firmalarıyla tanış.",
  },
  {
    title: "Yetenek Programları",
    content: "Kendinizi geliştirebileceğin programlara katıl.",
  },
];

const Services = () => {
  return (
    <div className="container">
      {cardContents.map((card, index) => (
        <motion.div
          key={index}
          className="card"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 80,
          }}
        >
          <h3>{card.title}</h3>
          <p>{card.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Services;
