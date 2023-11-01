import React from "react";
import "./job.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import Logo from "../../img/logo.png";
import { Link } from "react-router-dom";

const Job = () => {
  return (
    <div className="job">
      <Navbar />
      <div className="jobcontainer">
        <motion.div
          className="left-side"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1>İş Başlığı</h1>
          <h2>Şirket Adı</h2>
          <h3>İş Detayları</h3>
          <p>İş ilanı hakkında açıklamalar burada olacak.</p>
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
            perferendis eius eos blanditiis. Optio qui iste magnam soluta
            laudantium, excepturi numquam esse ea officia pariatur animi
            temporibus dolore deleniti assumenda vitae modi. Iure tempora nisi,
            quia sint perferendis, ratione aperiam itaque vitae architecto id
            beatae necessitatibus assumenda distinctio vero repellat eaque
            temporibus voluptatem. Culpa tenetur asperiores cupiditate nam, amet
            rerum saepe nisi perferendis ullam vitae ex accusantium, ea eos
            explicabo quasi delectus sed magni quae voluptatem. Aspernatur
            aperiam animi, commodi sunt eius quod ipsa! Iure, iste quam!
            Exercitationem dicta dignissimos laboriosam id laudantium cumque
            perferendis, sit labore tempora soluta maiores quis voluptatibus?
            Voluptatem, iste ut. Repellat, sint aperiam? Animi deleniti rerum
            veniam harum eligendi autem?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod
            nesciunt aliquam a mollitia obcaecati. Dolorem totam nulla voluptate
            debitis consequuntur quasi? Tenetur exercitationem dolore soluta
            delectus doloribus nesciunt accusamus aliquid. Tempore, debitis
            illum aliquid error beatae eveniet quod amet ab officia ipsa odio
            maiores. Corrupti neque sequi reiciendis! Maiores quasi sunt maxime
            voluptate doloribus aut eius tenetur eum modi architecto deserunt,
            iusto officia porro, distinctio iste temporibus totam! Eaque sint
            consectetur magnam laboriosam nostrum dolor eius suscipit quod
            distinctio nihil, nam totam assumenda deleniti perferendis quae
            repellendus quis impedit temporibus asperiores id consequatur nobis
            numquam ipsam! Aliquam laudantium non sit architecto, voluptatum rem
            ab blanditiis placeat eligendi omnis ipsum fugiat sunt, aut esse,
            totam facere asperiores odit! Non quam quisquam omnis vitae
            doloribus id suscipit corporis! Ut in natus, animi praesentium eum
            non, aut autem ea officiis eaque sint enim, nam fuga quas labore
            saepe alias aliquid nostrum dolorem.
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
              <p>İzmir / Turkey</p>
            </div>
            <div className="feature">
              <span>Maaş</span>
              <p>30k / Aylık</p>
            </div>
            <div className="feature">
              <span>Seviye</span>
              <p>Deneyimli</p>
            </div>
            <div className="feature">
              <span>İş Tipi</span>
              <p>Tam Zamanlı</p>
            </div>
            <div className="feature">
              <span>Tarih</span>
              <p>16 Ekim 2023</p>
            </div>
            <div className="feature">
              <span>Çalışma Şekli</span>
              <p>İş Yerinde</p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Job;
