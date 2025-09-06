import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MemberSection } from '../components/members/MemberSection';
import React from 'react';

const RepeatingLogosBackground: React.FC = () => {
  const logos = [
    { src: '/logo_icons/Bonzo_Dark.png', alt: 'Bonzo' },
    { src: '/logo_icons/Buidler Labs.png', alt: 'Buidler Labs' },
    { src: '/logo_icons/HGraph_Dark.png', alt: 'HGRAPH' },
    { src: '/logo_icons/Hashgate.png', alt: 'Hashgate' },
    { src: '/logo_icons/Hashpack.png', alt: 'Hashpack' },
    { src: '/logo_icons/Kiloscribe.png', alt: 'Kiloscribe' },
    { src: '/logo_icons/Launchbadge.png', alt: 'Launchbadge' },
    { src: '/logo_icons/Neuron_Dark.png', alt: 'Neuron' },
    { src: '/logo_icons/SentX_Dark.png', alt: 'SentX' },
    { src: '/logo_icons/Turtlemoon.png', alt: 'Turtlemoon' },
  ];

  // Generate evenly distributed positions for logos
  const generateDistributedPositions = (count: number) => {
    const positions: { x: number; y: number; logoIndex: number }[] = [];
    const minDistance = 7; // Minimum distance in percentage units
    
    // Create a grid to ensure even distribution
    const gridSize = Math.ceil(Math.sqrt(count * 1.5));
    const cellWidth = 100 / gridSize;
    const cellHeight = 100 / gridSize;
    
    // Shuffle logo order to ensure variety
    const shuffledIndices = Array.from({ length: logos.length }, (_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
    
    let logoCounter = 0;
    
    // Fill grid cells with some randomness
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (positions.length >= count) break;
        
        // Add some randomness to skip cells occasionally for organic feel
        if (Math.random() > 0.85) continue;
        
        const baseX = col * cellWidth;
        const baseY = row * cellHeight;
        
        // Add randomness within the cell, but ensure edge cells can reach the edges
        const edgeBuffer = col === 0 || col === gridSize - 1 ? 0 : 2;
        const topBottomBuffer = row === 0 || row === gridSize - 1 ? 0 : 2;
        const x = baseX + edgeBuffer + (Math.random() * (cellWidth - edgeBuffer * 2) * 0.8);
        const y = baseY + topBottomBuffer + (Math.random() * (cellHeight - topBottomBuffer * 2) * 0.8);
        
        const logoIndex = shuffledIndices[logoCounter % shuffledIndices.length];
        
        // Check distance from other logos and ensure different logos aren't too close
        const isFarEnough = positions.every(p => {
          const distance = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2));
          // If same logo type, require more distance
          const requiredDistance = p.logoIndex === logoIndex ? minDistance * 2 : minDistance;
          return distance > requiredDistance;
        });
        
        if (isFarEnough) {
          positions.push({ x, y, logoIndex });
          logoCounter++;
        }
      }
    }
    
    // Fill any remaining spots in empty areas, especially edges
    let attempts = 0;
    while (positions.length < count && attempts < 200) {
      attempts++;
      // Favor edges and corners
      const favorEdge = Math.random() < 0.4;
      let x, y;
      
      if (favorEdge) {
        if (Math.random() < 0.5) {
          // Top or bottom edge
          x = Math.random() * 100;
          y = Math.random() < 0.5 ? Math.random() * 10 : 90 + Math.random() * 10;
        } else {
          // Left or right edge
          x = Math.random() < 0.5 ? Math.random() * 10 : 90 + Math.random() * 10;
          y = Math.random() * 100;
        }
      } else {
        x = Math.random() * 100;
        y = Math.random() * 100;
      }
      
      const logoIndex = shuffledIndices[logoCounter % shuffledIndices.length];
      
      const isFarEnough = positions.every(p => {
        const distance = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2));
        const requiredDistance = p.logoIndex === logoIndex ? minDistance * 2 : minDistance;
        return distance > requiredDistance;
      });
      
      if (isFarEnough) {
        positions.push({ x, y, logoIndex });
        logoCounter++;
      }
    }
    
    return positions;
  };

  const logoCount = 75; // Slightly reduced for better distribution
  const positions = generateDistributedPositions(logoCount);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-purple-900/90"></div>
      
      {positions.map((pos, index) => {
        const logo = logos[pos.logoIndex];
        const needsHigherVisibility = logo.alt === 'Kiloscribe' || logo.alt === 'Launchbadge' || logo.alt === 'Hashpack' || logo.alt === 'Turtlemoon';
        const opacity = needsHigherVisibility ? 0.12 : 0.08;
        const animationDuration = 20 + (index % 10) * 3;
        const animationDelay = index * 0.2;
        const floatDistance = 30 + (index % 3) * 10;
        
        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animation: `float-${index % 4} ${animationDuration}s ease-in-out infinite`,
              animationDelay: `${animationDelay}s`,
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
              style={{
                opacity: opacity,
                filter: 'brightness(1.2) contrast(0.8)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -30px) rotate(5deg);
          }
          50% {
            transform: translate(-10px, -20px) rotate(-3deg);
          }
          75% {
            transform: translate(15px, 10px) rotate(2deg);
          }
        }
        
        @keyframes float-1 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-25px, -20px) rotate(-5deg);
          }
          50% {
            transform: translate(15px, -35px) rotate(3deg);
          }
          75% {
            transform: translate(-10px, 15px) rotate(-2deg);
          }
        }
        
        @keyframes float-2 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, 15px) rotate(4deg);
          }
          50% {
            transform: translate(-20px, 25px) rotate(-6deg);
          }
          75% {
            transform: translate(10px, -15px) rotate(3deg);
          }
        }
        
        @keyframes float-3 {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-15px, 25px) rotate(-3deg);
          }
          50% {
            transform: translate(25px, -15px) rotate(5deg);
          }
          75% {
            transform: translate(-20px, -25px) rotate(-4deg);
          }
        }
      `}</style>
    </div>
  );
};

const UseCasesPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Members | ${siteConfig.title}`}
      description='10 pioneering organizations building the core infrastructure, tools, and applications that power the Hashgraph Online ecosystem.'
    >
      <main className='relative min-h-screen'>
        <RepeatingLogosBackground />
        <div id='members' className='relative z-10'>
          <MemberSection />
        </div>
      </main>
    </Layout>
  );
};

export default UseCasesPage;
