import React, { useState } from "react";
import "./contact.scss"; // SCSS dosyasını ekledik

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form gönderildi. Veriler:", formData);
  };

  return (
    <div className="contact-form-container">
      <div className="contact-info">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          alias, quia minima nulla nam animi quidem saepe numquam incidunt. Rem
          sapiente aspernatur omnis, perspiciatis ratione impedit provident
          magni asperiores commodi.
        </p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Ad Soyad:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            E-posta:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Telefon:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Mesaj:
            <br style={{ marginBottom: '5px' }} />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
