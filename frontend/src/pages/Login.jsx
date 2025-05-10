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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken(); // Get the ID token

      // Store the ID token in localStorage
      localStorage.setItem('firebaseIdToken', idToken);
      console.log('Firebase ID token stored in localStorage.');

      try {
        // Fetch user's name and surname from your backend
        // Use relative path for API calls to leverage Vite proxy
        const response = await fetch(`/api/user/${user.uid}`, { // Changed to relative path
          headers: {
            'Authorization': `Bearer ${idToken}` // Include the ID token in the Authorization header
          }
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
        const nameParts = fullName.split(' ');
        const name = nameParts[0];
        const surname = nameParts.slice(1).join(' '); // Handle cases with multiple surname parts

        // Redirect to main page on successful login, passing user data
        navigate('/users/main', { state: { name, surname, uid: user.uid, token: idToken } }); // Also passing uid and token for potential use
      } catch (fetchError) {
        console.error("Error fetching user data:", fetchError);
        // If fetching user data fails, still navigate but without name/surname.
        // The token is stored, so other authenticated routes should work.
        setError(`Login successful, but failed to fetch user details: ${fetchError.message}. You will be redirected.`);
        // Wait a bit before redirecting so user can see the message
        setTimeout(() => {
          navigate('/users/main', { state: { uid: user.uid, token: idToken } }); // Pass uid and token
        }, 2000);
      }

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
