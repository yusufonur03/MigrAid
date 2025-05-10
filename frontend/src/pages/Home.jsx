import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { FaSyncAlt, FaBuilding, FaMapSigns, FaIndustry, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';
import './Home.css';
import mig1 from '../assets/mig1.png';
// import mig2 from '../assets/mig2.jpg';
import mig3 from '../assets/mig3.png';
import mig4 from '../assets/mig4.png';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const sliderImages = [mig1, mig3, mig4];

function Home() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navigation />
      <div className="hero-slider-section">
        <img src={sliderImages[current]} alt="slider" className="hero-slider-img" />
        <div className="hero-slider-overlay">
          <input className="search-bar slider-search-bar" placeholder="Size nasıl yardımcı olabiliriz?" />
        </div>
      </div>
      <div className="features-row">
        <div className="feature-card">
          <FaSyncAlt className="feature-icon" />
          <Link to="/ehizmetler" className="feature-title-link">e-Hizmetler</Link>
          <div className="feature-desc">Sorgulama, başvuru ve ödeme hizmetleri.</div>
        </div>
        <div className="feature-card">
          <FaBuilding className="feature-icon" />
          <Link to="/kurumlar" className="feature-title-link">Kurumlar</Link>
          <div className="feature-desc">Resmi kurumların hizmetleri ve iletişim bilgileri.</div>
        </div>
        <div className="feature-card">
          <FaMapSigns className="feature-icon" />
          <Link to="/belediyeler" className="feature-title-link">Belediyeler</Link>
          <div className="feature-desc">Belediyelerin iletişim bilgileri ve sundukları hizmetler.</div>
        </div>
        <div className="feature-card">
          <FaHandsHelping className="feature-icon" />
          <Link to="/stklar" className="feature-title-link">STK'lar</Link>
          <div className="feature-desc">Sivil toplum kuruluşlarının sunduğu hizmetler.</div>
        </div>
        <div className="feature-card">
          <FaIndustry className="feature-icon" />
          <Link to="/firmalar" className="feature-title-link">Firmalar</Link>
          <div className="feature-desc">Şirketlerdeki fatura ve abonelik bilgilerine erişin.</div>
        </div>
        <div className="feature-card">
          <FaGraduationCap className="feature-icon" />
          <Link to="/universiteler" className="feature-title-link">Üniversiteler</Link>
          <div className="feature-desc">Göçmen dostu eğitim kurumları</div>
        </div>
      </div>
    </>
  );
}

export default Home; 