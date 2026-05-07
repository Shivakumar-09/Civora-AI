"use client";

import { motion } from "framer-motion";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Legend, PieChart, Pie, Cell
} from "recharts";
import { BrainCircuit, TrendingUp, AlertTriangle, Lightbulb, BarChart2, PieChart as PieChartIcon, Activity } from "lucide-react";
import * as ss from "simple-statistics";
import { useEffect, useState } from "react";

interface DashboardProps {
  data: any[];
  metadata: any;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6'];

export default function PredictionDashboard({ data, metadata }: DashboardProps) {
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [predictionStats, setPredictionStats] = useState<any>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      processData(data);
    }
  }, [data]);

  const processData = async (rawData: any[]) => {
    const numericCols = metadata.columns.filter((c: string) => typeof rawData[0][c] === 'number');
    const targetCol = numericCols.find((c: string) => c.toLowerCase().includes('turnout') || c.toLowerCase().includes('vote') || c.toLowerCase().includes('engagement')) || numericCols[0];
    const secondaryCol = numericCols.find((c: string) => c !== targetCol) || numericCols[0];
    
    const sorted = [...rawData].slice(0, 100);
    const points = sorted.map((row, i) => [i, row[targetCol] || 0]);
    let m = 0, b = 0, forecastData = [];
    
    if (points.length > 1) {
      const regression = ss.linearRegression(points as any);
      m = regression.m;
      b = regression.b;
      const line = ss.linearRegressionLine(regression);
      
      forecastData = sorted.map((row, i) => ({
        ...row,
        name: row.name || row.year || row.id || `Item ${i}`,
        actual: row[targetCol],
        secondary: row[secondaryCol],
        trend: line(i)
      }));

      for(let i=0; i<3; i++) {
        const nextX = sorted.length + i;
        forecastData.push({
          name: `Forecast +${i+1}`,
          actual: null,
          secondary: null,
          trend: line(nextX)
        });
      }
    } else {
      forecastData = sorted;
    }

    setProcessedData(forecastData);
    
    const isUp = m > 0;
    const growthRate = (m / (b || 1)) * 100;

    setPredictionStats({
      target: targetCol,
      secondary: secondaryCol,
      growthRate: growthRate.toFixed(2),
      direction: isUp ? "up" : "down",
      avg: ss.mean(points.map(p => p[1])).toFixed(2),
      confidence: (100 - (Math.abs(growthRate) > 50 ? 50 : Math.abs(growthRate))).toFixed(1)
    });
  };

  if (!predictionStats) return <div className="text-white flex items-center gap-2"><div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"/> Analyzing Data...</div>;

  const pieData = processedData.filter(d => d.actual !== null).slice(-5).map(d => ({
    name: String(d.name),
    value: d.actual
  }));

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 border-white/5">
           <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Target Metric</p>
           <p className="text-xl font-bold text-white capitalize">{predictionStats.target}</p>
        </div>
        <div className="glass-card p-5 border-white/5">
           <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Trend Direction</p>
           <p className={`text-xl font-bold ${predictionStats.direction === "up" ? "text-green-400" : "text-rose-400"} flex items-center gap-2`}>
             {predictionStats.direction === "up" ? "↑" : "↓"} {predictionStats.direction === "up" ? "Positive" : "Negative"}
           </p>
        </div>
        <div className="glass-card p-5 border-white/5">
           <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Forecast Growth</p>
           <p className="text-xl font-bold text-white">{predictionStats.growthRate}% / interval</p>
        </div>
        <div className="glass-card p-5 border-indigo-500/30 bg-indigo-500/5">
           <p className="text-indigo-300/60 text-[10px] uppercase tracking-widest font-bold mb-1 flex items-center gap-1">
             <BrainCircuit className="w-3 h-3" /> Regression Confidence
           </p>
           <p className="text-2xl font-black text-indigo-400">{predictionStats.confidence}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Forecast Area Chart */}
        <div className="lg:col-span-2 glass-card p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-indigo-400" />
               Forecast Model: {predictionStats.target}
             </h3>
             <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/50">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Actual Data</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500" /> AI Forecast</span>
             </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={350}>
              <AreaChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: "#0A0E27", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff" }}
                  itemStyle={{ fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }} />
                <Area type="monotone" dataKey="trend" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Composition Pie Chart */}
        <div className="glass-card p-6 border-white/5 flex flex-col">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
             <PieChartIcon className="w-5 h-5 text-indigo-400" /> Recent Distribution
          </h3>
          <div className="flex-1 min-h-[300px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={300}>
               <PieChart>
                 <Pie
                   data={pieData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={100}
                   paddingAngle={5}
                   dataKey="value"
                   stroke="none"
                 >
                   {pieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <RechartsTooltip 
                   contentStyle={{ backgroundColor: "#0A0E27", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff" }}
                   itemStyle={{ fontWeight: "bold" }}
                 />
                 <Legend wrapperStyle={{ fontSize: '12px' }} />
               </PieChart>
             </ResponsiveContainer>
          </div>
        </div>
        
        {/* Secondary Trends LineChart */}
        <div className="lg:col-span-1 glass-card p-6 border-white/5 flex flex-col">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
             <Activity className="w-5 h-5 text-indigo-400" /> Secondary Metric Trend
          </h3>
          <p className="text-xs text-white/50 mb-4 uppercase tracking-wider">{predictionStats.secondary}</p>
          <div className="flex-1 min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={250}>
               <LineChart data={processedData.filter(d => d.secondary !== null)} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                 <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                 <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                 <RechartsTooltip 
                   contentStyle={{ backgroundColor: "#0A0E27", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff" }}
                 />
                 <Line type="monotone" dataKey="secondary" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Histogram / Variance Bar Chart */}
        <div className="lg:col-span-2 glass-card p-6 border-white/5 flex flex-col">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
             <BarChart2 className="w-5 h-5 text-indigo-400" /> Variance Histogram
          </h3>
          <div className="flex-1 min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={250}>
               <BarChart data={processedData.slice(0, 15)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                 <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                 <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                 <RechartsTooltip 
                   contentStyle={{ backgroundColor: "#0A0E27", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff" }}
                   cursor={{ fill: '#ffffff05' }}
                 />
                 <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                 <Bar dataKey="actual" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Actual Measurement" />
                 <Bar dataKey="trend" fill="#ec4899" radius={[4, 4, 0, 0]} name="Regression Expected" />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
