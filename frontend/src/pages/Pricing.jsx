import React from "react";
import Navigation from "../components/Navigation";
import "../components/Navigation.css";
import Footer from "../components/Footer";
import "./Pricing.css";

function Pricing() {
  return (
    <>
      <Navigation />
      <div className="pricing-container">
        <div className="pricing-header">
          <h1>Fiyatlandırma Planları</h1>
          <p>MigAid hizmetlerini keşfedin ve size en uygun planı seçin</p>
        </div>

        <div className="pricing-plans">
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h2>Ücretsiz</h2>
              <div className="pricing-price">
                <span className="price">$0</span>
                <span className="period">/ay</span>
              </div>
            </div>
            <div className="pricing-features">
              <ul>
                <li>Temel bilgi ve kaynaklara erişim</li>
                <li>Rehber dokümanlar</li>
                <li>Kurumlar hakkında genel bilgiler</li>
                <li>Sınırlı sohbet desteği</li>
              </ul>
            </div>
            <div className="pricing-action">
              <button className="btn-primary">Başla</button>
            </div>
          </div>

          <div className="pricing-card featured">
            <div className="pricing-card-header">
              <h2>Standart</h2>
              <div className="pricing-price">
                <span className="price">$49.95</span>
                <span className="period">/ay</span>
              </div>
            </div>
            <div className="pricing-features">
              <ul>
                <li>Ücretsiz planın tüm özellikleri</li>
                <li>Sınırsız sohbet desteği</li>
                <li>Form doldurma yardımı</li>
                <li>İş eşleştirme servisi</li>
                <li>Kültürel rehberlik</li>
              </ul>
            </div>
            <div className="pricing-action">
              <button className="btn-primary">Şimdi Başla</button>
            </div>
          </div>

          <div className="pricing-card">
            <div className="pricing-card-header">
              <h2>Premium</h2>
              <div className="pricing-price">
                <span className="price">$99.95</span>
                <span className="period">/ay</span>
              </div>
            </div>
            <div className="pricing-features">
              <ul>
                <li>Standart planın tüm özellikleri</li>
                <li>Öncelikli destek hattı</li>
                <li>Özelleştirilmiş yol haritası</li>
                <li>Birebir danışmanlık hizmeti</li>
                <li>Eğitim ve dil kursları için özel indirimler</li>
              </ul>
            </div>
            <div className="pricing-action">
              <button className="btn-primary">Hemen Başla</button>
            </div>
          </div>
        </div>

        <div className="pricing-faq">
          <h2>Sıkça Sorulan Sorular</h2>
          <div className="faq-item">
            <h3>Aboneliğimi istediğim zaman iptal edebilir miyim?</h3>
            <p>
              Evet, aboneliğinizi dilediğiniz zaman iptal edebilirsiniz. İptal işlemi sonrası dönem sonuna kadar
              hizmetlerimizden yararlanmaya devam edebilirsiniz.
            </p>
          </div>
          <div className="faq-item">
            <h3>Ödeme yöntemleri nelerdir?</h3>
            <p>Kredi kartı, banka kartı ve havale yöntemlerini kullanabilirsiniz.</p>
          </div>
          <div className="faq-item">
            <h3>Planlar arasında geçiş yapabilir miyim?</h3>
            <p>
              Evet, dilediğiniz zaman alt veya üst planlara geçiş yapabilirsiniz. Bir üst plana geçerken ücret farkı
              hesaplanırken, alt plana geçişte kalan süre için iade yapılmamaktadır.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pricing;
