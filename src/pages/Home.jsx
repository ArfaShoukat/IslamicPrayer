import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PrayerCountdown from '../components/PrayerCountdown';
import HijriDate from '../components/HijriDate';
import DateInfoPage from '../components/DateInfoPage';
import Footer from '../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCalendarAlt,
  faBookQuran,
  faHandsPraying,
} from '@fortawesome/free-solid-svg-icons';

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

  const features = [
    {
      icon: faHandsPraying,
      title: 'Important Duas',
      desc: 'You must include these duas in your prayers.',
      onClick: () => navigate('/ImpDuas'),
    },
    {
      icon: faCalendarAlt,
      title: 'Monthly Prayer Calendar',
      desc: 'Plan your prayers ahead with our Islamic calendar.',
      onClick: () => navigate('/MonthlyPrayer'),
    },
    {
      icon: faBookQuran,
      title: '📖 Quranic Verses',
      desc: 'Read and reflect on the Quran with daily verses and teachings.',
      onClick: () => navigate('/QuranicVerse'),
    },
    {
  icon: faBookQuran,
  title: '📖 Munajaate Maqbool',
  desc: 'You must include these duas in your prayers.',
  onClick: () => navigate('/AlMunajaat'),
},
 {
  icon: faBookQuran,
  title: '📖 Al Quran',
  desc: 'You must include these duas in your prayers.',
  onClick: () => navigate('/AlQuran'),
},
  ];

  return (
    <div className="home">
      <div className="date-info-hijri-wrapper">
        <DateInfoPage />
        <HijriDate />
      </div>

      {/* <section className="intro">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          Welcome to Islamic Prayer
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Stay connected to your daily prayers, Quranic teachings, and more based on your city.
        </motion.p>
      </section> */}

      {/* Spaced Prayer Countdown */}
      <div className="countdown-wrapper spaced-section">
        <PrayerCountdown />
      </div>

      {/* Spaced Features Section */}
      <section className="features spaced-section">
        {features.map((item, i) => (
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
            <FontAwesomeIcon icon={item.icon} size="2x" className="feature-icon" />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
