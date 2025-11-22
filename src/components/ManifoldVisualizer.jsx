import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Box } from 'lucide-react';
import gsap from 'gsap';

const ParticleSystem = ({ progress }) => {
  const pointsRef = useRef();
  const count = 2000; 
  
  // Generate data once
  const { initialPos, targetPos, colors } = useMemo(() => {
    const initial = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    const colorHigh = new THREE.Color('#3b82f6'); // Blue
    const colorLow = new THREE.Color('#ef4444');  // Red

    for (let i = 0; i < count; i++) {
      const isHighFreq = i < count / 2;
      
      // 1. Initial: Fragmented Clusters
      const centerX = isHighFreq ? -4 : 4;
      const spread = 2.5;
      initial[i * 3] = centerX + (Math.random() - 0.5) * spread;
      initial[i * 3 + 1] = (Math.random() - 0.5) * spread;
      initial[i * 3 + 2] = (Math.random() - 0.5) * spread;

      // 2. Target: Unified Manifold
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 3.5 + (Math.random() * 0.2); 
      
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
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.NormalBlending} 
        depthWrite={false}
      />
    </points>
  );
};

const ManifoldVisualizer = () => {
  const [progress, setProgress] = useState(0.5);
  
  useEffect(() => {
    // Optional: Auto-play demo on first load? 
  }, []);

  return (
    <div className="w-full h-[600px] bg-slate-50 rounded-xl overflow-hidden relative shadow-xl border border-slate-200 group">
      {/* UI OVERLAY */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200 text-slate-900 max-w-xs shadow-sm">
          <h4 className="font-bold text-blue-600 flex items-center gap-2 mb-2">
            <Box size={18} /> Activation Manifold
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Visualizing how token representations (points) move from fragmented frequency clusters to a unified semantic structure.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></span> High Freq
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm"></span> Low Freq
            </div>
          </div>
        </div>
      </div>

      {/* SLIDER CONTROL */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-80 md:w-96 pointer-events-auto">
        <div className="bg-white/80 backdrop-blur-md px-8 py-6 rounded-full border border-slate-200 shadow-lg transition-transform hover:scale-105 duration-300">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-widest">
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
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-600 transition-all"
          />
        </div>
      </div>

      {/* 3D CANVAS */}
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={['#f8fafc']} />
        <fog attach="fog" args={['#f8fafc', 10, 25]} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
        
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        {/* MAIN CONTENT */}
        <ParticleSystem progress={progress} />
      </Canvas>
    </div>
  );
};

export default ManifoldVisualizer;
