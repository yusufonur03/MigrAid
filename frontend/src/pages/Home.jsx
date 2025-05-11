import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import {
  FaSyncAlt,
  FaBuilding,
  FaMapSigns,
  FaIndustry,
  FaGraduationCap,
  FaHandsHelping,
  FaComments,
  FaGlobeEurope,
  FaWpforms,
  FaCalendarAlt,
  FaUserCog,
  FaBookOpen,
  FaHandHoldingHeart,
} from "react-icons/fa";
import "./Home.css";
import mig1 from "../assets/mig1.png";
import mig2 from "../assets/mig2.jpg";
import mig3 from "../assets/mig3.png";
import mig4 from "../assets/mig4.png";
import mig5 from "../assets/mig5.png";
import mig6 from "../assets/mig6.png";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../utils/auth";

const sliderImages = [mig1, mig3, mig4, mig5, mig6];

function Home() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Alttaki slider için ayrı state ve görseller
  const bottomSliderImages = [mig1, mig3, mig4, mig5];
  const [bottomCurrent, setBottomCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBottomCurrent((c) => (c + 1) % bottomSliderImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const loggedIn = isAuthenticated();

  return (
    <>
      <Navigation showAuthButtons={!loggedIn} />
      <div className="hero-slider-section">
        <img src={sliderImages[current]} alt="slider" className="hero-slider-img" />
        <div className="hero-slider-overlay">
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input className="search-bar slider-search-bar" placeholder="Size nasıl yardımcı olabiliriz?" />
            <div
              style={{
                color: "#fff",
                marginTop: "1.1rem",
                fontWeight: 600,
                fontSize: "1.35rem",
                textAlign: "center",
                letterSpacing: "0.01em",
                fontFamily: "Caveat, cursive",
                textShadow: "0 2px 12px rgba(0,0,0,0.18)",
              }}
            >
              “Her yeni başlangıç, doğru bir rehberle kolaylaşır.”
            </div>
          </div>
        </div>
      </div>
      <div className="features-row" style={{ marginTop: "2rem" }}>
        <div className="feature-card">
          <FaComments className="feature-icon" style={{ color: "#a78bfa" }} />
          <Link to="/sohbet-asistani" className="feature-title-link">
            Sohbet Asistanı
          </Link>
          <div className="feature-desc">
            Yapay zekâ ile doğal dilde rehberlik (örnek: "oturma izni almak istiyorum")
          </div>
        </div>
        <div className="feature-card">
          <FaGlobeEurope className="feature-icon" style={{ color: "#f472b6" }} />
          <Link to="/kulturel-rehber" className="feature-title-link">
            Kültürel Rehber
          </Link>
          <div className="feature-desc">Dil, görgü, davranış, deyim-atasözü ve iletişim tavsiyeleri</div>
        </div>
        <div className="feature-card">
          <FaWpforms className="feature-icon" style={{ color: "#fbbf24" }} />
          <Link to="/form-yardimi" className="feature-title-link">
            Resmi Belge Yardımı
          </Link>
          <div className="feature-desc">Resmi belgelerinizi anlamanıza yardımcı olur</div>
        </div>
        <div className="feature-card">
          <FaCalendarAlt className="feature-icon" style={{ color: "#60a5fa" }} />
          <Link to="/dijital-ajanda" className="feature-title-link">
            Dijital Ajanda
          </Link>
          <div className="feature-desc">Başvuru takvimi, hatırlatıcılar, belge yükleme alanı</div>
          <div style={{ color: "#e57373", fontWeight: 600, marginTop: "0.5rem" }}>Çok yakında...</div>
        </div>
        <div className="feature-card">
          <FaUserCog className="feature-icon" style={{ color: "#a3e635" }} />
          <Link to="/is-eslestirme" className="feature-title-link">
            Beceriye Göre İş Eşleştirme
          </Link>
          <div className="feature-desc">Meslek – iş ilanı önerisi, eğitim yönlendirmesi</div>
        </div>
        <div className="feature-card">
          <FaBookOpen className="feature-icon" style={{ color: "#38bdf8" }} />
          <Link to="/egitim-dil-firsatlari" className="feature-title-link">
            Eğitim & Dil Fırsatları
          </Link>
          <div className="feature-desc">Ücretsiz Türkçe kurslar, burslar, üniversiteye erişim</div>
          <div style={{ color: "#e57373", fontWeight: 600, marginTop: "0.5rem" }}>Çok yakında...</div>
        </div>
        <div className="feature-card">
          <FaMapSigns className="feature-icon" style={{ color: "#f87171" }} />
          <Link to="/yolharitasi" className="feature-title-link">
            Yol Haritası
          </Link>
          <div className="feature-desc">
            Yerel kültüre ait sosyal normları, davranış kalıplarını, iletişim inceliklerini ve önemli günleri açıklar
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          background: "#eaf6ff",
          minHeight: "420px",
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "1200px",
            gap: "2.5rem",
            justifyContent: "center",
            alignItems: "stretch",
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
          }}
        >
          {/* Sıkça Sorulan Sorular */}
          <div
            style={{
              flex: 2,
              background: "#fff",
              borderRadius: "1.5rem",
              boxShadow: "0 2px 12px rgba(74,144,226,0.08)",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2 style={{ color: "var(--primary-blue)", marginBottom: "1.2rem", fontWeight: 700, fontSize: "1.5rem" }}>
              Sıkça Sorulan Sorular
            </h2>
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontWeight: 600, color: "var(--primary-blue)" }}>MigrAid nedir?</div>
              <div style={{ color: "#444" }}>MigrAid, göçmenlere yönelik dijital rehberlik ve destek platformudur.</div>
            </div>
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontWeight: 600, color: "var(--primary-blue)" }}>Kayıt olmak ücretli mi?</div>
              <div style={{ color: "#444" }}>Hayır, MigrAid'e kayıt olmak tamamen ücretsizdir.</div>
            </div>
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontWeight: 600, color: "var(--primary-blue)" }}>Hangi dillerde hizmet veriliyor?</div>
              <div style={{ color: "#444" }}>Şu anda sadece Türkçe desteklenmektedir.</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: "var(--primary-blue)" }}>Destek almak için ne yapmalıyım?</div>
              <div style={{ color: "#444" }}>
                Ana sayfadaki hizmet kartlarından ihtiyacınıza uygun olanı seçebilirsiniz.
              </div>
            </div>
          </div>
          {/* Sağda slider için kutu */}
          <div
            style={{
              flex: 1,
              minWidth: "260px",
              maxWidth: "340px",
              background: "#fff",
              borderRadius: "1.5rem",
              boxShadow: "0 2px 12px rgba(74,144,226,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={bottomSliderImages[bottomCurrent]}
              alt="slider"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "1.5rem",
                transition: "opacity 0.7s",
                opacity: 0.93,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
