import React, { useState, useEffect } from 'react';
import BackArrow from '../components/BackArrow';

const AlQuran = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahContent, setSurahContent] = useState(null);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => setSurahs(data.data))
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    if (selectedSurah) {
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`)
        .then(res => res.json())
        .then(data => setSurahContent(data.data))
        .catch(err => console.error(err));
    }
  }, [selectedSurah]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', fontSize: '1.2rem' }}>
      <BackArrow />
      {selectedSurah === null ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {surahs.map(surah => (
            <div
              key={surah.number}
              onClick={() => setSelectedSurah(surah.number)}
              style={{
                background: '#f4f4f4',
                borderRadius: '12px',
                padding: '25px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: '0.3s ease',
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {surah.number}. {surah.englishName}
              </div>

              <div style={{ fontSize: '2rem', marginTop: '15px', direction: 'rtl' }}>
                {surah.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setSelectedSurah(null);
              setSurahContent(null);
            }}
            style={{
              marginBottom: '20px',
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            🔙 Back to Surah List
          </button>

          {surahContent ? (
            <div>
              <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>
                {surahContent.englishName} ({surahContent.name})
              </h2>

              <div
                style={{
                  background: '#fff',
                  padding: '25px',
                  borderRadius: '12px',
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  lineHeight: '2.5',
                  direction: 'rtl',
                  fontSize: '1.8rem',
                }}
              >
                {surahContent.ayahs.map(ayah => (
                  <div style={{ fontSize: '2rem' }} key={ayah.number}>
                    {ayah.text}
                    <span style={{ color: '#888', fontSize: '1rem' }}> ({ayah.numberInSurah})</span>
                    <hr style={{ border: 'none', borderBottom: '1px dotted #ddd' }} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p style={{ fontSize: '1.5rem' }}>Loading Surah...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AlQuran;
