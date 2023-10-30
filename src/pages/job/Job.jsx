import React from "react";
import "./job.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Job = () => {
  return (
    <div className="job">
      <Navbar />
      <div className="jobcontainer">
        <div className="left-side">left</div>
        <div className="right-side">right</div>
      </div>
      <Footer />
    </div>
  );
};

export default Job;
