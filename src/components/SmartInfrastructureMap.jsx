import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, useMap } from 'react-leaflet';
import { MapPin, Navigation, Locate, Radio, Truck, Factory, Home, AlertTriangle, Wifi, Activity } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix generic Leaflet marker icon issue in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons for different zone types
const createCustomIcon = (color, type) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `
      <div style="
        background: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 15px ${color}, 0 0 25px ${color}60;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse-marker 2s infinite;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

// Zone Data with coordinates (Delhi NCR area)
const ZONES = {
    trafficCorridors: [
        { id: 'TC1', name: 'Rohini Sector 9 Corridor', coords: [28.7041, 77.1025], intensity: 'high', aqi: 312 },
        { id: 'TC2', name: 'Ring Road Junction', coords: [28.6139, 77.2090], intensity: 'critical', aqi: 445 },
        { id: 'TC3', name: 'Dwarka Expressway', coords: [28.5921, 77.0460], intensity: 'moderate', aqi: 189 },
    ],
    industrialZones: [
        { id: 'IZ1', name: 'Okhla Industrial Area', coords: [28.5355, 77.2640], intensity: 'high', aqi: 367 },
        { id: 'IZ2', name: 'Narela Industrial Zone', coords: [28.8523, 77.0963], intensity: 'moderate', aqi: 234 },
    ],
    residentialWards: [
        { id: 'RW1', name: 'Dwarka Residential', coords: [28.5921, 77.0460], intensity: 'low', aqi: 145 },
        { id: 'RW2', name: 'Vasant Kunj', coords: [28.5196, 77.1538], intensity: 'moderate', aqi: 198 },
        { id: 'RW3', name: 'Rohini Sector 15', coords: [28.7375, 77.1159], intensity: 'low', aqi: 167 },
    ],
    sensorNodes: [
        { id: 'SN1', name: 'Node Alpha', coords: [28.6508, 77.2167], status: 'active', vehicles: 23 },
        { id: 'SN2', name: 'Node Beta', coords: [28.5672, 77.1845], status: 'active', vehicles: 45 },
        { id: 'SN3', name: 'Node Gamma', coords: [28.7256, 77.1567], status: 'warning', vehicles: 12 },
        { id: 'SN4', name: 'Node Delta', coords: [28.4987, 77.2734], status: 'active', vehicles: 34 },
        { id: 'SN5', name: 'Node Epsilon', coords: [28.8234, 77.0654], status: 'active', vehicles: 8 },
    ]
};

// Legend Component
const MapLegend = () => (
    <motion.div
        className="absolute bottom-4 left-4 z-[1000] bg-bgCore/95 backdrop-blur-md rounded-xl border border-gray-700/50 p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
    >
        <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1">
            <Activity size={12} className="text-neonCyan" />
            Emission Intensity
        </h4>
        <div className="space-y-1">
            {[
                { label: 'Critical (>400)', color: '#ef4444' },
                { label: 'High (300-400)', color: '#f97316' },
                { label: 'Moderate (200-300)', color: '#facc15' },
                { label: 'Low (<200)', color: '#10b981' }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{
                            backgroundColor: item.color,
                            boxShadow: `0 0 8px ${item.color}80`
                        }}
                    />
                    <span className="text-[10px] text-gray-300">{item.label}</span>
                </div>
            ))}
        </div>

        <div className="mt-3 pt-2 border-t border-gray-700">
            <h4 className="text-xs font-bold text-white mb-2">Zone Types</h4>
            <div className="space-y-1">
                {[
                    { label: 'Traffic Corridor', icon: '🚗' },
                    { label: 'Industrial Zone', icon: '🏭' },
                    { label: 'Residential Ward', icon: '🏠' },
                    { label: 'Sensor Node', icon: '📡' }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-xs">{item.icon}</span>
                        <span className="text-[10px] text-gray-300">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
);

// Stats overlay
const MapStats = ({ zones }) => {
    const totalSensors = zones.sensorNodes.length;
    const activeSensors = zones.sensorNodes.filter(n => n.status === 'active').length;
    const totalVehicles = zones.sensorNodes.reduce((acc, n) => acc + n.vehicles, 0);

    return (
        <motion.div
            className="absolute top-4 right-4 z-[1000] flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
        >
            {/* Active Monitoring Badge */}
            <motion.div
                className="flex items-center gap-2 bg-bgCore/90 backdrop-blur-md px-3 py-2 rounded-xl border border-neonGreen/30 shadow-glow-green"
                whileHover={{ scale: 1.05 }}
            >
                <motion.div
                    className="w-2 h-2 bg-neonGreen rounded-full"
                    animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                            '0 0 5px rgba(16, 185, 129, 0.5)',
                            '0 0 15px rgba(16, 185, 129, 0.8)',
                            '0 0 5px rgba(16, 185, 129, 0.5)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-white font-semibold">Live Monitoring</span>
            </motion.div>

            {/* Sensor Stats */}
            <motion.div
                className="bg-bgCore/90 backdrop-blur-md px-3 py-2 rounded-xl border border-neonBlue/30"
                whileHover={{ scale: 1.02 }}
            >
                <div className="flex items-center gap-2 mb-1">
                    <Radio size={12} className="text-neonCyan" />
                    <span className="text-[10px] text-gray-400">Sensors Online</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-neonCyan">{activeSensors}</span>
                    <span className="text-xs text-gray-500">/ {totalSensors}</span>
                </div>
            </motion.div>

            {/* Vehicle Cluster */}
            <motion.div
                className="bg-bgCore/90 backdrop-blur-md px-3 py-2 rounded-xl border border-neonOrange/30"
                whileHover={{ scale: 1.02 }}
            >
                <div className="flex items-center gap-2 mb-1">
                    <Truck size={12} className="text-neonOrange" />
                    <span className="text-[10px] text-gray-400">Vehicles Tracked</span>
                </div>
                <motion.span
                    className="text-lg font-bold text-neonOrange"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {totalVehicles}
                </motion.span>
            </motion.div>
        </motion.div>
    );
};

// Get color based on AQI intensity
const getIntensityColor = (intensity) => {
    switch (intensity) {
        case 'critical': return '#ef4444';
        case 'high': return '#f97316';
        case 'moderate': return '#facc15';
        case 'low': return '#10b981';
        default: return '#06b6d4';
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'active': return '#10b981';
        case 'warning': return '#facc15';
        case 'offline': return '#ef4444';
        default: return '#06b6d4';
    }
};

const SmartInfrastructureMap = () => {
    const [selectedZone, setSelectedZone] = useState(null);
    const [pulsePhase, setPulsePhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulsePhase(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="dashboard-card h-full w-full overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {/* Header Title */}
            <motion.div
                className="absolute top-4 left-4 z-[1000]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="bg-bgCore/95 backdrop-blur-md px-4 py-2 rounded-xl border border-neonBlue/30">
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <MapPin size={16} className="text-neonBlue" />
                        </motion.div>
                        <div>
                            <h3 className="text-xs font-bold text-white">Smart Infrastructure Map</h3>
                            <p className="text-[10px] text-gray-400">Delhi NCR Region • Real-time</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Map Stats Overlay */}
            <MapStats zones={ZONES} />

            {/* Legend */}
            <MapLegend />

            {/* Map Container */}
            <motion.div
                className="h-full w-full rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <MapContainer
                    center={[28.6139, 77.2090]}
                    zoom={11}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Traffic Corridors - High emission zones */}
                    {ZONES.trafficCorridors.map((zone) => (
                        <React.Fragment key={zone.id}>
                            <Circle
                                center={zone.coords}
                                radius={2000}
                                pathOptions={{
                                    color: getIntensityColor(zone.intensity),
                                    fillColor: getIntensityColor(zone.intensity),
                                    fillOpacity: 0.25,
                                    weight: 2,
                                    dashArray: '5, 10'
                                }}
                            />
                            <Marker
                                position={zone.coords}
                                icon={createCustomIcon(getIntensityColor(zone.intensity), 'traffic')}
                            >
                                <Popup>
                                    <div className="p-2 min-w-[180px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">🚗</span>
                                            <span className="font-bold text-gray-800">{zone.name}</span>
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Type:</span>
                                                <span className="font-medium">Traffic Corridor</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">AQI:</span>
                                                <span className="font-bold" style={{ color: getIntensityColor(zone.intensity) }}>
                                                    {zone.aqi}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Status:</span>
                                                <span className="capitalize font-medium" style={{ color: getIntensityColor(zone.intensity) }}>
                                                    {zone.intensity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        </React.Fragment>
                    ))}

                    {/* Industrial Zones */}
                    {ZONES.industrialZones.map((zone) => (
                        <React.Fragment key={zone.id}>
                            <Circle
                                center={zone.coords}
                                radius={2500}
                                pathOptions={{
                                    color: getIntensityColor(zone.intensity),
                                    fillColor: getIntensityColor(zone.intensity),
                                    fillOpacity: 0.2,
                                    weight: 3,
                                }}
                            />
                            <Marker
                                position={zone.coords}
                                icon={createCustomIcon(getIntensityColor(zone.intensity), 'industrial')}
                            >
                                <Popup>
                                    <div className="p-2 min-w-[180px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">🏭</span>
                                            <span className="font-bold text-gray-800">{zone.name}</span>
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Type:</span>
                                                <span className="font-medium">Industrial Zone</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">AQI:</span>
                                                <span className="font-bold" style={{ color: getIntensityColor(zone.intensity) }}>
                                                    {zone.aqi}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        </React.Fragment>
                    ))}

                    {/* Residential Wards */}
                    {ZONES.residentialWards.map((zone) => (
                        <React.Fragment key={zone.id}>
                            <Circle
                                center={zone.coords}
                                radius={1500}
                                pathOptions={{
                                    color: getIntensityColor(zone.intensity),
                                    fillColor: getIntensityColor(zone.intensity),
                                    fillOpacity: 0.15,
                                    weight: 1,
                                }}
                            />
                            <Marker
                                position={zone.coords}
                                icon={createCustomIcon(getIntensityColor(zone.intensity), 'residential')}
                            >
                                <Popup>
                                    <div className="p-2 min-w-[180px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">🏠</span>
                                            <span className="font-bold text-gray-800">{zone.name}</span>
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Type:</span>
                                                <span className="font-medium">Residential Ward</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">AQI:</span>
                                                <span className="font-bold" style={{ color: getIntensityColor(zone.intensity) }}>
                                                    {zone.aqi}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        </React.Fragment>
                    ))}

                    {/* Sensor Nodes */}
                    {ZONES.sensorNodes.map((node) => (
                        <Marker
                            key={node.id}
                            position={node.coords}
                            icon={L.divIcon({
                                className: 'custom-div-icon',
                                html: `
                  <div style="
                    background: linear-gradient(135deg, ${getStatusColor(node.status)}, ${getStatusColor(node.status)}aa);
                    width: 16px;
                    height: 16px;
                    border-radius: 4px;
                    border: 2px solid white;
                    box-shadow: 0 0 10px ${getStatusColor(node.status)};
                    transform: rotate(45deg);
                  "></div>
                `,
                                iconSize: [16, 16],
                                iconAnchor: [8, 8]
                            })}
                        >
                            <Popup>
                                <div className="p-2 min-w-[160px]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">📡</span>
                                        <span className="font-bold text-gray-800">{node.name}</span>
                                    </div>
                                    <div className="text-xs space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status:</span>
                                            <span className="capitalize font-bold" style={{ color: getStatusColor(node.status) }}>
                                                {node.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Vehicles:</span>
                                            <span className="font-medium">{node.vehicles} tracked</span>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </motion.div>

            {/* Scanning effect overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[998]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-neonBlue/0 via-neonBlue/20 to-neonBlue/0"
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* Corner accents */}
            <motion.div
                className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-neonBlue/20 to-transparent rounded-br-full z-[999] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-neonPurple/20 to-transparent rounded-tl-full z-[999] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            />

            {/* Add CSS for marker animation */}
            <style>{`
        @keyframes pulse-marker {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
        </motion.div>
    );
};

export default SmartInfrastructureMap;
