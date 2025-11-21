import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { scatterData } from '../data/mockData';

const CoverageScatter = () => {
  return (
    <div className="glass-card p-6 rounded-xl h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">The Coverage Principle</h3>
          <p className="text-sm text-slate-400">Participation vs. Specialization</p>
        </div>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Coverage" 
              unit="" 
              label={{ value: 'Coverage', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} 
              stroke="#64748b"
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Clusters" 
              unit="" 
              label={{ value: 'Clusters', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} 
              stroke="#64748b"
              tick={{ fill: '#94a3b8' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3', stroke: '#475569' }} 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900/90 backdrop-blur p-3 shadow-xl rounded-lg border border-white/10 text-xs text-slate-200">
                      <p><strong className="text-indigo-400">Coverage:</strong> {data.x.toFixed(2)}</p>
                      <p><strong className="text-indigo-400">Clusters:</strong> {data.y.toFixed(1)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Neurons" data={scatterData} fill="#6366f1" fillOpacity={0.6} shape="circle" />
            <ReferenceLine x={0.5} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: "Specialization", fill: "#94a3b8", position: 'top' }} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoverageScatter;


