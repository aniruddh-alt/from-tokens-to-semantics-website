import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { trainingTrajectoryData } from '../data/mockData';

const TrajectoryChart = () => {
  const [viewMode, setViewMode] = useState('models');

  return (
    <div className="glass-card p-6 rounded-xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Polysemanticity Dynamics</h3>
          <p className="text-sm text-slate-400">Avg clusters per neuron vs. Training Step</p>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5">
          <button 
            onClick={() => setViewMode('models')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
              viewMode === 'models' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Models
          </button>
          <button 
            onClick={() => setViewMode('layers')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
              viewMode === 'layers' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Layers
          </button>
        </div>
      </div>

      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trainingTrajectoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="step" 
              tickFormatter={(val) => `${val/1000}k`} 
              stroke="#64748b"
              fontSize={12}
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              label={{ value: 'Avg Clusters', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} 
              tick={{ fill: '#94a3b8' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderRadius: '8px', 
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)',
                color: '#f1f5f9'
              }} 
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            {viewMode === 'models' ? (
              <>
                <Line type="monotone" dataKey="m70" name="Pythia-70M" stroke="#2dd4bf" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#2dd4bf' }} />
                <Line type="monotone" dataKey="m160" name="Pythia-160M" stroke="#818cf8" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#818cf8' }} />
                <Line type="monotone" dataKey="m410" name="Pythia-410M" stroke="#fb7185" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#fb7185' }} />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="l0" name="Layer 0 (Shallow)" stroke="#fbbf24" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#fbbf24' }} />
                <Line type="monotone" dataKey="l1" name="Layer 1" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="l5" name="Layer 5 (Deep)" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#10b981' }} />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrajectoryChart;


