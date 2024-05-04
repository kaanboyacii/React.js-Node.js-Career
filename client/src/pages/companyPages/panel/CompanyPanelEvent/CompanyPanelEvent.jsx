import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import "./companyPanelEvent.scss";
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

const CompanyPanelEvent = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleChange = (name, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/events/${eventId}`, eventData);
      if (res.status === 200) {
        window.location.reload();
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const deleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Etkinliği kaldırmak istediğinizden emin misiniz?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(`/events/${eventId}`);
        if (res.status === 200) {
          window.history.back();
        } else {
          console.error("Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="company-panel-event">
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
                  <h1>Etkinliği Düzenle</h1>
                  <IconButton onClick={goBack} aria-label="Close">
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <form onSubmit={handleSaveClick}>
                  <TextField
                    id="title"
                    label="İş Başlığı"
                    value={eventData.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    id="title"
                    label="Görsel URL"
                    value={eventData.img || ""}
                    onChange={(e) => handleChange("img", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    id="title"
                    label="Konum"
                    value={eventData.location || ""}
                    onChange={(e) => handleChange("location", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    id="title"
                    label="Etkinlik Tipi"
                    value={eventData.type || ""}
                    onChange={(e) => handleChange("type", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    id="date"
                    label="Tarih"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="applicationDeadline"
                    label="Başvuru Son Tarihi"
                    type="date"
                    value={eventData.applicationDeadline}
                    onChange={(e) =>
                      handleChange("applicationDeadline", e.target.value)
                    }
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <p>Açıklama:</p>
                  <ReactQuill
                    value={eventData.description || ""}
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
                  <Button variant="contained" color="primary" type="submit">
                    Güncelle
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={deleteEvent}
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

export default CompanyPanelEvent;
