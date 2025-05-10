import React from 'react';
import './ImpDuas.css';

const duas = [
  {
    arabic: 'رَبِّ إِنِّى لِمَآ أَنزَلْتَ إِلَىَّ مِنْ خَيْرٍۢ فَقِيرٌۭ',
    translation: 'My Lord! I am needy of whatever good Thou sendest down for me.',
    source: 'Surah Al-Qasas'
  },
  {
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    translation: 'Our Lord! Grant unto us wives and offspring who will be the comfort of our eyes, and give us (the grace) to lead the righteous.',
    source: 'Surah Al-Furqan'
  },
  {
    arabic: 'اَللّٰهُمَّ إِنِّىْ أَسْئَلُكَ حُبَّكَ وَ حُبَّ مَنْ يُّحِبُّكَ وَ الْعَمَلَ الَّذِىْ يُبَلِّغُنِىْ حُبَّكَ',
    translation: 'O Allah! I ask of You Your love, the love of whoever loves You and the love of the deed which will draw me in attaining Your love.',
    source: 'At-Tirmidhi'
  },
  {
    arabic: 'يا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    translation: 'O Changer of the Hearts! Strengthen my heart upon Your Religion.',
    source: 'At-Tirmidhi'
  },
  {
    arabic: 'اللَّهُمَّ حَاسِبْنِي حِسَابًا يَسِيرًا',
    translation: 'O Allah, take an easy reckoning.',
    source: 'Mishkat ul Masabeeh'
  },
   {
    arabic: 'حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    translation: '“Allah is sufficient for me. There is none worthy of worship but Him. I have placed my trust in Him. He is the Lord of the Majestic throne.”',
    source: 'Sunan Abi Dawood'
  },
   {
    arabic: 'حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ',
    translation: 'Sufficient for us is Allah, and He is the best disposer of affairs',
    source: 'Surah Al-Imran'
  },
  {
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوْبَنَا بَعْدَ اِذْ هَدَیْتَنَا وَ هَبْ لَنَا مِنْ لَّدُنْكَ رَحْمَةًۚ-اِنَّكَ اَنْتَ الْوَهَّابُ',
    translation: 'Our Lord! (they say), Let not our hearts deviate now after Thou hast guided us, but grant us mercy from Thine own Presence; for Thou art the Grantor of bounties without measure',
    source: 'Surah Al-Imran'
  },
  {
    arabic: 'اللَّهُمَّ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translation: 'Our Lord! Grant us good in this world and good in the hereafter, and save us from the chastisement of the fire',
    source: 'Surah Al-Baqarah'
  },
  {
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا إنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ، وَتُبْ عَلَيْنَا إنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
    translation: 'O our Lord, accept this (humble service) from us. You are, indeed, All-Hearing, All-Knowing. and turn to us (with mercy and forgiveness). Verily, it is You Who are Most Relenting, Ever-Merciful.',
    source: 'Surah Al-Baqarah'
  },
];

const ImpDuas = () => {
  return (
    <div className="imp-duas-page">
      <h2>🕊️ Important Duas</h2>
      <p className="duas-desc">You must include these duas in your prayers.</p>
      <div className="duas-grid">
        {duas.map((dua, index) => (
          <div className="dua-card" key={index}>
            <p className="dua-arabic">{dua.arabic}</p>
            <p className="dua-translation">{dua.translation}</p>
            <p className="dua-source">📖 {dua.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpDuas;
