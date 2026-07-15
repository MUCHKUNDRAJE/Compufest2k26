'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, useGLTF, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Model loader component
function Model() {
  // Load model from public/model/model.glb
  const { scene } = useGLTF('/model/model.glb');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Heavy material preprocessing: upgrading materials to MeshPhysicalMaterial
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const originalMaterial = mesh.material as THREE.MeshStandardMaterial;

          // Convert standard material to physical material for glossy lacquer reflections
          const physicalMaterial = new THREE.MeshPhysicalMaterial({
            color: originalMaterial.color,
            map: originalMaterial.map,
            normalMap: originalMaterial.normalMap,
            roughnessMap: originalMaterial.roughnessMap,
            metalnessMap: originalMaterial.metalnessMap,
            aoMap: originalMaterial.aoMap,
            
            // Premium physical properties
            roughness: 0.12,                  // Highly polished reflections
            metalness: 0.95,                  // Mirror metallic response
            clearcoat: 1.0,                   // Shiny protective layer
            clearcoatRoughness: 0.08,         // Extra slick varnish
            transmission: 0.15,               // Glass sub-surface refraction
            ior: 1.6,                         // High refraction index (diamond-like reflection)
            thickness: 1.2,                   // Volumetric light refraction depth
            envMapIntensity: 2.5,             // Boost environment reflection map
            side: THREE.DoubleSide,
          });

          mesh.material = physicalMaterial;
        }
      }
    });
  }, [scene]);

  // Rotate group based on mouse movement coordinates only
  useFrame((state) => {
    if (groupRef.current) {
      // Calculate target rotation based on cursor position (-1 to 1 range)
      const targetX = -state.pointer.y * 0.45; // Up/down tilt range (max ~25 degrees)
      const targetY = state.pointer.x * 0.75;  // Left/right tilt range (max ~43 degrees)
      
      // Smoothly interpolate rotation to target value (damped easing)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base primitive mesh scaled up by 2.4 */}
      <primitive object={scene} scale={2} />
    </group>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        camera={{ position: [0, 0.8, 3.2], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true, // Transparent background so the bg.webp is visible behind
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.65 // Boost exposure for bright lighting
        }}
      >
        {/* Sky dome lighting to simulate natural sunrise atmosphere */}
        <hemisphereLight color="#a5b4fc" groundColor="#3b0764" intensity={2.0} />

        {/* Sunrise Key Light (Low angle, high intensity, warm golden/orange color) */}
        <directionalLight
          position={[10, 2.5, 6]}
          intensity={240} // Preserved high intensity value
          color="#ffb066"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />

        {/* Golden Backlight / Rim Halo (Simulates bright sun flare behind the model) */}
        <spotLight
          position={[0, 4, -8]}
          intensity={100}
          color="#ffeaa7"
          angle={Math.PI / 3}
          penumbra={1}
          distance={18}
          castShadow
        />

        {/* Front Soft Fill Light (Neutral color to detail textures) */}
        <directionalLight
          position={[0, 1, 8]}
          intensity={1.8}
          color="#ffffff"
        />

        {/* Accent Point Light (Integrates purple loader tones into shading) */}
        <pointLight
          position={[-6, 2, 6]}
          intensity={2.5}
          color="#ec4899"
        />

        {/* Render 3D Model with Preprocessing/Centering wrapper */}
        <Suspense fallback={null}>
          <Center>
            <Model />
          </Center>

          {/* Heavy Preprocessing Visuals: Soft ground contact shadows */}
          <ContactShadows 
            position={[0, -1.0, 0]} 
            opacity={0.8} 
            scale={7} 
            blur={2.0} 
            far={4.5} 
            color="#000000" 
          />

          {/* Heavy Preprocessing Visuals: Glowing floating sparkles in 3D space */}
          <Sparkles 
            count={90} 
            scale={6} 
            size={3.0} 
            speed={0.5} 
            color="#d8b4fe" 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Pre-load the GLTF file in the background so it starts downloading as soon as the module imports
useGLTF.preload('/model/model.glb');
