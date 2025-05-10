import React from 'react';
import './Header.css';
import DateInfoPage from './DateInfoPage';
import logo1 from './images/logo1.png'; // Adjust the path if necessary

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo-title-container">
            <img src={logo1} alt="Logo" className="logo" />
            <h1>Islamic Prayer</h1>
          </div>
          <p className='ayat-text'>إِنَّ مَعَ ٱلْعُسْرِ يُسْرًۭا</p>
          <p className='translate'>
            Surely with ˹that˺ hardship comes ˹more˺ ease.
            <span>Surah Duha</span>
          </p>
        </div>
      </header>
    </div>
  );
};

export default Header;
