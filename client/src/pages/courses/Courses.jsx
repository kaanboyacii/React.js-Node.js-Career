import React from "react";
import "./courses.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Courses = () => {
  return (
    <div className="courses">
      <Navbar />
      <div className="courses-container">
        <div className="left-side">left</div>
        <div className="right-side">right</div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
