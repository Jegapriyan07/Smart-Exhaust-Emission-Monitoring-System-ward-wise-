import React from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Target } from 'lucide-react';

const SourceBar = ({ label, percentage, color, delay = 0 }) => (
  <motion.div
    className="mb-4 last:mb-0"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
  >
    <div className="flex justify-between items-center text-xs text-gray-300 mb-2">
      <span className="font-semibold flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              `0 0 5px ${color}40`,
              `0 0 15px ${color}80`,
              `0 0 5px ${color}40`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {label}
      </span>
      <motion.span
        className="font-bold text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        {percentage}%
      </motion.span>
    </div>

    <div className="relative w-full bg-gray-900/50 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-800">
      {/* Background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay }}
      />

      {/* Progress bar */}
      <motion.div
        className="h-full rounded-full relative overflow-hidden"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{
          delay: delay + 0.2,
          duration: 1.5,
          ease: [0.6, 0.01, 0.05, 0.95]  // Custom easing for smooth effect
        }}
      >
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20" />

        {/* Animated glow */}
        <motion.div
          className="absolute inset-0"
          animate={{
            boxShadow: [
              `inset 0 0 10px ${color}80`,
              `inset 0 0 20px ${color}FF`,
              `inset 0 0 10px ${color}80`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  </motion.div>
);

const SourceAttribution = ({ ward }) => {
  const isTraffic = ward?.type === "Traffic Corridor";

  const sources = [
    { label: 'Vehicular Emissions', percentage: isTraffic ? 78 : 30, color: '#ef4444', icon: '🚗' },
    { label: 'Construction Dust', percentage: isTraffic ? 15 : 55, color: '#f59e0b', icon: '🏗️' },
    { label: 'Industrial/Biomass', percentage: isTraffic ? 7 : 15, color: '#06b6d4', icon: '🏭' }
  ];

  return (
    <motion.div
      className="dashboard-card p-6 h-full relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Animated background accent */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neonPurple/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <h3 className="text-textMuted text-xs uppercase tracking-wider mb-1">Source Attribution</h3>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Target size={14} className="text-neonPurple" />
            <span className="text-white font-bold text-sm">Intelligence</span>
          </motion.div>
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Activity size={20} className="text-neonPurple/50" />
        </motion.div>
      </motion.div>

      {/* Source Bars */}
      <div className="space-y-1 relative z-10">
        {sources.map((source, index) => (
          <SourceBar
            key={source.label}
            label={`${source.icon} ${source.label}`}
            percentage={source.percentage}
            color={source.color}
            delay={0.5 + index * 0.15}
          />
        ))}
      </div>

      {/* Confidence Badge */}
      <motion.div
        className="mt-5 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-neonPurple via-neonBlue to-neonCyan rounded-lg p-[1px]">
          <div className="bg-bgCore rounded-lg h-full w-full" />
        </div>

        <div className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(168, 85, 247, 0.4)',
                    '0 0 20px rgba(168, 85, 247, 0.6)',
                    '0 0 10px rgba(168, 85, 247, 0.4)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-neonPurple rounded-full"
              />
              <span className="text-blue-200 text-xs font-semibold">ASIE Confidence</span>
            </div>

            <motion.div
              className="flex items-center gap-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
            >
              <TrendingUp size={14} className="text-neonGreen" />
              <span className="font-black text-lg text-gradient-green glow-text">94%</span>
            </motion.div>
          </div>

          {/* Animated progress indicator */}
          <motion.div
            className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-neonPurple via-neonBlue to-neonCyan"
              initial={{ width: 0 }}
              animate={{ width: '94%' }}
              transition={{ delay: 1.6, duration: 1.5, ease: "easeOut" }}
              style={{
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)'
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SourceAttribution;