import React from "react";
import "./footer.scss";
import Logo from "../../img/logo.png"; // Logo dosyanızın yolunu düzenleyin

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Logo} alt="Logo" />
          <p>Kişiselleştirilmiş Kariyer Platformu</p>
        </div>
        <div className="footer-links">
          <h1>ineedcareer</h1>
          <ul>
            <li>
              <a href="/">Ana Sayfa</a>
            </li>
            <li>
              <a href="/aboutus">Hakkımızda</a>
            </li>
            <li>
              <a href="/contact">İletişim</a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h1>Senin için</h1>
          <ul>
            <li>
              <a href="/">Kariyer Rehberi</a>
            </li>
            <li>
              <a href="/events">Etkinlikler</a>
            </li>
            <li>
              <a href="/job-list">İş İlanları</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h1>Sosyal Medya</h1>
          <ul>
            <li>
              <a href="https://facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com">Twitter</a>
            </li>
            <li>
              <a href="https://instagram.com">Instagram</a>
            </li>
            <li>
              <a href="https://linkedin.com">Linkedin</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ineedcareer. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
