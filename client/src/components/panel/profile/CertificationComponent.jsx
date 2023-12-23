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

const CertificationComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddingCertification, setIsAddingCertification] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (name, value) => {
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAddCertification = () => {
    setIsAddingCertification(true);
  };

  const handleCancelCertification = () => {
    setIsAddingCertification(false);
    setInputs({});
  };

  const handleDeleteCertification = async (index) => {
    try {
      const updatedCertifications = currentUser.certifications.filter(
        (cert, i) => i !== index
      );
      const res = await axios.put(`/users/${currentUser._id}`, {
        certifications: updatedCertifications,
      });

      if (res.status === 200) {
        dispatch(
          updateProfile({
            ...currentUser,
            certifications: updatedCertifications,
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

  const handleSaveCertification = async (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.institution || !inputs.date) {
      alert("Alanların doldurulması zorunludur !");
      return;
    }

    try {
      const res = await axios.put(`/users/${currentUser._id}`, {
        certifications: [...currentUser.certifications, inputs],
      });

      if (res.status === 200) {
        setIsAddingCertification(false);
        dispatch(
          updateProfile({
            ...currentUser,
            certifications: [...currentUser.certifications, inputs],
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
      <h1>Sertifikalar</h1>
      <div className="user-info">
        {isAddingCertification ? (
          <div className="form">
            <Input
              type="text"
              name="title"
              placeholder="Sertifika Adı"
              value={
                inputs.title !== undefined
                  ? inputs.title
                  : currentUser.certifications.title
              }
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input
              type="text"
              name="institution"
              placeholder="Kurum"
              value={
                inputs.institution !== undefined
                  ? inputs.institution
                  : currentUser.certifications.institution
              }
              onChange={(e) => handleChange("institution", e.target.value)}
            />
            <Input
              type="date"
              name="date"
              placeholder="Alım Tarihi"
              value={
                inputs.date !== undefined
                  ? inputs.date
                  : currentUser.certifications.date
                  ? new Date(currentUser.certifications.date)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) => handleChange("date", e.target.value)}
            />
            <div className="buttons">
              <button className="edit-button" onClick={handleSaveCertification}>
                <SaveIcon />
                Kaydet
              </button>
              <button
                className="cancel-button"
                onClick={handleCancelCertification}
              >
                Vazgeç
              </button>
            </div>
          </div>
        ) : (
          <button className="edit-button" onClick={handleAddCertification}>
            <AddIcon />
            Ekle
          </button>
        )}
      </div>
      <div className="list">
        <h3>Sertifikalar</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sertifika Adı</TableCell>
                <TableCell>Kurum</TableCell>
                <TableCell>Alım Tarihi</TableCell>
                <TableCell>Kaldır</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser.certifications.map((cert, index) => (
                <TableRow key={index}>
                  <TableCell>{cert.title}</TableCell>
                  <TableCell>{cert.institution}</TableCell>
                  <TableCell>
                    {new Date(cert.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteCertification(index)}>
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

export default CertificationComponent;
