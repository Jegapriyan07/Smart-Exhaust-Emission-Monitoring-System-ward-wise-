import { useState, useEffect } from 'react';
import { WARDS } from '../data/wards';

export const useASIE = () => {
  const [currentWard, setCurrentWard] = useState(WARDS[0]);
  const [realTimeData, setRealTimeData] = useState({
    pm25: 200,
    spikeDetected: false,
    spikeConfidence: 0,
    cause: null,
    history: []
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        // 1. Simulate Fluctuation based on Ward Baseline
        // PDF says Spikes are >450+, Averages are ~200 [cite: 51, 52]
        const isSpikeEvent = Math.random() > 0.85; // 15% chance of spike
        
        let newValue;
        if (isSpikeEvent) {
            // GENERATE SPIKE: Sudden jump to 400-500 range
            newValue = currentWard.baseline + 150 + Math.random() * 100;
        } else {
            // Normal fluctuation around baseline
            newValue = currentWard.baseline + (Math.random() * 40 - 20);
        }

        // 2. ASIE LOGIC: Detect Deviation 
        // If value > 1.4x baseline, treat as abnormality
        const threshold = currentWard.baseline * 1.4;
        const isSpike = newValue > threshold;

        // 3. Rolling History for Graphs
        const newHistory = [...prev.history, { 
            time: new Date().toLocaleTimeString([], {hour12: false, hour: "2-digit", minute:"2-digit", second:"2-digit"}), 
            value: Math.floor(newValue),
            baseline: currentWard.baseline
        }].slice(-30); // Keep last 30 seconds

        return {
          pm25: Math.floor(newValue),
          spikeDetected: isSpike,
          spikeConfidence: isSpike ? Math.floor(80 + Math.random() * 15) : 0,
          // Cause Analysis[cite: 75]: If spike, show dominant source
          cause: isSpike ? currentWard.dominantSource : "Normal",
          history: newHistory
        };
      });
    }, 2000); // 2 second update rate (PDF requires <30s latency) [cite: 126]

    return () => clearInterval(interval);
  }, [currentWard]);

  return { currentWard, setCurrentWard, realTimeData, allWards: WARDS };
};