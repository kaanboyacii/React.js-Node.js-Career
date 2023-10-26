import "./about.scss";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PeopleImage from "../../img/people.webp"

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};
const eventCards = [
  {
    id: 1,
    title: "Etkinlik 1",
    description: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta suscipit saepe, fugit recusandae eveniet incidunt labore nihil, dolor tenetur nemo voluptas eligendi aspernatur, at beatae doloremque quis maxime! Blanditiis fugit, deleniti aspernatur sit non voluptatum saepe nisi. Aliquam sint enim illum cum rerum sapiente autem, libero iusto minima sequi quisquam!",
    imageSrc: "resim1.jpg",
    buttons: [
      { label: "Düğme 1", link: "link1" },
      { label: "Düğme 2", link: "link2" },
    ],
  },
  {
    id: 2,
    title: "Etkinlik 2",
    description: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta suscipit saepe, fugit recusandae eveniet incidunt labore nihil, dolor tenetur nemo voluptas eligendi aspernatur, at beatae doloremque quis maxime! Blanditiis fugit, deleniti aspernatur sit non voluptatum saepe nisi. Aliquam sint enim illum cum rerum sapiente autem, libero iusto minima sequi quisquam!",
    imageSrc: "resim2.jpg",
    buttons: [
      { label: "Düğme 1", link: "link1" },
      { label: "Düğme 2", link: "link2" },
    ],
  },
  {
    id: 3,
    title: "Etkinlik 3",
    description: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta suscipit saepe, fugit recusandae eveniet incidunt labore nihil, dolor tenetur nemo voluptas eligendi aspernatur, at beatae doloremque quis maxime! Blanditiis fugit, deleniti aspernatur sit non voluptatum saepe nisi. Aliquam sint enim illum cum rerum sapiente autem, libero iusto minima sequi quisquam!",
    imageSrc: "resim3.jpg",
    buttons: [
      { label: "Düğme 1", link: "link1" },
      { label: "Düğme 3", link: "link3" },
    ],
  },
  {
    id: 4,
    title: "Etkinlik 4",
    description: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta suscipit saepe, fugit recusandae eveniet incidunt labore nihil, dolor tenetur nemo voluptas eligendi aspernatur, at beatae doloremque quis maxime! Blanditiis fugit, deleniti aspernatur sit non voluptatum saepe nisi. Aliquam sint enim illum cum rerum sapiente autem, libero iusto minima sequi quisquam!",
    imageSrc: "resim4.jpg",
    buttons: [
      { label: "Düğme 1", link: "link1" },
      { label: "Düğme 4", link: "link4" },
    ],
  },
  // Diğer etkinlik kartları...
];

const About = () => {
    const ref = useRef();

    const isInView = useInView(ref, { margin: "-100px" });
  
    return (
      <motion.div
        className="events"
        variants={variants}
        initial="initial"
        // animate="animate"
        // whileInView="animate"
        ref={ref}
        animate={"animate"}
      >
        <motion.div className="textContainer" variants={variants}>
          <p>
            Sizin daha iyi bir kariyer sahibi
            <br /> olmanız için çalışıyoruz
          </p>
          <hr />
        </motion.div>
        <motion.div className="titleContainer" variants={variants}>
          <div className="title">
            <img src={PeopleImage} alt="" />
            <h1>
              <motion.b whileHover={{color:"orange"}}>Sizin</motion.b> Gelişiminiz
            </h1>
          </div>
          <div className="title">
            <h1>
              <motion.b whileHover={{color:"orange"}}>Bizim</motion.b> Gelişimimiz.
            </h1>
            <button>SİZE NE SUNUYORUZ?</button>
          </div>
        </motion.div>
        <motion.div className="listContainer" variants={variants}>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray", color: "black" }}
          >
            <h2>Branding</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              libero enim nisi aliquam consectetur expedita magni eius ex corrupti
              animi! Ad nam pariatur assumenda quae mollitia libero repellat
              explicabo maiores?
            </p>
            <button>Go</button>
          </motion.div>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray", color: "black" }}
          >
            <h2>Branding</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              libero enim nisi aliquam consectetur expedita magni eius ex corrupti
              animi! Ad nam pariatur assumenda quae mollitia libero repellat
              explicabo maiores?
            </p>
            <button>Go</button>
          </motion.div>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray", color: "black" }}
          >
            <h2>Branding</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              libero enim nisi aliquam consectetur expedita magni eius ex corrupti
              animi! Ad nam pariatur assumenda quae mollitia libero repellat
              explicabo maiores?
            </p>
            <button>Go</button>
          </motion.div>
          <motion.div
            className="box"
            whileHover={{ background: "lightgray", color: "black" }}
          >
            <h2>Branding</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              libero enim nisi aliquam consectetur expedita magni eius ex corrupti
              animi! Ad nam pariatur assumenda quae mollitia libero repellat
              explicabo maiores?
            </p>
            <button>Go</button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };
  
export default About;
