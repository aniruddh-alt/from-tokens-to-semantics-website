import React, { useEffect, useRef } from 'react';
import { ArrowRight, Github, Network, ExternalLink, PlayCircle } from 'lucide-react';
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight text-slate-900 font-serif">
            From Tokens to <br/>
            <span className="text-blue-600">Semantics</span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl border-l-2 border-blue-200 pl-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Tracing the evolution of polysemanticity during training. We observe how neural networks transition from processing raw frequency to understanding semantic meaning.
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm text-slate-500 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-wrap gap-x-1 items-center">
              <span className="font-medium text-slate-700">Sharvil Limaye*, Aniruddhan Ramesh*, Aiden Zhou*, Akshay Bhaskar, Jonas Rohweder</span>
              <span>Ashwinee Panda, Vasu Sharma</span>
            </div>
            <div className="w-full text-xs text-slate-400 mt-1">* Equal contribution</div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-500 mb-10 animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <span className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer"><Network size={16} /> NeurIPS 2025 Workshop</span>
            <span className="text-slate-400">Pythia-70M / 160M / 410M</span>
          </div>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={scrollToViz}
              className="group px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg flex items-center gap-3"
            >
              Launch Visualizations 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://modelevolution.streamlit.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
            >
              Interactive Demo <PlayCircle size={18} />
            </a>
            <a 
              href="https://openreview.net/pdf?id=Kyx1qoZHcO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/50 text-slate-700 rounded-lg font-medium hover:bg-white transition-all border border-slate-200 flex items-center gap-2"
            >
              Read Paper <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
