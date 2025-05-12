import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ImpDuas from './pages/ImpDuas';
import Header from './components/Header';
import MonthlyPrayer from './pages/MonthlyPrayer';
import QuranicVerse from './pages/QuranicVerse'
import AlQuran from './pages/AlQuran.jsx';
import AlMunajaat from './pages/AlMunajaat.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ImpDuas" element={<ImpDuas />} />
        <Route path="/MonthlyPrayer" element={<MonthlyPrayer />} />
        <Route path="/QuranicVerse" element={<QuranicVerse />} />
        <Route path="/AlMunajaat" element={<AlMunajaat />} />
        <Route path="/AlQuran" element={<AlQuran />} />
      </Routes>

    </Router>
  );
}

export default App;
