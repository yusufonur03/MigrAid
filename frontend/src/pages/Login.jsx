import React, { useState } from 'react';
import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import app from '../firebaseConfig'; // Import the Firebase app
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import auth functions

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
        <Link to="/kayit">Kayıt Ol</Link>
      </div>
    </nav>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth(app); // Get Firebase Auth instance

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home page or dashboard on successful login
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <Navigation />
      <div className="mid-footer">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Giriş Yap</h2>
            <input
              type="email"
              placeholder="E-posta"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Şifre"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Giriş Yap</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
