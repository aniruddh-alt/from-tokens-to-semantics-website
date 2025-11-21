// Figure 1 & 3: Polysemanticity over Training Steps
export const trainingTrajectoryData = [
  { step: 0, m70: 8, m160: 8, m410: 9, l0: 25, l1: 10, l5: 6 },
  { step: 10000, m70: 7, m160: 9.5, m410: 14, l0: 20, l1: 9, l5: 5.5 },
  { step: 20000, m70: 6, m160: 8.2, m410: 16, l0: 12, l1: 9.5, l5: 4.5 },
  { step: 40000, m70: 5.8, m160: 7.2, m410: 13, l0: 11.5, l1: 10, l5: 3.5 },
  { step: 60000, m70: 5.5, m160: 6.5, m410: 10, l0: 11.2, l1: 11, l5: 3.0 },
  { step: 80000, m70: 5.0, m160: 5.5, m410: 6, l0: 11, l1: 10.5, l5: 2.8 },
  { step: 100000, m70: 4.2, m160: 4.5, m410: 4, l0: 10, l1: 9, l5: 2.5 },
  { step: 120000, m70: 3.5, m160: 4.0, m410: 3.2, l0: 8, l1: 8, l5: 2.2 },
  { step: 143000, m70: 3.2, m160: 3.5, m410: 2.8, l0: 8, l1: 8, l5: 2.2 },
];

// Figure 4: Coverage vs Clusters
const generateScatterData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const coverage = Math.random();
    let clusters;
    if (coverage > 0.5) {
      clusters = 1 + Math.random() * 2; 
    } else {
      clusters = 1 + Math.random() * (50 * (1 - coverage)); 
    }
    data.push({ x: coverage, y: clusters, z: Math.random() * 100 });
  }
  return data;
};
export const scatterData = generateScatterData(400);

// Figure 19/21 Approximation: Layer-wise Polytope Density
export const layerDensityData = {
  0: [ // Shallow Layer: Persistent Separation
    { step: '3k', high: 1.0, low: 1.2 },
    { step: '20k', high: 1.5, low: 3.5 }, 
    { step: '40k', high: 1.8, low: 4.0 },
    { step: '80k', high: 1.6, low: 3.2 },
    { step: '143k', high: 1.2, low: 2.5 },
  ],
  4: [ // Middle Layer: Gradual Convergence
    { step: '3k', high: 1.0, low: 1.1 },
    { step: '20k', high: 1.4, low: 2.5 },
    { step: '40k', high: 1.5, low: 2.2 },
    { step: '80k', high: 1.2, low: 1.5 },
    { step: '143k', high: 1.0, low: 1.1 },
  ],
  11: [ // Deep Layer: Fast Convergence
    { step: '3k', high: 0.8, low: 0.9 },
    { step: '20k', high: 1.2, low: 1.5 },
    { step: '40k', high: 1.0, low: 1.1 },
    { step: '80k', high: 0.6, low: 0.65 },
    { step: '143k', high: 0.5, low: 0.5 },
  ]
};


