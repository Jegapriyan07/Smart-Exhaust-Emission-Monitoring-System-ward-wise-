import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Locate } from 'lucide-react';
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

const MapWidget = () => (
  <motion.div
    className="dashboard-card h-full w-full overflow-hidden relative"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    {/* Animated corner accents */}
    <motion.div
      className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-neonBlue/20 to-transparent rounded-br-full z-[999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    />
    <motion.div
      className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-neonPurple/20 to-transparent rounded-tl-full z-[999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
    />

    {/* Location Badge with animation */}
    <motion.div
      className="absolute top-4 right-4 z-[1000] flex gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        className="flex items-center gap-2 bg-bgCore/90 backdrop-blur-md px-4 py-2 rounded-xl border border-neonBlue/30 shadow-glow-blue"
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <MapPin size={14} className="text-neonBlue" />
        </motion.div>
        <span className="text-xs text-white font-semibold">Industrial Site A</span>
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
      </motion.div>
    </motion.div>

    {/* Control buttons */}
    <motion.div
      className="absolute top-4 left-4 z-[1000] flex flex-col gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.1 }}
    >
      <motion.button
        className="w-10 h-10 bg-bgCore/90 backdrop-blur-md rounded-xl border border-neonBlue/30 flex items-center justify-center text-neonBlue hover:bg-neonBlue/20 transition-colors"
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        <Navigation size={16} />
      </motion.button>
      <motion.button
        className="w-10 h-10 bg-bgCore/90 backdrop-blur-md rounded-xl border border-neonPurple/30 flex items-center justify-center text-neonPurple hover:bg-neonPurple/20 transition-colors"
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Locate size={16} />
      </motion.button>
    </motion.div>

    {/* Map Container */}
    <motion.div
      className="h-full w-full rounded-2xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[19.0760, 72.8777]}>
          <Popup>
            <div className="text-center font-semibold">
              <div className="text-neonBlue">Smart Exhaust System</div>
              <div className="text-xs text-gray-600 mt-1">Unit: MH-01</div>
            </div>
          </Popup>
        </Marker>
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
  </motion.div>
);

export default MapWidget;