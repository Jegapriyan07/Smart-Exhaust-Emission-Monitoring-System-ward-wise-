import { useState, useEffect } from 'react';

export const useDashboardData = () => {
  const [data, setData] = useState({
    temp: 58,
    humidity: 60,
    nh3: 17.85,
    outsideTemp: 17.85,
    humidityExt: 80.03,
    waterLevel: 6,
    history: [],
    gas: {
      nh3: { val: 0.19, trend: 'stable' },
      no2: { val: 0.60, trend: 'up' },
      pm25: { val: 36.67, trend: 'down' }
    }
  });

  // Simulate Serial/Hardware Data Stream
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });

      setData(prev => {
        // Mock fluctuations
        const newTemp = 17 + Math.random() * 2;
        const newHum = 80 + Math.random() * 2;
        
        const newPoint = {
          time: timeStr,
          temp: newTemp,
          humidity: newHum,
          gas: 40 + Math.random() * 10
        };

        const newHistory = [...prev.history, newPoint].slice(-20); // Keep last 20 points

        return {
          ...prev,
          temp: 55 + Math.floor(Math.random() * 5), // AQI Temp
          outsideTemp: newTemp.toFixed(2),
          humidityExt: newHum.toFixed(2),
          history: newHistory,
          gas: {
            nh3: { val: (0.15 + Math.random() * 0.1).toFixed(2) },
            no2: { val: (0.55 + Math.random() * 0.1).toFixed(2) },
            pm25: { val: (35 + Math.random() * 5).toFixed(2) }
          }
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return data;
};