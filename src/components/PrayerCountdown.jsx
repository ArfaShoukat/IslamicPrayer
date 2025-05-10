import React, { useEffect, useState } from 'react';
import './PrayerCountdown.css';
import { motion } from 'framer-motion';
import {
  BsMoonStars, BsSun, BsClock, BsSunset, BsStars
} from 'react-icons/bs';

const PrayerCountdown = () => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [error, setError] = useState('');

  const fetchPrayerTimes = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1&school=1`
      );
      const data = await response.json();
      setPrayerTimes(data.data.timings);
    } catch {
      setError('Failed to fetch prayer times.');
    }
  };

  const getCurrentPrayerAndRemainingTime = () => {
    const now = new Date();

    const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const times = prayerOrder.map((key) => {
      const [hour, minute] = prayerTimes[key].split(':').map(Number);
      const date = new Date();
      date.setHours(hour, minute, 0, 0);
      return { name: key, time: date };
    });

    const fajrTomorrow = new Date(times[0].time);
    fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
    times.push({ name: 'FajrNext', time: fajrTomorrow });

    for (let i = 0; i < times.length - 1; i++) {
      if (now >= times[i].time && now < times[i + 1].time) {
        const diff = Math.floor((times[i + 1].time - now) / 1000);
        const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
        const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
        const secs = String(diff % 60).padStart(2, '0');

        return {
          currentPrayer: times[i].name,
          remaining: `${hrs}:${mins}:${secs}`,
        };
      }
    }

    return { currentPrayer: 'Unknown', remaining: '--:--:--' };
  };

  const convertTo12Hour = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchPrayerTimes(latitude, longitude);
        },
        () => {
          setError('Location access denied.');
        }
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(prayerTimes).length > 0) {
        const { currentPrayer, remaining } = getCurrentPrayerAndRemainingTime();
        setCurrentPrayer(currentPrayer);
        setRemainingTime(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const prayerIcons = {
    Fajr: <BsMoonStars />,
    Dhuhr: <BsSun />,
    Asr: <BsClock />,
    Maghrib: <BsSunset />,
    Isha: <BsStars />,
  };

  return (
    <motion.div
      className="prayer-countdown"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3>🕒 Remaining Time to Offer Current Prayer</h3>
      {error && <p className="error">{error}</p>}

      <motion.div
        className="remaining-circle"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <strong>Current Prayer</strong>
        <div className="time-row remaining">
          {prayerIcons[currentPrayer]} {currentPrayer}
        </div>
        <div className="time-row">
          <BsClock /> Left Time: {remainingTime}
        </div>
      </motion.div>

      <motion.div
        className="all-times"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Today's Prayer Times</h2>
        <div className="prayer-row">
          {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((key, index) => (
            <motion.div
              className="prayer-box small"
              key={key}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <strong>{key}</strong>
              <div className="time-row">
                {prayerIcons[key]} {convertTo12Hour(prayerTimes[key] || '--:--')}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrayerCountdown;
