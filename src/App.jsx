import React from 'react';
import { Activity, GitGraph, Search, BookOpen, Box, ExternalLink } from 'lucide-react';
import Layout from './components/Layout';
import Header from './components/Header';
import Section from './components/Section';
import ManifoldVisualizer from './components/ManifoldVisualizer';
import ClusterConsolidation from './components/ClusterConsolidation';
import CoverageScatter from './components/CoverageScatter';
import LayerDensityChart from './components/LayerDensityChart';

const KeyStat = ({ value, label, subtext }) => (
  <div className="p-6 bg-white/80 rounded-xl border border-slate-200 backdrop-blur-sm hover:border-blue-300 transition-all duration-300 group hover:-translate-y-1 hover:bg-white shadow-sm">
    <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:text-blue-500 transition-colors">{value}</div>
    <div className="text-sm font-semibold text-slate-900 mb-1">{label}</div>
    <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{subtext}</div>
  </div>
);

function App() {
  return (
    <Layout>
      <Header />

      {/* KEY STATS */}
      <div className="border-b border-slate-200 py-12 px-6 relative">
        <div className="absolute inset-0 bg-blue-50/30 skew-y-1 -z-10 transform origin-top-left" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <KeyStat 
            value="Trajectory" 
            label="Explore-Consolidate" 
            subtext="Neurons start polysemantic, then specialize."
          />
          <KeyStat 
            value="Coverage" 
            label="Governs Specialization" 
            subtext="High coverage → Monosemanticity."
          />
          <KeyStat 
            value="Geometry" 
            label="Unified Manifolds" 
            subtext="Spaces compress and align over depth."
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto py-20 px-6" id="interactive-viz">

        {/* 3D VISUALIZATION */}
        <Section 
          title="The Manifold Transformation" 
          subtitle="Interact with the activation space. Drag the slider to observe how token representations consolidate over training."
          icon={Box}
        >
          <ManifoldVisualizer />
        </Section>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
           {/* SECTION 1 */}
           <Section 
             title="Evolutionary Trajectory" 
             subtitle="Polysemanticity decreases as the network consolidates features from exploration to specialization."
             icon={Activity}
           >
            <div className="h-[450px]">
              <ClusterConsolidation />
            </div>
           </Section>

           {/* SECTION 2 */}
           <Section 
             title="The Coverage Principle" 
             subtitle="High-coverage neurons tend to become specialists, while low-coverage neurons remain generalists."
             icon={Search}
           >
             <div className="h-[450px]">
               <CoverageScatter />
             </div>
           </Section>
        </div>

        {/* SECTION 3: GEOMETRY (UPDATED) */}
        <Section 
          title="Geometric Consolidation" 
          subtitle="Deep layers achieve geometric unification, treating rare and common patterns similarly."
          icon={GitGraph}
        >
          <LayerDensityChart />
        </Section>

        {/* METHODOLOGY */}
        <Section 
          title="Methodology"
          subtitle=""
          icon={BookOpen}
          className="bg-white/60 p-8 md:p-12 rounded-3xl border border-slate-200 backdrop-blur-md shadow-sm"
        >
           <div className="grid md:grid-cols-3 gap-8 text-sm leading-relaxed">
             <div className="bg-white/40 p-6 rounded-2xl border border-slate-200 hover:bg-white/60 transition-colors relative group">
               <h3 className="text-slate-900 font-bold mb-3 text-base flex items-center gap-2">
                 <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded flex items-center justify-center text-xs">1</span> 
                 Feature Clustering
               </h3>
               <p className="text-slate-600 mb-4">We tracked clusters over checkpoints <code className="text-blue-700 bg-blue-50 px-1 rounded">{`{3k, 13k... 143k}`}</code> to measure neuron polysemanticity.</p>
               <a 
                  href="https://modelevolution.streamlit.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs mt-auto"
               >
                 Try Interactive Demo <ExternalLink size={12} />
               </a>
             </div>
             <div className="bg-white/40 p-6 rounded-2xl border border-slate-200 hover:bg-white/60 transition-colors">
               <h3 className="text-slate-900 font-bold mb-3 text-base flex items-center gap-2">
                 <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                 Jensen-Shannon
               </h3>
               <p className="text-slate-600">Measured distinctness of frequency group activations, finding early layers act as frequency routers.</p>
             </div>
             <div className="bg-white/40 p-6 rounded-2xl border border-slate-200 hover:bg-white/60 transition-colors">
               <h3 className="text-slate-900 font-bold mb-3 text-base flex items-center gap-2">
                 <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded flex items-center justify-center text-xs">3</span>
                 Polytope Analysis
               </h3>
               <p className="text-slate-600">Characterized activation space shapes via <strong className="text-blue-700">Polytope Density</strong> and <strong className="text-blue-700">Participation Ratio</strong>.</p>
             </div>
           </div>
        </Section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
           <p className="text-2xl font-bold text-slate-900 mb-8 font-serif">From Tokens to Semantics</p>
           <div className="flex justify-center gap-8 text-slate-500 text-sm mb-12">
             <a href="https://openreview.net/pdf?id=Kyx1qoZHcO" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors hover:underline underline-offset-4">Read the Paper</a>
             <a href="https://github.com/sharvillimaye/from-tokens-to-semantics" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors hover:underline underline-offset-4">View Source Code</a>
             <a href="#" className="hover:text-blue-600 transition-colors hover:underline underline-offset-4">Dataset</a>
             <a href="https://modelevolution.streamlit.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors hover:underline underline-offset-4">Interactive Demo</a>
           </div>
           <p className="text-slate-400 text-xs">
             Research by Sharvil Limaye*, Aniruddhan Ramesh*, Aiden Zhou* et al. • NeurIPS 2025 Workshop
           </p>
        </div>
      </footer>
    </Layout>
  );
}

export default App;
