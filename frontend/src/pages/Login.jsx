import React, { useState, useEffect } from "react";
import logo from "../assets/migraid.png";
import "../components/Navigation.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import app from "../firebaseConfig"; // Import the Firebase app
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import auth functions
import { handleAuthRedirect } from "../utils/auth"; // Import auth utility

function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="MigrAid Logo" style={{ cursor: "pointer" }} />
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app); // Get Firebase Auth instance

  // Check for token when component mounts and redirect if already logged in
  useEffect(() => {
    handleAuthRedirect(navigate, "auth");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken(); // Get the ID token

      // Store the ID token in localStorage
      localStorage.setItem("firebaseIdToken", idToken);
      console.log("Firebase ID token stored in localStorage.");

      try {
        // Fetch user's name and surname from your backend
        const response = await fetch(`/api/user/${user.uid}`, {
          headers: {
            Authorization: `Bearer ${idToken}`, // Include the ID token in the Authorization header
          },
        });
        if (!response.ok) {
          // Try to parse error from backend if available
          let errorMsg = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorData.message || errorMsg;
          } catch (parseError) {
            // Ignore if response is not JSON
          }
          throw new Error(errorMsg);
        }
        const responseData = await response.json();

        // Extract full_name from the response data
        const fullName = responseData.data.full_name;

        // Split full_name into name and surname (assuming format "Name Surname")
        const nameParts = fullName.split(" ");
        const name = nameParts[0];
        const surname = nameParts.slice(1).join(" "); // Handle cases with multiple surname parts

        // Redirect to main page on successful login, passing user data
        navigate("/users/main", { state: { name, surname, uid: user.uid, token: idToken } });
      } catch (fetchError) {
        console.error("Error fetching user data:", fetchError);
        // If fetching user data fails, still navigate but without name/surname.
        // The token is stored, so other authenticated routes should work.
        setTimeout(() => {
          navigate("/users/main", { state: { uid: user.uid, token: idToken } }); // Pass uid and token
        }, 1000);
      }
    } catch (error) {
      // Only log the error to console, don't show it in the UI
      console.error("Login error:", error.message);
      setIsLoading(false);
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
