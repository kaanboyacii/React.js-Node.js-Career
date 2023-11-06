import React from "react";
import "./profile.scss";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
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
};

const Profile = () => {
  return (
    <div className="profile-card">
      <div className="general">
        <h1>Genel Bilgiler</h1>
        <div className="user-info">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt={user.name} src={user.image} sx={{ width: 200, height: 200 }} />
            <div className="info">
              <h3>{user.name}</h3>
              <span className="title">{user.title}</span>
            </div>
          </Stack>
          <button className="edit-button">
            <EditIcon />Düzenle
          </button>
        </div>
        <div className="contact-info">
          <div>
            <h5>E-posta Adresi</h5>
            <span>{user.email}</span>
          </div>
          <div>
            <h5>Telefon</h5>
            <span>{user.phone}</span>
          </div>
          <div>
            <h5>Doğum Tarihi</h5>
            <span>{user.dateOfBirth}</span>
          </div>
          <div>
            <h5>Cinsiyet</h5>
            <span>{user.gender}</span>
          </div>
          <div>
            <h5>Ülke / Şehir</h5>
            <span>{user.country}</span>
          </div>
          <div>
            <h5>Sürücü Belgesi</h5>
            <span>{user.drivingLicense}</span>
          </div>
          <div>
            <h5>Çalışma Durumu</h5>
            <span>{user.workStatus}</span>
          </div>
          <div>
            <h5>Çalışmak İstediği Alanlar</h5>
            <span>{user.workWant}</span>
          </div>
          <div>
            <h5>Kariyer Seviyesi</h5>
            <span>{user.careerLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
