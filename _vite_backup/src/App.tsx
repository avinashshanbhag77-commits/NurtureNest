import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import Nutrition from './pages/Nutrition';
import Wellness from './pages/Wellness';
import AISupport from './pages/AISupport';
import Community from './pages/Community';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="main-content" style={{ minHeight: 'calc(100vh - 70px - 200px)' }}> {/* Adjust for header/footer height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/ai-support" element={<AISupport />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>

        <footer style={{ backgroundColor: 'var(--secondary-color)', padding: '3rem 0', marginTop: 'auto' }}>
          <div className="container" style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            <h3 style={{ margin: '0 0 1rem' }}>NurtureNest</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <a href="#">About Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Contact</a>
            </div>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>&copy; 2026 NurtureNest. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
