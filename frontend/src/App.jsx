import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Extra from './pages/Extra';
import EHizmetler from './pages/EHizmetler';
import Kurumlar from './pages/Kurumlar';
import Belediyeler from './pages/Belediyeler';
import STKlar from './pages/STKlar';
import Firmalar from './pages/Firmalar';
import Universiteler from './pages/Universiteler';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kayit" element={<Register />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/panel" element={<Dashboard />} />
        <Route path="/extra" element={<Extra />} />
        <Route path="/ehizmetler" element={<EHizmetler />} />
        <Route path="/kurumlar" element={<Kurumlar />} />
        <Route path="/belediyeler" element={<Belediyeler />} />
        <Route path="/stklar" element={<STKlar />} />
        <Route path="/firmalar" element={<Firmalar />} />
        <Route path="/universiteler" element={<Universiteler />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App; 