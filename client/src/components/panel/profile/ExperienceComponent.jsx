// ExperienceComponent.js
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

const ExperienceComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (name, value) => {
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAddExperience = () => {
    setIsAddingExperience(true);
  };

  const handleCancelExperience = () => {
    setIsAddingExperience(false);
    setInputs({});
  };

  const handleDeleteExperience = async (index) => {
    try {
      const updatedExperience = currentUser.experience.filter(
        (exp, i) => i !== index
      );
      const res = await axios.put(`/users/${currentUser._id}`, {
        experience: updatedExperience,
      });

      if (res.status === 200) {
        dispatch(
          updateProfile({ ...currentUser, experience: updatedExperience })
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

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.company || !inputs.description) {
      alert("Alanların doldurulması zorunludur !");
      return;
    }

    try {
      const res = await axios.put(`/users/${currentUser._id}`, {
        experience: [...currentUser.experience, inputs],
      });

      if (res.status === 200) {
        setIsAddingExperience(false);
        dispatch(
          updateProfile({
            ...currentUser,
            experience: [...currentUser.experience, inputs],
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
      <h1>Deneyim</h1>
      <div className="user-info">
        {isAddingExperience ? (
          <div className="form">
            <Input
              type="text"
              name="title"
              placeholder="Pozisyon (Ünvan)"
              value={
                inputs.title !== undefined
                  ? inputs.title
                  : currentUser.experience.title
              }
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input
              type="text"
              name="company"
              placeholder="Şirket Adı"
              value={
                inputs.company !== undefined
                  ? inputs.company
                  : currentUser.experience.company
              }
              onChange={(e) => handleChange("company", e.target.value)}
            />
            <Input
              type="text"
              name="description"
              placeholder="Açıklama"
              value={
                inputs.description !== undefined
                  ? inputs.description
                  : currentUser.experience.description
              }
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <div className="date-inputs">
              <Input
                type="date"
                name="startDate"
                placeholder="Başlama Tarihi"
                value={
                  inputs.startDate !== undefined
                    ? inputs.startDate
                    : currentUser.experience.startDate
                    ? new Date(currentUser.experience.startDate)
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
                    : currentUser.experience.endDate
                    ? new Date(currentUser.experience.endDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
            <div className="buttons">
              <button className="edit-button" onClick={handleSaveExperience}>
                <SaveIcon />
                Kaydet
              </button>
              <button
                className="cancel-button"
                onClick={handleCancelExperience}
              >
                Vazgeç
              </button>
            </div>
          </div>
        ) : (
          <button className="edit-button" onClick={handleAddExperience}>
            <AddIcon />
            Ekle
          </button>
        )}
      </div>
      <div className="list">
        <h3>Deneyimler</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ünvan</TableCell>
                <TableCell>Şirket</TableCell>
                <TableCell>Açıklama</TableCell>
                <TableCell>Başlama Tarihi</TableCell>
                <TableCell>Bitirme Tarihi</TableCell>
                <TableCell>Kaldır</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser.experience.map((exp, index) => (
                <TableRow key={index}>
                  <TableCell>{exp.title}</TableCell>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell>{exp.description}</TableCell>
                  <TableCell>
                    {new Date(exp.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(exp.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteExperience(index)}>
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

export default ExperienceComponent;
