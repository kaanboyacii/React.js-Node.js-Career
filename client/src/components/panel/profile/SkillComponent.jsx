// SkillComponent.js
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

const SkillComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (name, value) => {
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAddSkill = () => {
    setIsAddingSkill(true);
  };

  const handleCancelSkill = () => {
    setIsAddingSkill(false);
    setInputs({});
  };

  const handleDeleteSkill = async (index) => {
    try {
      const updatedSkills = currentUser.skills.filter(
        (skill, i) => i !== index
      );
      const res = await axios.put(`/users/${currentUser._id}`, {
        skills: updatedSkills,
      });

      if (res.status === 200) {
        dispatch(updateProfile({ ...currentUser, skills: updatedSkills }));
        navigate("/panel");
        window.location.reload();
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!inputs.skillName || !inputs.skillLevel) {
      alert("Alanların doldurulması zorunludur !");
      return;
    }

    try {
      const res = await axios.put(`/users/${currentUser._id}`, {
        skills: [...currentUser.skills, inputs],
      });

      if (res.status === 200) {
        setIsAddingSkill(false);
        dispatch(
          updateProfile({
            ...currentUser,
            skills: [...currentUser.skills, inputs],
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
      <h1>Beceriler</h1>
      <div className="user-info">
        {isAddingSkill ? (
          <div className="form">
            <Input
              type="text"
              name="title"
              placeholder="Beceri Adı"
              value={
                inputs.title !== undefined
                  ? inputs.title
                  : currentUser.skills.title
              }
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input
              type="text"
              name="description"
              placeholder="Beceri Açıklaması"
              value={
                inputs.description !== undefined
                  ? inputs.description
                  : currentUser.skills.description
              }
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <div className="buttons">
              <button className="edit-button" onClick={handleSaveSkill}>
                <SaveIcon />
                Kaydet
              </button>
              <button className="cancel-button" onClick={handleCancelSkill}>
                Vazgeç
              </button>
            </div>
          </div>
        ) : (
          <button className="edit-button" onClick={handleAddSkill}>
            <AddIcon />
            Ekle
          </button>
        )}
      </div>
      <div className="list">
        <h3>Beceriler</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Beceri Adı</TableCell>
                <TableCell>Beceri Açıklaması</TableCell>
                <TableCell>Kaldır</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser.skills.map((skill, index) => (
                <TableRow key={index}>
                  <TableCell>{skill.title}</TableCell>
                  <TableCell>{skill.description}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteSkill(index)}>
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

export default SkillComponent;
