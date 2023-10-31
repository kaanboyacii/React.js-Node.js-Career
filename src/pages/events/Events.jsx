import React, { useState } from "react";
import "./events.scss";
import Image from "../../img/software.jpg";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const eventsCardsData = [
  {
    title: "Software buluşması",
    company: "İzmir Yazılım",
    location: "İzmir / Konak",
    category: "Yazılım",
    date: "11.01.2024 11.00-17.00",
    last_date: "11.01.2024",
    img: Image,
  },
  {
    title: "Web Geliştirme Semineri",
    company: "WebMasters Akademi",
    location: "Ankara / Çankaya",
    category: "Yazılım",
    date: "20.02.2024 11.00-17.00",
    last_date: "11.01.2024",
    img: Image,
  },
  {
    title: "Mobil Uygulama Geliştirme Atölyesi",
    company: "MobilTech Danışmanlık",
    location: "İstanbul / Beşiktaş",
    category: "Yazılım",
    date: "15.03.2024 11.00-17.00",
    last_date: "11.01.2024",
    img: Image,
  },
  {
    title: "Veri Analitiği Konferansı",
    company: "DataMinds Derneği",
    location: "Antalya / Lara",
    category: "Yazılım",
    date: "10.04.2024 11.00-17.00",
    last_date: "11.01.2024",
    img: Image,
  },
  {
    title: "Veri Analitiği Konferansı",
    company: "DataMinds Derneği",
    location: "Antalya / Lara",
    category: "Yazılım",
    date: "10.04.2024 11.00-17.00",
    last_date: "11.01.2024",
    img: Image,
  },
  {
    title: "Veri Analitiği Konferansı",
    company: "DataMinds Derneği",
    location: "Antalya / Lara",
    category: "Yazılım",
    date: "10.04.2024 11.00-17.00",
    last_date: "11.01.2024",
    img: Image,
  },
  {
    title: "Veri Analitiği Konferansı",
    company: "DataMinds Derneği",
    location: "Antalya / Lara",
    category: "Yazılım",
    date: "10.04.2024",
    last_date: "11.01.2024",
    img: Image,
  },
];

const Events = () => {
  const [visibleEventsCards, setVisibleEventsCards] = useState(4);

  return (
    <div className="events">
      <Navbar />
      <div className="events-container">
        <div className="left-side">
          <div className="events-cards">
            {eventsCardsData
              .slice(0, visibleEventsCards)
              .map((event, index) => (
                <motion.div
                  className="event-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {" "}
                  <img
                    className="event-image"
                    src={event.img}
                    alt={event.title}
                  />
                  <div className="event-details">
                    <Link to="/event">
                      <h3>{event.title}</h3>
                    </Link>
                    <p>
                      <strong>Şirket:</strong> {event.company}
                    </p>
                    <p>
                      <strong>Lokasyon:</strong> {event.location}
                    </p>
                    <p>
                      <strong>Tarih:</strong> {event.date}⏰
                    </p>
                    <p>
                      <strong>Kategori:</strong> {event.category}
                    </p>
                    <span>
                      <hr />
                      Son Başvuru Tarihi: <strong>
                        {event.last_date}
                      </strong>
                    </span>
                  </div>
                  <Link to="/event">
                    <button>Etkinlik Detaylarını Gör</button>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
        <div className="right-side">sağ</div>
      </div>
      <motion.div
        className="more-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button onClick={() => setVisibleEventsCards(visibleEventsCards + 4)}>
          Daha Fazla Göster
        </button>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Events;
