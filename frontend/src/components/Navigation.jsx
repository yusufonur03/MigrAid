import { Link } from 'react-router-dom';
import logo from '../assets/migraid.png';
import './Navigation.css';

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
        <Link to="/giris">Giriş Yap</Link>
      </div>
    </nav>
  );
}

export default Navigation; 