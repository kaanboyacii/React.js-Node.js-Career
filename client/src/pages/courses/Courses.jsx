import React, { useState } from "react";
import "./courses.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Image from "../../img/back.jpg";
import Image2 from "../../img/software.jpg";

const courseCardsData = [
  {
    title: "C++ Course Step by Step",
    teacher: "Ahmet Ercan",
    level: "Beginner",
    category: "Yazılım",
    img: Image,
  },
  {
    title: "Aranan Yazılımcı Olma Kamp Kursu",
    teacher: "Erhan Kocak",
    level: "Beginner",
    category: "Yazılım",
    img: Image2,
  },
  {
    title: "A'dan Z'ye Finans Eğitimi",
    teacher: "Kerem Titsi",
    level: "Mid Level",
    category: "Finance",
    img: Image,
  },
  {
    title: "C++ Course Step by Step",
    teacher: "Ahmet Ercan",
    level: "Beginner",
    category: "Yazılım",
    img: Image,
  },
  {
    title: "Aranan Yazılımcı Olma Kamp Kursu",
    teacher: "Erhan Kocak",
    level: "Beginner",
    category: "Yazılım",
    img: Image,
  },
  {
    title: "A'dan Z'ye Finans Eğitimi",
    teacher: "Kerem Titsi",
    level: "Mid Level",
    category: "Finance",
    img: Image,
  },
  {
    title: "C++ Course Step by Step",
    teacher: "Ahmet Ercan",
    level: "Beginner",
    category: "Yazılım",
    img: Image,
  },
  {
    title: "Aranan Yazılımcı Olma Kamp Kursu",
    teacher: "Erhan Kocak",
    level: "Beginner",
    category: "Yazılım",
    img: Image,
  },
  {
    title: "A'dan Z'ye Finans Eğitimi",
    teacher: "Kerem Titsi",
    level: "Mid Level",
    category: "Finance",
    img: Image,
  },
];

const Courses = () => {
  const [visibleCourseCards, setVisibleCourseCards] = useState(8);

  return (
    <div className="courses">
      <Navbar />
      <div className="courses-container">
        <motion.div
          className="sidebar"
          initial={{ opacity: 0, scale: 0.8 }} // Başlangıç durumu
          animate={{ opacity: 1, scale: 1 }} // Animasyon sırasında
          transition={{ duration: 0.3 }}
        >
          <h1>Filtreleme</h1>
          <div className="filter-group">
            <h3>İş Tipi</h3>
            <FormControlLabel control={<Checkbox />} label="Tam Zamanlı" />
            <FormControlLabel control={<Checkbox />} label="Yarı Zamanlı" />
            <FormControlLabel control={<Checkbox />} label="Uzaktan Çalışma" />
          </div>
          <div className="filter-group">
            <h3>Kategori</h3>
            <FormControlLabel control={<Checkbox />} label="Yazılım" />
            <FormControlLabel control={<Checkbox />} label="Donanım" />
            <FormControlLabel control={<Checkbox />} label="Finans" />
          </div>
          <div className="filter-group">
            <h3>Deneyim</h3>
            <FormControlLabel control={<Checkbox />} label="0-1 Yıl" />
            <FormControlLabel control={<Checkbox />} label="1-3 Yıl" />
            <FormControlLabel control={<Checkbox />} label="3+ Yıl" />
          </div>
        </motion.div>{" "}
        <motion.div
          className="course-cards"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {courseCardsData.slice(0, visibleCourseCards).map((course, index) => (
            <div className="course-card" key={index}>
              <div className="course-card-img">
                <img src={course.img} alt="Resim Açıklaması" />
              </div>
              <div className="course-card-content">
                <h3>{course.title}</h3>
                <p>Eğitmen: {course.teacher}</p>
                <p>Seviye: {course.level}</p>
                <p>Kategori: {course.category}</p>
                <Link to="/course">
                  <button>Detayları İncele</button>
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="more-button">
        <button onClick={() => setVisibleCourseCards(visibleCourseCards + 4)}>
          Daha Fazla Göster
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
