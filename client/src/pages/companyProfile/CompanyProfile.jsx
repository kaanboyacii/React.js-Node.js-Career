import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import Logo from "../../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./companyProfile.scss";

const CompanyProfile = () => {
  const path = useLocation().pathname.split("/")[2];
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/company/${path}`);
        setCompany(res.data);
      } catch (err) {
        console.log("User AUTH Error");
      }
    };
    fetchData();
  }, [path]);

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
              <Avatar src={Logo} sx={{ width: 150, height: 150 }} />
              <div className="company-info">
                <h1>{company.name}</h1>
                <p>{company.industry}</p>
                <p>{company.location}</p>
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  {company.website}
                </a>
              </div>
              <p className="company-description">{company.description}</p>
            </motion.div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CompanyProfile;
