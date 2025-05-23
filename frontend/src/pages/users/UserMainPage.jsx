import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { FaComments, FaGlobeEurope, FaWpforms, FaCalendarAlt, FaUserCog, FaMapSigns, FaUser } from "react-icons/fa"; // Importing some icons as placeholders
import Navigation from "../../components/Navigation"; // Import Navigation component
import "./UserMainPage.css"; // CSS dosya adı güncellendi

function UserMainPage() {
  // Fonksiyon adı güncellendi
  const location = useLocation();
  const { name, surname } = location.state || { name: "Profilim", surname: "" }; // Get name and surname from state or use placeholders

  return (
    <>
      <Navigation showAuthButtons={false} /> {/* Add Navigation bar */}
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser className="avatar-icon" />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {name} {surname}
            </h1>
            <p className="profile-welcome">MigAid'e hoş geldiniz! Aşağıdaki hizmetlerimizden yararlanabilirsiniz.</p>
          </div>
        </div>

        <h3 className="section-title">Hizmetlerim</h3>

        <div className="features-container">
          <div className="features-row">
            {/* Feature Card 1 */}
            <div className="feature-card">
              <FaComments className="feature-icon" style={{ color: "#a78bfa" }} /> {/* Placeholder icon and color */}
              <Link to="/users/main/sohbetasistani" className="feature-title-link">
                Sohbet Asistanı
              </Link>{" "}
              {/* Placeholder title and link */}
              <div className="feature-desc">Yapay zekâ ile doğal dilde rehberlik</div> {/* Placeholder description */}
            </div>
            {/* Feature Card 2 */}
            <div className="feature-card">
              <FaGlobeEurope className="feature-icon" style={{ color: "#f472b6" }} /> {/* Placeholder icon and color */}
              <Link to="/users/main/kulturelrehber" className="feature-title-link">
                Kültürel Rehber
              </Link>{" "}
              {/* Placeholder title and link */}
              <div className="feature-desc">Dil, görgü, davranış, deyim-atasözü ve iletişim tavsiyeleri</div>{" "}
              {/* Placeholder description */}
            </div>
            {/* Feature Card 3 */}
            <div className="feature-card">
              <FaWpforms className="feature-icon" style={{ color: "#fbbf24" }} /> {/* Placeholder icon and color */}
              <Link to="/users/main/formyardimi" className="feature-title-link">
                Resmi Belge Yardımı
              </Link>{" "}
              {/* Updated title */}
              <div className="feature-desc">Resmi belgelerinizi anlamanıza yardımcı olur</div>{" "}
              {/* Updated description */}
            </div>
          </div>
          <div className="features-row">
            {/* Feature Card 4 - Yol Haritası */}
            <div className="feature-card">
              <FaMapSigns className="feature-icon" style={{ color: "#f87171" }} />
              <Link to="/users/main/yolharitasi" className="feature-title-link">
                Yol Haritası
              </Link>
              <div className="feature-desc">
                Yerel kültüre ait sosyal normları, davranış kalıplarını, iletişim inceliklerini ve önemli günleri
                açıklar
              </div>
            </div>
            {/* Feature Card 5 */}
            <div className="feature-card">
              <FaUserCog className="feature-icon" style={{ color: "#a3e635" }} /> {/* Placeholder icon and color */}
              <Link to="/users/main/iseslestirme" className="feature-title-link">
                Beceriye Göre İş Eşleştirme
              </Link>{" "}
              {/* Placeholder title and link */}
              <div className="feature-desc">Meslek – iş ilanı önerisi, eğitim yönlendirmesi</div>{" "}
              {/* Placeholder description */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserMainPage;
