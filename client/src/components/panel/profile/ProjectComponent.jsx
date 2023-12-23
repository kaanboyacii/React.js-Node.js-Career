// ProjectComponent.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProfile } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ProjectComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (name, value) => {
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAddProject = () => {
    setIsAddingProject(true);
  };

  const handleCancelProject = () => {
    setIsAddingProject(false);
    setInputs({});
  };

  const handleDeleteProject = async (index) => {
    try {
      const updatedProjects = currentUser.projects.filter(
        (project, i) => i !== index
      );
      const res = await axios.put(`/users/${currentUser._id}`, {
        projects: updatedProjects,
      });

      if (res.status === 200) {
        dispatch(updateProfile({ ...currentUser, projects: updatedProjects }));
        navigate("/panel");
        window.location.reload();
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.startDate ||
      !inputs.endDate ||
      !inputs.skills
    ) {
      alert("Alanların doldurulması zorunludur !");
      return;
    }

    try {
      const res = await axios.put(`/users/${currentUser._id}`, {
        projects: [...currentUser.projects, inputs],
      });

      if (res.status === 200) {
        setIsAddingProject(false);
        dispatch(
          updateProfile({
            ...currentUser,
            projects: [...currentUser.projects, inputs],
          })
        );
        navigate("/panel");
        window.location.reload();
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="feature-card">
      <h1>Projeler</h1>
      <div className="user-info">
        {isAddingProject ? (
          <div className="form">
            <Input
              type="text"
              name="title"
              placeholder="Proje Adı"
              value={
                inputs.title !== undefined
                  ? inputs.title
                  : currentUser.projects.title
              }
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input
              type="text"
              name="description"
              placeholder="Açıklama"
              value={
                inputs.description !== undefined
                  ? inputs.description
                  : currentUser.projects.description
              }
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <Input
              type="text"
              name="skills"
              placeholder="Yetenekler (Virgülle Ayırın)"
              value={
                inputs.skills !== undefined
                  ? inputs.skills
                  : currentUser.projects.skills
                  ? currentUser.projects.skills.join(", ")
                  : ""
              }
              onChange={(e) => handleChange("skills", e.target.value)}
            />
                        <div className="date-inputs">

            <Input
              type="date"
              name="startDate"
              placeholder="Başlama Tarihi"
              value={
                inputs.startDate !== undefined
                  ? inputs.startDate
                  : currentUser.projects.startDate
                  ? new Date(currentUser.projects.startDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <Input
              type="date"
              name="endDate"
              placeholder="Bitirme Tarihi"
              value={
                inputs.endDate !== undefined
                  ? inputs.endDate
                  : currentUser.projects.endDate
                  ? new Date(currentUser.projects.endDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
            </div>
            <div className="buttons">
              <button className="edit-button" onClick={handleSaveProject}>
                <SaveIcon />
                Kaydet
              </button>
              <button className="cancel-button" onClick={handleCancelProject}>
                Vazgeç
              </button>
            </div>
          </div>
        ) : (
          <button className="edit-button" onClick={handleAddProject}>
            <AddIcon />
            Ekle
          </button>
        )}
      </div>
      <div className="list">
        <h3>Projeler</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Proje Adı</TableCell>
                <TableCell>Açıklama</TableCell>
                <TableCell>Yetenekler</TableCell>
                <TableCell>Başlama Tarihi</TableCell>
                <TableCell>Bitirme Tarihi</TableCell>
                <TableCell>Kaldır</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser.projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    {new Date(project.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(project.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{project.skills.join(", ")}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteProject(index)}>
                      KALDIR
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProjectComponent;
