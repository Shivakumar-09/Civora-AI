"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Database, Sparkles, ArrowRight } from "lucide-react";
import FileUpload from "@/components/ai/prediction/FileUpload";
import PredictionDashboard from "@/components/ai/prediction/Dashboard";

export default function PredictionLabPage() {
  const [data, setData] = useState<any[] | null>(null);
  const [metadata, setMetadata] = useState<any | null>(null);

  const handleDataParsed = (parsedData: any[], fileMeta: any) => {
    setData(parsedData);
    setMetadata(fileMeta);
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] p-4 md:p-8 pt-32 mt-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-indigo-400" />
              AI Prediction Lab
            </h1>
            <p className="text-white/50 mt-1 max-w-2xl">
              Upload historical election datasets. Our autonomous intelligence engine will analyze trends, calculate correlations, and forecast future participation.
            </p>
          </div>
          
          {data && (
            <button 
              onClick={() => { setData(null); setMetadata(null); }}
              className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
            >
              <Database className="w-4 h-4" /> New Dataset
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!data ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-3xl mx-auto mt-12"
            >
              <div className="glass-card p-8 border-indigo-500/20 shadow-premium relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4 shadow-glow">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Initialize Analytics Engine</h2>
                  <p className="text-white/50 text-sm">Secure, offline-first parsing. No raw data leaves your browser.</p>
                </div>

                <FileUpload onDataParsed={handleDataParsed} />
                
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
                    <Database className="w-4 h-4 text-indigo-400" /> Auto-column detection
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
                     <TrendingUp className="w-4 h-4 text-rose-400" /> Linear Regression Models
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                 <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                   <Database className="w-5 h-5 text-indigo-400" />
                 </div>
                 <div>
                   <h3 className="text-white font-bold">{metadata?.fileName}</h3>
                   <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                     {metadata?.rowCount} Rows • {metadata?.columns.length} Columns • {(metadata?.size / 1024).toFixed(2)} KB
                   </p>
                 </div>
              </div>

              <PredictionDashboard data={data} metadata={metadata} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
