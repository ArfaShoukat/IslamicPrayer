import React, { useEffect, useState } from 'react';
import './QuranicVerse.css';

const QuranicVerse = () => {
  const [verse, setVerse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/ayah/random/en.asad');
        const data = await response.json();
        setVerse(data.data);
      } catch (err) {
        setError('Failed to load Quranic verse.');
      }
    };

    fetchVerse();
  }, []);

  const surahNasr = {
    arabic: ['إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ', 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا', 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا'],
    translation: [
      'When God’s help and victory come,',
      'and you see people entering God’s religion in multitudes,',
      'then glorify your Lord’s praise and ask His forgiveness. Surely, He is ever Accepting of repentance.'
    ],
    name: 'An-Nasr',
    number: 110
  };

  return (
    <div className="quranic-verse-page">
      <h2>📖 Quranic Verse of the Day</h2>

      {error && <p className="error">{error}</p>}

      {verse ? (
        <div >
          {/* <p className="ayah-text">"{verse.text}"</p>
          <p className="ayah-info">
            — Surah {verse.surah.englishName} ({verse.surah.name}), Ayah {verse.numberInSurah}
          </p> */}
        </div>
      ) : (
        !error && <p className="loading">Loading verse...</p>
      )}

      {/* Surah An-Nasr Card */}
      <div className="verse-box">
        <h3>📜 Surah {surahNasr.name} (Surah {surahNasr.number})</h3>
        {surahNasr.arabic.map((ayah, i) => (
          <div key={i} className="nasr-ayah">
            <p className="arabic-text">{ayah}</p>
            <p className="tarjuma-text">{surahNasr.translation[i]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranicVerse;
