"use client";

import { motion } from "framer-motion";
import { Zap, Activity, ShieldAlert, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function LiveAiMonitor() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-indigo-500">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={`absolute inset-0 bg-indigo-500 rounded-full blur-md transition-opacity duration-1000 ${pulse ? "opacity-100" : "opacity-40"}`} />
          <div className="relative w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center border border-indigo-400">
            <Zap className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            AI Monitor Active
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
          </h2>
          <p className="text-white/60 text-sm">Autonomous Intelligence System scanning live data...</p>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">99.8%</p>
          <p className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-1 justify-center"><Activity className="w-3 h-3 text-green-400"/> System Health</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">12K+</p>
          <p className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-1 justify-center"><TrendingUp className="w-3 h-3 text-indigo-400"/> Events Scanned</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-1 justify-center"><ShieldAlert className="w-3 h-3 text-rose-400"/> Anomalies Detected</p>
        </div>
      </div>
    </div>
  );
}
