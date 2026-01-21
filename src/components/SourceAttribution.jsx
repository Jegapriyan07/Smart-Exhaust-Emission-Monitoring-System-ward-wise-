import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Target, PieChart as PieChartIcon } from 'lucide-react';

// Animated Pie Chart Component
const AnimatedPieChart = ({ sources }) => {
  const total = sources.reduce((acc, s) => acc + s.percentage, 0);
  let currentAngle = 0;

  const getArcPath = (startAngle, endAngle, radius = 50) => {
    const start = polarToCartesian(60, 60, radius, endAngle);
    const end = polarToCartesian(60, 60, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L 60 60 Z`;
  };

  const polarToCartesian = (cx, cy, r, angle) => ({
    x: cx + r * Math.cos((angle - 90) * Math.PI / 180),
    y: cy + r * Math.sin((angle - 90) * Math.PI / 180)
  });

  return (
    <div className="relative w-[120px] h-[120px]">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Background circle */}
        <circle cx="60" cy="60" r="50" fill="rgba(15,23,42,0.5)" stroke="rgba(100,116,139,0.2)" strokeWidth="1" />

        {/* Pie segments */}
        {sources.map((source, index) => {
          const angle = (source.percentage / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          currentAngle = endAngle;

          return (
            <motion.path
              key={source.label}
              d={getArcPath(startAngle, endAngle, 45)}
              fill={source.color}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.85, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
              style={{ filter: `drop-shadow(0 0 8px ${source.color}60)` }}
            />
          );
        })}

        {/* Inner circle for donut effect */}
        <circle cx="60" cy="60" r="28" fill="rgba(2,4,10,0.9)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />

        {/* Center icon */}
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring' }}>
          <circle cx="60" cy="60" r="18" fill="rgba(168,85,247,0.15)" />
          <text x="60" y="65" textAnchor="middle" fill="#a855f7" fontSize="14" fontWeight="bold">AI</text>
        </motion.g>
      </svg>

      {/* Animated glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-neonPurple/30"
        animate={{ boxShadow: ['0 0 15px rgba(168,85,247,0.2)', '0 0 30px rgba(168,85,247,0.4)', '0 0 15px rgba(168,85,247,0.2)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

const SourceBar = ({ label, percentage, color, delay = 0 }) => (
  <motion.div className="mb-3 last:mb-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.5 }}>
    <div className="flex justify-between items-center text-xs text-gray-300 mb-1.5">
      <span className="font-semibold flex items-center gap-2">
        <motion.div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} animate={{ scale: [1, 1.3, 1], boxShadow: [`0 0 5px ${color}40`, `0 0 15px ${color}80`, `0 0 5px ${color}40`] }} transition={{ duration: 2, repeat: Infinity }} />
        {label}
      </span>
      <motion.span className="font-bold text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.3 }}>
        {percentage}%
      </motion.span>
    </div>
    <div className="relative w-full bg-gray-900/50 rounded-full h-2.5 overflow-hidden border border-gray-800">
      <motion.div className="h-full rounded-full relative" style={{ backgroundColor: color }} initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ delay: delay + 0.2, duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20" />
      </motion.div>
    </div>
  </motion.div>
);

const SourceAttribution = ({ ward }) => {
  const isTraffic = ward?.type === "Traffic Corridor";

  const sources = [
    { label: '🚗 Vehicular', percentage: isTraffic ? 78 : 30, color: '#ef4444' },
    { label: '🏗️ Construction', percentage: isTraffic ? 15 : 55, color: '#f59e0b' },
    { label: '🏭 Industrial/Biomass', percentage: isTraffic ? 7 : 15, color: '#06b6d4' }
  ];

  return (
    <motion.div className="dashboard-card p-5 h-full relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neonPurple/10 to-transparent rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />

      {/* Header */}
      <motion.div className="flex items-center justify-between mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center gap-2">
          <motion.div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center" animate={{ boxShadow: ['0 0 10px #a855f730', '0 0 20px #a855f750', '0 0 10px #a855f730'] }} transition={{ duration: 2, repeat: Infinity }}>
            <Target size={16} className="text-neonPurple" />
          </motion.div>
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wider">AI Source Attribution</h3>
            <span className="text-white font-bold text-sm">ASIE Engine</span>
          </div>
        </div>
        <motion.div className="px-2 py-1 rounded-lg bg-purple-900/30 border border-purple-500/30" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="text-[10px] text-purple-300 font-semibold">SDG 9</span>
        </motion.div>
      </motion.div>

      {/* Main Content - Pie Chart + Bars */}
      <div className="flex gap-4 items-center mb-4">
        <AnimatedPieChart sources={sources} />
        <div className="flex-1">
          {sources.map((source, index) => (
            <SourceBar key={source.label} label={source.label} percentage={source.percentage} color={source.color} delay={0.5 + index * 0.15} />
          ))}
        </div>
      </div>

      {/* Confidence Badge */}
      <motion.div className="relative overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div animate={{ boxShadow: ['0 0 10px #a855f740', '0 0 20px #a855f760', '0 0 10px #a855f740'] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-neonPurple rounded-full" />
              <span className="text-blue-200 text-xs font-semibold">ASIE Confidence</span>
            </div>
            <motion.div className="flex items-center gap-1" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }}>
              <TrendingUp size={14} className="text-neonGreen" />
              <span className="font-black text-lg text-gradient-green glow-text">94%</span>
            </motion.div>
          </div>
          <motion.div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            <motion.div className="h-full bg-gradient-to-r from-neonPurple via-neonBlue to-neonCyan" initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ delay: 1.4, duration: 1.2 }} style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SourceAttribution;