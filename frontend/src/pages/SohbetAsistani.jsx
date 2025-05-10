import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import airesmi from '../assets/airesmi.jpg';

const asistanMetni = (
  <div style={{background:'#fff', borderRadius:'1.5rem', boxShadow:'0 2px 12px rgba(44,82,130,0.08)', padding:'2.5rem 2rem', maxWidth:480, margin:'auto', fontSize:'1.08rem', color:'#223', lineHeight:1.7}}>
    <div style={{fontSize:'1.5rem', fontWeight:700, marginBottom:'1.2rem'}}>
      <span role="img" aria-label="beyin">🧠</span> MigrAid Sohbet Asistanı Özellikleri
    </div>
    <div style={{marginBottom:'1.1rem'}}>
      <span role="img" aria-label="pin">📌</span> <b>Görevin Tanımı:</b><br/>
      MigrAid'in birincil yapay zekâ destekli asistanı olarak görevim, Türkiye'de yaşama uyum sürecindeki göçmenlere rehberlik etmek ve sistemin sunduğu tüm hizmetlerde yardımcı olmaktır. Görevim boyunca, net, doğru ve empatik bir dil kullanırım.
    </div>
    <div style={{marginBottom:'0.7rem'}}>
      <span role="img" aria-label="hedef">🎯</span> <b>Özellikler (Kullanıcıya Gösterilecek Şekilde)</b>
      <ul style={{margin:'0.7rem 0 0 1.2rem', padding:0}}>
        <li><b>Türkiye'ye Uyum Süreci Odaklı Destek:</b> Türkiye'de yaşam, kültür, resmi işlemler ve sosyal hizmetler hakkında açıklayıcı bilgiler sunarım.</li>
        <li><b>Günlük Yaşam Sorularına Yardım:</b> Toplu taşıma, sağlık hizmetleri, resmi kurumlar, alışveriş, iletişim gibi günlük yaşam konularında bilgi veririm.</li>
        <li><b>Resmî İşlem Rehberliği:</b> Oturma izni, ikamet başvurusu, sağlık kaydı, çocuk okulu, vergi numarası gibi konularda adım adım yönlendirme sağlarım.</li>
        <li><b>MigrAid Uygulama Özelliklerini Açıklama:</b> MigrAid'in tüm modüllerini (dijital ajanda, beceri eşleştirme, kültürel modül vb.) kullanıcıya açıklar ve doğru sayfalara yönlendiririm.</li>
        <li><b>Empatik ve Anlaşılır İletişim:</b> Kibar, yargılamayan ve destekleyici bir dil kullanırım. Sık tekrar eden sorulara sabırla yanıt veririm.</li>
        <li><b>Dil Uyumu:</b> Kullanıcının yazdığı dili algılayarak (Türkçe, Arapça, Farsça vb.) o dilde cevap vermeye çalışırım.</li>
      </ul>
    </div>
  </div>
);

function SohbetAsistani() {
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
      <div style={{background:'#e8f4ff', minHeight:'calc(100vh - 64px - 64px)', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', gap:'2.5rem', flexWrap:'wrap', padding:'2.5rem 0'}}>
        <div style={{flex:'1 1 380px', display:'flex', justifyContent:'center'}}>{asistanMetni}</div>
        <div style={{flex:'1 1 400px', minHeight:480, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{width:400, height:480, background:'#fff', borderRadius:'1.5rem', boxShadow:'0 2px 12px rgba(44,82,130,0.08)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
            <img src={airesmi} alt="AI" style={{width:'100%', height:'100%', objectFit:'cover'}} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SohbetAsistani; 