import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import './Register.css';

function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="MigrAid Logo" style={{ cursor: 'pointer' }} />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Ana Sayfa</Link>
        <Link to="/giris">Giriş Yap</Link>
      </div>
    </nav>
  );
}

function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordRepeat: '',
    language: '',
    gender: '',
    birthDate: '',
    country: '',
    arrivalDate: '',
    city: '',
    maritalStatus: '',
    education: '',
    nativeLanguage: '',
    extraLanguages: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleNext = e => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = e => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Kayıt başarılı! (Demo)');
  };

  return (
    <>
      <Navigation />
      <div className="register-layout">
        <div className="register-form-wrapper">
          <form className="register-form-modern" onSubmit={step === 1 ? handleNext : handleSubmit}>
            <h2>Kayıt Ol</h2>
            {step === 1 && (
              <>
                <input type="text" name="name" placeholder="Ad Soyad" value={form.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="E-posta" value={form.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Şifre" value={form.password} onChange={handleChange} required />
                <input type="password" name="passwordRepeat" placeholder="Şifreyi Tekrarla" value={form.passwordRepeat} onChange={handleChange} required />
                <select name="language" value={form.language} onChange={handleChange} required>
                  <option value="" disabled>Tercih Edilen Dil *</option>
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
                <select name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="" disabled>Cinsiyet</option>
                  <option value="erkek">Erkek</option>
                  <option value="kadin">Kadın</option>
                  <option value="diger">Diğer</option>
                </select>
                <input type="date" name="birthDate" placeholder="Doğum Tarihi" value={form.birthDate} onChange={handleChange} required />
                <button type="submit">Devam Et</button>
              </>
            )}
            {step === 2 && (
              <>
                <input type="text" name="country" placeholder="Geldiğiniz Ülke *" value={form.country} onChange={handleChange} required />
                <label style={{alignSelf:'flex-start', color:'#2c5282', fontWeight:500, marginTop:'0.5rem', marginBottom:'-0.2rem'}}>Türkiye'ye Geliş Tarihi</label>
                <input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} />
                <input type="text" name="city" placeholder="Bulunduğun İl / İlçe *" value={form.city} onChange={handleChange} required />
                <input type="text" name="maritalStatus" placeholder="Medeni Durum" value={form.maritalStatus} onChange={handleChange} />
                <input type="text" name="education" placeholder="Eğitim Durumu" value={form.education} onChange={handleChange} />
                <input type="text" name="nativeLanguage" placeholder="Ana Dil *" value={form.nativeLanguage} onChange={handleChange} required />
                <input type="text" name="extraLanguages" placeholder="Ek Dil Biliyor musunuz?" value={form.extraLanguages} onChange={handleChange} />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={handleBack} style={{ flex: 1, background: '#ccc', color: '#222' }}>Geri</button>
                  <button type="submit" style={{ flex: 2 }}>Kaydı Tamamla</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register; 