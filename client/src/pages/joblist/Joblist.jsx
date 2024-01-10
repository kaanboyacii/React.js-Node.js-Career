import React, { useEffect, useState } from "react";
import "./joblist.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const countries = [
  { code: "AD", label: "AB", phone: "376" },
  {
    code: "TR",
    label: "TURKEY",
    phone: "971",
  },
];

const Joblist = () => {
  const [visibleJobCards, setVisibleJobCards] = useState(8);
  const [jobCardsData, setJobCardsData] = useState([]);
  const [filters, setFilters] = useState({
    location: null,
    jobType: {
      fullTime: false,
      partTime: false,
      remote: false,
    },
    workFrom: {
      office: false,
      remote: false,
      hybrid: false,
    },
  });

  const showMoreButton = jobCardsData.length > 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/jobs/getAllJobs");
        const data = await response.json();
        setJobCardsData(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (group, key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [group]: {
        ...prevFilters[group],
        [key]: !prevFilters[group][key],
      },
    }));
  };

  const filterJobs = (job) => {
    const typeFilter =
      (!filters.jobType.fullTime || job.type === "Full-Time") &&
      (!filters.jobType.partTime || job.type === "Part-Time") &&
      (!filters.jobType.remote || job.type === "Remote");

    const workFromFilter =
      (!filters.workFrom.office || job.workFrom === "Ofis") &&
      (!filters.workFrom.remote || job.workFrom === "Uzaktan") &&
      (!filters.workFrom.hybrid || job.workFrom === "Hybrid");

    return typeFilter && workFromFilter;
  };

  const filteredJobs = jobCardsData.filter(filterJobs);

  return (
    <div className="joblist">
      <Navbar />
      <div className="joblist-container">
        <motion.div
          className="sidebar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Filtreleme</h1>
          <div className="filter-group">
            <h3>Lokasyon</h3>
            <Autocomplete
              id="country-select-demo"
              sx={{ width: 300 }}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ülke Seç"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </div>
          <div className="filter-group">
            <h3>İş Tipi</h3>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.jobType.fullTime}
                  onChange={() => handleCheckboxChange("jobType", "fullTime")}
                />
              }
              label="Tam Zamanlı"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.jobType.partTime}
                  onChange={() => handleCheckboxChange("jobType", "partTime")}
                />
              }
              label="Yarı Zamanlı"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.jobType.internship}
                  onChange={() => handleCheckboxChange("jobType", "internship")}
                />
              }
              label="Stajyerlik"
            />
          </div>
          <div className="filter-group">
            <h3>Çalışma Yeri</h3>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.workFrom.office}
                  onChange={() => handleCheckboxChange("workFrom", "office")}
                />
              }
              label="Ofis"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.workFrom.remote}
                  onChange={() => handleCheckboxChange("workFrom", "remote")}
                />
              }
              label="Uzaktan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.workFrom.hybrid}
                  onChange={() => handleCheckboxChange("workFrom", "hybrid")}
                />
              }
              label="Hybrid"
            />
          </div>
        </motion.div>
        <motion.div
          className="job-cards"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredJobs.slice(0, visibleJobCards).map((job, index) => (
            <div className="job-card" key={index}>
              <h3>{job.title}</h3>
              <p>Şirket: {job.company.companyName}</p>
              <p>Lokasyon: {job.location}</p>
              <p>İş Tipi: {job.type}</p>
              <Link to={`/job/${job._id}`}>
                <button>Detayları İncele</button>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="more-button">
        {showMoreButton && (
          <button onClick={() => setVisibleJobCards(visibleJobCards + 4)}>
            Daha Fazla Göster
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Joblist;
