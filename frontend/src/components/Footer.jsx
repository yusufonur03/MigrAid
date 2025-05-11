import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-title">MigrAid Hakkında</div>
          <a href="#">Hakkımızda</a>
          <a href="#">Gizlilik ve Kullanım</a>
          <a href="#">KVKK Aydınlatma Metni</a>
          <a href="#">Kullanım Koşulları</a>
          <a href="#">Kurumsal Kimlik</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">Yardım ve Rehberlik</div>
          <a href="#">Sıkça Sorulan Sorular</a>
          <a href="#">Yardım Merkezimiz</a>
          <a href="#">Yeni Kullanıcı Rehberi</a>
          <a href="#">Göçmenler için Sık Başvurulan Formlar</a>
          <a href="#">Help for Non-Citizens</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">Bağlantılar / Hizmetler</div>
          <a href="#">e-Hizmetler</a>
          <a href="#">Belediye Hizmet Rehberi</a>
          <a href="#">STK ve Kurumlar</a>
          <a href="#">Üniversite Destekleri</a>
          <a href="#">İş ve Eğitim Fırsatları</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">İletişim</div>
          <a href="#">Bize Ulaşın</a>
          <a href="#">WhatsApp / Canlı Destek</a>
          <a href="#">STK Başvuru Portalı</a>
          <a href="#">Gönüllü Ol</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">Erişilebilirlik</div>
          <a href="#">Salt Metin Görünümü</a>
          <a href="#">Kontrast Mod</a>
          <a href="#">Klavye Desteği</a>
          <a href="#">Site Haritası</a>
        </div>
      </div>
      <div
        className="footer-bottom"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
      >
        <span>© 2025 MigrAid. Tüm Hakları Saklıdır.</span>
        <div
          className="footer-social"
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
        >
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.64l.36-4H14V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M17.53 3H21L14.19 10.63L22.24 21H16.42L11.77 14.93L6.52 21H3L10.13 12.85L2.36 3H8.34L12.54 8.49L17.53 3ZM16.42 19H18.19L8.24 5H6.36L16.42 19Z"
                fill="#fff"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
