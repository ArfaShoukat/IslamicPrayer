import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quran.css';

const Quran = () => {
  const [surahs, setSurahs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sampleSurahs = [
      { id: 1, name: 'Al-Fatiha' },
      { id: 2, name: 'Al-Baqara' },
      { id: 3, name: 'Aal-e-Imran' },
      // ... add all 114 surahs
    ];
    setSurahs(sampleSurahs);
  }, []);

  const handleSurahClick = (id) => {
    if (id === 1) {
      window.open('/images/SurahFatiha.jpg', '_blank');
    } else {
      navigate(`/Quran/${id}`);
    }
  };

  return (
    <div className="quran-page">
      <h2>📘 Quran - Mufti Taqi Usmani Translation</h2>
      <div className="quran-list">
        {surahs.map((surah) => (
          <div
            className="surah-box clickable"
            key={surah.id}
            onClick={() => handleSurahClick(surah.id)}
          >
            <h4>{surah.id}. {surah.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quran;
