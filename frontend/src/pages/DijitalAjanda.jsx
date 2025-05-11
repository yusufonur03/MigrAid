import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import ajandaresmi from '../assets/digai.jpg'; // görsel yolunu uyarlamayı unutma

const ajandaMetni = (
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
      <span role="img" aria-label="calendar">📅</span> MigrAid Dijital Ajanda Özellikleri
    </div>
    <div style={{ marginBottom: '1.1rem' }}>
      <span role="img" aria-label="pin">📌</span> <b>Görevin Tanımı:</b><br />
      MigrAid Dijital Ajanda, kullanıcıların randevularını, başvuru tarihlerini ve belge teslim günlerini unutmaması için geliştirilen bir hatırlatıcı ve planlayıcı modüldür.
    </div>
    <div style={{ marginBottom: '0.7rem' }}>
      <span role="img" aria-label="hedef">🎯</span> <b>Özellikler</b>
      <ul style={{ margin: '0.7rem 0 0 1.2rem', padding: 0 }}>
        <li><b>Randevu Takvimi:</b> Göç İdaresi, hastane, belediye gibi kurumlardaki randevular sisteme otomatik kaydedilir.</li>
        <li><b>Hatırlatıcılar:</b> Her etkinlik için zamanında bildirim alınır (örneğin “Yarın saat 11:00'de randevun var”).</li>
        <li><b>Belge Teslim Tarihleri:</b> Belgelerin son teslim günleri ajandaya otomatik olarak eklenir.</li>
        <li><b>Kişisel Notlar:</b> Kullanıcı kendi etkinliklerini veya hatırlamak istediği notları da ekleyebilir.</li>
        <li><b>Dil Desteği:</b> Ajanda bildirimleri kullanıcının seçtiği dilde gösterilir.</li>
        <li><b>Günlük / Haftalık Görünüm:</b> Kullanıcı isterse gün gün, isterse haftalık planlarını tek ekranda görebilir.</li>
        <li><b>Belge Eşleştirme:</b> Etkinliklere belge yüklenebilir; örneğin “randevuya götürülecek belgeler”.</li>
      </ul>
    </div>
  </div>
);

function DijitalAjanda() {
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
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>{ajandaMetni}</div>
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
            <img src={ajandaresmi} alt="Dijital Ajanda" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DijitalAjanda;
