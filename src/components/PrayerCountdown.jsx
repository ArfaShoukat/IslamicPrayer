import React, { useEffect, useState } from 'react';
import './PrayerCountdown.css';
import { motion } from 'framer-motion';
import {
  BsMoonStars, BsSun, BsClock, BsSunset, BsStars
} from 'react-icons/bs';

const PrayerCountdown = () => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [remainingTimes, setRemainingTimes] = useState({});
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

  const convertTo12Hour = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
  };

  const calculateRemainingTime = (timeStr) => {
    const now = new Date();
    const [hour, minute] = timeStr.split(':').map(Number);
    const target = new Date();
    target.setHours(hour, minute, 0, 0);

    if (target < now) {
      target.setDate(target.getDate() + 1);
    }

    const diff = Math.floor((target - now) / 1000);
    const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
    const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const secs = String(diff % 60).padStart(2, '0');

    return `${hrs}:${mins}:${secs}`;
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
        const updatedTimes = {};
        ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach((key) => {
          updatedTimes[key] = calculateRemainingTime(prayerTimes[key]);
        });
        setRemainingTimes(updatedTimes);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const prayerIcons = {
    Fajr: <BsMoonStars />,
    Dhuhr: <BsSun />,
    Asr: <BsClock />,
    Maghrib: <BsSunset />,
    Isha: <BsStars />
  };

  return (
    <div className="prayer-countdown">
      <h3>🕒 Remaining Time for Each Prayer</h3>
      {error && <p className="error">{error}</p>}
<div className='mid-prayer'>
      <div className="prayer-row">
        {Object.keys(remainingTimes).map((key) => (
          <motion.div
            className="prayer-box"
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.95 }}
          >
            <strong>{key}</strong>
            <div className="time-row">
              {prayerIcons[key]} {convertTo12Hour(prayerTimes[key])}
            </div>
            <div className="time-row">
              <BsClock /> {remainingTimes[key]}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default PrayerCountdown;
