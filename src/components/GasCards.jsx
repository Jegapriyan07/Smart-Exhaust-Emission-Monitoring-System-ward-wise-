import React from 'react';
import { Zap, Wind, Droplets } from 'lucide-react';

const GasCard = ({ icon: Icon, label, value, unit, subLabel }) => (
  <div className="bg-black/30 rounded p-3 border border-gray-800 flex items-center gap-3">
    <div className="bg-gray-800 p-2 rounded">
        <Icon size={16} className="text-gray-400" />
    </div>
    <div>
        <div className="text-xs text-gray-500 uppercase">{label}</div>
        <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-white">{value}</span>
            <span className="text-xs text-gray-400">{unit}</span>
        </div>
        <div className="text-[10px] text-gray-600">{subLabel}</div>
    </div>
  </div>
);

const GasCards = ({ data }) => (
  <div className="dashboard-card p-4 h-full">
    <h3 className="text-textMuted text-sm mb-3">Gas Levels Trend (Last 24h)</h3>
    <div className="grid grid-cols-3 gap-2">
        <GasCard icon={Zap} label="NH3" value={data.nh3.val} unit="Raw" subLabel="volts" />
        <GasCard icon={Wind} label="NO2" value={data.no2.val} unit="Raw" subLabel="volts" />
        <GasCard icon={Droplets} label="PM2.5" value={data.pm25.val} unit="ug/m3" subLabel="PM4.5" />
    </div>
  </div>
);

export default GasCards;