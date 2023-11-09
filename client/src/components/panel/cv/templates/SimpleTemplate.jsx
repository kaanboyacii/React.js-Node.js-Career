import React from "react";

const SimpleTemplate = ({ cvData }) => {
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
    },
    cvTemp: {
      width: "21cm",
      height: "29.7cm",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f0f0f0",
    },
    h1: {
      textAlign: "center",
    },
    personalInfo: {
      marginBottom: "20px",
    },
    avatar: {
      textAlign: "center",
    },
    avatarImg: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
    },
    education: {
      marginBottom: "20px",
    },
    experience: {
      marginBottom: "20px",
    },
    skills: {
      marginBottom: "20px",
    },
    ul: {
      listStyle: "none",
      padding: 0,
    },
    li: {
      marginBottom: "5px",
    },
  };

  return (
    <div style={styles.cvTemp}>
      <h1 style={styles.h1}>{cvData.ad}</h1>
      <div style={styles.personalInfo}>
        <div style={styles.avatar}>
          <img
            src="https://images.squarespace-cdn.com/content/v1/5cf0d08d5fc69d000172462a/1599805610146-J0G5GMGFBXVWND4Z71UK/Aleem+Business+Headshot+for+LinkedIn+Profile.jpg"
            alt="Profil Resmi"
            style={styles.avatarImg}
          />
        </div>
      </div>
      <div style={styles.education}>
        <h2>Eğitim</h2>
        <ul style={styles.ul}>
          {cvData.eğitim.map((item, index) => (
            <li key={index} style={styles.li}>
              {item.okul} - {item.bölüm} ({item.mezuniyetYılı})
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.experience}>
        <h2>Deneyim</h2>
        <ul style={styles.ul}>
          {cvData.deneyim.map((item, index) => (
            <li key={index} style={styles.li}>
              {item.şirket} - {item.pozisyon} ({item.başlangıçTarihi} -{" "}
              {item.bitişTarihi})
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.skills}>
        <h2>Beceriler</h2>
        <ul style={styles.ul}>
          {cvData.beceriler.map((skill, index) => (
            <li key={index} style={styles.li}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SimpleTemplate;
