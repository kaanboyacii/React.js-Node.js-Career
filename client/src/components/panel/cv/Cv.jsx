import React, { useState } from "react";
import "./cv.scss";
import Image from "../../../img/cv.png";
import jsPDF from "jspdf";
import { renderToStaticMarkup } from "react-dom/server";
import html2pdf from "html2pdf.js";
import SimpleTemplate from "./templates/SimpleTemplate";
import ITTemplate from "./templates/ITTemplate";
import HRTemplate from "./templates/HRTemplate";
import { useSelector } from "react-redux";


const Cv = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const cvData = {
    ad: currentUser.name,
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
    if (!selectedTemplate) {
      return;
    }

    const pdf = new jsPDF();
    const templateComponent =
      selectedTemplate === "simple" ? (
        <SimpleTemplate cvData={cvData} />
      ) : selectedTemplate === "it" ? (
        <ITTemplate cvData={cvData} />
      ) : (
        <HRTemplate cvData={cvData} />
      );

    const htmlContent = renderToStaticMarkup(templateComponent);

    html2pdf(htmlContent, {
      margin: 10,
      filename: `${selectedTemplate.toUpperCase()}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
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
