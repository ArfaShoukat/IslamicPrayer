import React, { useEffect, useState } from 'react';
import './PrayerTime.css';
import { motion } from 'framer-motion';
import {
  BsSun, BsMoonStars, BsSunrise, BsSunset, BsClock, BsStars
} from 'react-icons/bs';

const PrayerTime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [error, setError] = useState('');

  const formatToBajeTime = (time) => {
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr, 10);
    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;
    return `${hour}:${minute}`;
  };

  const fetchPrayerTimes = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1&school=1`
      );
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setPrayerTimes(data.data.timings);
      setError('');
    } catch {
      setError('Failed to fetch prayer times.');
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchPrayerTimes(latitude, longitude);
        },
        () => {
          const fallbackLat = 24.8607;
          const fallbackLon = 67.0011;
          setError('Location access denied. Using default location.');
          fetchPrayerTimes(fallbackLat, fallbackLon);
        }
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  const prayerIcons = {
    Fajr: <BsMoonStars />,
    Sunrise: <BsSunrise />,
    Dhuhr: <BsSun />,
    Asr: <BsClock />,
    Maghrib: <BsSunset />,
    Isha: <BsStars />
  };

  return (
    <div className="prayer-time-page">
      <h2>Today's Hanafi Prayer Times</h2>
      {error && <p className="error">{error}</p>}

      {prayerTimes ? (
        <motion.div
          className="prayer-times-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((key) => (
            <motion.div
              key={key}
              className="prayer-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="icon">{prayerIcons[key]}</div>
              <h4>{key}</h4>
              <p>{formatToBajeTime(prayerTimes[key])}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        !error && <p className="loading">Loading prayer times...</p>
      )}
    </div>
  );
};

export default PrayerTime;
