import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import "./companyPanelJob.scss";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyPanelJob = () => {
  const location = useLocation();
  const API_ENDPOINT = "https://turkiyeapi.dev/api/v1/provinces";
  const [locations, setLocations] = useState([]);
  const jobId = location.pathname.split("/").pop();
  const [jobData, setJobData] = useState({});

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const { data } = await response.json();
        const simplifiedLocations = data.map((province) => ({
          id: province.id.toString(),
          name: province.name,
        }));
        setLocations(simplifiedLocations);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`/jobs/${jobId}`);
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobData();
  }, [jobId]);

  const handleChange = (name, value) => {
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/jobs/${jobId}`, jobData);
      if (res.status === 200) {
        window.location.reload();
      } else {
        console.error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const deleteJob = async () => {
    const confirmDelete = window.confirm(
      "İş ilanını kaldırmak istediğinizden emin misiniz?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(`/jobs/${jobId}`);
        if (res.status === 200) {
          window.history.back();
        } else {
          console.error("Failed to delete job");
        }
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="company-panel-job">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h1>İş İlanını Düzenle</h1>
                  <IconButton onClick={goBack} aria-label="Close">
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <form onSubmit={handleSaveClick}>
                  <TextField
                    id="title"
                    label="İş Başlığı"
                    value={jobData.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    margin="dense"
                  >
                    <InputLabel id="location-label">Lokasyon</InputLabel>
                    <Select
                      labelId="location-label"
                      id="location"
                      value={jobData.location || ""}
                      onChange={(e) => handleChange("location", e.target.value)}
                      label="Lokasyon"
                    >
                      {locations.map((location) => (
                        <MenuItem key={location.id} value={location.name}>
                          {location.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    margin="dense"
                  >
                    <InputLabel id="type-label">İş Tipi</InputLabel>
                    <Select
                      labelId="type-label"
                      id="type"
                      value={jobData.type || ""}
                      onChange={(e) => handleChange("type", e.target.value)}
                      label="İş Tipi"
                    >
                      <MenuItem value="Full-Time">Full-Time</MenuItem>
                      <MenuItem value="Part-Time">Part-Time</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    margin="dense"
                  >
                    <InputLabel id="workFrom-label">Çalışma Şekli</InputLabel>
                    <Select
                      labelId="workFrom-label"
                      id="workFrom"
                      value={jobData.workFrom || ""}
                      onChange={(e) => handleChange("workFrom", e.target.value)}
                      label="Çalışma Şekli"
                    >
                      <MenuItem value="Ofis">Ofis</MenuItem>
                      <MenuItem value="Uzaktan">Uzaktan</MenuItem>
                      <MenuItem value="Hybrid">Hybrid</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="level"
                    label="Seviye"
                    value={jobData.level || ""}
                    onChange={(e) => handleChange("level", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <p>Açıklama:</p>
                  <ReactQuill
                    value={jobData.description || ""}
                    onChange={(value) => handleChange("description", value)}
                    theme="snow"
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "indent",
                      "link",
                      "image",
                    ]}
                  />
                  <TextField
                    id="salary"
                    label="Maaş"
                    type="number"
                    value={jobData.salary || ""}
                    onChange={(e) => handleChange("salary", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Güncelle
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={deleteJob}
                  >
                    İş İlanını Kaldır
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default CompanyPanelJob;
