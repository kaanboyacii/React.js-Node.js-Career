import "./about.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PeopleImage from "../../img/people.webp";
import { Link } from "react-router-dom";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="events"
      variants={variants}
      initial="initial"
      animate={"animate"}
      ref={ref}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>Size daha iyi bir kariyer sahibi olma yönünde yardımcı oluyoruz.</p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src={PeopleImage} alt="" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Sizin</motion.b>{" "}
            Gelişiminiz
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Bizim</motion.b>{" "}
            Gelişimimiz.
          </h1>
          <Link to="/aboutus">
            <button>SİZE NE SUNUYORUZ?</button>
          </Link>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>CV Oluşturma</h2>
          <p>
            Kariyerinizde başarıyı sağlamak için etkili bir CV oluşturmanın
            önemini biliyoruz. Deneyimlerinizi ve becerilerinizi en iyi şekilde
            yansıtacak şekilde CV'nizi oluşturmanızda size yardımcı oluyoruz.
            Ayrıca, CV'nizi gözden geçirme ve önerilerde bulunma gibi destekler
            sunuyoruz.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>İş İlanları</h2>
          <p>
            Sizin kariyer hedeflerinize uygun iş fırsatlarını keşfetmenizi
            sağlıyoruz. Geniş bir iş ilanı veritabanımız ile iş arama sürecinizi
            kolaylaştırıyoruz. İstediğiniz sektörde ve konumda iş bulmanıza
            yardımcı olacak araçlar ve kaynaklar sunuyoruz.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Etkinlikler</h2>
          <p>
            Kariyerinizi ilerletmenize yardımcı olacak çeşitli etkinlikler
            düzenliyoruz. Seminerler, workshop'lar ve network etkinlikleri ile
            bilgi ve deneyim kazanmanızı sağlıyoruz. Profesyonellerle tanışma ve
            bağlantı kurma fırsatları sunuyoruz.
          </p>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Programlar</h2>
          <p>
            Teknoloji ve iş dünyasında kendinizi geliştirmek için çeşitli eğitim
            ve programlar sunuyoruz. İhtiyacınıza göre özelleştirilmiş eğitim
            planları ve sertifika programları ile kariyerinizdeki ilerlemeyi
            destekliyoruz. Yenilikçi ve pratik yaklaşımlarla sizi iş dünyasında
            bir adım öne çıkarıyoruz.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
