import React from 'react';
import './SignupKismi.css';

function SignupKismi() {
  return (
    <div className="signupkismi-wrapper">
      <form className="signupkismi-form">
        <h2>Kayıt Ol</h2>
        <input type="text" placeholder="Ad Soyad" required />
        <input type="email" placeholder="E-posta" required />
        <input type="password" placeholder="Şifre" required />
        <input type="password" placeholder="Şifreyi Tekrarla" required />
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default SignupKismi; 