import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PrayerCountdown from '../components/PrayerCountdown';
import HijriDate from '../components/HijriDate';
import DateInfoPage from '../components/DateInfoPage';

const Home = () => {
  const navigate = useNavigate();

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="home">
      <br/>
    <div  className="DateInfowrapper">
      <DateInfoPage/>
      <HijriDate/>
    </div>
      <div className="countdown-wrapper">
        
        <PrayerCountdown />
      </div>

      <section className="intro">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          Welcome to Islamic Prayer
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Stay connected to your daily prayers, Quranic teachings, and more based on your city.
        </motion.p>
      </section>

      <section className="features">
        {[
          {
            title: '🕋 Daily Prayer Times',
            desc: 'Click to view today’s Hanafi prayer times based on your location.',
            onClick: () => navigate('/PrayerTime'),
          },
          {
            title: '📅 Monthly Prayer Calendar',
            desc: 'Plan your prayers ahead with our Islamic calendar.',
            onClick: () => navigate('/MonthlyPrayer'),
          },
          {
            title: '📖 Quranic Verses',
            desc: 'Read and reflect on the Quran with daily verses and teachings.',
            onClick: () => navigate('/QuranicVerse'),
          },
        ].map((item, i) => (
          <motion.div
            className="feature-box clickable"
            key={i}
            onClick={item.onClick}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={featureVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Horizontally centered HijriDate */}
      
    </div>
  );
};

export default Home;
