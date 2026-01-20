import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-bgCore/95 backdrop-blur-md border border-neonBlue/30 rounded-xl p-3 shadow-glow-blue"
      >
        <p className="text-textMuted text-xs mb-2 font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}:
            </span>
            <span className="font-bold text-white">{entry.value}</span>
          </div>
        ))}
      </motion.div>
    );
  }
  return null;
};

const MainChart = ({ data }) => {
  return (
    <motion.div
      className="dashboard-card p-6 h-full w-full relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-neonBlue/10 via-neonPurple/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Activity size={20} className="text-neonBlue" />
          </motion.div>

          <div>
            <h3 className="text-textMuted text-xs uppercase tracking-wider">Environmental Metrics</h3>
            <motion.p
              className="text-white font-bold text-sm mt-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Temperature & Humidity
            </motion.p>
          </div>
        </div>

        {/* Legend */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { label: 'Temperature', color: '#ef4444' },
            { label: 'Humidity', color: '#10b981' },
            { label: 'Gas', color: '#06b6d4' }
          ].map((item, index) => (
            <motion.span
              key={item.label}
              className="flex items-center gap-1.5 text-xs text-textMuted group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full relative"
                style={{ backgroundColor: item.color }}
                animate={{
                  boxShadow: [
                    `0 0 5px ${item.color}40`,
                    `0 0 15px ${item.color}80`,
                    `0 0 5px ${item.color}40`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  style={{ backgroundColor: item.color }}
                />
              </motion.div>
              <span className="group-hover:text-white transition-colors font-medium">
                {item.label}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Chart */}
      <motion.div
        className="h-[calc(100%-80px)] w-full relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {/* Gradient definitions */}
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(6, 182, 212, 0.1)"
              vertical={false}
              strokeWidth={1}
            />

            <XAxis
              dataKey="time"
              stroke="#475569"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(6, 182, 212, 0.2)', strokeWidth: 1 }}
              tick={{ fill: '#94a3b8' }}
            />

            <YAxis
              stroke="#475569"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(6, 182, 212, 0.2)', strokeWidth: 1 }}
              domain={['auto', 'auto']}
              tick={{ fill: '#94a3b8' }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Area fills */}
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#colorTemp)"
              dot={false}
              activeDot={{
                r: 6,
                fill: '#ef4444',
                stroke: '#fff',
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))'
              }}
              name="Temperature"
            />

            <Area
              type="monotone"
              dataKey="humidity"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#colorHumidity)"
              dot={false}
              activeDot={{
                r: 6,
                fill: '#10b981',
                stroke: '#fff',
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))'
              }}
              name="Humidity"
            />

            <Area
              type="monotone"
              dataKey="gas"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#colorGas)"
              dot={false}
              strokeDasharray="5 5"
              activeDot={{
                r: 5,
                fill: '#06b6d4',
                stroke: '#fff',
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))'
              }}
              name="Gas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Decorative corner accent */}
      <motion.div
        className="absolute bottom-4 right-4 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <TrendingUp size={40} className="text-neonBlue" />
      </motion.div>
    </motion.div>
  );
};

export default MainChart;