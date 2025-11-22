import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 scientific-grid font-sans selection:bg-blue-100">
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none z-0" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
