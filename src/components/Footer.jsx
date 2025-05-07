import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Islamic Prayer. All rights reserved.</p>
        <p>“The prayer is the pillar of religion.” - Prophet Muhammad (ﷺ)</p>
      </div>
    </footer>
  );
};

export default Footer;
