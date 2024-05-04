import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import "./companyPanelUserProfile.scss"
import axios from "axios";
import { useLocation } from "react-router-dom";

const CompanyPanelUserProfile = () => {
  const location = useLocation();
  const jobId = location.pathname.split("/").pop();


  
  return (
    <Layout>
      <div className="company-panel-user-profile">
        
      </div>
    </Layout>
  );
};

export default CompanyPanelUserProfile;
