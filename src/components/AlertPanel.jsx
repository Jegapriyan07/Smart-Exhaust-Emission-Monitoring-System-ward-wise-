import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Siren, ShieldCheck, ArrowRight, Activity, Zap } from 'lucide-react';

const AlertPanel = ({ data, ward }) => {
  if (!data.spikeDetected) {
    // Normal State UI - Enhanced with animations
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="dashboard-card p-6 h-full flex flex-col items-center justify-center text-neonBlue/50 border-neonBlue/20 relative group"
      >
        {/* Pulsing circles background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neonBlue/10 to-transparent"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative z-10"
        >
          <ShieldCheck size={56} className="mb-3 text-neonBlue drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-gradient glow-text relative z-10"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ASIE Active
        </motion.h3>

        <motion.p
          className="text-sm mt-2 text-textMuted relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Monitoring ward deviations...
        </motion.p>

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neonBlue rounded-full"
            animate={{
              y: [-20, -60],
              x: [0, (i - 1) * 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
            style={{ left: `${30 + i * 20}%`, bottom: '20%' }}
          />
        ))}
      </motion.div>
    );
  }

  // SPIKE DETECTED STATE - Enhanced with dramatic animations
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className="relative overflow-hidden rounded-2xl shadow-glow-red"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-red-800/20 to-orange-900/30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Pulsing alert border */}
      <motion.div
        className="absolute inset-0 border-2 border-neonRed rounded-2xl"
        animate={{
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            '0 0 20px rgba(239, 68, 68, 0.3)',
            '0 0 40px rgba(239, 68, 68, 0.6)',
            '0 0 20px rgba(239, 68, 68, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 p-5">
        {/* Header with animated badge */}
        <div className="flex justify-between items-center mb-4 border-b border-red-500/30 pb-3">
          <div className="flex items-center gap-2">
            <motion.span
              className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 text-xs font-bold rounded-lg shadow-glow-red"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ⚠ ALERT
              </motion.span>
            </motion.span>
            <motion.span
              className="text-white font-bold tracking-wider text-sm"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ward: {ward.name}
            </motion.span>
          </div>

          <motion.div
            className="flex items-center gap-1"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 bg-neonRed rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                boxShadow: [
                  '0 0 5px rgba(239, 68, 68, 0.5)',
                  '0 0 15px rgba(239, 68, 68, 0.8)',
                  '0 0 5px rgba(239, 68, 68, 0.5)'
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-neonRed text-xs font-mono font-bold">LIVE</span>
          </motion.div>
        </div>

        {/* Main Stats with dramatic entrance */}
        <motion.div
          className="flex items-end gap-3 mb-5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <motion.div
            className="text-6xl font-black text-white stat-number"
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(239, 68, 68, 0.5)'
            }}
          >
            {data.pm25}
          </motion.div>
          <motion.div
            className="text-sm text-red-300 mb-2 font-semibold"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            µg/m³<br />
            <span className="text-red-400 font-bold">(SPIKE)</span>
          </motion.div>
        </motion.div>

        {/* Intelligence Section with stagger animation */}
        <motion.div
          className="space-y-3 mb-5 bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-red-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-3 text-sm"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <AlertTriangle size={18} className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
            </motion.div>
            <span className="text-gray-400">Probable Cause:</span>
            <motion.span
              className="text-white font-bold flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {data.cause}
            </motion.span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 text-sm"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Siren size={18} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
            </motion.div>
            <span className="text-gray-400">Authority:</span>
            <motion.span
              className="text-white font-bold flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {ward.authority}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Action Button with premium hover effect */}
        <motion.button
          className="w-full relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-between group shadow-glow-red"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)' }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <span className="relative z-10 flex items-center gap-2">
            <Zap size={18} className="group-hover:rotate-12 transition-transform" />
            DISPATCH SQUAD
          </span>

          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="relative z-10" size={20} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AlertPanel;