import React, { useState } from "react";
import "./profile.scss";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProfile } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import EducationComponent from "./EducationComponent ";
import ExperienceComponent from "./ExperienceComponent";
import SkillComponent from "./SkillComponent";
import ProjectComponent from "./ProjectComponent";
import CertificationComponent from "./CertificationComponent";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import AvatarNotification from "../../messages/AvatarNotification";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputs, setInputs] = useState({});
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleChange = (name, value) => {
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //UPDATE USER INFO
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/users/${currentUser._id}`, { ...inputs });
      if (res.status === 200) {
        setIsEditMode(false);
        dispatch(updateProfile({ ...currentUser, ...inputs }));
        navigate("/panel");
        window.location.reload();
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  const handleAvatarClick = () => {
    setIsChangeAvatar(true);
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const storageRef = ref(
        storage,
        `avatars/${currentUser._id}/${file.name}`
      );

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        const updatedUser = {
          ...currentUser,
          img: url,
        };
        setInputs((prev) => ({
          ...prev,
          avatar: url,
        }));
        setIsChangeAvatar(false);
        const res = await axios.put(`/users/${currentUser._id}`, updatedUser);
        if (res.status === 200) {
          console.log("User profile updated successfully");
          setNotificationOpen(true);
        } else {
          console.error("Failed to update user profile");
          setNotificationOpen(true);
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
        setNotificationOpen(true);
      }
    }
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <h1>Genel Bilgiler</h1>
        <div className="user-info">
          <Stack direction="row" spacing={2} alignItems="center">
            <label htmlFor="avatar-input">
              <Avatar
                alt={currentUser.name}
                src={inputs.avatar || currentUser.img}
                sx={{ width: 200, height: 200 }}
                onClick={handleAvatarClick}
              />
            </label>
            <div className="info">
              {isEditMode ? (
                <Input
                  type="text"
                  value={
                    inputs.name !== undefined ? inputs.name : currentUser.name
                  }
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              ) : (
                <h3>{currentUser.name}</h3>
              )}
              {isEditMode ? (
                <Input
                  type="text"
                  value={
                    inputs.title !== undefined
                      ? inputs.title
                      : currentUser.title
                  }
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              ) : (
                <span className="title">{currentUser.title}</span>
              )}
            </div>
          </Stack>
          {isEditMode ? (
            <button className="edit-button" onClick={handleSaveClick}>
              <SaveIcon />
              Kaydet
            </button>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>
              <EditIcon />
              Düzenle
            </button>
          )}
          {isChangeAvatar && (
            <input
              type="file"
              id="avatar-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          )}
        </div>
        <div className="contact-info">
          <div>
            <h5>E-posta Adresi</h5>
            {isEditMode ? (
              <Input
                type="text"
                name="email"
                value={
                  inputs.email !== undefined ? inputs.email : currentUser.email
                }
                onChange={(e) => handleChange("email", e.target.value)}
              />
            ) : (
              <span>{currentUser.email}</span>
            )}
          </div>
          <div>
            <h5>Telefon</h5>
            {isEditMode ? (
              <Input
                type="text"
                name="phone"
                value={
                  inputs.phone !== undefined ? inputs.phone : currentUser.phone
                }
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            ) : (
              <span>{currentUser.phone}</span>
            )}
          </div>
          <div>
            <h5>Doğum Tarihi</h5>
            {isEditMode ? (
              <Input
                type="date"
                name="birth"
                value={
                  inputs.birth !== undefined ? inputs.birth : currentUser.birth
                }
                onChange={(e) => handleChange("birth", e.target.value)}
              />
            ) : (
              <span>
                {currentUser.birth
                  ? new Date(currentUser.birth).toLocaleDateString()
                  : ""}
              </span>
            )}
          </div>
          <div>
            <h5>Cinsiyet</h5>
            {isEditMode ? (
              <Input
                type="text"
                name="gender"
                value={
                  inputs.gender !== undefined
                    ? inputs.gender
                    : currentUser.gender
                }
                onChange={(e) => handleChange("gender", e.target.value)}
              />
            ) : (
              <span>{currentUser.gender}</span>
            )}
          </div>
          <div>
            <h5>Ülke / Şehir</h5>
            {isEditMode ? (
              <Input
                type="text"
                name="city"
                value={
                  inputs.city !== undefined ? inputs.city : currentUser.city
                }
                onChange={(e) => handleChange("city", e.target.value)}
              />
            ) : (
              <span>{currentUser.city}</span>
            )}
          </div>
          <div>
            <h5>Sürücü Belgesi</h5>
            {isEditMode ? (
              <Input
                type="text"
                name="drivingLicense"
                value={
                  inputs.drivingLicense !== undefined
                    ? inputs.drivingLicense
                    : currentUser.drivingLicense
                }
                onChange={(e) => handleChange("drivingLicense", e.target.value)}
              />
            ) : (
              <span>{currentUser.drivingLicense}</span>
            )}
          </div>
          <div>
            <h5>Çalışma Durumu</h5>
            {isEditMode ? (
              <Input
                type="text"
                name="workingStatus"
                value={
                  inputs.workingStatus !== undefined
                    ? inputs.workingStatus
                    : currentUser.workingStatus
                }
                onChange={(e) => handleChange("workingStatus", e.target.value)}
              />
            ) : (
              <span>{currentUser.workingStatus}</span>
            )}
          </div>
          <div>
            <h5>Çalışmak İstediği Alanlar</h5>
            {isEditMode ? (
              <Input
                type="text"
                name="workingWant"
                value={
                  inputs.workingWant !== undefined
                    ? inputs.workingWant
                    : currentUser.workingWant
                }
                onChange={(e) => handleChange("workingWant", e.target.value)}
              />
            ) : (
              <span>{currentUser.workingWant}</span>
            )}
          </div>
          <div>
            <h5>Kariyer Seviyesi</h5>
            {isEditMode ? (
              <Input
                type="text"
                name="careerLevel"
                value={
                  inputs.careerLevel !== undefined
                    ? inputs.careerLevel
                    : currentUser.careerLevel
                }
                onChange={(e) => handleChange("careerLevel", e.target.value)}
              />
            ) : (
              <span>{currentUser.careerLevel}</span>
            )}
          </div>
        </div>
      </div>
      <EducationComponent />
      <ExperienceComponent />
      <SkillComponent />
      <CertificationComponent />
      <ProjectComponent />
      <AvatarNotification
        open={notificationOpen}
        handleClose={handleNotificationClose}
      />
    </div>
  );
};

export default Profile;
