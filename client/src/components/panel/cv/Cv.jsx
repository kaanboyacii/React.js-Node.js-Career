import React, { useState } from "react";
import "./cv.scss";
import Image from "../../../img/cv.png";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import SimpleTemplate from "./templates/SimpleTemplate";
import ItTemplate from "./templates/ItTemplate";
import HrTemplate from "./templates/HrTemplate";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  const generatePDF = () => {
    if (selectedTemplate === "simple") {
      const docDefinition = SimpleTemplate({ cvData });
      pdfMake.createPdf(docDefinition).download("Simple_CV.pdf");
    } else if (selectedTemplate === "it") {
      const docDefinition = ItTemplate({ cvData });
      pdfMake.createPdf(docDefinition).download("It_CV.pdf");
    } else if (selectedTemplate === "hr") {
      const docDefinition = HrTemplate({ cvData });
      pdfMake.createPdf(docDefinition).download("HR_CV.pdf");
    }
  };

  return (
    <div className="cv-card">
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
