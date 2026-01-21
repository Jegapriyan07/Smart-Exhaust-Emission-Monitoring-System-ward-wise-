import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    TrendingUp,
    Clock,
    CloudRain,
    ThermometerSun,
    Car,
    AlertTriangle,
    Zap,
    Activity,
    ChevronRight
} from 'lucide-react';

// Simulated prediction data
const generatePredictions = () => {
    const now = new Date();
    const predictions = [];

    for (let i = 1; i <= 6; i++) {
        const futureTime = new Date(now.getTime() + i * 30 * 60000); // 30 min intervals
        const isSpike = Math.random() > 0.6;
        predictions.push({
            time: futureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            predicted: isSpike ? Math.floor(280 + Math.random() * 170) : Math.floor(150 + Math.random() * 80),
            isSpike,
            confidence: Math.floor(78 + Math.random() * 18)
        });
    }

    return predictions;
};

// Correlation factors
const CORRELATIONS = [
    { factor: 'Traffic Load', icon: Car, value: 87, trend: 'up', color: '#ef4444' },
    { factor: 'Weather (Humidity)', icon: CloudRain, value: 62, trend: 'stable', color: '#06b6d4' },
    { factor: 'Temperature', icon: ThermometerSun, value: 45, trend: 'down', color: '#f97316' },
    { factor: 'Time of Day', icon: Clock, value: 73, trend: 'up', color: '#a855f7' },
];

const CorrelationBar = ({ factor, icon: Icon, value, trend, color, delay }) => (
    <motion.div
        className="mb-3 last:mb-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
    >
        <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
                <motion.div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}20` }}
                    animate={{
                        boxShadow: [
                            `0 0 5px ${color}30`,
                            `0 0 10px ${color}50`,
                            `0 0 5px ${color}30`
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Icon size={12} style={{ color }} />
                </motion.div>
                <span className="text-xs text-gray-300">{factor}</span>
            </div>
            <div className="flex items-center gap-1">
                <motion.span
                    className="text-xs font-bold"
                    style={{ color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.2, type: 'spring' }}
                >
                    {value}%
                </motion.span>
                <TrendingUp
                    size={10}
                    className={trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-green-400 rotate-180' : 'text-gray-400'}
                />
            </div>
        </div>
        <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ delay: delay + 0.1, duration: 0.8 }}
            />
        </div>
    </motion.div>
);

const PredictionTimeline = ({ predictions }) => (
    <div className="space-y-2">
        {predictions.slice(0, 4).map((pred, index) => (
            <motion.div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg border ${pred.isSpike
                        ? 'bg-red-900/20 border-red-500/30'
                        : 'bg-green-900/10 border-green-500/20'
                    }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        className={`w-2 h-2 rounded-full ${pred.isSpike ? 'bg-red-500' : 'bg-green-500'}`}
                        animate={pred.isSpike ? {
                            scale: [1, 1.3, 1],
                            boxShadow: ['0 0 5px rgba(239,68,68,0.5)', '0 0 15px rgba(239,68,68,0.8)', '0 0 5px rgba(239,68,68,0.5)']
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs text-gray-300">{pred.time}</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${pred.isSpike ? 'text-red-400' : 'text-green-400'}`}>
                        {pred.predicted} AQI
                    </span>
                    <span className="text-[10px] text-gray-500">
                        {pred.confidence}% conf.
                    </span>
                </div>
            </motion.div>
        ))}
    </div>
);

const PredictiveAnalytics = ({ ward, realTimeData }) => {
    const [predictions, setPredictions] = useState(generatePredictions());
    const [nextSpike, setNextSpike] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPredictions(generatePredictions());
        }, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const spike = predictions.find(p => p.isSpike);
        setNextSpike(spike);
    }, [predictions]);

    return (
        <motion.div
            className="dashboard-card p-5 h-full relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Animated background */}
            <motion.div
                className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-neonPurple/10 to-transparent rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Header */}
            <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center"
                        animate={{
                            boxShadow: [
                                '0 0 10px rgba(168, 85, 247, 0.3)',
                                '0 0 20px rgba(168, 85, 247, 0.5)',
                                '0 0 10px rgba(168, 85, 247, 0.3)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Brain size={16} className="text-neonPurple" />
                    </motion.div>
                    <div>
                        <h3 className="text-xs text-gray-400 uppercase tracking-wider">Predictive Analytics</h3>
                        <span className="text-white font-bold text-sm">AI-Powered Forecasting</span>
                    </div>
                </div>

                <motion.div
                    className="px-2 py-1 rounded-lg bg-purple-900/30 border border-purple-500/30"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-[10px] text-purple-300 font-semibold">SDG 9</span>
                </motion.div>
            </motion.div>

            {/* Alert Banner - Next Predicted Spike */}
            {nextSpike && (
                <motion.div
                    className="mb-4 p-3 rounded-xl bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/40 relative overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    <div className="relative flex items-start gap-3">
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <AlertTriangle size={20} className="text-red-400" />
                        </motion.div>
                        <div className="flex-1">
                            <h4 className="text-xs font-bold text-red-300 mb-1">
                                ⚠️ Emission Spike Predicted
                            </h4>
                            <p className="text-[11px] text-gray-300">
                                Expected at <span className="text-white font-bold">{nextSpike.time}</span> with
                                <span className="text-red-400 font-bold"> {nextSpike.predicted} AQI</span>
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <Zap size={10} className="text-yellow-400" />
                                <span className="text-[10px] text-yellow-400 font-semibold">
                                    {nextSpike.confidence}% Prediction Confidence
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-4">
                {/* Left - Correlation Factors */}
                <div>
                    <motion.h4
                        className="text-xs text-gray-400 mb-3 flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Activity size={10} />
                        Correlation Factors
                    </motion.h4>
                    {CORRELATIONS.map((corr, index) => (
                        <CorrelationBar
                            key={corr.factor}
                            {...corr}
                            delay={0.5 + index * 0.1}
                        />
                    ))}
                </div>

                {/* Right - Prediction Timeline */}
                <div>
                    <motion.h4
                        className="text-xs text-gray-400 mb-3 flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Clock size={10} />
                        Next 2 Hours Forecast
                    </motion.h4>
                    <PredictionTimeline predictions={predictions} />
                </div>
            </div>

            {/* Bottom insight */}
            <motion.div
                className="mt-4 p-2 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        >
                            <Brain size={12} className="text-blue-400" />
                        </motion.div>
                        <span className="text-[10px] text-gray-300">
                            ML Model: <span className="text-blue-400 font-semibold">Random Forest + LSTM Hybrid</span>
                        </span>
                    </div>
                    <ChevronRight size={12} className="text-gray-500" />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PredictiveAnalytics;
