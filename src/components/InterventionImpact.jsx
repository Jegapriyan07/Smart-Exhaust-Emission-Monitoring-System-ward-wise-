import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, TrendingUp, Zap, CheckCircle, ArrowRight, Activity, Shield } from 'lucide-react';

const ImpactMetric = ({ label, before, after, unit, delay }) => {
    const reduction = ((before - after) / before * 100).toFixed(1);
    const isPositive = after < before;

    return (
        <motion.div
            className="p-4 rounded-xl bg-bgCore/50 border border-gray-800/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.5)' }}
        >
            {/* Background glow on positive */}
            {isPositive && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}

            <p className="text-xs text-gray-400 font-semibold mb-3 relative z-10">{label}</p>

            <div className="flex items-center justify-between relative z-10">
                {/* Before */}
                <div className="text-center">
                    <p className="text-[10px] text-gray-500 mb-1">BEFORE</p>
                    <motion.div
                        className="text-xl font-bold text-red-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.2 }}
                    >
                        {before}
                    </motion.div>
                    <p className="text-[10px] text-gray-500">{unit}</p>
                </div>

                {/* Arrow with animation */}
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.3, type: "spring" }}
                >
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ArrowRight size={20} className="text-neonCyan" />
                    </motion.div>
                    <motion.div
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${isPositive
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {isPositive ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
                        {reduction}%
                    </motion.div>
                </motion.div>

                {/* After */}
                <div className="text-center">
                    <p className="text-[10px] text-gray-500 mb-1">AFTER</p>
                    <motion.div
                        className="text-xl font-bold text-green-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.4 }}
                        style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}
                    >
                        {after}
                    </motion.div>
                    <p className="text-[10px] text-gray-500">{unit}</p>
                </div>
            </div>
        </motion.div>
    );
};

const InterventionImpact = () => {
    const [activeIntervention, setActiveIntervention] = useState(0);

    const interventions = [
        {
            name: 'Traffic Diversion',
            icon: '🚗',
            time: '14:32',
            metrics: [
                { label: 'PM2.5 Level', before: 526, after: 187, unit: 'µg/m³' },
                { label: 'Exposure Risk', before: 85, after: 32, unit: '%' },
                { label: 'Affected Pop.', before: 45000, after: 12000, unit: 'people' }
            ]
        },
        {
            name: 'Industrial Pause',
            icon: '🏭',
            time: '13:15',
            metrics: [
                { label: 'NOx Level', before: 89, after: 34, unit: 'ppb' },
                { label: 'Exposure Risk', before: 72, after: 28, unit: '%' },
                { label: 'Affected Pop.', before: 28000, after: 8500, unit: 'people' }
            ]
        },
        {
            name: 'Sprinkler Activation',
            icon: '💧',
            time: '12:45',
            metrics: [
                { label: 'Dust Level', before: 312, after: 98, unit: 'µg/m³' },
                { label: 'Visibility', before: 45, after: 85, unit: '%' },
                { label: 'Air Quality', before: 156, after: 67, unit: 'AQI' }
            ]
        }
    ];

    const current = interventions[activeIntervention];
    const totalReduction = current.metrics.reduce((acc, m) => {
        return acc + ((m.before - m.after) / m.before * 100);
    }, 0) / current.metrics.length;

    return (
        <motion.div
            className="dashboard-card p-5 h-full relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background accent */}
            <motion.div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent)' }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Header */}
            <motion.div
                className="flex items-center justify-between mb-4 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/40 to-cyan-500/20 flex items-center justify-center"
                        animate={{
                            boxShadow: ['0 0 10px rgba(16,185,129,0.3)', '0 0 20px rgba(16,185,129,0.5)', '0 0 10px rgba(16,185,129,0.3)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Activity size={20} className="text-green-400" />
                    </motion.div>
                    <div>
                        <h3 className="text-xs text-textMuted uppercase tracking-wider">Intervention Impact</h3>
                        <p className="text-white font-bold text-sm">Before vs After</p>
                    </div>
                </div>

                {/* SDG 3 Badge */}
                <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-900/30 border border-green-500/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                >
                    <Shield size={14} className="text-green-400" />
                    <span className="text-xs font-bold text-green-400">SDG 3</span>
                </motion.div>
            </motion.div>

            {/* Intervention Selector */}
            <motion.div
                className="flex gap-2 mb-4 overflow-x-auto pb-2 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {interventions.map((intervention, index) => (
                    <motion.button
                        key={intervention.name}
                        onClick={() => setActiveIntervention(index)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap text-xs font-semibold transition-all ${activeIntervention === index
                                ? 'bg-gradient-to-r from-green-600/40 to-cyan-600/30 border border-green-500 text-white'
                                : 'bg-bgCore/50 border border-gray-700 text-gray-400 hover:border-gray-500'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{intervention.icon}</span>
                        <span>{intervention.name}</span>
                        <span className="text-[10px] opacity-60">{intervention.time}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Metrics Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIntervention}
                    className="grid grid-cols-3 gap-3 relative z-10"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {current.metrics.map((metric, index) => (
                        <ImpactMetric
                            key={metric.label}
                            {...metric}
                            delay={0.1 * index}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Overall Impact Summary */}
            <motion.div
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-900/40 to-cyan-900/30 border border-green-500/30 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <CheckCircle size={24} className="text-green-400" />
                        </motion.div>
                        <div>
                            <p className="text-xs text-gray-400">Total Health Improvement</p>
                            <p className="text-sm font-bold text-white">
                                {current.name} reduced exposure by
                            </p>
                        </div>
                    </div>

                    <motion.div
                        className="text-3xl font-black text-green-400"
                        style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.6)' }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {totalReduction.toFixed(0)}%
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default InterventionImpact;
