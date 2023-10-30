import React from "react";
import "./joblist.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { motion } from "framer-motion";

const countries = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387",
  },

  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { code: "VE", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "1-340",
  },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" },
];
const jobCardsData = [
    {
      title: "Software Developer",
      company: "İzmir Yazılım",
      location: "İzmir / Konak",
      category: "Yazılım",
    },
    {
      title: "Software Developer",
      company: "İzmir Yazılım",
      location: "İzmir / Konak",
      category: "Yazılım",
    },
    {
      title: "Software Developer",
      company: "İzmir Yazılım",
      location: "İzmir / Konak",
      category: "Yazılım",
    },
    {
      title: "Software Developer",
      company: "İzmir Yazılım",
      location: "İzmir / Konak",
      category: "Yazılım",
    },
    {
      title: "Software Developer",
      company: "İzmir Yazılım",
      location: "İzmir / Konak",
      category: "Yazılım",
    },
    {
      title: "Software Developer",
      company: "İzmir Yazılım",
      location: "İzmir / Konak",
      category: "Yazılım",
    },
    {
      title: "Software Developer",
      company: "İzmir Yazılım",
      location: "İzmir / Konak",
      category: "Yazılım",
    },
    {
      title: "Software Developer",
      company: "İzmir Yazılım",
      location: "İzmir / Konak",
      category: "Yazılım",
    },
  ];
  
const Joblist = () => {
  return (
    <div className="joblist">
      <Navbar />
      <div className="joblist-container">
        <motion.div
          className="sidebar"
          initial={{ opacity: 0, scale: 0.8 }} // Başlangıç durumu
          animate={{ opacity: 1, scale: 1 }} // Animasyon sırasında
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
            <FormControlLabel control={<Checkbox />} label="Tam Zamanlı" />
            <FormControlLabel control={<Checkbox />} label="Yarı Zamanlı" />
            <FormControlLabel control={<Checkbox />} label="Uzaktan Çalışma" />
          </div>
          <div className="filter-group">
            <h3>Kategori</h3>
            <FormControlLabel control={<Checkbox />} label="Yazılım" />
            <FormControlLabel control={<Checkbox />} label="Donanım" />
            <FormControlLabel control={<Checkbox />} label="Finans" />
          </div>
          <div className="filter-group">
            <h3>Deneyim</h3>
            <FormControlLabel control={<Checkbox />} label="0-1 Yıl" />
            <FormControlLabel control={<Checkbox />} label="1-3 Yıl" />
            <FormControlLabel control={<Checkbox />} label="3+ Yıl" />
          </div>
        </motion.div>
        <motion.div
          className="job-cards"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
           {jobCardsData.map((job, index) => (
            <div className="job-card" key={index}>
              <h3>{job.title}</h3>
              <p>Şirket: {job.company}</p>
              <p>Lokasyon: {job.location}</p>
              <p>Kategori: {job.category}</p>
              <button>Başvur</button>
            </div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Joblist;
