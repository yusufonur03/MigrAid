import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import formresmi from '../assets/airesmi.jpg'; // Form görselini buraya yerleştir

const formMetni = (
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
      <span role="img" aria-label="form">📝</span> MigrAid Resmi Belge Yardımı
    </div>
    <div style={{ marginBottom: '1.1rem' }}>
      <span role="img" aria-label="pin">📌</span> <b>Görevin Tanımı:</b><br />
      Bu modül, resmi belgeleri ve başvuru formlarını doldurmakta zorlanan kullanıcılar için özel olarak geliştirilmiştir. Asistan, kullanıcıdan bazı basit sorular alarak ilgili formu otomatik şekilde hazırlar.
    </div>
    <div style={{ marginBottom: '0.7rem' }}>
      <span role="img" aria-label="hedef">🎯</span> <b>Özellikler</b>
      <ul style={{ margin: '0.7rem 0 0 1.2rem', padding: 0 }}>
        <li><b>Doğrudan Soru-Cevapla Form Oluşturma:</b> Kullanıcı Türkçe bilmek zorunda kalmadan, ana dilinde asistanla konuşarak formu doldurabilir.</li>
        <li><b>Oturma İzni Başvuru Formları:</b> Göç İdaresi’ne verilecek belgeleri doldurmaya yardımcı olur.</li>
        <li><b>İkametgah, Sağlık, Sosyal Yardım Başvuruları:</b> Yaygın tüm resmi belgeler sistem içinde mevcuttur.</li>
        <li><b>Dil Uyarlaması:</b> Sorular, kullanıcının seçtiği dilde gösterilir (örneğin Arapça, Farsça).</li>
        <li><b>Belgeleri Kaydetme ve İndirme:</b> Hazırlanan form PDF olarak indirilebilir veya dijital dosya kasasına eklenebilir. (yakında)</li>
        <li><b>Destekli Belge Türleri:</b> Oturma izni formu, adres beyanı, vergi numarası başvurusu, eğitim kayıt formları, sağlık kayıt formu vb.</li>
      </ul>
    </div>
  </div>
);

function FormYardimi() {
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
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>{formMetni}</div>
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
            <img src={formresmi} alt="Form Yardımı" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FormYardimi;
