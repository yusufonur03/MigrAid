import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/migraid.png";
import "./Navigation.css";
import app from "../firebaseConfig"; // Import Firebase app
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth functions

function Navigation({ showAuthButtons = true }) {
  const navigate = useNavigate();
  const auth = getAuth(app); // Get Firebase Auth instance

  const handleLogout = async () => {
    // Make handleLogout async
    try {
      await signOut(auth); // Sign out from Firebase
      localStorage.removeItem("firebaseIdToken"); // Remove Firebase ID token
      // console.log("User signed out and token removed.");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Error signing out: ", error);
      // Handle any errors during sign out, e.g., display a message
    }
  };

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="MigrAid Logo" style={{ cursor: "pointer" }} />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Ana Sayfa</Link>
        <Link to="/fiyatlandirma">Fiyatlandırma</Link>
        {showAuthButtons ? (
          <>
            <Link to="/kayit">Kayıt Ol</Link>
            <Link to="/giris">Giriş Yap</Link>
          </>
        ) : (
          <>
            <Link to="/users/main">Profilim</Link>
            <a
              href="#"
              onClick={handleLogout}
              className="logout-link"
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              Çıkış Yap
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
