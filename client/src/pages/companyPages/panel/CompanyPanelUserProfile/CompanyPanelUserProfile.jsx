import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from "axios";
import "./companyPanelUserProfile.scss";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Chip,
} from "@mui/material";

const CompanyPanelUserProfile = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const userId = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <Layout>
      <div className="company-panel-user-profile">
        {userData && (
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3} textAlign="center">
                  <Avatar
                    alt={userData.name}
                    src={userData.img}
                    sx={{ width: 280, height: 280 }}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="h4">{userData.name}</Typography>
                  <Typography variant="h6">{userData.title}</Typography>
                  <Typography variant="body1">{userData.bio}</Typography>
                  <Divider style={{ margin: "16px 0" }} />
                  <Typography variant="subtitle1">Temel Bilgiler</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Email:</strong> {userData.email}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Telefon:</strong> {userData.phone}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Şehir:</strong> {userData.city}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Cinsiyet:</strong> {userData.gender}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Doğum Tarihi:</strong>{" "}
                        {new Date(userData.birth).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Çalışma Durumu:</strong>{" "}
                        {userData.workingStatus}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider style={{ margin: "16px 0" }} />
                  <Typography variant="subtitle1">Yetenekler</Typography>
                  <div className="chip-container">
                    {userData.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill.title}
                        variant="outlined"
                        style={{ marginRight: 8, marginBottom: 8 }}
                      />
                    ))}
                  </div>
                  <Divider style={{ margin: "16px 0" }} />
                  <Typography variant="subtitle1">Eğitim</Typography>
                  <ul>
                    {userData.education.map((education, index) => (
                      <li key={index}>
                        <Typography variant="body2">
                          <strong>{education.degree}</strong> -{" "}
                          {education.institution}
                          <br />
                          {new Date(
                            education.startDate
                          ).toLocaleDateString()} -{" "}
                          {new Date(education.endDate).toLocaleDateString()}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <Divider style={{ margin: "16px 0" }} />
                  <Typography variant="subtitle1">Projeler</Typography>
                  <ul>
                    {userData.projects.map((project, index) => (
                      <li key={index}>
                        <Typography variant="body2">
                          <strong>{project.title}</strong>
                          <br />
                          {project.description}
                          <br />
                          {new Date(
                            project.startDate
                          ).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <Divider style={{ margin: "16px 0" }} />
                  <Typography variant="subtitle1">Sertifikalar</Typography>
                  <ul>
                    {userData.certifications.map((certification, index) => (
                      <li key={index}>
                        <Typography variant="body2">
                          <strong>{certification.title}</strong> -{" "}
                          {certification.institution}
                          <br />
                          {new Date(certification.date).toLocaleDateString()}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CompanyPanelUserProfile;
