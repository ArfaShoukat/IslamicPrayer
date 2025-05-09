import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/en-gb';
import axios from 'axios';
import './DateInfoPage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMoon, faClock } from '@fortawesome/free-solid-svg-icons';

const DateInfoPage = () => {
  const [hijriDate, setHijriDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [timezone, setTimezone] = useState(moment.tz.guess());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(moment().tz(timezone).format('dddd, Do MMMM YYYY | hh:mm:ss A'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    const getHijriDate = async () => {
      const today = moment().format('DD-MM-YYYY');
      const response = await axios.get(`https://api.aladhan.com/v1/gToH?date=${today}`);
      const hijri = response.data.data.hijri;
      setHijriDate(`${hijri.day}-${hijri.month.en}-${hijri.year}`);
    };

    getHijriDate();
  }, []);

  return (
    <div className="date-info-page">
      <div className="date-box">
        <p>
          <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
          {currentTime}
        </p>
        <p>
          <FontAwesomeIcon icon={faMoon} className="date-icon" />
          Hijri: {hijriDate}
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} className="date-icon" />
          Timezone: {timezone}
        </p>
      </div>
    </div>
  );
};

export default DateInfoPage;
