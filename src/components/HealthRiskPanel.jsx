import React from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Users, Baby, PersonStanding, Stethoscope, Shield, Siren } from 'lucide-react';

const RiskGroup = ({ icon: Icon, name, risk, color, delay }) => (
    <motion.div
        className="flex items-center justify-between p-2 rounded-lg bg-bgCore/50 border border-gray-800/50"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        whileHover={{ scale: 1.02, borderColor: `${color}50` }}
    >
        <div className="flex items-center gap-2">
            <Icon size={14} style={{ color }} />
            <span className="text-xs text-gray-300">{name}</span>
        </div>
        <motion.span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
                backgroundColor: `${color}20`,
                color: color
            }}
            animate={risk === 'Critical' ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
        >
            {risk}
        </motion.span>
    </motion.div>
);

const HealthRiskPanel = ({ data, ward }) => {
    const isAlert = data?.spikeDetected || true; // Default to showing alert state for demo
    const pm25 = data?.pm25 || 526;

    const riskGroups = [
        { icon: Baby, name: 'Children (0-12)', risk: 'Critical', color: '#ef4444' },
        { icon: PersonStanding, name: 'Elderly (60+)', risk: 'Critical', color: '#ef4444' },
        { icon: Stethoscope, name: 'Asthma Patients', risk: 'Critical', color: '#ef4444' },
        { icon: Heart, name: 'Heart Conditions', risk: 'High', color: '#f59e0b' },
        { icon: Users, name: 'General Public', risk: 'Moderate', color: '#eab308' }
    ];

    const healthAdvisories = [
        'Avoid outdoor activities in affected zones',
        'Use N95 masks if travel is necessary',
        'Keep windows and doors closed',
        'Activate indoor air purifiers'
    ];

    return (
        <motion.div
            className="dashboard-card p-5 h-full relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Pulsing danger background */}
            {isAlert && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-orange-900/20"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}

            {/* Animated border on alert */}
            {isAlert && (
                <motion.div
                    className="absolute inset-0 border-2 border-red-500/50 rounded-2xl"
                    animate={{
                        boxShadow: ['0 0 10px rgba(239,68,68,0.2)', '0 0 30px rgba(239,68,68,0.4)', '0 0 10px rgba(239,68,68,0.2)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}

            {/* Header */}
            <motion.div
                className="flex items-center justify-between mb-4 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/40 to-orange-500/20 flex items-center justify-center"
                        animate={{
                            rotate: [0, 5, -5, 0],
                            boxShadow: ['0 0 10px rgba(239,68,68,0.3)', '0 0 20px rgba(239,68,68,0.5)', '0 0 10px rgba(239,68,68,0.3)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart size={20} className="text-red-400" />
                    </motion.div>
                    <div>
                        <h3 className="text-xs text-textMuted uppercase tracking-wider">Health Impact</h3>
                        <p className="text-white font-bold text-sm">Risk Assessment</p>
                    </div>
                </div>

                {/* Alert Badge */}
                <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-900/40 border border-red-500/50"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <Siren size={14} className="text-red-400" />
                    </motion.div>
                    <span className="text-xs font-bold text-red-400">HEALTH ALERT</span>
                </motion.div>
            </motion.div>

            {/* Current Level */}
            <motion.div
                className="p-4 rounded-xl bg-red-900/30 border border-red-500/40 mb-4 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Current PM2.5 Level</p>
                        <div className="flex items-baseline gap-2">
                            <motion.span
                                className="text-3xl font-black text-red-400"
                                style={{ textShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {pm25}
                            </motion.span>
                            <span className="text-sm text-gray-400">µg/m³</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">WHO Safe Limit</p>
                        <p className="text-lg font-bold text-green-400">25 µg/m³</p>
                        <motion.p
                            className="text-xs font-bold text-red-400"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            {(pm25 / 25).toFixed(1)}x above safe
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Risk Groups */}
            <motion.div
                className="space-y-2 mb-4 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <p className="text-xs text-gray-400 font-semibold mb-2">Vulnerable Population Risk</p>
                {riskGroups.map((group, index) => (
                    <RiskGroup
                        key={group.name}
                        {...group}
                        delay={0.4 + index * 0.1}
                    />
                ))}
            </motion.div>

            {/* Health Advisory */}
            <motion.div
                className="p-3 rounded-xl bg-orange-900/20 border border-orange-500/30 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Shield size={14} className="text-orange-400" />
                    <span className="text-xs font-bold text-orange-300">Health Advisory</span>
                </div>
                <ul className="space-y-1">
                    {healthAdvisories.map((advisory, index) => (
                        <motion.li
                            key={index}
                            className="text-[10px] text-gray-400 flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                        >
                            <span className="text-orange-400 mt-0.5">•</span>
                            {advisory}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default HealthRiskPanel;
