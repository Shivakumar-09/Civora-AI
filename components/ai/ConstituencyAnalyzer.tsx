"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, MapPin, Users, Activity, TrendingUp } from "lucide-react";

export default function ConstituencyAnalyzer() {
  const [constituency, setConstituency] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    if (!constituency.trim()) return;
    setAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setResult({
        name: constituency,
        turnoutPred: "68.5%",
        sentiment: "Positive / Reform-focused",
        keyIssues: ["Infrastructure", "Youth Employment", "Digital Access"],
        summary: `AI Analysis indicates a high likelihood of increased youth participation in ${constituency}. Sentiment is shifting towards infrastructure development, with 40% of digital discourse centered on local employment opportunities.`
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="glass-card p-6 border-white/5 relative overflow-hidden mt-6">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-indigo-400" />
        AI Constituency Analysis
      </h3>
      <p className="text-white/60 text-sm mb-6">
        Generate an autonomous AI report detailing candidate standing, sentiment analysis, and predicted turnout.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input 
          type="text" 
          value={constituency}
          onChange={(e) => setConstituency(e.target.value)}
          placeholder="Enter constituency name (e.g., Varanasi)"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
        />
        <button 
          onClick={handleAnalyze}
          disabled={analyzing || !constituency}
          className="btn-primary px-6 py-3 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap justify-center"
        >
          {analyzing ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
          ) : (
            <><Bot className="w-4 h-4" /> Analyze</>
          )}
        </button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 rounded-xl p-5 border border-white/5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-indigo-400" />
            <h4 className="text-white font-bold">AI Analyst Report: {result.name}</h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> Predicted Turnout</p>
              <p className="text-lg font-bold text-white">{result.turnoutPred}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1"><Activity className="w-3 h-3"/> Core Sentiment</p>
              <p className="text-sm font-bold text-white truncate">{result.sentiment}</p>
            </div>
            <div className="col-span-2 bg-white/5 rounded-lg p-3">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Trending Issues</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {result.keyIssues.map((issue: string, i: number) => (
                  <span key={i} className="text-[10px] bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    {issue}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
            <p className="text-indigo-100 text-sm leading-relaxed">{result.summary}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
