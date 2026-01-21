import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Navigation, Leaf, Bell, CheckCircle, Clock, Radio, Zap, Building2 } from 'lucide-react';

const ACTION_TYPES = {
    SQUAD_DISPATCH: { icon: Users, label: 'Squad Dispatched', color: '#ef4444', description: 'Enforcement squad deployed' },
    TRAFFIC_DIVERT: { icon: Navigation, label: 'Traffic Diverted', color: '#f97316', description: 'Alternate route activated' },
    GREEN_CORRIDOR: { icon: Leaf, label: 'Green Corridor', color: '#10b981', description: 'Low-emission zone enforced' },
    ALERT_SENT: { icon: Bell, label: 'Alert Broadcast', color: '#a855f7', description: 'Warning sent to residents' },
    SCRUBBER_CHECK: { icon: Building2, label: 'Scrubber Inspection', color: '#06b6d4', description: 'Industrial compliance check' }
};

const generateActions = (ward) => [
    { id: 1, type: 'SQUAD_DISPATCH', timestamp: new Date(Date.now() - 5 * 60000), ward: ward?.name || 'Rohini Sector 9', status: 'active', authority: 'Traffic Police' },
    { id: 2, type: 'TRAFFIC_DIVERT', timestamp: new Date(Date.now() - 12 * 60000), ward: 'Ring Road Junction', status: 'completed', authority: 'ITMS Control' },
    { id: 3, type: 'GREEN_CORRIDOR', timestamp: new Date(Date.now() - 25 * 60000), ward: 'Dwarka Expressway', status: 'active', authority: 'Municipal Corp' },
    { id: 4, type: 'ALERT_SENT', timestamp: new Date(Date.now() - 35 * 60000), ward: 'Okhla Industrial', status: 'completed', authority: 'DPCC' }
];

const ActionFlow = () => (
    <motion.div className="mb-4 p-3 rounded-xl bg-gray-900/50 border border-gray-700/50" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between">
            {[{ icon: Radio, label: 'Sensor', color: '#06b6d4' }, { icon: Zap, label: 'AI Analysis', color: '#a855f7' }, { icon: Shield, label: 'Decision', color: '#f97316' }, { icon: Users, label: 'Action', color: '#10b981' }].map((step, i) => (
                <React.Fragment key={step.label}>
                    <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.1 }}>
                        <motion.div className="w-10 h-10 rounded-full flex items-center justify-center mb-1" style={{ background: `${step.color}20`, border: `2px solid ${step.color}50` }} animate={{ boxShadow: [`0 0 10px ${step.color}30`, `0 0 20px ${step.color}50`, `0 0 10px ${step.color}30`] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                            <step.icon size={16} style={{ color: step.color }} />
                        </motion.div>
                        <span className="text-[9px] text-gray-400">{step.label}</span>
                    </motion.div>
                    {i < 3 && <motion.div className="flex-1 h-0.5 mx-1 bg-gradient-to-r from-gray-700 to-gray-600" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 + i * 0.15 }} />}
                </React.Fragment>
            ))}
        </div>
    </motion.div>
);

const ActionCard = ({ action, index }) => {
    const meta = ACTION_TYPES[action.type];
    const Icon = meta.icon;
    const mins = Math.floor((Date.now() - action.timestamp) / 60000);

    return (
        <motion.div className={`p-3 rounded-xl border ${action.status === 'active' ? 'bg-green-900/20 border-green-500/30' : 'bg-gray-900/30 border-gray-700/30'}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.1 }} whileHover={{ scale: 1.02 }}>
            <div className="flex items-start gap-3">
                <motion.div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${meta.color}20` }} animate={action.status === 'active' ? { boxShadow: [`0 0 10px ${meta.color}40`, `0 0 20px ${meta.color}60`, `0 0 10px ${meta.color}40`] } : {}} transition={{ duration: 2, repeat: Infinity }}>
                    <Icon size={16} style={{ color: meta.color }} />
                </motion.div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{meta.label}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${action.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/20 text-gray-400'}`}>{action.status === 'active' ? 'Active' : 'Done'}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">{meta.description}</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-gray-500">📍 {action.ward}</span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={8} />{mins}m ago</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-700/50 flex items-center gap-1">
                        <Shield size={10} className="text-gray-500" />
                        <span className="text-[10px] text-gray-500">Authority: <span style={{ color: meta.color }}>{action.authority}</span></span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const GovernanceActions = ({ ward, realTimeData }) => {
    const [actions, setActions] = useState(() => generateActions(ward));
    const activeCount = actions.filter(a => a.status === 'active').length;

    useEffect(() => { setActions(generateActions(ward)); }, [ward]);

    return (
        <motion.div className="dashboard-card p-5 h-full relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-neonGreen/10 to-transparent rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 6, repeat: Infinity }} />

            <motion.div className="flex items-center justify-between mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center gap-2">
                    <motion.div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center" animate={{ boxShadow: ['0 0 10px #10b98130', '0 0 20px #10b98150', '0 0 10px #10b98130'] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Shield size={16} className="text-neonGreen" />
                    </motion.div>
                    <div>
                        <h3 className="text-xs text-gray-400 uppercase tracking-wider">Governance Actions</h3>
                        <span className="text-white font-bold text-sm">Automated Response</span>
                    </div>
                </div>
                <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-900/30 border border-green-500/30" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
                    <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    <span className="text-xs font-bold text-green-400">{activeCount} Active</span>
                </motion.div>
            </motion.div>

            <ActionFlow />

            <div className="space-y-2 max-h-[260px] overflow-y-auto">
                {actions.map((action, i) => <ActionCard key={action.id} action={action} index={i} />)}
            </div>

            <motion.div className="mt-4 pt-3 border-t border-gray-700/50 flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <div className="flex gap-4">
                    <div className="text-center"><span className="text-lg font-bold text-neonGreen">52</span><br /><span className="text-[10px] text-gray-500">Today</span></div>
                    <div className="text-center"><span className="text-lg font-bold text-neonCyan">94%</span><br /><span className="text-[10px] text-gray-500">Success</span></div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400"><CheckCircle size={10} className="text-green-400" /> Closed-loop Active</div>
            </motion.div>
        </motion.div>
    );
};

export default GovernanceActions;
