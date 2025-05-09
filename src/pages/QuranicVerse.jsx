import React from 'react';
import './QuranicVerse.css';

const QuranicVerse = () => {
  const verses = [
    {
      arabic: 'إِنَّ مَعَ ٱلْعُسْرِ يُسْرًۭا',
      translation: 'Surely with ˹that˺ hardship comes ˹more˺ ease.',
      surah: 'Ash-Sharh',
      surahNumber: 94,
      ayahNumber: 6,
    },
    {
      arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰٓ',
      translation: 'And your Lord is going to give you, and you will be satisfied.',
      surah: 'Ad-Duhaa',
      surahNumber: 93,
      ayahNumber: 5,
    },
    {
      arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
      translation: 'When God’s help and victory come,',
      surah: 'An-Nasr',
      surahNumber: 110,
      ayahNumber: 1,
    },
  ];

  // Calculate which verse to show based on the day number
  const getVerseOfTheDay = () => {
    const startDate = new Date('2024-01-01'); // Fixed start date
    const today = new Date();
    const diffTime = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const index = diffTime % verses.length;
    return verses[index];
  };

  const verse = getVerseOfTheDay();

  return (
    <div className="quranic-verse-page">
      <h2>📖 Quranic Verse of the Day</h2>

      <div className="verse-box">
        <h3>📜 Surah {verse.surah} (Surah {verse.surahNumber})</h3>
        <div className="nasr-ayah">
          <p className="arabic-text">{verse.arabic}</p>
          <p className="tarjuma-text">{verse.translation}</p>
        </div>
      </div>
    </div>
  );
};

export default QuranicVerse;
