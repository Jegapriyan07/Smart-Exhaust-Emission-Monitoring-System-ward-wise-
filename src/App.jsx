import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import MainChart from './components/MainChart';
import WaterLevel from './components/WaterLevel';
import { Controls } from './components/Controls';

// CORE COMPONENTS
import AlertPanel from './components/AlertPanel';
import SourceAttribution from './components/SourceAttribution';

// SDG 3 COMPONENTS
import AirQualityPanel from './components/AirQualityPanel';
import ExposureTracker from './components/ExposureTracker';
import InterventionImpact from './components/InterventionImpact';
import HealthRiskPanel from './components/HealthRiskPanel';

// SDG 9 COMPONENTS
import SmartInfrastructureMap from './components/SmartInfrastructureMap';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import GovernanceActions from './components/GovernanceActions';
import SystemReliability from './components/SystemReliability';

import { useASIE } from './hooks/useASIE';

function App() {
  const { currentWard, setCurrentWard, realTimeData, allWards } = useASIE();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="min-h-screen p-4 pb-8 max-w-[1800px] mx-auto relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header />

      {/* Ward Selector Bar */}
      <motion.div
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {allWards.map((ward, index) => (
          <motion.button
            key={ward.id}
            onClick={() => setCurrentWard(ward)}
            className={`
              px-5 py-3 rounded-xl border-2 transition-all whitespace-nowrap font-semibold text-sm relative overflow-hidden
              ${currentWard.id === ward.id
                ? 'bg-gradient-to-r from-neonBlue/30 to-neonCyan/30 border-neonBlue text-white shadow-glow-blue'
                : 'bg-bgCard/50 backdrop-blur-sm border-gray-700/50 text-gray-400 hover:border-neonBlue/50 hover:text-white'
              }
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentWard.id === ward.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
            <span className="relative z-10">
              {ward.name} <span className="text-xs opacity-70">({ward.type})</span>
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Main Dashboard Grid */}
      <motion.div
        className="grid grid-cols-12 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.5 }
          }
        }}
      >
        {/* ==================== ROW 1: Air Quality Overview ==================== */}
        <motion.div className="col-span-12" variants={cardVariants}>
          <AirQualityPanel data={[
            { name: 'PM2.5', value: realTimeData.pm25 || 156, unit: 'µg/m³', icon: null, status: realTimeData.pm25 > 200 ? 'hazardous' : realTimeData.pm25 > 100 ? 'moderate' : 'safe', color: '#ef4444' },
            { name: 'PM10', value: 89, unit: 'µg/m³', icon: null, status: 'moderate', color: '#f59e0b' },
            { name: 'NOx', value: 42, unit: 'ppb', icon: null, status: 'safe', color: '#10b981' },
            { name: 'CO', value: 2.1, unit: 'ppm', icon: null, status: 'safe', color: '#06b6d4' }
          ]} />
        </motion.div>

        {/* ==================== ROW 2: Smart Infrastructure Map (SDG 9) ==================== */}
        <motion.div className="col-span-12 h-[400px]" variants={cardVariants}>
          <SmartInfrastructureMap />
        </motion.div>

        {/* ==================== ROW 3: AI Analytics Row ==================== */}
        <motion.div className="col-span-12 md:col-span-4" variants={cardVariants}>
          <SourceAttribution ward={currentWard} />
        </motion.div>

        <motion.div className="col-span-12 md:col-span-4" variants={cardVariants}>
          <PredictiveAnalytics ward={currentWard} realTimeData={realTimeData} />
        </motion.div>

        <motion.div className="col-span-12 md:col-span-4" variants={cardVariants}>
          <GovernanceActions ward={currentWard} realTimeData={realTimeData} />
        </motion.div>

        {/* ==================== ROW 4: Health & Alert Row ==================== */}
        <motion.div className="col-span-12 md:col-span-4" variants={cardVariants}>
          <AlertPanel data={realTimeData} ward={currentWard} />
        </motion.div>

        <motion.div className="col-span-12 md:col-span-4" variants={cardVariants}>
          <HealthRiskPanel data={realTimeData} ward={currentWard} />
        </motion.div>

        <motion.div className="col-span-12 md:col-span-4" variants={cardVariants}>
          <SystemReliability />
        </motion.div>

        {/* ==================== ROW 5: Exposure & Intervention ==================== */}
        <motion.div className="col-span-12 md:col-span-6" variants={cardVariants}>
          <ExposureTracker />
        </motion.div>

        <motion.div className="col-span-12 md:col-span-6" variants={cardVariants}>
          <InterventionImpact />
        </motion.div>

        {/* ==================== ROW 6: Chart + Water Level ==================== */}
        <motion.div className="col-span-12 md:col-span-9 h-[300px]" variants={cardVariants}>
          <MainChart data={realTimeData.history.map(d => ({
            time: d.time,
            temp: d.value,
            humidity: d.baseline,
            gas: d.value * 0.7
          }))} />
        </motion.div>

        <motion.div className="col-span-12 md:col-span-3 h-[300px]" variants={cardVariants}>
          <WaterLevel level={4} />
        </motion.div>

        {/* ==================== ROW 7: Controls ==================== */}
        <motion.div className="col-span-12" variants={cardVariants}>
          <Controls />
        </motion.div>
      </motion.div>

      {/* SDG Badge Footer */}
      <motion.div
        className="mt-8 flex items-center justify-center gap-6 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-900/20 border border-green-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl">🎯</span>
          <div>
            <p className="text-xs text-green-400 font-bold">SDG 3</p>
            <p className="text-[10px] text-gray-400">Good Health & Well-being</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900/20 border border-blue-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl">🏭</span>
          <div>
            <p className="text-xs text-blue-400 font-bold">SDG 9</p>
            <p className="text-[10px] text-gray-400">Industry, Innovation & Infrastructure</p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/20 border border-purple-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl">🌍</span>
          <div>
            <p className="text-xs text-purple-400 font-bold">SDG 11</p>
            <p className="text-[10px] text-gray-400">Sustainable Cities</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default App;