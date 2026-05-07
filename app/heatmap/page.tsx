"use client";

import { motion } from "framer-motion";
import ElectionHeatmap from "@/components/ai/ElectionHeatmap";
import { Globe, MapPin, Search } from "lucide-react";
import Link from "next/link";

export default function HeatmapPage() {
  return (
    <div className="min-h-screen bg-[#0A0E27] p-4 md:p-8 pt-32 mt-10 overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-white flex items-center gap-3">
            <Globe className="w-8 h-8 text-indigo-400" />
            Live Intelligence Heatmap
          </h1>
          <p className="text-white/50 mt-1">Geospatial AI analysis of voter sentiment, turnout, and anomalies.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search constituency..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <Link href="/agentic-dashboard" className="btn-secondary text-sm px-4 py-2">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 w-full max-w-7xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-glow relative min-h-[600px]"
      >
        <ElectionHeatmap />
      </motion.div>
    </div>
  );
}
