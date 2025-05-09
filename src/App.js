import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrayerTime from './pages/PrayerTime';
import Header from './components/Header';
import Footer from './components/Footer';
import MonthlyPrayer from './pages/MonthlyPrayer';
import QuranicVerse from './pages/QuranicVerse'
import Quran from './pages/Quran';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PrayerTime" element={<PrayerTime />} />
        <Route path="/MonthlyPrayer" element={<MonthlyPrayer />} />
        <Route path="/QuranicVerse" element={<QuranicVerse />} />
        <Route path="/Quran" element={<Quran />} />

      </Routes>
     
    </Router>
  );
}

export default App;
