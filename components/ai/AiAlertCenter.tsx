"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, Bell, ShieldX } from "lucide-react";
import { useEffect, useState } from "react";

type Alert = {
  id: string;
  message: string;
  type: "warning" | "info" | "critical";
  timestamp: string;
};

export default function AiAlertCenter() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      message: "High voter engagement detected in Hyderabad South constituency.",
      type: "info",
      timestamp: "Just now"
    },
    {
      id: "2",
      message: "Misinformation spike detected regarding polling dates in Karnataka.",
      type: "critical",
      timestamp: "2 mins ago"
    },
    {
      id: "3",
      message: "Youth voter sentiment increased by 14% overall.",
      type: "warning",
      timestamp: "10 mins ago"
    }
  ]);

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-400" />
          Live Intelligence Alerts
        </h3>
        <span className="bg-rose-500/20 text-rose-400 text-xs px-2 py-1 rounded-full border border-rose-500/30">
          Live
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border ${
                alert.type === "critical"
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-200"
                  : alert.type === "warning"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                  : "bg-indigo-500/10 border-indigo-500/30 text-indigo-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {alert.type === "critical" ? (
                  <ShieldX className="w-5 h-5 text-rose-400 mt-0.5" />
                ) : alert.type === "warning" ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-indigo-400 mt-0.5" />
                )}
                <div>
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-60 mt-1">{alert.timestamp}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
