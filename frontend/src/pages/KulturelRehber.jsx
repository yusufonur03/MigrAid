import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import kulturresmi from '../assets/airesmi.jpg'; // Görsel yolunu senin kullandığın yapıya göre ayarla

const rehberMetni = (
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
      <span role="img" aria-label="book">📘</span> MigrAid Kültürel Rehber Özellikleri
    </div>
    <div style={{ marginBottom: '1.1rem' }}>
      <span role="img" aria-label="pin">📌</span> <b>Görevin Tanımı:</b><br />
      Kültürel Rehber, Türkiye’de toplumsal yaşama uyum sağlamanızı kolaylaştırmak için hazırlanmış bir modüldür. Günlük hayat, resmi kurumlar, iletişim biçimleri ve geleneksel değerler hakkında açıklayıcı içerikler sunar.
    </div>
    <div style={{ marginBottom: '0.7rem' }}>
      <span role="img" aria-label="hedef">🎯</span> <b>Özellikler</b>
      <ul style={{ margin: '0.7rem 0 0 1.2rem', padding: 0 }}>
        <li><b>Görgü Kuralları:</b> Toplu taşıma, sıra bekleme, komşuluk gibi sosyal durumlarda dikkat edilmesi gereken davranışlar.</li>
        <li><b>Resmi Kurum Kültürü:</b> Dilekçe yazma, randevuya zamanında gitme, uygun dil kullanımı gibi resmi iletişim önerileri.</li>
        <li><b>Dil Kalıpları:</b> “Lütfen”, “Teşekkür ederim”, “Rica ederim” gibi ifadelerin nasıl ve ne zaman kullanılacağını öğrenme.</li>
        <li><b>Atasözleri & Deyimler:</b> Türkçeye özgü deyimlerin anlamları ve örnek cümlelerle açıklanması.</li>
        <li><b>Kutlamalar ve Bayramlar:</b> Türkiye’de önemli günlerde nasıl davranıldığını anlatan rehberlik.</li>
        <li><b>Toplumsal Saygı:</b> Kadın-erkek iletişimi, kişisel mesafe ve kibar tavırlar hakkında öneriler.</li>
        <li><b>Misafirlik Kültürü:</b> Ev ziyaretlerinde ayakkabı çıkarma, ikram kabul etme gibi geleneksel pratikler.</li>
        <li><b>Ebeveyn Bilgilendirme:</b> Okul kuralları, veli-öğretmen ilişkisi ve çocuğun topluma uyum süreci hakkında bilgiler.</li>
      </ul>
    </div>
  </div>
);

function KulturelRehber() {
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
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>{rehberMetni}</div>
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
            <img src={kulturresmi} alt="Kültürel Rehber" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default KulturelRehber;
