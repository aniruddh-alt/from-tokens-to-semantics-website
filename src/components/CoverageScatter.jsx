import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { scatterData } from '../data/mockData';

const CoverageScatter = () => {
  return (
    <div className="glass-card p-6 rounded-xl h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">The Coverage Principle</h3>
          <p className="text-sm text-slate-500">Participation vs. Specialization</p>
        </div>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Coverage" 
              unit="" 
              label={{ value: 'Coverage', position: 'insideBottom', offset: -10, fill: '#64748b' }} 
              stroke="#94a3b8"
              tick={{ fill: '#64748b' }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Clusters" 
              unit="" 
              label={{ value: 'Clusters', angle: -90, position: 'insideLeft', fill: '#64748b' }} 
              stroke="#94a3b8"
              tick={{ fill: '#64748b' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3', stroke: '#94a3b8' }} 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white/90 backdrop-blur p-3 shadow-xl rounded-lg border border-slate-200 text-xs text-slate-700">
                      <p><strong className="text-blue-600">Coverage:</strong> {data.x.toFixed(2)}</p>
                      <p><strong className="text-blue-600">Clusters:</strong> {data.y.toFixed(1)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Neurons" data={scatterData} fill="#3b82f6" fillOpacity={0.6} shape="circle" />
            <ReferenceLine x={0.5} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: "Specialization", fill: "#64748b", position: 'top' }} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoverageScatter;
