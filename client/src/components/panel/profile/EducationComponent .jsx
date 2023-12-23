// EducationComponent.js
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

const EducationComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (name, value) => {
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAddEducation = () => {
    setIsAddingEducation(true);
  };

  const handleCancelEducation = () => {
    setIsAddingEducation(false);
    setInputs({});
  };

  const handleDeleteEducation = async (index) => {
    try {
      const updatedEducation = currentUser.education.filter(
        (edu, i) => i !== index
      );
      const res = await axios.put(`/users/${currentUser._id}`, {
        education: updatedEducation,
      });

      if (res.status === 200) {
        dispatch(
          updateProfile({ ...currentUser, education: updatedEducation })
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

  const handleSaveEducation = async (e) => {
    e.preventDefault();
    if (
      !inputs.institution ||
      !inputs.degree ||
      !inputs.startDate ||
      !inputs.endDate
    ) {
      alert("Alanların doldurulması zorunludur !");
      return;
    }

    try {
      const res = await axios.put(`/users/${currentUser._id}`, {
        education: [...currentUser.education, inputs],
      });

      if (res.status === 200) {
        setIsAddingEducation(false);
        dispatch(
          updateProfile({
            ...currentUser,
            education: [...currentUser.education, inputs],
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
      <h1>Eğitim</h1>
      <div className="user-info">
        {isAddingEducation ? (
          <div className="form">
            <Input
              type="text"
              name="institution"
              placeholder="Okul Adı"
              value={
                inputs.institution !== undefined
                  ? inputs.institution
                  : currentUser.education.institution
              }
              onChange={(e) => handleChange("institution", e.target.value)}
            />
            <Input
              type="text"
              name="degree"
              placeholder="Derece"
              value={
                inputs.degree !== undefined
                  ? inputs.degree
                  : currentUser.education.degree
              }
              onChange={(e) => handleChange("degree", e.target.value)}
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
              <button className="edit-button" onClick={handleSaveEducation}>
                <SaveIcon />
                Kaydet
              </button>
              <button className="cancel-button" onClick={handleCancelEducation}>
                Vazgeç
              </button>
            </div>
          </div>
        ) : (
          <button className="edit-button" onClick={handleAddEducation}>
            <AddIcon />
            Ekle
          </button>
        )}
      </div>
      <div className="list">
        <h3>Eğitimler</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Okul Adı</TableCell>
                <TableCell>Derece</TableCell>
                <TableCell>Başlama Tarihi</TableCell>
                <TableCell>Bitirme Tarihi</TableCell>
                <TableCell>Kaldır</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser.education.map((edu, index) => (
                <TableRow key={index}>
                  <TableCell>{edu.institution}</TableCell>
                  <TableCell>{edu.degree}</TableCell>
                  <TableCell>
                    {new Date(edu.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(edu.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteEducation(index)}>
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

export default EducationComponent;
