import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import egitimresmi from '../assets/eduai.jpg'; // görsel dosyanı buraya eklemeyi unutma

const egitimMetni = (
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
      <span role="img" aria-label="graduation">🎓</span> MigrAid Eğitim ve Dil Fırsatları
    </div>
    <div style={{ marginBottom: '1.1rem' }}>
      <span role="img" aria-label="pin">📌</span> <b>Görevin Tanımı:</b><br />
      Bu modül, göçmen ve mültecilere yönelik Türkiye’deki eğitim imkanlarını ve ücretsiz Türkçe kurslarını tanıtır. Öğrenim hayatına devam etmek ya da yeni beceriler kazanmak isteyen bireyleri yönlendirir.
    </div>
    <div style={{ marginBottom: '0.7rem' }}>
      <span role="img" aria-label="hedef">🎯</span> <b>Özellikler</b>
      <ul style={{ margin: '0.7rem 0 0 1.2rem', padding: 0 }}>
        <li><b>Ücretsiz Türkçe Kursları:</b> Halk eğitim merkezleri, belediyeler ve STK’lar tarafından verilen dil kurslarının listesi sunulur.</li>
        <li><b>Üniversiteye Giriş Rehberliği:</b> Lise mezunu kullanıcılar için Türkiye'deki üniversiteye başvuru süreçleri açıklanır.</li>
        <li><b>Meslek Edindirme Kursları:</b> Kuaförlük, aşçılık, tamircilik gibi alanlarda alınabilecek sertifikalı kurslar önerilir.</li>
        <li><b>Çocuklar için Eğitim Desteği:</b> Okul kaydı, ders kitapları ve rehber öğretmen sistemleri hakkında bilgi sunulur.</li>
        <li><b>Online Eğitim Platformları:</b> E-devlet destekli ya da STK destekli uzaktan eğitim fırsatları listelenir.</li>
        <li><b>Eğitim Takvimi:</b> Başvuru dönemleri ve kayıt tarihleri kullanıcı takvimine eklenebilir.</li>
        <li><b>Dil Seçeneği:</b> Tüm yönlendirmeler çok dilli olarak sunulur (Türkçe, Arapça, Farsça vb.).</li>
      </ul>
    </div>
  </div>
);

function EgitimFirsatlari() {
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
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>{egitimMetni}</div>
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
            <img src={egitimresmi} alt="Eğitim Fırsatları" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EgitimFirsatlari;
