import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./events.scss";
import Image from "../../img/back.jpg";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Etkinlik 1",
      image: Image,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad aliquam esse voluptates maxime voluptatum cupiditate, molestias tenetur deleniti delectus ea repudiandae, quisquam sed? Autem asperiores tempore voluptatum consectetur! Iure et fuga, labore minima non saepe, totam odio, expedita nisi placeat beatae voluptatum? Voluptatibus illum perspiciatis ducimus ea! Saepe, in.",
    },
    {
      id: 2,
      title: "Etkinlik 2",
      image: Image,
      description:
        "          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad aliquam esse voluptates maxime voluptatum cupiditate, molestias tenetur deleniti delectus ea repudiandae, quisquam sed? Autem asperiores tempore voluptatum consectetur! Iure et fuga, labore minima non saepe, totam odio, expedita nisi placeat beatae voluptatum? Voluptatibus illum perspiciatis ducimus ea! Saepe, in.",
    },
    {
      id: 3,
      title: "Etkinlik 3",
      image: Image,
      description:
        "          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad aliquam esse voluptates maxime voluptatum cupiditate, molestias tenetur deleniti delectus ea repudiandae, quisquam sed? Autem asperiores tempore voluptatum consectetur! Iure et fuga, labore minima non saepe, totam odio, expedita nisi placeat beatae voluptatum? Voluptatibus illum perspiciatis ducimus ea! Saepe, in.",
    },
    {
      id: 4,
      title: "Etkinlik 3",
      image: Image,
      description:
        "          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad aliquam esse voluptates maxime voluptatum cupiditate, molestias tenetur deleniti delectus ea repudiandae, quisquam sed? Autem asperiores tempore voluptatum consectetur! Iure et fuga, labore minima non saepe, totam odio, expedita nisi placeat beatae voluptatum? Voluptatibus illum perspiciatis ducimus ea! Saepe, in.",
    },
    {
      id: 5,
      title: "Etkinlik 5",
      image: Image,
      description:
        "          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad aliquam esse voluptates maxime voluptatum cupiditate, molestias tenetur deleniti delectus ea repudiandae, quisquam sed? Autem asperiores tempore voluptatum consectetur! Iure et fuga, labore minima non saepe, totam odio, expedita nisi placeat beatae voluptatum? Voluptatibus illum perspiciatis ducimus ea! Saepe, in.",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <div className="event-slider">
        <h1>Güncel Etkinlikler</h1>
        <Slider {...sliderSettings}>
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} />
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <button>Detaylar</button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Events;
