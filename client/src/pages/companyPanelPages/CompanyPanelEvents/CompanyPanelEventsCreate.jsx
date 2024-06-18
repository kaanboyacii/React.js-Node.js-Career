import React, { useState } from "react";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase imports
import { storage } from "../../../firebase"; // Firebase configuration

const CompanyPanelEventsCreate = ({ onClose }) => {
  const [eventData, setEventData] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (name, value) => {
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      let imgUrl = eventData.img;
      if (file) {
        const storageRef = ref(storage, `events/${file.name}`);
        await uploadBytes(storageRef, file);
        imgUrl = await getDownloadURL(storageRef);
      }

      const newEventData = {
        ...eventData,
        img: imgUrl,
      };

      const res = await axios.post("/events/", newEventData);
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
              <Card elevation={3} style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <CardContent>
                  <Grid container justifyContent="space-between" alignItems="center">
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
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="title"
                          label="Etkinlik Başlığı"
                          value={eventData.title || ""}
                          onChange={(e) => handleChange("title", e.target.value)}
                          variant="outlined"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button
                          variant="contained"
                          component="label"
                          color="primary"
                          fullWidth
                          size="small"
                          margin="dense"
                        >
                          Görsel Yükle
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </Button>
                        {file && <p>{file.name}</p>}
                      </Grid>
                      <Grid item xs={12}>
                        <p>Açıklama:</p>
                        <ReactQuill
                          value={eventData.description || ""}
                          onChange={(value) => handleChange("description", value)}
                          theme="snow"
                          modules={{
                            toolbar: [
                              [{ header: [1, 2, false] }],
                              ["bold", "italic", "underline", "strike", "blockquote"],
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
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="location"
                          label="Konum"
                          value={eventData.location || ""}
                          onChange={(e) => handleChange("location", e.target.value)}
                          variant="outlined"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="type"
                          label="Tip"
                          value={eventData.type || ""}
                          onChange={(e) => handleChange("type", e.target.value)}
                          variant="outlined"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="date"
                          label="Tarih"
                          type="date"
                          value={eventData.date || ""}
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
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="applicationDeadline"
                          label="Başvuru Son Tarihi"
                          type="date"
                          value={eventData.applicationDeadline || ""}
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

export default CompanyPanelEventsCreate;
