import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import './Register.css';

const initialState = {
  userType: 'multeci',
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
  language: 'tr',
  gender: '',
  birthDate: '',
  // Göçmen/Mülteci
  country: '',
  arrivalDate: '',
  city: '',
  maritalStatus: '',
  education: '',
  nativeLanguage: '',
  extraLanguages: '',
  // Gönüllü/Danışman
  expertise: '',
  volunteerLanguages: '',
  supportAreas: '',
  availability: '',
  // Kurum/STK
  orgName: '',
  orgType: '',
  position: '',
  orgWebsite: '',
};

const userTypes = [
  { value: 'multeci', label: 'Göçmen veya Mülteci' },
  { value: 'gonullu', label: 'Gönüllü veya Danışman' },
  { value: 'kurum', label: 'Kurum / STK Yetkilisi' },
];

function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Yardımcı fonksiyonlar
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const validateStep = () => {
    let err = {};
    if (step === 1) {
      if (!form.name) err.name = 'Ad Soyad zorunlu.';
      if (!form.email) err.email = 'E-posta zorunlu.';
      if (!form.phone) err.phone = 'Telefon zorunlu.';
      if (!form.password) err.password = 'Şifre zorunlu.';
      if (form.password.length < 6) err.password = 'Şifre en az 6 karakter olmalı.';
      if (form.password !== form.passwordRepeat) err.passwordRepeat = 'Şifreler eşleşmiyor.';
      if (!form.language) err.language = 'Dil seçmelisiniz.';
    }
    if (step === 2) {
      if (!form.country) err.country = 'Geldiğiniz ülke zorunlu.';
      if (!form.city) err.city = 'İl/ilçe zorunlu.';
      if (!form.nativeLanguage) err.nativeLanguage = 'Ana dil zorunlu.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = e => {
    e.preventDefault();
    if (validateStep()) setStep(s => s + 1);
  };
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = e => {
    e.preventDefault();
    if (validateStep()) {
      alert('Kayıt başarılı! (Demo)');
      setForm(initialState);
      setStep(1);
    }
  };

  // Form adımları
  return (
    <>
      <Navigation />
      <div className="register-layout">
        <div className="register-info">
          <h2>MigrAid'e Kayıt Ol</h2>
          <p>Güvenli, çok dilli ve adım adım kayıt süreci.</p>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <label className="form-label">Ad Soyad *</label>
              <input name="name" value={form.name} onChange={handleChange} />
              {errors.name && <div className="form-error">{errors.name}</div>}
              <label className="form-label">E-posta *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} />
              {errors.email && <div className="form-error">{errors.email}</div>}
              <label className="form-label">Telefon *</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
              <label className="form-label">Şifre *</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} />
              {errors.password && <div className="form-error">{errors.password}</div>}
              <label className="form-label">Şifreyi Tekrarla *</label>
              <input name="passwordRepeat" type="password" value={form.passwordRepeat} onChange={handleChange} />
              {errors.passwordRepeat && <div className="form-error">{errors.passwordRepeat}</div>}
              <label className="form-label">Tercih Edilen Dil *</label>
              <select name="language" value={form.language} onChange={handleChange}>
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
              {errors.language && <div className="form-error">{errors.language}</div>}
              <label className="form-label">Cinsiyet</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Seçiniz</option>
                <option value="erkek">Erkek</option>
                <option value="kadin">Kadın</option>
                <option value="diger">Diğer</option>
              </select>
              <label className="form-label">Doğum Tarihi</label>
              <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
              <div className="form-nav">
                <button className="form-btn" onClick={handleNext} type="button">Devam</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <label className="form-label">Geldiğiniz Ülke *</label>
              <input name="country" value={form.country} onChange={handleChange} />
              {errors.country && <div className="form-error">{errors.country}</div>}
              <label className="form-label">Türkiye'ye Geliş Tarihi</label>
              <input name="arrivalDate" type="date" value={form.arrivalDate} onChange={handleChange} />
              <label className="form-label">Bulunduğun İl / İlçe *</label>
              <input name="city" value={form.city} onChange={handleChange} />
              {errors.city && <div className="form-error">{errors.city}</div>}
              <label className="form-label">Medeni Durum</label>
              <input name="maritalStatus" value={form.maritalStatus} onChange={handleChange} />
              <label className="form-label">Eğitim Durumu</label>
              <input name="education" value={form.education} onChange={handleChange} />
              <label className="form-label">Ana Dil *</label>
              <input name="nativeLanguage" value={form.nativeLanguage} onChange={handleChange} />
              {errors.nativeLanguage && <div className="form-error">{errors.nativeLanguage}</div>}
              <label className="form-label">Ek Dil Biliyor musunuz?</label>
              <input name="extraLanguages" value={form.extraLanguages} onChange={handleChange} />
              <div className="form-nav">
                <button className="form-btn" type="button" onClick={handleBack}>Geri</button>
                <button className="form-btn" type="submit">Kaydı Tamamla</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Register; 