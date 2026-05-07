"use client";

import { motion } from "framer-motion";
import LiveAiMonitor from "@/components/ai/LiveAiMonitor";
import AiAlertCenter from "@/components/ai/AiAlertCenter";
import InsightCard from "@/components/ai/InsightCard";
import ConstituencyAnalyzer from "@/components/ai/ConstituencyAnalyzer";
import { Zap, Activity, BrainCircuit, Globe } from "lucide-react";
import Link from "next/link";

export default function AgenticDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0E27] p-4 md:p-8 pt-32 mt-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-indigo-400" />
              Agentic Intelligence
            </h1>
            <p className="text-white/50 mt-1">Autonomous monitoring and AI analysis</p>
          </div>
          <Link href="/heatmap" className="btn-primary text-sm px-6 py-2 shadow-glow">
            <Globe className="w-4 h-4" /> Live Heatmap
          </Link>
        </div>

        {/* Top Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <LiveAiMonitor />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                Latest AI Insights
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard 
                title="Youth Voter Turnout Surge" 
                summary="AI analysis indicates a 14% higher registration rate among first-time voters compared to historical data."
                metric="14%"
                trend="up"
              />
              <InsightCard 
                title="Misinformation Containment" 
                summary="Debunked claims regarding polling schedules successfully restricted within 2 hours of detection."
                metric="98%"
                trend="up"
              />
              <InsightCard 
                title="Sentiment Shift: Economy" 
                summary="Economic policies remain the highest driving factor for undecided voters across 4 key swing states."
                metric="Volatile"
                trend="neutral"
              />
              <InsightCard 
                title="Polling Booth Efficiency" 
                summary="Predicted wait times reduced by 12% due to optimized allocation algorithms in urban areas."
                metric="-12% Wait"
                trend="down"
              />
            </div>

            {/* AI Constituency Component Stub */}
            <ConstituencyAnalyzer />
          </div>

          {/* Right Sidebar - Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 h-[600px]"
          >
            <AiAlertCenter />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
