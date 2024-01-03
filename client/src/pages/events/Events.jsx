import React, { useEffect, useState } from "react";
import "./events.scss";
import Image from "../../img/software.jpg";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Events = () => {
  const [visibleEventsCards, setVisibleEventsCards] = useState(6);
  const [eventCardsData, setEventCardsData] = useState([]);
  const showMoreButton = eventCardsData.length > 8;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/events/getAllEvents");
        const data = await response.json();
        setEventCardsData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="events">
      <Navbar />
      <div className="events-container">
        <div className="left-side">
          <div className="events-cards">
            {eventCardsData.slice(0, visibleEventsCards).map((event, index) => (
              <motion.div
                className="event-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {" "}
                {/* <img
                  className="event-image"
                  src={event.img}
                  alt={event.title}
                /> */}
                <div className="event-details">
                  <Link to="/event">
                    <h3>{event.title}</h3>
                  </Link>
                  <p>
                    <strong>Şirket:</strong> {event.company.companyName}
                  </p>
                  <p>
                    <strong>Lokasyon:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Tarih:</strong>
                    {event.date
                      ? new Date(event.date).toLocaleString("tr-TR", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })
                      : ""}
                    ⏰
                  </p>
                  <p>
                    <strong>Kategori:</strong> {event.type}
                  </p>
                  <span>
                    <hr />
                    Son Başvuru Tarihi:{" "}
                    <strong>
                      {" "}
                      {event.applicationDeadline
                        ? new Date(
                            event.applicationDeadline
                          ).toLocaleDateString()
                        : ""}
                    </strong>
                  </span>
                </div>
                <Link to={`/events/${event._id}`}>
                  <button>Etkinlik Detaylarını Gör</button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="more-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {showMoreButton && (
          <button onClick={() => setEventCardsData(visibleEventsCards + 4)}>
            Daha Fazla Göster
          </button>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Events;
