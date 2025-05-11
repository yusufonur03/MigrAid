import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Extra from "./pages/Extra";
import EHizmetler from "./pages/EHizmetler";
import Kurumlar from "./pages/Kurumlar";
import Belediyeler from "./pages/Belediyeler";
import Firmalar from "./pages/Firmalar";
import Universiteler from "./pages/Universiteler";
import SohbetAsistani from "./pages/SohbetAsistani";
import Footer from "./components/Footer";
import KulturelRehber from "./pages/KulturelRehber";
import FormYardimi from "./pages/FormYardimi";
import DijitalAjanda from "./pages/DijitalAjanda";
import IsEslestirme from "./pages/IsEslestirme";
import EgitimDilFirsatlari from "./pages/EgitimDilFirsatlari";
import YolHaritasi from "./pages/YolHaritasi";
import UserMainPage from "./pages/users/UserMainPage";
import UserYolHaritasi from "./pages/users/UserYolHaritasi";
import UserIsEslestirme from "./pages/users/UserIsEslestirme";
import UserFormYardimi from "./pages/users/UserFormYardimi";
import UserSohbetAsistani from "./pages/users/UserSohbetAsistani";
import UserKulturelRehber from "./pages/users/UserKulturelRehber";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Pricing from "./pages/Pricing";

import "./App.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kayit" element={<Register />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/panel" element={<Dashboard />} />
        <Route path="/extra" element={<Extra />} />
        <Route path="/ehizmetler" element={<EHizmetler />} />
        <Route path="/kurumlar" element={<Kurumlar />} />
        <Route path="/belediyeler" element={<Belediyeler />} />
        <Route path="/firmalar" element={<Firmalar />} />
        <Route path="/universiteler" element={<Universiteler />} />
        <Route path="/sohbet-asistani" element={<SohbetAsistani />} />
        <Route path="/kulturel-rehber" element={<KulturelRehber />} />
        <Route path="/form-yardimi" element={<FormYardimi />} />
        <Route path="/dijital-ajanda" element={<DijitalAjanda />} />
        <Route path="/is-eslestirme" element={<IsEslestirme />} />
        <Route path="/egitim-dil-firsatlari" element={<EgitimDilFirsatlari />} />
        <Route path="/yolharitasi" element={<YolHaritasi />} />
        <Route path="/fiyatlandirma" element={<Pricing />} />

        {/* Protected user routes */}
        <Route
          path="/users/main"
          element={
            <ProtectedRoute>
              <UserMainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/main/sohbetasistani"
          element={
            <ProtectedRoute>
              <UserSohbetAsistani />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/main/kulturelrehber"
          element={
            <ProtectedRoute>
              <UserKulturelRehber />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/main/formyardimi"
          element={
            <ProtectedRoute>
              <UserFormYardimi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/main/yolharitasi"
          element={
            <ProtectedRoute>
              <UserYolHaritasi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/main/iseslestirme"
          element={
            <ProtectedRoute>
              <UserIsEslestirme />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
