import React, { useEffect, useState } from "react";
import "./job.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import Logo from "../../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import JobConfirmation from "../../components/messages/JobConfirmation";
import { useSelector } from "react-redux";

const Job = () => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[2];
  const [jobData, setJobData] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isAlreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/jobs/${path}`);
        setJobData(res.data);
        setAlreadyApplied(currentUser.jobApplications.includes(res.data._id));
      } catch (err) {
        console.log("User AUTH Error");
      }
    };
    fetchData();
  }, [path, currentUser.jobApplications]);

  const handleApplyClick = async () => {
    if (!isAlreadyApplied) {
      try {
        const response = await axios.post(`/users/apply-job/${path}`);
        if (response.data.success) {
          console.log("Job application successful!");
          setAlreadyApplied(true);
        } else {
          console.error("Job application failed:", response.data.message);
        }
        setConfirmationOpen(true);
      } catch (error) {
        console.error("Error applying for the job:", error.message);
      }
    } else {
      console.log("User has already applied to this job");
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  return (
    <div className="job">
      <Navbar />
      <div className="jobContainer">
        {jobData && (
          <>
            <motion.div
              className="left-side"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1>{jobData.title}</h1>
              <Link to={`/company/${jobData.company.companyId}`}>
                <h2>{jobData.company.companyName}</h2>
              </Link>
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
                {!isAlreadyApplied && (
                  <button className="apply-job" onClick={handleApplyClick}>
                    Şimdi Başvur
                  </button>
                )}
                {isAlreadyApplied && (
                  <p className="already-applied-message">
                    Bu işe zaten başvurdunuz
                  </p>
                )}
                {isAlreadyApplied && (
                  <button className="applied-job" disabled>
                    Başvuru Yapıldı
                  </button>
                )}
              </div>
              <JobConfirmation
                open={isConfirmationOpen}
                handleClose={handleCloseConfirmation}
              />
              <div className="logo-company">
                <Link to={`/company/${jobData.company.companyId}`}>
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
