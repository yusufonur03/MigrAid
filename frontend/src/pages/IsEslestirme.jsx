import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import isresmi from '../assets/airesmi.jpg'; // görsel yolunu uygun şekilde düzenle

const isMetni = (
  <div style={{
    background: '#fff',
    borderRadius: '1.5rem',
    boxShadow: '0 2px 12px rgba(44,82,130,0.08)',
    padding: '2.5rem 2rem',
    maxWidth: 480,
    margin: 'auto',
    fontSize: '1.08rem',
    color: '#223',
    lineHeight: 1.7
  }}>
    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.2rem' }}>
      <span role="img" aria-label="toolbox">🛠️</span> MigrAid Beceriye Göre İş Eşleştirme
    </div>
    <div style={{ marginBottom: '1.1rem' }}>
      <span role="img" aria-label="pin">📌</span> <b>Görevin Tanımı:</b><br />
      Bu modül, kullanıcının daha önceki mesleki deneyimlerini ve yetkinliklerini analiz ederek, yaşadığı bölgede uygun iş ve eğitim fırsatlarını sunar. Sistem, beceri temelli yönlendirme sağlar.
    </div>
    <div style={{ marginBottom: '0.7rem' }}>
      <span role="img" aria-label="hedef">🎯</span> <b>Özellikler</b>
      <ul style={{ margin: '0.7rem 0 0 1.2rem', padding: 0 }}>
        <li><b>Meslek Tanıma:</b> Kullanıcı "marangoz", "berber", "dokumacı" gibi becerilerini yazar; sistem bunları sınıflandırır.</li>
        <li><b>Yerel İş İlanları:</b> Kullanıcının bulunduğu şehre en yakın iş ilanları gösterilir (atölye, fabrika, mağaza vb.).</li>
        <li><b>Eğitim & Sertifika Eşleştirmesi:</b> Belirli bir işe uygun değilse, sistem ücretsiz ya da düşük maliyetli eğitim önerisi sunar.</li>
        <li><b>Gönüllü / Gölgeleme Fırsatları:</b> Tecrübe kazanmak isteyen kullanıcılar için staj ya da gözlem fırsatları önerilir.</li>
        <li><b>Profil ile Uyum Skoru:</b> İlanlar becerilere göre “uyumluluk yüzdesi” ile sıralanır.</li>
        <li><b>AI CV Oluşturucu:</b> İsteyen kullanıcılar için asistan destekli otomatik özgeçmiş oluşturulabilir.</li>
        <li><b>Dil Desteği:</b> Tüm sistem Arapça, Türkçe, İngilizce gibi farklı dillerde yönlendirme yapabilir.</li>
      </ul>
    </div>
  </div>
);

function IsEslestirme() {
  return (
    <>
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="MigrAid Logo" style={{ cursor: 'pointer' }} />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">Ana Sayfa</Link>
          <Link to="/kayit">Kayıt Ol</Link>
          <Link to="/giris">Giriş Yap</Link>
        </div>
      </nav>
      <div style={{
        background: '#e8f4ff',
        minHeight: 'calc(100vh - 64px - 64px)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2.5rem',
        flexWrap: 'wrap',
        padding: '2.5rem 0'
      }}>
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>{isMetni}</div>
        <div style={{ flex: '1 1 400px', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 400,
            height: 480,
            background: '#fff',
            borderRadius: '1.5rem',
            boxShadow: '0 2px 12px rgba(44,82,130,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img src={isresmi} alt="İş Eşleştirme" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default IsEslestirme;
