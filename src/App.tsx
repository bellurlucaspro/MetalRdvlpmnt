import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import SolutionsPage from "./pages/SolutionsPage";
import AgricolePage from "./pages/AgricolePage";
import PhotovoltaiquePage from "./pages/PhotovoltaiquePage";
import IndustrielPage from "./pages/IndustrielPage";
import OuvragesArtPage from "./pages/OuvragesArtPage";
import BureauProductionPage from "./pages/BureauProductionPage";
import RealisationsPage from "./pages/RealisationsPage";
import StabulationPage from "./pages/realisations/StabulationPage";
import ImplantationsPage from "./pages/ImplantationsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ActualitesPage from "./pages/ActualitesPage";
import ActualiteDetailPage from "./pages/actualites/ActualiteDetailPage";
import LoginPage from "./pages/admin/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { QuoteBanner } from "./components/QuoteBarrier";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen bg-white">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/agricole" element={<AgricolePage />} />
              <Route path="/solutions/photovoltaique" element={<PhotovoltaiquePage />} />
              <Route path="/solutions/industriel" element={<IndustrielPage />} />
              <Route path="/solutions/ouvrages-art" element={<OuvragesArtPage />} />
              <Route path="/bureau-production" element={<BureauProductionPage />} />
              <Route path="/realisations" element={<RealisationsPage />} />
              <Route path="/realisations/:slug" element={<StabulationPage />} />
              <Route path="/implantations" element={<ImplantationsPage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/actualites" element={<ActualitesPage />} />
              <Route path="/actualites/:slug" element={<ActualiteDetailPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
          <Footer />
          <QuoteBanner />
        </div>
      )}
    </Router>
  );
}

export default App;