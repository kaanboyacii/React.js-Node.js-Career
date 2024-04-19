import React, { useEffect, useState } from "react";
import "./event.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../img/logo.png";
import { useSelector } from "react-redux";
import EventConfirmation from "../../components/messages/EventConfirmation";
import axios from "axios";

const Event = () => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname.split("/")[2];
  const [eventData, setEventData] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isAlreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/events/${path}`);
        setEventData(res.data);
        setAlreadyApplied(currentUser.eventApplications.includes(res.data._id));
      } catch (err) {
        console.log("User AUTH Error");
      }
    };
    fetchData();
  }, [path, currentUser && currentUser.eventApplications]);
  
  const handleApplyClick = async () => {
    if (!isAlreadyApplied) {
      try {
        const response = await axios.post(`/users/apply-event/${path}`);
        if (response.data.success) {
          console.log("Event application successful!");
          setAlreadyApplied(true);
        } else {
          console.error("Event application failed:", response.data.message);
        }
        setConfirmationOpen(true);
      } catch (error) {
        console.error("Error applying for the Event:", error.message);
      }
    } else {
      console.log("User has already applied to this Event");
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };
  return (
    <div className="event">
      <Navbar />
      <div className="event-container">
        {eventData && (
          <>
            <motion.div
              className="left-side"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1>{eventData.title}</h1>
              <h3>
                <Link to={`/company/${eventData.company.companyId}`}>
                  <h2>{eventData.company.companyName}</h2>
                </Link>
              </h3>
              <h3>Etkinlik Detayları</h3>
              <p>{eventData.description}</p>
              <h3>İstenen Nitelikler</h3>
              <ul>
                {eventData.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
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
                    Bu etkinliğe zaten başvurdunuz
                  </p>
                )}
                {isAlreadyApplied && (
                  <button className="applied-job" disabled>
                    Başvuru Yapıldı
                  </button>
                )}
              </div>
              <EventConfirmation
                open={isConfirmationOpen}
                handleClose={handleCloseConfirmation}
              />
              <div className="logo-company">
                <Link to={`/company/${eventData.company.companyId}`}>
                  <img src={Logo} alt="" />
                </Link>
              </div>
              <div className="features">
                <div className="feature">
                  <span>Konum</span>
                  <p>{eventData.location}</p>
                </div>
                <div className="feature">
                  <span>Tarih</span>
                  <p>
                    {eventData.date
                      ? new Date(eventData.date).toLocaleDateString()
                      : ""}
                  </p>
                </div>
                <div className="feature">
                  <span>Son Başvuru Tarihi</span>
                  <p>
                    {" "}
                    {eventData.applicationDeadline
                      ? new Date(
                          eventData.applicationDeadline
                        ).toLocaleDateString()
                      : ""}
                  </p>
                </div>
                <div className="feature">
                  <span>Etkinlik Tipi</span>
                  <p>{eventData.type}</p>
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

export default Event;
