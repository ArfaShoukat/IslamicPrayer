import React, { useEffect, useState } from 'react';
import './MonthlyPrayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


const MonthlyPrayer = () => {
  const [calendar, setCalendar] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const today = new Date();
          const month = today.getMonth() + 1;
          const year = today.getFullYear();

          const response = await fetch(
            `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=1&school=1&month=${month}&year=${year}`
          );

          const data = await response.json();
          if (data.data) {
            setCalendar(data.data);
          } else {
            setError('No calendar data received.');
          }
        } catch (err) {
          console.error(err);
          setError('Failed to fetch calendar.');
        }
      }, () => {
        setError('Location access denied.');
      });
    } else {
      setError('Geolocation is not supported.');
    }
  }, []);

  const isToday = (dateString) => {
    const today = new Date();
    const current = new Date(dateString);
    return (
      today.getDate() === current.getDate() &&
      today.getMonth() === current.getMonth() &&
      today.getFullYear() === current.getFullYear()
    );
  };

  return (
    <div className="monthly-calendar-page">
      <h2><FontAwesomeIcon icon={faCalendarAlt} /> Monthly Prayer Calendar (Hanafi)</h2>
      {error && <p className="error">{error}</p>}

      {calendar.length > 0 ? (
        <div className="calendar-table">
          <div className="calendar-header">
            <span>Date</span>
            <span>Fajr</span>
            <span>Dhuhr</span>
            <span>Asr</span>
            <span>Maghrib</span>
            <span>Isha</span>
          </div>
          {calendar.map((day, index) => (
            <div
              key={index}
              className={`calendar-row ${isToday(day.date.gregorian.date) ? 'today-row' : ''}`}
            >
              <span>{day.date.readable}</span>
              <span>{day.timings.Fajr.split(' ')[0]}</span>
              <span>{day.timings.Dhuhr.split(' ')[0]}</span>
              <span>{day.timings.Asr.split(' ')[0]}</span>
              <span>{day.timings.Maghrib.split(' ')[0]}</span>
              <span>{day.timings.Isha.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      ) : (
        !error && <p>Loading monthly prayer calendar...</p>
      )}
    </div>
  );
};

export default MonthlyPrayer;
