import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PrimaryButton from './PrimaryButton';
import Link from '@docusaurus/Link';
import { useCases } from '../pages/use-cases';

const UseCaseSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: useCases[currentIndex].color,
      wireframe: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % useCases.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovering]);

  return (
    <section className='relative h-screen overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900'>
      <canvas ref={canvasRef} className='absolute inset-0 w-full h-full' />
      <div className='relative z-10 h-full flex flex-col justify-center items-center px-4'>
        <h2 className='text-5xl md:text-7xl font-bold text-white mb-12 text-center tracking-tight'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600'>
            Innovative Use Cases
          </span>
        </h2>
        <div className='relative w-full max-w-7xl'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col md:flex-row items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl'
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className='md:w-1/2 p-8 md:p-12'>
                <motion.h3
                  className='text-4xl md:text-5xl font-bold text-white mb-6'
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {useCases[currentIndex].name}
                </motion.h3>
                <motion.p
                  className='text-xl text-gray-200 mb-8'
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {useCases[currentIndex].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <PrimaryButton
                    href={useCases[currentIndex].link}
                    className='text-base py-3 px-8'
                  >
                    Explore Project
                  </PrimaryButton>
                </motion.div>
              </div>
              <div className='md:w-1/2 relative overflow-hidden'>
                <motion.img
                  src={useCases[currentIndex].image}
                  alt={useCases[currentIndex].name}
                  className='w-full max-h-[500px] object-fit'
                  initial={{ scale: 1.2, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/img/placeholder-image.png'; // Replace with a default placeholder image
                    target.alt = 'Image not available';
                  }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-70'></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className='mt-12 flex justify-center items-center space-x-6'>
          {useCases.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-150'
                  : 'bg-white opacity-50 hover:scale-125 hover:opacity-75'
              }`}
            />
          ))}
        </div>
        <div className='mt-12 text-center'>
          <Link
            to='/use-cases'
            className='inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors duration-300'
          >
            See All Use Cases
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;
