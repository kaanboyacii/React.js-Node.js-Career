import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./companyProfile.scss";

const CompanyProfile = () => {
  const path = useLocation().pathname.split("/")[2];
  const [company, setCompany] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/company/${path}`);
        setCompany(res.data);
      } catch (err) {
        console.log("Error fetching company data:", err);
      }
    };
    fetchData();
  }, [path]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        if (company) {
          const companyId = company._id;
          const response = await axios.get(`/jobs/company/${companyId}`);
          setJobApplications(response.data); // assuming response.data directly contains job applications
        }
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, [company]);

  return (
    <div className="company">
      <Navbar />
      <div className="companyContainer">
        {company && (
          <>
            <motion.div
              className="company-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={company.img} alt={company.name} />
              <div className="company-info">
                <h1>{company.name}</h1>
                <p>{company.industry}</p>
                <p>{company.location}</p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.website}
                </a>
                <p className="company-description">{company.description}</p>
              </div>
            </motion.div>
            <motion.div
              className="company-job-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {jobApplications.map((data, index) => (
                <div className="job-card" key={index}>
                  <h3>{data.title}</h3>
                  <p>Şirket: {data.company.companyName}</p>
                  <p>Lokasyon: {data.location}</p>
                  <p>İş Tipi: {data.type}</p>
                  <Link to={`/job/${data._id}`}>
                    <button>Detayları İncele</button>
                  </Link>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CompanyProfile;
