import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, MapPin, AlertTriangle, TrendingUp, Shield } from 'lucide-react';

const ExposureBar = ({ zone, population, duration, maxDuration, status, delay }) => {
    const statusColors = {
        safe: { bar: '#10b981', bg: 'bg-green-900/30', border: 'border-green-500/30' },
        warning: { bar: '#f59e0b', bg: 'bg-yellow-900/30', border: 'border-yellow-500/30' },
        critical: { bar: '#ef4444', bg: 'bg-red-900/30', border: 'border-red-500/30' }
    };

    const config = statusColors[status];
    const percentage = (duration / maxDuration) * 100;

    return (
        <motion.div
            className={`p-3 rounded-xl ${config.bg} border ${config.border} mb-2 last:mb-0`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: 1.01, x: 5 }}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <MapPin size={14} style={{ color: config.bar }} />
                    <span className="text-sm font-semibold text-white">{zone}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Users size={12} />
                        {population.toLocaleString()}
                    </span>
                    <motion.span
                        className="text-sm font-bold"
                        style={{ color: config.bar }}
                        animate={status === 'critical' ? { opacity: [1, 0.5, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        {duration} min
                    </motion.span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ backgroundColor: config.bar }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: delay + 0.2, duration: 1.2, ease: "easeOut" }}
                >
                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>

            {/* WHO Threshold marker */}
            <div className="relative mt-1">
                <div
                    className="absolute h-3 w-0.5 bg-white/50 -top-4"
                    style={{ left: '50%' }}
                />
                <span className="absolute text-[9px] text-gray-500 -top-1" style={{ left: '45%' }}>
                    WHO limit
                </span>
            </div>
        </motion.div>
    );
};

const ExposureTracker = () => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(prev => prev + 1);
        }, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const zones = [
        { zone: 'Rohini Sector 9', population: 45000, duration: 127, maxDuration: 180, status: 'critical' },
        { zone: 'Dwarka Industrial', population: 12000, duration: 89, maxDuration: 180, status: 'warning' },
        { zone: 'Okhla Traffic Hub', population: 28000, duration: 156, maxDuration: 180, status: 'critical' },
        { zone: 'Saket Residential', population: 35000, duration: 34, maxDuration: 180, status: 'safe' }
    ];

    const totalExposed = zones.reduce((acc, z) => acc + (z.status !== 'safe' ? z.population : 0), 0);
    const avgDuration = Math.round(zones.reduce((acc, z) => acc + z.duration, 0) / zones.length);

    return (
        <motion.div
            className="dashboard-card p-5 h-full relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Animated background */}
            <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Header */}
            <motion.div
                className="flex items-center justify-between mb-4 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/40 to-red-500/20 flex items-center justify-center"
                        animate={{ boxShadow: ['0 0 10px rgba(249,115,22,0.3)', '0 0 20px rgba(249,115,22,0.5)', '0 0 10px rgba(249,115,22,0.3)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Clock size={20} className="text-orange-400" />
                    </motion.div>
                    <div>
                        <h3 className="text-xs text-textMuted uppercase tracking-wider">Exposure Duration</h3>
                        <p className="text-white font-bold text-sm">WHO Limit Tracker</p>
                    </div>
                </div>

                {/* Live indicator */}
                <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-900/30 border border-red-500/30"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-xs font-bold text-red-400">TRACKING</span>
                </motion.div>
            </motion.div>

            {/* Summary Stats */}
            <motion.div
                className="grid grid-cols-3 gap-3 mb-4 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {/* Total Exposed */}
                <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-center">
                    <motion.div
                        className="text-2xl font-black text-red-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                    >
                        {totalExposed.toLocaleString()}
                    </motion.div>
                    <p className="text-[10px] text-gray-400 mt-1">People Exposed</p>
                </div>

                {/* Avg Duration */}
                <div className="p-3 rounded-xl bg-orange-900/20 border border-orange-500/30 text-center">
                    <motion.div
                        className="text-2xl font-black text-orange-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                    >
                        {avgDuration}
                    </motion.div>
                    <p className="text-[10px] text-gray-400 mt-1">Avg. Minutes</p>
                </div>

                {/* Cumulative Score */}
                <div className="p-3 rounded-xl bg-purple-900/20 border border-purple-500/30 text-center">
                    <motion.div
                        className="text-2xl font-black text-purple-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        4.2x
                    </motion.div>
                    <p className="text-[10px] text-gray-400 mt-1">Above Safe</p>
                </div>
            </motion.div>

            {/* Zone Exposure Bars */}
            <div className="relative z-10 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                {zones.map((zone, index) => (
                    <ExposureBar
                        key={zone.zone}
                        {...zone}
                        delay={0.6 + index * 0.1}
                    />
                ))}
            </div>

            {/* Health Advisory */}
            <motion.div
                className="mt-4 p-3 rounded-xl bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/30 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <div className="flex items-start gap-2">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <AlertTriangle size={16} className="text-red-400 mt-0.5" />
                    </motion.div>
                    <div>
                        <p className="text-xs font-bold text-red-300">Health Advisory Active</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                            High risk for asthma patients, elderly, and children in marked zones
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ExposureTracker;
