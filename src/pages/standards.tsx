import React, { useRef, useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'motion/react';
import { FaArrowRight, FaNetworkWired, FaFingerprint, FaDatabase } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

/**
 * Particle constellation for the hero
 */
const ParticleConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#5599fe', '#a679f0', '#48df7b'];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle, i) => {
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;

        particle.vx += dx * 0.0002;
        particle.vy += dy * 0.0002;
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (Math.random() < 0.005) {
          particle.targetX = Math.random() * canvas.width;
          particle.targetY = Math.random() * canvas.height;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        particles.current.forEach((other, j) => {
          if (i === j) return;
          const dist = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `${particle.color}${Math.floor((1 - dist / 100) * 25).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/**
 * Standard row component with hover effects
 */
const StandardRow = ({ code, name, desc, link, color, index }) => {
    return (
        <Link to={link} className="block group !no-underline">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative py-8 md:py-12 border-b border-gray-200 dark:border-white/10 transition-colors"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-current w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color }}
                />

                <div className="container mx-auto px-4 md:px-6 max-w-[1600px] relative z-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-8 lg:gap-16">
                    <div className="flex items-center gap-3 md:gap-4 w-full md:w-32 shrink-0">
                        <span
                            className="text-3xl md:text-4xl font-bold font-mono transition-colors duration-300"
                            style={{ color: `${color}` }}
                        >
                            {code}
                        </span>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white group-hover:translate-x-2 transition-transform duration-300">
                            {name}
                        </h3>
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                            {desc}
                        </p>
                    </div>

                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-white/10 group-hover:scale-125 transition-all duration-300">
                        <FaArrowRight className="text-sm md:text-base" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

/**
 * Section header with underline animation
 */
const SectionHeader = ({ number, title, subtitle, color, icon: Icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="mb-12 md:mb-20">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="h-1 rounded-full mb-6 md:mb-8"
        style={{ backgroundColor: color, transformOrigin: 'left' }}
      />

      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="text-2xl md:text-3xl" style={{ color }} />
        </motion.div>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-xs md:text-sm font-mono tracking-widest mb-2 md:mb-3 opacity-60">{number}</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">{title}</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">{subtitle}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function StandardsOverviewPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroRef = useRef(null);
  const heroScroll = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll.scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll.scrollYProgress, [0, 0.6], [1, 0.9]);

  return (
    <Layout title="Standards Overview" description="The complete suite of Hashgraph Online standards.">
      <div className="min-h-screen bg-white dark:bg-[#050505] font-sans text-gray-900 dark:text-white overflow-x-hidden selection:bg-[#5599fe] selection:text-white transition-colors duration-300">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b] origin-left z-[100]"
          style={{ scaleX }}
        />

        <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
          <ParticleConstellation />

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 text-center container mx-auto px-4 md:px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs md:text-sm font-mono tracking-[0.3em] mb-6 md:mb-8 text-white"
            >
              <span className="w-2 h-2 rounded-full bg-[#5599fe] animate-pulse" />
              THE AUTONOMOUS INTERNET
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-4 md:mb-6 text-white"
            >
              Infrastructure<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5599fe] via-[#a679f0] to-[#48df7b]">
                That Runs Itself
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-4"
            >
              Websites without servers. Systems without gatekeepers.
              <br className="hidden md:block" />
              Open standards for the next generation of the internet.
            </motion.p>
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs tracking-widest text-[#5599fe]">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-[#5599fe] flex justify-center pt-2"
            >
              <motion.div className="w-1 h-2 bg-[#5599fe] rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-20 bg-white dark:bg-[#0a0b10] rounded-t-[2rem] md:rounded-t-[4rem] -mt-8 md:-mt-16">
          <section className="relative py-16 md:py-24 lg:py-16">
            <div className="container mx-auto px-4 md:px-6 max-w-[1600px]">
              <SectionHeader
                number="01 — DATA"
                title="Permanent Storage"
                subtitle="Content lives on-chain forever. No servers. No hosting fees. No single point of failure. From websites to NFTs, your data is truly yours."
                color="#48df7b"
                icon={FaDatabase}
              />

              <div className="space-y-2 md:space-y-4">
                <StandardRow
                  code="HCS-1"
                  name="File Storage"
                  desc="Upload any file to the consensus layer. Compressed, chunked, and reconstructed on demand. The foundation for serverless websites and applications."
                  link="/hashinals"
                  color="#48df7b"
                  index={0}
                />
                <StandardRow
                  code="HCS-2"
                  name="Data Registries"
                  desc="Turn message streams into queryable databases. Build dynamic state machines, registries, and indexes without a backend."
                  link="/registries"
                  color="#48df7b"
                  index={1}
                />
                <StandardRow
                  code="HCS-5"
                  name="Hashinals"
                  desc="Bind files to tokens. Every NFT is an immutable artifact with on-chain provenance. No IPFS gateways. No broken images."
                  link="/hashinals"
                  color="#48df7b"
                  index={2}
                />
              </div>
            </div>
          </section>

          <section className="relative py-16 md:py-24 lg:py-16 bg-gray-50 dark:bg-[#050510]">
            <div className="container mx-auto px-4 md:px-6 max-w-[1600px]">
              <SectionHeader
                number="02 — IDENTITY"
                title="Universal Verification"
                subtitle="One identifier that works everywhere. No platform lock-in. No fragmented profiles. Trustless verification for users, applications, and autonomous systems."
                color="#5599fe"
                icon={FaFingerprint}
              />

              <div className="space-y-2 md:space-y-4">
                <StandardRow
                  code="HCS-14"
                  name="Universal IDs"
                  desc="Self-sovereign identifiers for the entire internet. Web2 APIs, blockchain protocols, AI agents. One ID, infinite interoperability."
                  link="/hcs-14"
                  color="#5599fe"
                  index={0}
                />
                <StandardRow
                  code="HCS-11"
                  name="Identity Profiles"
                  desc="Verifiable metadata for any entity. Prove ownership of accounts, services, and capabilities without a central authority."
                  link="/profiles"
                  color="#5599fe"
                  index={1}
                />
              </div>
            </div>
          </section>

          <section className="relative py-16 md:py-24 lg:py-16">
            <div className="container mx-auto px-4 md:px-6 max-w-[1600px]">
              <SectionHeader
                number="03 — COORDINATION"
                title="Autonomous Systems"
                subtitle="Decentralized communication and collaboration. From peer-to-peer messaging to multi-agent swarms. Systems that coordinate without central control."
                color="#a679f0"
                icon={FaNetworkWired}
              />

              <div className="space-y-2 md:space-y-4">
                <StandardRow
                  code="HCS-10"
                  name="Decentralized Messaging"
                  desc="Encrypted, payment-gated channels. Build chat apps, agent protocols, or monetized APIs. No intermediaries. Full sovereignty."
                  link="/openconvai"
                  color="#a679f0"
                  index={0}
                />
                <StandardRow
                  code="HCS-16"
                  name="Shared Accounts"
                  desc="Multi-signature coordination with on-chain state. Communities, treasuries, and autonomous collectives that govern themselves."
                  link="/floras"
                  color="#a679f0"
                  index={1}
                />
                <StandardRow
                  code="HCS-20"
                  name="Reputation Ledgers"
                  desc="Transparent, auditable points without liquidity. Loyalty programs, contributor tracking, and reputation systems that anyone can verify."
                  link="/hcs-20"
                  color="#a679f0"
                  index={2}
                />
              </div>
            </div>
          </section>

          <section className="relative py-16 md:py-24 lg:py-16 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-[#0a0b10] dark:to-[#050505]">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-gray-900 dark:text-white">
                  Start Building.
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                  <PrimaryButton
                    href="/docs/libraries/standards-sdk"
                    className="!text-base md:!text-lg !px-8 md:!px-12 !py-4 md:!py-6 !bg-gradient-to-r !from-[#5599fe] !to-[#a679f0] hover:!from-[#4488ed] hover:!to-[#9568df] !text-white !rounded-xl md:!rounded-2xl shadow-xl"
                  >
                    GET THE SDK
                  </PrimaryButton>
                  <SecondaryButton
                    href="https://hol.org/points"
                    className="!text-base md:!text-lg !px-8 md:!px-12 !py-4 md:!py-6 !border-2 !border-gray-900 dark:!border-white !text-gray-900 dark:!text-white !bg-white dark:!bg-gray-900 hover:!bg-gray-900 dark:hover:!bg-white hover:!text-white dark:hover:!text-black !rounded-xl md:!rounded-2xl"
                  >
                    COLLECT POINTS
                  </SecondaryButton>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
