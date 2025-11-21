import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Box } from 'lucide-react';
import gsap from 'gsap';

const ParticleSystem = ({ progress }) => {
  const pointsRef = useRef();
  const count = 2000; // Increased particle count for better visuals
  
  // Generate data once
  const { initialPos, targetPos, colors } = useMemo(() => {
    const initial = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    const colorHigh = new THREE.Color('#6366f1'); // Indigo
    const colorLow = new THREE.Color('#f43f5e');  // Rose

    for (let i = 0; i < count; i++) {
      const isHighFreq = i < count / 2;
      
      // 1. Initial: Fragmented Clusters
      // High freq (left), Low freq (right) - clearly separated
      const centerX = isHighFreq ? -4 : 4;
      const spread = 2.5;
      initial[i * 3] = centerX + (Math.random() - 0.5) * spread;
      initial[i * 3 + 1] = (Math.random() - 0.5) * spread;
      initial[i * 3 + 2] = (Math.random() - 0.5) * spread;

      // 2. Target: Unified Manifold (Sphere/Hypersphere projection)
      // Both mixed together in a structure
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 3.5 + (Math.random() * 0.2); // Thin shell
      
      target[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      target[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      target[i * 3 + 2] = r * Math.cos(phi);

      // Colors
      const color = isHighFreq ? colorHigh : colorLow;
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    
    return { initialPos: initial, targetPos: target, colors: cols };
  }, []);

  // Animation Loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Easing for the transition
    const t = Math.min(1, Math.max(0, progress));
    const ease = t * t * (3 - 2 * t); // Smoothstep

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const startX = initialPos[ix];
      const startY = initialPos[iy];
      const startZ = initialPos[iz];

      const endX = targetPos[ix];
      const endY = targetPos[iy];
      const endZ = targetPos[iz];

      // Interpolate
      // Add subtle noise/breathing animation
      const noise = Math.sin(time + i * 0.1) * 0.05;
      
      positions[ix] = startX + (endX - startX) * ease + noise;
      positions[iy] = startY + (endY - startY) * ease + noise;
      positions[iz] = startZ + (endZ - startZ) * ease + noise;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the whole system slowly
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={initialPos} // Initial buffer, will be updated
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const ManifoldVisualizer = () => {
  const [progress, setProgress] = useState(0.5);
  
  // We can use GSAP to animate the progress value if we wanted a "Play" button,
  // but for the slider, direct control is better. 
  // Let's add a "Play" effect on mount though.
  useEffect(() => {
    // Optional: Auto-play demo on first load? 
    // For now, let's just let the user control it.
  }, []);

  return (
    <div className="w-full h-[600px] bg-slate-900 rounded-xl overflow-hidden relative shadow-2xl border border-slate-800 group">
      {/* UI OVERLAY */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-white max-w-xs shadow-xl">
          <h4 className="font-bold text-indigo-400 flex items-center gap-2 mb-2">
            <Box size={18} /> Activation Manifold
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Visualizing how token representations (points) move from fragmented frequency clusters to a unified semantic structure.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span> High Freq
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span> Low Freq
            </div>
          </div>
        </div>
      </div>

      {/* SLIDER CONTROL */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-80 md:w-96 pointer-events-auto">
        <div className="bg-slate-900/60 backdrop-blur-md px-8 py-6 rounded-full border border-white/10 shadow-2xl transition-transform hover:scale-105 duration-300">
          <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
            <span>Fragmented (Early)</span>
            <span>Consolidated (Late)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
          />
        </div>
      </div>

      {/* 3D CANVAS */}
      <Canvas dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 10, 25]} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
        
        {/* LIGHTING (Mostly for atmosphere, points are unlit) */}
        <ambientLight intensity={0.5} />
        
        {/* ENVIRONMENT */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* MAIN CONTENT */}
        <ParticleSystem progress={progress} />
        
        {/* GLOW EFFECTS (Billboards or simple mesh) */}
        {/* Using PostProcessing Bloom would be ideal but keeping it light with additive particles */}
      </Canvas>
    </div>
  );
};

export default ManifoldVisualizer;


