import React, { useState } from "react";
import "./profile.scss";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import AvatarImage from "../../../img/avatar.jpg";

const user = {
  name: "KAAN BOYACI",
  title: "Software Developer",
  image: AvatarImage,
  email: "kaanboyacibn@gmail.com",
  phone: "+90 534 523 2689",
  dateOfBirth: "12.11.2001",
  workStatus: "Öğrenci",
  careerLevel: "0-1 yıl deneyimli",
  workWant: "yazılım, web, ön yüz geliştirme",
  gender: "Erkek",
  country: "Turkey / İzmir",
  drivingLicense: "B2-A2",
  educations: [
    {
      school: "Karabük Üniversitesi",
      degree: "Bilgisayar Mühendisliği",
      graduationYear: "2024",
    },
    {
      school: "Karabük Üniversitesi",
      degree: "Bilgisayar Mühendisliği Yüksek Lisans",
      graduationYear: "2026",
    },
  ],
};

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [education, setEducation] = useState({
    school: "",
    degree: "",
    graduationYear: "",
  });

  const handleAddEducation = () => {
    setIsAddingEducation(true);
  };

  const handleSaveEducation = () => {
    // Eğitim bilgilerini kaydetme işlemi burada yapılabilir.
    setIsAddingEducation(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    // Güncellenmiş kullanıcı bilgilerini işle, API'ye gönder
    // Örneğin, setUpdatedUser ile state'i güncelleyebilirsin.
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
        setUpdatedUser({ ...updatedUser, image: newImage });
        setIsChangeAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    setUpdatedUser({ ...updatedUser, [field]: value });
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <h1>Genel Bilgiler</h1>
        <div className="user-info">
          <Stack direction="row" spacing={2} alignItems="center">
            <label htmlFor="avatar-input">
              <Avatar
                alt={updatedUser.name}
                src={updatedUser.image}
                sx={{ width: 200, height: 200 }}
                onClick={handleAvatarClick}
              />
            </label>
            <div className="info">
              {isEditMode ? (
                <input
                  type="text"
                  value={updatedUser.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              ) : (
                <h3>{updatedUser.name}</h3>
              )}
              {isEditMode ? (
                <input
                  type="text"
                  value={updatedUser.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              ) : (
                <span className="title">{updatedUser.title}</span>
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
              <input
                type="text"
                value={updatedUser.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            ) : (
              <span>{updatedUser.email}</span>
            )}
          </div>
          <div>
            <h5>Telefon</h5>
            {isEditMode ? (
              <input
                type="text"
                value={updatedUser.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            ) : (
              <span>{updatedUser.phone}</span>
            )}
          </div>
          <div>
            <h5>Doğum Tarihi</h5>
            {isEditMode ? (
              <input
                type="text"
                value={updatedUser.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
            ) : (
              <span>{updatedUser.dateOfBirth}</span>
            )}
          </div>
          <div>
            <h5>Cinsiyet</h5>
            {isEditMode ? (
              <input
                type="text"
                value={updatedUser.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              />
            ) : (
              <span>{updatedUser.gender}</span>
            )}
          </div>
          <div>
            <h5>Ülke / Şehir</h5>
            {isEditMode ? (
              <input
                type="text"
                value={updatedUser.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            ) : (
              <span>{updatedUser.country}</span>
            )}
          </div>
          <div>
            <h5>Sürücü Belgesi</h5>
            {isEditMode ? (
              <input
                type="text"
                value={updatedUser.drivingLicense}
                onChange={(e) => handleChange("drivingLicense", e.target.value)}
              />
            ) : (
              <span>{updatedUser.drivingLicense}</span>
            )}
          </div>
          <div>
            <h5>Çalışma Durumu</h5>
            {isEditMode ? (
              <input
                type="text"
                value={updatedUser.workStatus}
                onChange={(e) => handleChange("workStatus", e.target.value)}
              />
            ) : (
              <span>{updatedUser.workStatus}</span>
            )}
          </div>
          <div>
            <h5>Çalışmak İstediği Alanlar</h5>
            {isEditMode ? (
              <input
                type="text"
                value={updatedUser.workWant}
                onChange={(e) => handleChange("workWant", e.target.value)}
              />
            ) : (
              <span>{updatedUser.workWant}</span>
            )}
          </div>
          <div>
            <h5>Kariyer Seviyesi</h5>
            {isEditMode ? (
              <input
                type="text"
                value={updatedUser.careerLevel}
                onChange={(e) => handleChange("careerLevel", e.target.value)}
              />
            ) : (
              <span>{updatedUser.careerLevel}</span>
            )}
          </div>
        </div>
      </div>
      <div className="feature-card">
        <h1>Eğitim</h1>
        <div className="user-info">
          {isAddingEducation ? (
            <div className="education-form">
              <input
                type="text"
                name="school"
                placeholder="Okul Adı"
                value={education.school}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="degree"
                placeholder="Derece"
                value={education.degree}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="graduationYear"
                placeholder="Mezuniyet Yılı"
                value={education.graduationYear}
                onChange={handleInputChange}
              />
              <button className="edit-button" onClick={handleSaveEducation}>
                <SaveIcon />
                Kaydet
              </button>
            </div>
          ) : (
            <button className="edit-button" onClick={handleAddEducation}>
              <AddIcon />
              Ekle
            </button>
          )}
        </div>
        <div className="educations-list">
          <h3>Eğitimler</h3>
          <ul>
            {user.educations.map((edu, index) => (
              <li key={index}>
                {edu.school}, {edu.degree}, Mezuniyet Yılı: {edu.graduationYear}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
