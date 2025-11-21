import React, { useEffect, useRef } from 'react';
import { Brain, Github, Network, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const Header = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    );
  }, []);

  const scrollToViz = () => {
    document.getElementById('interactive-viz').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header ref={containerRef} className="pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-[0.2em] uppercase mb-6 animate-fade-in">
            <Brain size={14} className="text-indigo-500" />
            Mechanistic Interpretability Research
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight">
            From <span className="text-gradient">Tokens</span> to <br/>
            <span className="text-white">Semantics</span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl border-l-2 border-indigo-500/50 pl-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Polysemanticity is not a static bug—it's a dynamic, evolutionary process. We trace how neural networks transition from processing raw frequency to understanding semantic meaning.
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm text-slate-500 mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer"><Github size={16} /> Sharvil Limaye et al.</span>
            <span className="flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer"><Network size={16} /> NeurIPS 2025 Workshop</span>
            <span className="bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20 text-xs font-medium">Pythia-70M / 160M / 410M</span>
          </div>

          <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={scrollToViz}
              className="group px-8 py-4 bg-white text-slate-950 rounded-lg font-bold hover:bg-indigo-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-3"
            >
              Launch Visualizations 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all border border-white/10 flex items-center gap-2">
              Read Paper
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


