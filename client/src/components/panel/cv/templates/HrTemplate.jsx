import React from "react";

const HrTemplate = ({ cvData }) => {
  const { ad, doğumTarihi, eğitim, deneyim, beceriler } = cvData;

  const docDefinition = {
    content: [
      { text: ad, fontSize: 20, bold: true },
      { text: `Doğum Tarihi: ${doğumTarihi}` },
      { text: "Eğitim", style: "sectionHeader" },
      {
        ul: eğitim.map((eğitimItem) => ({
          text: `${eğitimItem.okul}, ${eğitimItem.bölüm} (${eğitimItem.mezuniyetYılı})`,
        })),
      },
      { text: "Deneyim", style: "sectionHeader" },
      {
        ul: deneyim.map((deneyimItem) => ({
          text: `${deneyimItem.şirket}, ${deneyimItem.pozisyon} (${deneyimItem.başlangıçTarihi} - ${deneyimItem.bitişTarihi})`,
        })),
      },
      { text: "Beceriler", style: "sectionHeader" },
      {
        ul: beceriler.map((beceri) => ({
          text: beceri,
        })),
      },
    ],
    styles: {
      sectionHeader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
    },
  };

  return docDefinition;
};

export default HrTemplate;
