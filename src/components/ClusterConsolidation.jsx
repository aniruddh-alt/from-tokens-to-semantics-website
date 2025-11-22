import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

const ClusterConsolidation = () => {
  const [progress, setProgress] = useState(0);

  // Generate clusters data once
  const clusters = useMemo(() => {
    const count = 40; // Start with 40 clusters
    const finalCount = 3; // Consolidate to 3
    const data = [];

    // Define 3 centers for the final state
    const centers = [
      { x: 20, y: 30, color: '#3b82f6' }, // Blue
      { x: 80, y: 30, color: '#ef4444' }, // Red
      { x: 50, y: 80, color: '#10b981' }, // Green
    ];

    for (let i = 0; i < count; i++) {
      // Assign to one of the final centers
      const centerIndex = i % finalCount;
      const target = centers[centerIndex];
      
      // Random start position (scattered everywhere)
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      // Random offset for the final position (so they don't all merge to a single pixel point, but a cluster)
      const endX = target.x + (Math.random() - 0.5) * 15;
      const endY = target.y + (Math.random() - 0.5) * 15;

      data.push({
        id: i,
        startX,
        startY,
        endX,
        endY,
        color: target.color,
        size: 2 + Math.random() * 3 // Random size
      });
    }
    return data;
  }, []);

  return (
    <div className="glass-card p-6 rounded-xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Feature Consolidation</h3>
          <p className="text-sm text-slate-500">Many directions merge into semantic clusters</p>
        </div>
        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 flex items-center gap-1">
          <Network size={12} />
          <span>{Math.round(40 - (37 * progress))} Active Clusters</span>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="flex-grow relative bg-slate-50/50 rounded-lg border border-slate-200 overflow-hidden min-h-[300px]">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0">
          {/* Grid lines for academic feel */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {clusters.map((cluster) => {
            // Interpolate position
            // Use a non-linear ease for better feel
            const ease = progress * progress * (3 - 2 * progress);
            const x = cluster.startX + (cluster.endX - cluster.startX) * ease;
            const y = cluster.startY + (cluster.endY - cluster.startY) * ease;
            
            return (
              <motion.circle
                key={cluster.id}
                cx={x}
                cy={y}
                r={cluster.size}
                fill={cluster.color}
                opacity={0.6}
                initial={false}
                animate={{ cx: x, cy: y }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            );
          })}
        </svg>

        {/* Labels overlay */}
        <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider pointer-events-none">
          Feature Space Projection
        </div>
      </div>

      {/* Slider Control */}
      <div className="mt-6 bg-white/50 p-4 rounded-lg border border-slate-200">
        <div className="flex justify-between text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
          <span>Early Training (Polysemantic)</span>
          <span>Late Training (Specialized)</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={progress}
          onChange={(e) => setProgress(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>
    </div>
  );
};

export default ClusterConsolidation;

