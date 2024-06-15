import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./applications.scss";
import { useSelector } from "react-redux";
import axios from "axios";

const Applications = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      if (currentUser && currentUser._id) {
        try {
          const userId = currentUser._id;
          const response = await axios.get(`/jobs/user/${userId}`);
          setJobApplications(response.data || []);
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
        <p>Kullanıcıya ait başvuru bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Applications;
