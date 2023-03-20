import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    fetchTemperature();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchTemperature = async () => {
    const apiKey = 'API_TOKEN';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTemperature(data.main.temp.toFixed(1));
    } catch (error) {
      console.error('Error fetching temperature:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Hora actual</h1>
      <p>{time}</p>
      <h1>Temperatura en Buenos Aires</h1>
      <p>{temperature ? `${temperature} °C` : 'Cargando...'}</p>
    </div>
  );
};

export default Dashboard;
