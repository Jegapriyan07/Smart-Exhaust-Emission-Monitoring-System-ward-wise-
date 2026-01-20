import React from 'react';

const CircularGauge = ({ value, label, subLabel, color = "#06b6d4" }) => (
  <div className="flex flex-col items-center justify-center p-4">
    <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-gray-800"
         style={{ borderTopColor: color, borderRightColor: color, transform: 'rotate(-45deg)' }}>
      <div className="absolute transform rotate-45 flex flex-col items-center">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-xs text-textMuted uppercase">{label}</span>
      </div>
    </div>
    <span className="mt-2 text-xs text-gray-500">{subLabel}</span>
  </div>
);

const KPICard = ({ title, value, date, colorClass }) => (
  <div className="dashboard-card p-4 flex flex-col justify-between h-full">
    <h3 className="text-sm text-textMuted mb-2">{title}</h3>
    <div className="flex flex-col">
      <span className="text-xs text-gray-400">Last value:</span>
      <span className={`text-4xl font-bold ${colorClass}`}>{value}</span>
      <span className="text-xs text-gray-500 mt-1">{date}</span>
    </div>
  </div>
);

export const OverviewGauges = ({ temp, humidity }) => (
  <div className="dashboard-card p-2 grid grid-cols-2 gap-4 h-full">
    <CircularGauge value={temp} label="Temp" subLabel="Radiator" color="#ef4444" />
    <CircularGauge value={`${humidity}%`} label="Humidity" subLabel="Rel. Hum" color="#e0f2fe" />
  </div>
);

export const RightStats = ({ nh3, temp }) => (
  <div className="grid grid-cols-2 gap-4 h-full">
    <KPICard title="Last NH3" value={nh3} date="27/06 2:31 PM" colorClass="text-neonGreen" />
    <KPICard title="Current Outside Temp" value={temp} date="27/06 2:31 PM" colorClass="text-neonGreen" />
  </div>
);