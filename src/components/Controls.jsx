import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Fan, Shield, Bell, Settings, Zap, CheckCircle } from 'lucide-react';

const Toggle = ({ label, active, color, icon: Icon, onToggle, delay = 0 }) => (
    <motion.div
        className="flex items-center justify-between p-4 rounded-xl bg-bgCore/30 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700 transition-all group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.02, borderColor: active ? color : 'rgba(156, 163, 175, 0.3)' }}
    >
        <div className="flex items-center gap-3">
            <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                    background: active
                        ? `linear-gradient(135deg, ${color}40, ${color}20)`
                        : 'rgba(31, 41, 55, 0.5)'
                }}
                animate={active ? {
                    boxShadow: [
                        `0 0 10px ${color}40`,
                        `0 0 20px ${color}60`,
                        `0 0 10px ${color}40`
                    ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {active && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                )}
                <Icon
                    size={20}
                    style={{ color: active ? color : '#6b7280' }}
                    className="relative z-10"
                />
            </motion.div>

            <div>
                <span className="text-sm font-semibold text-white block">{label}</span>
                <motion.span
                    className="text-xs"
                    style={{ color: active ? color : '#9ca3af' }}
                    animate={active ? { opacity: [0.7, 1, 0.7] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {active ? 'Active' : 'Standby'}
                </motion.span>
            </div>
        </div>

        <motion.button
            onClick={onToggle}
            className="w-16 h-8 rounded-full p-1 relative overflow-hidden"
            style={{
                background: active
                    ? `linear-gradient(135deg, ${color}, ${color}dd)`
                    : 'linear-gradient(135deg, #1e293b, #0f172a)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={active ? {
                boxShadow: [
                    `0 0 15px ${color}60`,
                    `0 0 25px ${color}80`,
                    `0 0 15px ${color}60`
                ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
        >
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: active ? ['-100%', '200%'] : 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Toggle knob */}
            <motion.div
                className="w-6 h-6 rounded-full shadow-lg relative z-10"
                style={{
                    background: 'linear-gradient(135deg, #ffffff, #e5e7eb)'
                }}
                animate={{
                    x: active ? 32 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={active ? {
                        boxShadow: [
                            `0 0 8px ${color}60`,
                            `0 0 15px ${color}80`,
                            `0 0 8px ${color}60`
                        ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </motion.button>
    </motion.div>
);

const Controls = () => {
    const [states, setStates] = useState({ fan: true, purifier: true, alarm: true });

    const controls = [
        {
            key: 'fan',
            label: 'Extractor Fan',
            icon: Fan,
            color: '#06b6d4',
            delay: 0
        },
        {
            key: 'purifier',
            label: 'Air Purifier',
            icon: Shield,
            color: '#10b981',
            delay: 0.1
        },
        {
            key: 'alarm',
            label: 'Alarm System',
            icon: Bell,
            color: '#f59e0b',
            delay: 0.2
        }
    ];

    return (
        <motion.div
            className="dashboard-card p-6 h-full relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            {/* Animated background accent */}
            <motion.div
                className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-neonCyan/10 to-transparent rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Header */}
            <motion.div
                className="flex justify-between items-center mb-6 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Settings size={20} className="text-neonCyan" />
                    </motion.div>

                    <div>
                        <h3 className="text-textMuted text-xs uppercase tracking-wider">System Controls</h3>
                        <motion.div
                            className="flex items-center gap-2 mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Power size={12} className="text-neonGreen" />
                            <span className="text-white font-bold text-sm">Auto Mode</span>
                        </motion.div>
                    </div>
                </div>

                {/* Status badge */}
                <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neonGreen/20 border border-neonGreen/30"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <CheckCircle size={14} className="text-neonGreen" />
                    </motion.div>
                    <span className="text-xs font-bold text-neonGreen">All Systems Operational</span>
                </motion.div>
            </motion.div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
                {controls.map((control) => (
                    <Toggle
                        key={control.key}
                        label={control.label}
                        active={states[control.key]}
                        color={control.color}
                        icon={control.icon}
                        delay={1 + control.delay}
                        onToggle={() => setStates(prev => ({ ...prev, [control.key]: !prev[control.key] }))}
                    />
                ))}
            </div>

            {/* Power consumption indicator */}
            <motion.div
                className="mt-5 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
            >
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/30">
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={{
                                rotate: [0, 15, -15, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap size={16} className="text-neonOrange" />
                        </motion.div>
                        <span className="text-xs text-gray-300 font-semibold">Power Consumption</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Animated bar chart */}
                        <div className="flex items-end gap-0.5 h-4">
                            {[60, 80, 90, 75].map((height, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-gradient-to-t from-neonOrange to-neonYellow rounded-full"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{
                                        delay: 1.5 + i * 0.1,
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        repeatDelay: 2
                                    }}
                                />
                            ))}
                        </div>

                        <motion.span
                            className="font-bold text-sm text-neonOrange"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            2.4 kW
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const FilterStatus = () => (
    <div className="dashboard-card p-4 h-full grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#10b981] shadow-glow-green flex items-center justify-center mb-2">
                <span className="text-black font-bold">OK</span>
            </div>
            <span className="text-xs text-textMuted">Sprinklers</span>
            <span className="text-xs text-white">On</span>
        </div>
        <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#ef4444] bg-opacity-20 border border-red-500 flex items-center justify-center mb-2">
                <span className="text-red-500 font-bold">OFF</span>
            </div>
            <span className="text-xs text-textMuted">Filter</span>
            <span className="text-xs text-white">Off</span>
        </div>
    </div>
);

export { Controls, FilterStatus };