import React, { useState } from "react";
import "./cv.scss";
import Image from "../../../img/cv.png";
import jsPDF from "jspdf";
import { renderToStaticMarkup } from "react-dom/server";

const SimpleTemplate = ({ cvData }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CV</title>
        <link rel="stylesheet" type="text/css" href="simple.css" />
      </head>
      <body>
        <div className="cv">
          <h1>{cvData.ad}</h1>
          <div className="personal-info">
            <div className="avatar">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5cf0d08d5fc69d000172462a/1599805610146-J0G5GMGFBXVWND4Z71UK/Aleem+Business+Headshot+for+LinkedIn+Profile.jpg"
                alt="Profil Resmi"
              />
            </div>
          </div>
          <div className="education">
            <h2>Eğitim</h2>
            <ul>
              {cvData.eğitim.map((item, index) => (
                <li key={index}>
                  {item.okul} - {item.bölüm} ({item.mezuniyetYılı})
                </li>
              ))}
            </ul>
          </div>
          <div className="experience">
            <h2>Deneyim</h2>
            <ul>
              {cvData.deneyim.map((item, index) => (
                <li key={index}>
                  {item.şirket} - {item.pozisyon} ({item.başlangıçTarihi} -{" "}
                  {item.bitişTarihi})
                </li>
              ))}
            </ul>
          </div>
          <div className="skills">
            <h2>Beceriler</h2>
            <ul>
              {cvData.beceriler.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
};

const HRTemplate = ({ cvData }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CV</title>
        <link rel="stylesheet" type="text/css" href="simple.css" />
      </head>
      <body>
        <div className="cv">
          <h1>{cvData.ad}</h1>
          <div className="personal-info">
            <div className="avatar">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5cf0d08d5fc69d000172462a/1599805610146-J0G5GMGFBXVWND4Z71UK/Aleem+Business+Headshot+for+LinkedIn+Profile.jpg"
                alt="Profil Resmi"
              />
            </div>
          </div>
          <div className="education">
            <h2>Eğitim</h2>
            <ul>
              {cvData.eğitim.map((item, index) => (
                <li key={index}>
                  {item.okul} - {item.bölüm} ({item.mezuniyetYılı})
                </li>
              ))}
            </ul>
          </div>
          <div className="experience">
            <h2>Deneyim</h2>
            <ul>
              {cvData.deneyim.map((item, index) => (
                <li key={index}>
                  {item.şirket} - {item.pozisyon} ({item.başlangıçTarihi} -{" "}
                  {item.bitişTarihi})
                </li>
              ))}
            </ul>
          </div>
          <div className="skills">
            <h2>Beceriler</h2>
            <ul>
              {cvData.beceriler.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
};

const ITTemplate = ({ cvData }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CV</title>
        <link rel="stylesheet" type="text/css" href="simple.css" />
      </head>
      <body>
        <div className="cv">
          <h1>{cvData.ad}</h1>
          <div className="personal-info">
            <div className="avatar">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5cf0d08d5fc69d000172462a/1599805610146-J0G5GMGFBXVWND4Z71UK/Aleem+Business+Headshot+for+LinkedIn+Profile.jpg"
                alt="Profil Resmi"
              />
            </div>
          </div>
          <div className="education">
            <h2>Eğitim</h2>
            <ul>
              {cvData.eğitim.map((item, index) => (
                <li key={index}>
                  {item.okul} - {item.bölüm} ({item.mezuniyetYılı})
                </li>
              ))}
            </ul>
          </div>
          <div className="experience">
            <h2>Deneyim</h2>
            <ul>
              {cvData.deneyim.map((item, index) => (
                <li key={index}>
                  {item.şirket} - {item.pozisyon} ({item.başlangıçTarihi} -{" "}
                  {item.bitişTarihi})
                </li>
              ))}
            </ul>
          </div>
          <div className="skills">
            <h2>Beceriler</h2>
            <ul>
              {cvData.beceriler.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
};

const Cv = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const cvData = {
    ad: "John Doe",
    doğumTarihi: "01 Ocak 1990",
    eğitim: [
      {
        okul: "Örnek Üniversitesi",
        bölüm: "Bilgisayar Mühendisliği",
        mezuniyetYılı: "2012",
      },
      {
        okul: "Başka Bir Üniversite",
        bölüm: "İşletme",
        mezuniyetYılı: "2015",
      },
    ],
    deneyim: [
      {
        şirket: "ABC Teknoloji",
        pozisyon: "Yazılım Geliştirici",
        başlangıçTarihi: "2015",
        bitişTarihi: "2018",
      },
      {
        şirket: "XYZ Şirketi",
        pozisyon: "Proje Yöneticisi",
        başlangıçTarihi: "2018",
        bitişTarihi: "2020",
      },
    ],
    beceriler: ["JavaScript", "React", "Node.js", "Proje Yönetimi"],
  };

  const handleTemplateSelect = (templateName) => {
    setSelectedTemplate(templateName);
  };

  const generatePDF = async () => {
    if (selectedTemplate === "simple") {
      const pdf = new jsPDF();
      const htmlContent = renderToStaticMarkup(
        <SimpleTemplate cvData={cvData} />
      );
      pdf.html(htmlContent, {
        callback: function (pdf) {
          pdf.save("Simple_CV.pdf");
        },
      });
    } else if (selectedTemplate === "it") {
      const pdf = new jsPDF();
      const htmlContent = renderToStaticMarkup(
        <ITTemplate cvData={cvData} />
      );
      pdf.html(htmlContent, {
        callback: function (pdf) {
          pdf.save("Simple_CV.pdf");
        },
      });
    } else if (selectedTemplate === "hr") {
      const pdf = new jsPDF();
      const htmlContent = renderToStaticMarkup(
        <HRTemplate cvData={cvData} />
      );
      pdf.html(htmlContent, {
        callback: function (pdf) {
          pdf.save("Simple_CV.pdf");
        },
      });
    }
  };

  return (
    <div className="cv-card">
      <h1>CV Oluştur</h1>
      <div className="template-selector">
        <div
          className={`template-button ${
            selectedTemplate === "simple" ? "selected-template" : ""
          }`}
          onClick={() => handleTemplateSelect("simple")}
        >
          <img src={Image} alt="Basit Şablon" width="80" height="80" />
          <button>Basit Şablon</button>
        </div>
        <div
          className={`template-button ${
            selectedTemplate === "it" ? "selected-template" : ""
          }`}
          onClick={() => handleTemplateSelect("it")}
        >
          <img src={Image} alt="IT Şablon" width="80" height="80" />
          <button>IT Şablon</button>
        </div>
        <div
          className={`template-button ${
            selectedTemplate === "hr" ? "selected-template" : ""
          }`}
          onClick={() => handleTemplateSelect("hr")}
        >
          <img src={Image} alt="HR Şablon" width="80" height="80" />
          <button>HR Şablon</button>
        </div>
      </div>
      <button className="download-button" onClick={generatePDF}>
        CV Oluştur ve İndir
      </button>
    </div>
  );
};

export default Cv;
