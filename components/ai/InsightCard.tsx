"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface InsightCardProps {
  title: string;
  summary: string;
  metric?: string;
  trend?: "up" | "down" | "neutral";
}

export default function InsightCard({ title, summary, metric, trend }: InsightCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 border-white/5 relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors" />
      
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        {metric && (
          <span className={`text-sm font-bold px-2 py-1 rounded-md ${
            trend === "up" ? "bg-green-500/20 text-green-400" :
            trend === "down" ? "bg-rose-500/20 text-rose-400" :
            "bg-amber-500/20 text-amber-400"
          }`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {metric}
          </span>
        )}
      </div>

      <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
      <p className="text-white/60 text-sm leading-relaxed mb-4">{summary}</p>

      <div className="flex items-center text-indigo-400 text-xs font-bold uppercase tracking-wider group-hover:text-indigo-300 transition-colors">
        Read Full Analysis <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}
