import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Flame, CloudFog, Heart, AlertTriangle } from 'lucide-react';

const PollutantCard = ({ name, value, unit, icon: Icon, status, color, delay }) => {
    const statusConfig = {
        safe: { bg: 'from-green-900/30 to-green-800/20', border: 'border-green-500/50', badge: 'bg-green-500', text: 'Safe', glow: 'shadow-glow-green' },
        moderate: { bg: 'from-yellow-900/30 to-orange-800/20', border: 'border-yellow-500/50', badge: 'bg-yellow-500', text: 'Moderate', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]' },
        hazardous: { bg: 'from-red-900/30 to-red-800/20', border: 'border-red-500/50', badge: 'bg-red-500', text: 'Hazardous', glow: 'shadow-glow-red' }
    };

    const config = statusConfig[status];

    return (
        <motion.div
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${config.bg} border ${config.border} p-4 ${config.glow}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.02, y: -2 }}
        >
            {/* Animated background glow */}
            <motion.div
                className="absolute inset-0 opacity-20"
                style={{ background: `radial-gradient(circle at 50% 50%, ${color}40, transparent 70%)` }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Status Badge */}
            <motion.div
                className={`absolute top-2 right-2 ${config.badge} px-2 py-0.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1`}
                animate={{ scale: status === 'hazardous' ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                {status === 'hazardous' && <AlertTriangle size={10} />}
                {config.text}
            </motion.div>

            {/* Icon */}
            <motion.div
                className="mb-3"
                animate={{ rotate: status === 'hazardous' ? [0, 5, -5, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Icon size={24} style={{ color }} className="drop-shadow-lg" />
            </motion.div>

            {/* Pollutant Name */}
            <p className="text-xs text-gray-400 font-semibold mb-1">{name}</p>

            {/* Value */}
            <motion.div
                className="flex items-baseline gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.2 }}
            >
                <span className="text-2xl font-black text-white" style={{ textShadow: `0 0 10px ${color}60` }}>
                    {value}
                </span>
                <span className="text-xs text-gray-400">{unit}</span>
            </motion.div>

            {/* Progress bar showing level */}
            <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((value / 500) * 100, 100)}%` }}
                    transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
};

const AirQualityPanel = ({ data }) => {
    // Default icons mapping
    const defaultIcons = {
        'PM2.5': CloudFog,
        'PM10': Wind,
        'NOx': Flame,
        'CO': Droplets
    };

    // Process data with proper icons
    const pollutants = (data || [
        { name: 'PM2.5', value: 156, unit: 'µg/m³', status: 'hazardous', color: '#ef4444' },
        { name: 'PM10', value: 89, unit: 'µg/m³', status: 'moderate', color: '#f59e0b' },
        { name: 'NOx', value: 42, unit: 'ppb', status: 'safe', color: '#10b981' },
        { name: 'CO', value: 2.1, unit: 'ppm', status: 'safe', color: '#06b6d4' }
    ]).map(p => ({
        ...p,
        icon: p.icon || defaultIcons[p.name] || CloudFog
    }));

    // Calculate overall AQI
    const getOverallStatus = () => {
        if (pollutants.some(p => p.status === 'hazardous')) return { status: 'hazardous', color: '#ef4444', text: 'Unhealthy' };
        if (pollutants.some(p => p.status === 'moderate')) return { status: 'moderate', color: '#f59e0b', text: 'Moderate' };
        return { status: 'safe', color: '#10b981', text: 'Good' };
    };

    const overall = getOverallStatus();

    return (
        <motion.div
            className="dashboard-card p-5 h-full relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background accent */}
            <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                style={{ background: `${overall.color}20` }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Header */}
            <motion.div
                className="flex items-center justify-between mb-4 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${overall.color}40, ${overall.color}20)` }}
                        animate={{ boxShadow: [`0 0 10px ${overall.color}40`, `0 0 20px ${overall.color}60`, `0 0 10px ${overall.color}40`] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart size={20} style={{ color: overall.color }} />
                    </motion.div>
                    <div>
                        <h3 className="text-xs text-textMuted uppercase tracking-wider">Real-Time Health View</h3>
                        <p className="text-white font-bold text-sm">Air Quality Index</p>
                    </div>
                </div>

                {/* Overall Status Badge */}
                <motion.div
                    className="px-4 py-2 rounded-xl flex items-center gap-2"
                    style={{
                        background: `linear-gradient(135deg, ${overall.color}30, ${overall.color}10)`,
                        border: `1px solid ${overall.color}50`
                    }}
                    animate={{ scale: overall.status === 'hazardous' ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: overall.color }}
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-sm font-bold" style={{ color: overall.color }}>{overall.text}</span>
                </motion.div>
            </motion.div>

            {/* Pollutant Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
                {pollutants.map((pollutant, index) => (
                    <PollutantCard
                        key={pollutant.name}
                        {...pollutant}
                        delay={0.3 + index * 0.1}
                    />
                ))}
            </div>

            {/* WHO Standard Reference */}
            <motion.div
                className="mt-4 p-3 rounded-xl bg-blue-900/20 border border-blue-500/30 flex items-center justify-between relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-blue-400" />
                    <span className="text-xs text-blue-200">WHO Safe Limit: PM2.5 &lt; 25 µg/m³</span>
                </div>
                <span className="text-xs font-bold text-red-400">Currently 6.2x above safe limit</span>
            </motion.div>
        </motion.div>
    );
};

export default AirQualityPanel;
