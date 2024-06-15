import React, { useEffect, useState } from "react";
import "./applications.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Applications = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      if (
        currentUser &&
        currentUser.jobApplications &&
        currentUser.jobApplications.length > 0
      ) {
        try {
          const ids = currentUser.jobApplications.join(",");
          const response = await fetch(`/jobs?ids=${ids}`);
          const data = await response.json();
          setJobApplications(data.jobApplications || []);
        } catch (error) {
          console.error("Error fetching job applications:", error);
        }
      } else {
        setJobApplications([]);
      }
    };

    fetchJobApplications();
  }, [currentUser]);

  return (
    <div className="applications">
      {jobApplications.length > 0 ? (
        jobApplications.map((data, index) => (
          <div className="applications-card" key={index}>
            <div className="applications-item">
              <div className="applications-details">
                <Link to={`/job/${data._id}`}>
                  <h2>{data.title}</h2>
                </Link>
                <Link to={`/company/${data.company.companyId}`}>
                  <h3>{data.company.companyName}</h3>
                </Link>
              </div>
              <div className="applications-status">
                <span className="status-label">Başvuruldu</span>
                <span className="status-mark">&#10004;</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Applications;
