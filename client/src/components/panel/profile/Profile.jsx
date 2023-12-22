import React, { useState } from "react";
import "./profile.scss";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import AvatarImage from "../../../img/avatar.jpg";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProfile } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputs, setInputs] = useState({});
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

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
  const handleSaveEducation = async (e) => {
    e.preventDefault();
    if (!inputs.institution || !inputs.degree || !inputs.startDate || !inputs.endDate) {
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

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        // setUpdatedUser({ ...updatedUser, image: newImage });
        setIsChangeAvatar(false);
      };
      reader.readAsDataURL(file);
    }
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
                src={currentUser.img}
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
                type="text"
                name="birth"
                value={
                  inputs.birth !== undefined ? inputs.birth : currentUser.birth
                }
                onChange={(e) => handleChange("birth", e.target.value)}
              />
            ) : (
              <span>{currentUser.birth}</span>
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
      <div className="feature-card">
        <h1>Eğitim</h1>
        <div className="user-info">
          {isAddingEducation ? (
            <div className="education-form">
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
              <Input
                type="date"
                name="startDate"
                placeholder="Başlama Tarihi"
                value={
                  inputs.startDate !== undefined
                    ? inputs.startDate
                    : currentUser.education.startDate
                    ? new Date(currentUser.education.startDate)
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
                    : currentUser.education.endDate
                    ? new Date(currentUser.education.endDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
              <div className="buttons">
                <button className="edit-button" onClick={handleSaveEducation}>
                  <SaveIcon />
                  Kaydet
                </button>
                <button
                  className="cancel-button"
                  onClick={handleCancelEducation}
                >
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
          <ul>
            {currentUser.education.map((edu, index) => (
              <li key={index}>
                <span className="title">{edu.institution}:</span>
                <span>Derece: {edu.degree} </span>
                <span>
                  Başlama Tarihi: {new Date(edu.startDate).toLocaleDateString()}
                </span>
                <span>
                  Bitirme Tarihi: {new Date(edu.endDate).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div className="feature-card">
        <h1>Deneyim</h1>
        <div className="user-info">
          {isAddingExperience ? (
            <div className="education-form">
              <input
                type="text"
                name="title"
                placeholder="Pozisyon (Ünvan)"
                value={currentUser.experience.title}
              />
              <input
                type="text"
                name="company"
                placeholder="Şirket Adı"
                value={currentUser.experience.company}
              />
              <input
                type="text"
                name="time"
                placeholder="Çalışma Süresi"
                value={currentUser.experience.description}
              />
              <button className="edit-button">
                <SaveIcon />
                Kaydet
              </button>
            </div>
          ) : (
            <button className="edit-button" >
              <AddIcon />
              Ekle
            </button>
          )}
        </div>
        <div className="list">
          <h3>Deneyimler</h3>
          <ul>
            {currentUser.experience.map((exp, index) => (
              <li key={index}>
                <span className="title">{exp.title}:</span> {exp.company},{" "}
                {exp.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="feature-card">
        <h1>Yetenekler</h1>
        <div className="user-info">
          {isAddingSkill ? (
            <div className="education-form">
              <input
                type="text"
                name="skill"
                placeholder="Yetenek Adı"
                value={currentUser.skill.title}
              />
              <input
                type="text"
                name="level"
                placeholder="Seviye"
                value={currentUser.skill.description}
              />
              <button className="edit-button">
                <SaveIcon />
                Kaydet
              </button>
            </div>
          ) : (
            <button className="edit-button">
              <AddIcon />
              Ekle
            </button>
          )}
        </div>
        <div className="list">
          <h3>Yetenek</h3>
          <ul>
            {currentUser.skills.map((sk, index) => (
              <li key={index}>
                <span className="title">{sk.title}:</span> {sk.description}
              </li>
            ))}
          </ul>
        </div>
      </div> * */}
      <div className="feature-card">
        <h1>İlgi Alanları</h1>
        <div className="user-info">
          {/* <Stack spacing={2} sx={{ width: 800 }}>
            <Autocomplete
              multiple
              id="size-small-standard-multi"
              size="small"
              options={interest}
              getOptionLabel={(option) => option.title}
              defaultValue={[interest[0]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Size small"
                  placeholder="Favorites"
                />
              )}
            />
          </Stack> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
