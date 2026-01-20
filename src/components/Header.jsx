import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Database, Settings, Activity, Wind, Zap } from 'lucide-react';

const Header = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'logs', label: 'Data Logs', icon: Database },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <motion.div
      className="relative mb-6 px-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background gradient bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-neonBlue/5 via-neonPurple/5 to-neonPink/5 rounded-2xl blur-xl" />

      <div className="relative flex items-center justify-between p-4 dashboard-card">
        {/* Logo and Title */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Animated Logo */}
          <motion.div
            className="relative w-12 h-12 bg-gradient-to-br from-neonBlue to-neonCyan rounded-xl flex items-center justify-center shadow-glow-blue overflow-hidden group"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-neonPurple to-neonPink opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative z-10"
            >
              <Wind size={24} className="text-white drop-shadow-lg" />
            </motion.div>

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 border-2 border-white/50 rounded-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>

          {/* Title */}
          <div>
            <motion.h1
              className="text-2xl font-black tracking-tight text-gradient glow-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Smoke Emission Control
            </motion.h1>
            <motion.div
              className="flex items-center gap-2 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-neonGreen rounded-full shadow-glow-green"
              />
              <span className="text-xs text-textMuted font-semibold">System Active</span>
              <span className="text-xs text-neonCyan">•</span>
              <span className="text-xs text-textMuted">Real-time Monitoring</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex gap-2 bg-bgCore/50 p-1.5 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all
                  ${isActive
                    ? 'text-white'
                    : 'text-textMuted hover:text-white'
                  }
                `}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-neonBlue to-neonCyan rounded-lg shadow-glow-blue"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Content */}
                <motion.div
                  className="relative z-10"
                  animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={16} />
                </motion.div>
                <span className="relative z-10">{item.label}</span>

                {/* Hover shimmer */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          className="absolute -top-1 -right-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="bg-gradient-to-br from-neonGreen to-neonEmerald rounded-full p-2 shadow-glow-green"
            animate={{
              boxShadow: [
                '0 0 10px rgba(16, 185, 129, 0.4)',
                '0 0 20px rgba(16, 185, 129, 0.6)',
                '0 0 10px rgba(16, 185, 129, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap size={12} className="text-white" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;