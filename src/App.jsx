import React from 'react';
import { Activity, GitGraph, Search, BookOpen, Box, Brain } from 'lucide-react';
import Layout from './components/Layout';
import Header from './components/Header';
import Section from './components/Section';
import ManifoldVisualizer from './components/ManifoldVisualizer';
import TrajectoryChart from './components/TrajectoryChart';
import CoverageScatter from './components/CoverageScatter';
import LayerDensityChart from './components/LayerDensityChart';

const KeyStat = ({ value, label, subtext }) => (
  <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300 group hover:-translate-y-1 hover:bg-white/10 shadow-lg">
    <div className="text-3xl font-bold text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors">{value}</div>
    <div className="text-sm font-semibold text-white mb-1">{label}</div>
    <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{subtext}</div>
  </div>
);

function App() {
  return (
    <Layout>
      <Header />

      {/* KEY STATS */}
      <div className="border-b border-white/5 py-12 px-6 relative">
        <div className="absolute inset-0 bg-indigo-950/20 skew-y-1 -z-10 transform origin-top-left" />
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
          subtitle="Interact with the activation space below. Drag the slider to see how representations of high vs. low frequency tokens consolidate over training time."
          icon={Box}
        >
          <ManifoldVisualizer />
        </Section>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
           {/* SECTION 1 */}
           <Section 
             title="Evolutionary Trajectory" 
             subtitle="Polysemanticity follows a structured arc: exploration followed by consolidation."
             icon={Activity}
           >
            <div className="h-[450px]">
              <TrajectoryChart />
            </div>
           </Section>

           {/* SECTION 2 */}
           <Section 
             title="The Coverage Principle" 
             subtitle="High-coverage neurons become specialists. Low-coverage neurons remain generalists."
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
          subtitle="Explore how different layers converge at different rates. Deep layers achieve geometric unification, treating rare and common patterns similarly."
          icon={GitGraph}
        >
          <LayerDensityChart />
        </Section>

        {/* METHODOLOGY */}
        <Section 
          title="Methodology"
          subtitle=""
          icon={BookOpen}
          className="bg-gradient-to-br from-indigo-950/40 to-slate-900/40 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md"
        >
           <div className="grid md:grid-cols-3 gap-8 text-sm leading-relaxed">
             <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
               <h3 className="text-indigo-300 font-bold mb-3 text-base flex items-center gap-2">
                 <span className="bg-indigo-500/20 w-6 h-6 rounded flex items-center justify-center text-xs">1</span> 
                 Feature Clustering
               </h3>
               <p className="text-slate-400">We tracked clusters over checkpoints <code className="text-indigo-200 bg-indigo-900/30 px-1 rounded">{`{3k, 13k... 143k}`}</code> to measure how "polysemantic" a neuron was at any given time.</p>
             </div>
             <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
               <h3 className="text-indigo-300 font-bold mb-3 text-base flex items-center gap-2">
                 <span className="bg-indigo-500/20 w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                 Jensen-Shannon
               </h3>
               <p className="text-slate-400">Measured how distinctly frequency groups activate the neural population. Found that early layers act as "frequency routers".</p>
             </div>
             <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
               <h3 className="text-indigo-300 font-bold mb-3 text-base flex items-center gap-2">
                 <span className="bg-indigo-500/20 w-6 h-6 rounded flex items-center justify-center text-xs">3</span>
                 Polytope Analysis
               </h3>
               <p className="text-slate-400">Characterized the shape of activation spaces via <strong className="text-indigo-200">Polytope Density</strong> and <strong className="text-indigo-200">Participation Ratio</strong>.</p>
             </div>
           </div>
        </Section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
           <div className="flex items-center justify-center gap-2 text-indigo-400 font-semibold text-sm mb-6 uppercase tracking-wider opacity-80">
              <Brain size={16} />
              Mechanistic Interpretability Research
           </div>
           <p className="text-2xl font-bold text-white mb-8">From Tokens to Semantics</p>
           <div className="flex justify-center gap-8 text-slate-400 text-sm mb-12">
             <a href="#" className="hover:text-indigo-400 transition-colors hover:underline underline-offset-4">Read the Paper</a>
             <a href="#" className="hover:text-indigo-400 transition-colors hover:underline underline-offset-4">View Source Code</a>
             <a href="#" className="hover:text-indigo-400 transition-colors hover:underline underline-offset-4">Dataset</a>
           </div>
           <p className="text-slate-600 text-xs">
             Research by Sharvil Limaye et al. • NeurIPS 2025 Workshop
           </p>
        </div>
      </footer>
    </Layout>
  );
}

export default App;

