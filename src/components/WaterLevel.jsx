import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, TrendingUp, AlertCircle } from 'lucide-react';

const WaterLevel = ({ level = 4 }) => {
  const percentage = (level / 10) * 100;
  const isLow = level < 3;
  const isMedium = level >= 3 && level < 7;
  const isHigh = level >= 7;

  const getColor = () => {
    if (isLow) return { primary: '#ef4444', secondary: '#dc2626', glow: 'rgba(239, 68, 68, 0.6)' };
    if (isMedium) return { primary: '#f59e0b', secondary: '#d97706', glow: 'rgba(245, 158, 11, 0.6)' };
    return { primary: '#06b6d4', secondary: '#0891b2', glow: 'rgba(6, 182, 212, 0.6)' };
  };

  const colors = getColor();

  return (
    <motion.div
      className="dashboard-card p-6 h-full flex flex-col relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${colors.primary}40 0%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div>
          <h3 className="text-textMuted text-xs uppercase tracking-wider mb-1">System Status</h3>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Droplets size={16} style={{ color: colors.primary }} />
            <span className="text-white font-bold text-sm">Water Level</span>
          </motion.div>
        </div>

        {isLow && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle size={20} className="text-neonRed" />
          </motion.div>
        )}
      </motion.div>

      {/* Main Display - Circular Water Level */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="relative w-48 h-48">
          {/* Outer ring with gradient */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-[3px] bg-bgCore rounded-full" />
          </motion.div>

          {/* Inner circle */}
          <motion.div
            className="absolute inset-3 rounded-full overflow-hidden bg-gradient-to-b from-bgCard to-bgCore border border-gray-800/50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
          >
            {/* Water fill */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{
                background: `linear-gradient(180deg, ${colors.primary}40, ${colors.primary}80)`,
              }}
              initial={{ height: 0 }}
              animate={{ height: `${percentage}%` }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            >
              {/* Animated wave effect */}
              <div className="water-wave" style={{ background: `${colors.primary}30` }} />
              <div className="water-wave" style={{ background: `${colors.primary}60` }} />

              {/* Surface shimmer */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `${colors.primary}FF` }}
                animate={{
                  boxShadow: [
                    `0 0 10px ${colors.glow}`,
                    `0 0 20px ${colors.glow}`,
                    `0 0 10px ${colors.glow}`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <motion.div
                className="text-6xl font-black"
                style={{
                  color: colors.primary,
                  textShadow: `0 0 20px ${colors.glow}`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              >
                {level}
              </motion.div>
              <motion.div
                className="text-xs text-textMuted font-semibold uppercase tracking-wider mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                / 10 Units
              </motion.div>
            </div>

            {/* Floating bubbles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${4 + Math.random() * 6}px`,
                  height: `${4 + Math.random() * 6}px`,
                  background: `${colors.primary}40`,
                  border: `1px solid ${colors.primary}60`,
                  left: `${20 + Math.random() * 60}%`,
                  bottom: 0
                }}
                animate={{
                  y: [-200, -10],
                  x: [0, (Math.random() - 0.5) * 30],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>

          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: colors.primary,
                boxShadow: `0 0 10px ${colors.glow}`,
                top: '50%',
                left: '50%',
                transformOrigin: `${70 + i * 10}px 0px`,
                marginLeft: '-1px',
                marginTop: '-1px'
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Status indicator */}
      <motion.div
        className="mt-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <div
          className="flex items-center justify-between p-3 rounded-xl backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}10)`,
            border: `1px solid ${colors.primary}30`
          }}
        >
          <span className="text-xs text-gray-300 font-semibold">Status:</span>
          <motion.div
            className="flex items-center gap-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp size={14} style={{ color: colors.primary }} />
            <span
              className="font-bold text-sm"
              style={{ color: colors.primary }}
            >
              {isLow ? 'Low' : isMedium ? 'Moderate' : 'Optimal'}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WaterLevel;