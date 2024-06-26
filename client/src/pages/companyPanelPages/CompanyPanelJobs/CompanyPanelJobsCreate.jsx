import React, { useState, useEffect } from "react";
import Layout from "../Layout";
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
  Modal,
  Fade,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CompanyPanelJobCreate = ({ onClose }) => {
  const API_ENDPOINT = "https://turkiyeapi.dev/api/v1/provinces";
  const [locations, setLocations] = useState([]);
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    type: "",
    workFrom: "",
    level: "",
    description: "",
    requirements: "",
    salary: "",
  });

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

  const handleChange = (name, value) => {
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/jobs/", jobData);
      if (res.status === 201) {
        onClose();
        window.location.reload();
      } else {
        console.error("Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <Modal open={true} onClose={onClose} closeAfterTransition>
      <Fade in={true}>
        <div className="modal-container">
          <Layout>
            <div className="company-panel-job-create">
              <Card
                elevation={3}
                style={{ maxHeight: "80vh", overflowY: "auto" }}
              >
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <h1>Yeni İş İlanı Oluştur</h1>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={onClose} aria-label="Close">
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <form onSubmit={handleSaveClick}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          id="title"
                          label="İş Başlığı"
                          value={jobData.title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                          variant="outlined"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          size="small"
                          margin="dense"
                          required
                        >
                          <InputLabel id="location-label">Lokasyon</InputLabel>
                          <Select
                            labelId="location-label"
                            id="location"
                            value={jobData.location}
                            onChange={(e) =>
                              handleChange("location", e.target.value)
                            }
                            label="Lokasyon"
                            required
                          >
                            {locations.map((location) => (
                              <MenuItem key={location.id} value={location.name}>
                                {location.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
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
                            value={jobData.type}
                            onChange={(e) =>
                              handleChange("type", e.target.value)
                            }
                            label="İş Tipi"
                          >
                            <MenuItem value="Full-Time">Full-Time</MenuItem>
                            <MenuItem value="Part-Time">Part-Time</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          size="small"
                          margin="dense"
                          required
                        >
                          <InputLabel id="workFrom-label">
                            Çalışma Şekli
                          </InputLabel>
                          <Select
                            labelId="workFrom-label"
                            id="workFrom"
                            value={jobData.workFrom}
                            onChange={(e) =>
                              handleChange("workFrom", e.target.value)
                            }
                            label="Çalışma Şekli"
                            required
                          >
                            <MenuItem value="Ofis">Ofis</MenuItem>
                            <MenuItem value="Uzaktan">Uzaktan</MenuItem>
                            <MenuItem value="Hybrid">Hybrid</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          id="level"
                          label="Seviye"
                          value={jobData.level}
                          onChange={(e) =>
                            handleChange("level", e.target.value)
                          }
                          variant="outlined"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          id="salary"
                          label="Maaş"
                          value={jobData.salary}
                          onChange={(e) =>
                            handleChange("salary", e.target.value)
                          }
                          variant="outlined"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <p>Açıklama:</p>
                        <ReactQuill
                          value={jobData.description || ""}
                          onChange={(value) =>
                            handleChange("description", value)
                          }
                          theme="snow"
                          modules={{
                            toolbar: [
                              [{ header: [1, 2, false] }],
                              [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                              ],
                              [{ list: "ordered" }, { list: "bullet" }],
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
                            "link",
                            "image",
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{ marginTop: "1rem" }}
                        >
                          Kaydet
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </div>
          </Layout>
        </div>
      </Fade>
    </Modal>
  );
};

export default CompanyPanelJobCreate;
