import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./hero.scss";
import { motion } from "framer-motion";
import HeroImage from "../../img/hero.png";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 20,
    },
  },
};

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/jobs/search?title=${searchTerm}`);
        const data = await response.json();
        setSearchResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (searchTerm !== "") {
      fetchJobs();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>
            Sana Özel Fırsatları Yakala
          </motion.h2>
          <motion.h1 variants={textVariants}>Kariyerin Olsun</motion.h1>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
        </motion.div>
        <div className="searchContainer">
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              id="free-solo-1-demo"
              disableClearable
              options={(searchResults || []).map((result) => result.title)}
              onInputChange={(event, value) => setSearchTerm(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kariyerini Arama Başla..."
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <Link
                  to={`/job/${
                    (
                      (searchResults || []).find(
                        (result) => result.title === option
                      ) || {}
                    )?._id
                  }`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    overflow: "hidden",
                    margin: 0,
                  }}
                >
                  <Paper elevation={3} sx={{ p: 1 }}>
                    <Typography variant="body1">{option}</Typography>
                  </Paper>
                </Link>
              )}
            />
          </Stack>
        </div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        i need career i need career
      </motion.div>
      <div className="imageContainer">
        <img src={HeroImage} alt="" />
      </div>
    </div>
  );
};

export default Hero;
