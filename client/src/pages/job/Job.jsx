import React, { useEffect, useState } from "react";
import "./job.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import Logo from "../../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Job = () => {
  const path = useLocation().pathname.split("/")[2];
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/jobs/${path}`);
        setJobData(res.data);
      } catch (err) {
        console.log("User AUTH Error");
      }
    };
    fetchData();
  }, [path]);
  

  return (
    <div className="job">
      <Navbar />
      <div className="jobcontainer">
        {jobData && (
          <>
            <motion.div
              className="left-side"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1>{jobData.title}</h1>
              <h2>{jobData.company.companyName}</h2>
              <h3>İş Detayları</h3>
              <p>{jobData.description}</p>
              <h3>İstenen Nitelikler</h3>
              <ul>
                {jobData.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
              <h3>Sorumluluklar</h3>
              <ul>
                {jobData.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
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
                  <p>{jobData.location}</p>
                </div>
                <div className="feature">
                  <span>Maaş</span>
                  <p>{jobData.salary} / Aylık</p>
                </div>
                <div className="feature">
                  <span>Seviye</span>
                  <p>{jobData.level}</p>
                </div>
                <div className="feature">
                  <span>İş Tipi</span>
                  <p>{jobData.type}</p>
                </div>
                <div className="feature">
                  <span>Tarih</span>
                  <p>
                    {" "}
                    {jobData.datePosted
                      ? new Date(jobData.datePosted).toLocaleDateString()
                      : ""}
                  </p>
                </div>
                <div className="feature">
                  <span>Çalışma Şekli</span>
                  <p>{jobData.workFrom}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Job;
