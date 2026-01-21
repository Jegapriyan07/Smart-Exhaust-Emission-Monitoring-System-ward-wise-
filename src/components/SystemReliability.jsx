import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Wifi, Clock, Cloud, CheckCircle, AlertCircle, Activity, Database, Cpu, HardDrive } from 'lucide-react';

const METRICS = [
    { id: 'uptime', label: 'System Uptime', value: 99.7, unit: '%', icon: Server, color: '#10b981', status: 'excellent' },
    { id: 'sensors', label: 'Sensor Health', value: 94, unit: '%', icon: Wifi, color: '#06b6d4', status: 'good' },
    { id: 'latency', label: 'Data Latency', value: 1.2, unit: 's', icon: Clock, color: '#a855f7', status: 'excellent' },
    { id: 'cloud', label: 'Cloud Sync', value: 100, unit: '%', icon: Cloud, color: '#3b82f6', status: 'excellent' }
];

const SERVICES = [
    { name: 'Firebase RT Database', status: 'online', ping: '12ms' },
    { name: 'Vercel Edge Functions', status: 'online', ping: '8ms' },
    { name: 'AWS IoT Core', status: 'online', ping: '15ms' },
    { name: 'ML Inference API', status: 'online', ping: '45ms' }
];

const MetricCard = ({ metric, index }) => {
    const Icon = metric.icon;
    const isExcellent = metric.status === 'excellent';

    return (
        <motion.div
            className="p-3 rounded-xl bg-gray-900/40 border border-gray-700/40 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, borderColor: `${metric.color}50` }}
        >
            {isExcellent && (
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity }} />
            )}

            <div className="relative flex items-center gap-3">
                <motion.div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${metric.color}20` }}
                    animate={{ boxShadow: [`0 0 10px ${metric.color}30`, `0 0 20px ${metric.color}50`, `0 0 10px ${metric.color}30`] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Icon size={18} style={{ color: metric.color }} />
                </motion.div>

                <div className="flex-1">
                    <span className="text-[10px] text-gray-400">{metric.label}</span>
                    <div className="flex items-baseline gap-1">
                        <motion.span
                            className="text-xl font-bold"
                            style={{ color: metric.color }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                        >
                            {metric.value}
                        </motion.span>
                        <span className="text-xs text-gray-500">{metric.unit}</span>
                    </div>
                </div>

                <motion.div
                    className={`w-2 h-2 rounded-full ${isExcellent ? 'bg-green-500' : 'bg-yellow-500'}`}
                    animate={{ scale: [1, 1.3, 1], boxShadow: isExcellent ? ['0 0 5px #10b98150', '0 0 15px #10b98180', '0 0 5px #10b98150'] : ['0 0 5px #facc1550', '0 0 15px #facc1580', '0 0 5px #facc1550'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        </motion.div>
    );
};

const ServiceStatus = ({ service, index }) => (
    <motion.div
        className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-900/30 border border-gray-800/30"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 + index * 0.08 }}
    >
        <div className="flex items-center gap-2">
            <motion.div
                className="w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
            <span className="text-xs text-gray-300">{service.name}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500">{service.ping}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">Online</span>
        </div>
    </motion.div>
);

const SystemReliability = () => {
    const [jitter, setJitter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setJitter(Math.random() * 0.3), 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div className="dashboard-card p-5 h-full relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-neonBlue/10 to-transparent rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity }} />

            {/* Header */}
            <motion.div className="flex items-center justify-between mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center gap-2">
                    <motion.div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center" animate={{ boxShadow: ['0 0 10px #3b82f630', '0 0 20px #3b82f650', '0 0 10px #3b82f630'] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Database size={16} className="text-blue-400" />
                    </motion.div>
                    <div>
                        <h3 className="text-xs text-gray-400 uppercase tracking-wider">System Reliability</h3>
                        <span className="text-white font-bold text-sm">Infrastructure Health</span>
                    </div>
                </div>
                <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-900/30 border border-green-500/30" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
                    <CheckCircle size={12} className="text-green-400" />
                    <span className="text-xs font-bold text-green-400">All Systems Go</span>
                </motion.div>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                {METRICS.map((metric, i) => <MetricCard key={metric.id} metric={metric} index={i} />)}
            </div>

            {/* Service Status */}
            <motion.div className="mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Activity size={10} /> Cloud Services</span>
                    <span className="text-[10px] text-green-400">4/4 Online</span>
                </div>
                <div className="space-y-1">
                    {SERVICES.map((s, i) => <ServiceStatus key={s.name} service={s} index={i} />)}
                </div>
            </motion.div>

            {/* Bottom Stats */}
            <motion.div className="pt-3 border-t border-gray-700/50 flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Cpu size={12} className="text-purple-400" />
                        <span className="text-[10px] text-gray-400">CPU: <span className="text-purple-400 font-bold">{(23 + jitter * 10).toFixed(1)}%</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                        <HardDrive size={12} className="text-cyan-400" />
                        <span className="text-[10px] text-gray-400">Mem: <span className="text-cyan-400 font-bold">{(45 + jitter * 5).toFixed(1)}%</span></span>
                    </div>
                </div>
                <div className="px-2 py-1 rounded bg-blue-900/30 border border-blue-500/20">
                    <span className="text-[10px] text-blue-300 font-semibold">SDG 9 Compliant</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SystemReliability;
