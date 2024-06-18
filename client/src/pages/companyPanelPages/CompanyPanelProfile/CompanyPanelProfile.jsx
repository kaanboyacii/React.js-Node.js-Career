import React, { useState } from "react";
import Layout from "../Layout";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import { companyUpdateProfile } from "../../../redux/companySlice";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./companyPanelProfile.scss";

const CompanyPanelProfile = () => {
  const { currentCompany } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    description: currentCompany.description || "",
  });

  const handleChange = (name, value) => {
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/company/${currentCompany._id}`, {
        ...inputs,
      });
      if (res.status === 200) {
        dispatch(companyUpdateProfile({ ...currentCompany, ...inputs }));
        console.log("Company profile updated successfully");
        window.location.reload();
      } else {
        console.error("Failed to update company profile");
      }
    } catch (error) {
      console.error("Error updating company profile:", error);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const storageRef = ref(
        storage,
        `avatars/${currentCompany._id}/${file.name}`
      );

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        const updatedCompany = {
          ...currentCompany,
          img: url,
        };
        console.log(url);
        setInputs((prev) => ({
          ...prev,
          img: url,
        }));
        const res = await axios.put(
          `/company/${currentCompany._id}`,
          updatedCompany
        );
        if (res.status === 200) {
          console.log("Company profile updated successfully");
          dispatch(companyUpdateProfile(updatedCompany));
        } else {
          console.error("Failed to update company profile");
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="company-panel-profile">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <div className="avatar-container">
                  <Avatar
                    alt="Company Logo"
                    src={currentCompany.img}
                    sx={{ width: 200, height: 200 }}
                  />
                </div>
                <input
                  accept="image/*"
                  id="avatar-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-input">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className="btn"
                  >
                    Profil Fotoğrafını Değiştir
                  </Button>
                </label>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <h1>Şirket Bilgilerini Güncelle</h1>
                <form onSubmit={handleSaveClick}>
                  <TextField
                    label="Şirket Adı"
                    value={
                      inputs.name !== undefined
                        ? inputs.name
                        : currentCompany.name
                    }
                    onChange={(e) => handleChange("name", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Email"
                    value={
                      inputs.email !== undefined
                        ? inputs.email
                        : currentCompany.email
                    }
                    onChange={(e) => handleChange("email", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Sektör"
                    value={
                      inputs.industry !== undefined
                        ? inputs.industry
                        : currentCompany.industry
                    }
                    onChange={(e) => handleChange("industry", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Konum"
                    value={
                      inputs.location !== undefined
                        ? inputs.location
                        : currentCompany.location
                    }
                    onChange={(e) => handleChange("location", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <TextField
                    label="Web Sitesi"
                    value={
                      inputs.website !== undefined
                        ? inputs.website
                        : currentCompany.website
                    }
                    onChange={(e) => handleChange("website", e.target.value)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                  <ReactQuill
                    theme="snow"
                    value={inputs.description}
                    onChange={(value) => handleChange("description", value)}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "font",
                      "size",
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
                      "video",
                    ]}
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                  />
                  <Button
                    className="btn"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Güncelle
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

export default CompanyPanelProfile;
