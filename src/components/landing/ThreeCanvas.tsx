
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

      const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

      // Add lights
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(pointLight, ambientLight);

      // Add objects
      for (let i = 0; i < 200; i++) {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
        star.position.set(x, y, z);
        scene.add(star);
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
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else if (object.material instanceof THREE.Material) {
                      object.material.dispose();
                    }
                }
            });
        }
    }
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" className="w-full h-full" />;
}
