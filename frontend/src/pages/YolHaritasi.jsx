import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import gelisimresmi from '../assets/romap.jpg'; // görsel dosyanı buraya eklemeyi unutma

const gelisimMetni = (
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
      <span role="img" aria-label="roadmap">📈</span> Kişisel Entegrasyon Yol Haritası & Gelişim Takibi
    </div>
    <div style={{ marginBottom: '1.1rem' }}>
      <span role="img" aria-label="pin">📌</span> <b>Ne Yapar?</b><br />
      MigrAid, her kullanıcı için Türkiye’ye uyum sürecini ölçen ve yöneten kişisel bir “entegrasyon yolculuğu” oluşturur. Dil öğrenimi, sosyal iletişim, iş arayışı gibi temel alanlardaki gelişimi takip eder. 
      Yapay zeka, bu gelişimi analiz ederek kişiye özel hedefler ve öneriler sunar.
    </div>
    <div style={{ marginBottom: '1rem' }}>
      <span role="img" aria-label="function">🧠</span> <b>Nasıl Çalışır?</b>
      <ul style={{ marginTop: '0.7rem', marginLeft: '1.2rem', padding: 0 }}>
        <li><b>Entegrasyon Skoru:</b> Kullanıcının dil seviyesi, sosyal etkileşim ve mesleki gelişim düzeyine göre sürekli güncellenen bir skor oluşturulur.</li>
        <li><b>Yol Haritası:</b> “Bu hafta 3 yeni Türkçe kelime öğren”, “Mahallendeki bir etkinliğe katıl” gibi mikro görevler tanımlanır.</li>
        <li><b>Motivasyon Takibi:</b> Görevler tamamlandıkça sistem görsel ilerleme çubuğu ve kutlama mesajları ile kullanıcıyı teşvik eder.</li>
        <li><b>Dinamik Hedefler:</b> Hedefler, kullanıcının ilerleme hızına göre ayarlanır; sistem yavaşlayanlara nazikçe destek sunar.</li>
        <li><b>Hatırlatıcılar:</b> Eksik görevler için zamanında bildirim gönderilir; kullanıcı unutsa bile desteklenir.</li>
        <li><b>Çok Dilli Destek:</b> Tüm görevler ve açıklamalar kullanıcının seçtiği dilde gösterilir.</li>
      </ul>
    </div>
    <div>
      <span role="img" aria-label="benefit">🌟</span> <b>Göçmene Faydası:</b><br />
      Uyum sürecini somut, ölçülebilir ve motive edici bir hale getirir. Kullanıcı kendini yalnız hissetmeden, küçük adımlarla büyük ilerlemeler kaydeder. Her adımı görünür hâle geldiği için özgüven artar, topluma aidiyet hissi güçlenir.
    </div>
  </div>
);

function YolHaritasi() {
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
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>{gelisimMetni}</div>
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
            <img src={gelisimresmi} alt="Gelişim Takibi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default YolHaritasi;
