import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 scientific-grid font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none z-0" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;


