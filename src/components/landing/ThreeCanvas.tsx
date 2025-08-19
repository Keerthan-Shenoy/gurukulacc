'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let animationFrameId: number;
    const objects: THREE.Mesh[] = [];

    const initThreeJS = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 20;

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Use shapes more symbolic of science/math for a unique educational theme
      const geometries = [
        new THREE.DodecahedronGeometry(1),
        new THREE.OctahedronGeometry(1.2),
        new THREE.TorusGeometry(0.8, 0.3, 16, 100),
        new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
        new THREE.CapsuleGeometry(0.6, 0.8, 4, 8),
      ];

      // Use a different color for this section to make it unique
      const material = new THREE.MeshStandardMaterial({
        color: 0x2dd4bf, // accent color (teal)
        metalness: 0.4,
        roughness: 0.5,
      });

      for (let i = 0; i < 30; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const object = new THREE.Mesh(geometry, material);

        object.position.x = (Math.random() - 0.5) * 50;
        object.position.y = (Math.random() - 0.5) * 50;
        object.position.z = (Math.random() - 0.5) * 50;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        const scale = Math.random() * 0.4 + 0.6; // Slightly different scale for variety
        object.scale.set(scale, scale, scale);

        scene.add(object);
        objects.push(object);
      }

      window.addEventListener('resize', onWindowResize, false);
      animate();
    };

    const onWindowResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    let scrollY = window.scrollY;
    const handleScroll = () => {
        scrollY = window.scrollY;
    }
    window.addEventListener('scroll', handleScroll);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if(renderer && scene && camera) {
        const elapsedTime = clock.getElapsedTime();
        
        // Make camera movement subtler and tied to scroll
        camera.position.y = -scrollY / (window.innerHeight / 2) * 2;


        // Animate objects with a different pattern
        for (const object of objects) {
            object.rotation.y += 0.003;
            object.rotation.z -= 0.004;
        }

        renderer.render(scene, camera);
      }
    };
    
    initThreeJS();

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('scroll', handleScroll);
        if (renderer) {
            renderer.dispose();
        }
        if (scene) {
            scene.traverse(object => {
                if (object instanceof THREE.Mesh) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material instanceof THREE.Material) {
                      object.material.dispose();
                    }
                }
            });
        }
    }
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" className="w-full h-full" />;
}
