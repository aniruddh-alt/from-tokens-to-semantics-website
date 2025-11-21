
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section = ({ title, subtitle, icon: Icon, children, id, className = "" }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`mb-32 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            {Icon && (
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <Icon size={28} />
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
          </div>
          {subtitle && (
            <p className="text-slate-400 max-w-2xl leading-relaxed text-lg ml-1 md:ml-[4.5rem]">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;


