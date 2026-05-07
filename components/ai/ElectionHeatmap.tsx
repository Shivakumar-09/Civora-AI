"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet map to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const mockData = [
  { id: 1, name: "Hyderabad", lat: 17.3850, lng: 78.4867, intensity: 0.8, type: "turnout" },
  { id: 2, name: "Bangalore", lat: 12.9716, lng: 77.5946, intensity: 0.9, type: "sentiment" },
  { id: 3, name: "Mumbai", lat: 19.0760, lng: 72.8777, intensity: 0.6, type: "misinformation" },
  { id: 4, name: "Delhi", lat: 28.7041, lng: 77.1025, intensity: 0.7, type: "turnout" },
  { id: 5, name: "Chennai", lat: 13.0827, lng: 80.2707, intensity: 0.4, type: "sentiment" },
];

export default function ElectionHeatmap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-[#0A0E27]/50 animate-pulse flex items-center justify-center">
        <p className="text-white/50">Loading Geo-Intelligence Engine...</p>
      </div>
    );
  }

  const getColor = (type: string, intensity: number) => {
    if (type === "misinformation") return "#f43f5e"; // rose
    if (type === "sentiment") return "#3b82f6"; // blue
    return "#8b5cf6"; // violet
  };

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 relative">
      <MapContainer
        key={Date.now()}
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%", background: "#0A0E27" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {mockData.map((point) => (
          <CircleMarker
            key={point.id}
            center={[point.lat, point.lng]}
            radius={point.intensity * 30}
            pathOptions={{
              color: getColor(point.type, point.intensity),
              fillColor: getColor(point.type, point.intensity),
              fillOpacity: 0.4,
              weight: 2,
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2 text-slate-800">
                <h4 className="font-bold">{point.name}</h4>
                <p className="text-xs uppercase tracking-wider mt-1 opacity-70">
                  {point.type} Alert
                </p>
                <p className="text-sm mt-2">
                  Intensity: {(point.intensity * 100).toFixed(0)}%
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[400] glass-card p-3 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md">
        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500 opacity-80" />
            <span className="text-white/70 text-xs">High Turnout</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 opacity-80" />
            <span className="text-white/70 text-xs">Misinformation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 opacity-80" />
            <span className="text-white/70 text-xs">Sentiment Shift</span>
          </div>
        </div>
      </div>
    </div>
  );
}
