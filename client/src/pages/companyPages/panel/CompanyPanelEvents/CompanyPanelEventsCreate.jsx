import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Fade,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CompanyPanelEventsCreate = ({ onClose }) => {
  const [eventData, setEventData] = useState({});

  const handleChange = (name, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/events/", eventData);
      if (res.status === 201) {
        onClose();
        window.location.reload();
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Modal open={true} onClose={onClose} closeAfterTransition>
      <Fade in={true}>
        <div className="modal-container">
          <Layout>
            <div className="company-panel-event-create">
              <Card elevation={3}>
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <h1>Yeni Etkinlik Oluştur</h1>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={onClose} aria-label="Close">
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <form onSubmit={handleSaveClick}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="title"
                        label="Etkinlik Başlığı"
                        value={eventData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        margin="dense"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="img"
                        label="Görsel URL"
                        value={eventData.img}
                        onChange={(e) => handleChange("img", e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        margin="dense"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p>Açıklama:</p>
                      <ReactQuill
                        value={eventData.description || ""}
                        onChange={(value) => handleChange("description", value)}
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
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="location"
                        label="Konum"
                        value={eventData.location}
                        onChange={(e) =>
                          handleChange("location", e.target.value)
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
                        id="type"
                        label="Tip"
                        value={eventData.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                        variant="outlined"
                        fullWidth
                        size="small"
                        margin="dense"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginTop: "1rem" }}
                      >
                        Kaydet
                      </Button>
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

export default CompanyPanelEventsCreate;
