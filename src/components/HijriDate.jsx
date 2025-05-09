import React, { useEffect, useState } from 'react';
import './HijriDate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const HijriDate = () => {
  const [gregorianDate, setGregorianDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [error, setError] = useState('');

  const convertToHijri = async (dateStr) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const response = await fetch(
        `https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`
      );
      const data = await response.json();
      const hijri = data.data.hijri;
      setHijriDate(`${hijri.day}-${hijri.month.en}-${hijri.year}`);
      setError('');
    } catch {
      setError('Failed to convert date.');
    }
  };

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setGregorianDate(formattedDate);
    convertToHijri(formattedDate);
  }, []);

  return (
    <div className="container">
      <div className="card hijri-card">
        <h3><FontAwesomeIcon icon={faCalendarAlt} className='icon'/> Hijri Date Converter</h3>
        <div className="input-group">
          <input
            type="date"
            value={gregorianDate}
            onChange={(e) => {
              setGregorianDate(e.target.value);
              convertToHijri(e.target.value);
            }}
          />
          <button onClick={() => convertToHijri(gregorianDate)}>Convert</button>
        </div>
        {hijriDate && <h4>{hijriDate}</h4>}
        {error && <p className="error">{error}</p>}
        <p className="note">There is a small probability of one day error</p>
      </div>
    </div>
  );
};

export default HijriDate;
