import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import MapWidget from './components/MapWidget';
import MainChart from './components/MainChart';
import WaterLevel from './components/WaterLevel';
import { Controls } from './components/Controls';

// NEW COMPONENTS
import AlertPanel from './components/AlertPanel';
import SourceAttribution from './components/SourceAttribution';
import { useASIE } from './hooks/useASIE';

function App() {
  // Use the new SmogIQ Engine instead of the old data hook
  const { currentWard, setCurrentWard, realTimeData, allWards } = useASIE();

  return (
    <motion.div
      className="min-h-screen p-4 pb-8 max-w-[1600px] mx-auto relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header />

      {/* Top Bar: Ward Selector with enhanced animations */}
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
            whileHover={{
              scale: 1.05,
              boxShadow: currentWard.id === ward.id
                ? '0 0 30px rgba(6, 182, 212, 0.4)'
                : '0 0 20px rgba(6, 182, 212, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect on active */}
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

      {/* Main Grid with stagger animation */}
      <motion.div
        className="grid grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.5
            }
          }
        }}
      >
        {/* ROW 1: Alert Panel */}
        <motion.div
          className="col-span-12 md:col-span-3"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <AlertPanel data={realTimeData} ward={currentWard} />
        </motion.div>

        {/* ROW 1: Map */}
        <motion.div
          className="col-span-12 md:col-span-6 h-[280px]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <MapWidget />
        </motion.div>

        {/* ROW 1: Source Attribution */}
        <motion.div
          className="col-span-12 md:col-span-3"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <SourceAttribution ward={currentWard} />
        </motion.div>

        {/* ROW 2: Main Chart */}
        <motion.div
          className="col-span-12 md:col-span-9 h-[300px]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <MainChart data={realTimeData.history.map(d => ({
            time: d.time,
            temp: d.value,
            humidity: d.baseline,
            gas: d.value * 0.7
          }))} />
        </motion.div>

        {/* ROW 2: Water Level */}
        <motion.div
          className="col-span-12 md:col-span-3 h-[300px]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <WaterLevel level={4} />
        </motion.div>

        {/* ROW 3: Controls */}
        <motion.div
          className="col-span-12 h-[200px]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <Controls />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default App;