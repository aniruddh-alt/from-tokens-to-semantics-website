import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { layerDensityData } from '../data/mockData';

const LayerDensityChart = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  const layers = [0, 4, 11];

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Polytope Density Evolution</h3>
          <p className="text-sm text-slate-400">Comparing High vs. Low Frequency n-gram density per layer</p>
        </div>
        
        <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5 self-start">
          {layers.map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-300 ${
                activeLayer === layer 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Layer {layer} {layer === 0 ? '(Shallow)' : layer === 11 ? '(Deep)' : '(Mid)'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={layerDensityData[activeLayer]} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="step" 
              stroke="#64748b" 
              fontSize={12}
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              label={{ value: 'Polytope Density (Lower is better)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8' } }} 
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
            <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#94a3b8' }} />
            
            <Line 
              type="monotone" 
              dataKey="high" 
              name="High Frequency N-Grams" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              activeDot={{ r: 8, fill: '#3b82f6' }}
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="low" 
              name="Low Frequency N-Grams" 
              stroke="#ef4444" 
              strokeWidth={3} 
              activeDot={{ r: 8, fill: '#ef4444' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 bg-indigo-950/30 p-4 rounded-lg border border-indigo-500/20 text-sm text-slate-300">
        <div className="flex gap-3 items-start">
          <Activity size={18} className="text-indigo-400 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            {activeLayer === 0 && <strong className="text-indigo-300 block mb-1">Layer 0 (Shallow) Analysis</strong>}
            {activeLayer === 4 && <strong className="text-indigo-300 block mb-1">Layer 4 (Middle) Analysis</strong>}
            {activeLayer === 11 && <strong className="text-indigo-300 block mb-1">Layer 11 (Deep) Analysis</strong>}
            
            {activeLayer === 0 
              ? "Notice how the red line (Low Freq) stays significantly higher than the blue line. This means low-frequency phrases remain fragmented and 'expensive' to represent in early layers."
              : activeLayer === 4
              ? "The gap begins to close. Low-frequency representations are becoming more efficient, moving closer to the high-frequency baseline."
              : "Complete convergence. By the final layers, the network treats rare and common phrases with the same geometric efficiency. This is the emergence of 'Semantics'."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LayerDensityChart;


