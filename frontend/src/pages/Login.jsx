import logo from '../assets/migraid.png';
import '../components/Navigation.css';
import './Login.css';
import { Link } from 'react-router-dom';

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
  return (
    <>
      <Navigation />
      <div className="mid-footer">
        <div className="login-form-wrapper">
          <form className="login-form">
            <h2>Giriş Yap</h2>
            <input type="email" placeholder="E-posta" required />
            <input type="password" placeholder="Şifre" required />
            <button type="submit">Giriş Yap</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login; 