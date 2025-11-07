import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, Code, Coffee, Sparkles, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const creativeTexts = [
  "Transformo ideas en experiencias digitales",
  "Código que cobra vida, pixel a pixel",
  "Construyendo el futuro, una línea a la vez",
  "Donde la creatividad se encuentra con la tecnología"
];

interface FloatingIconProps {
  icon: React.ComponentType<{ size?: number }>;
  delay?: number;
  x?: number;
  y?: number;
}

const FloatingIcon = ({ icon: Icon, delay = 0, x = 0, y = 0 }: FloatingIconProps) => (
  <motion.div
    className="absolute text-cyan-400/20"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [x, x + 50, x + 100],
      y: [y, y - 50, y - 100]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
  >
    <Icon size={24} />
  </motion.div>
);

interface CreativeHeroSectionProps {
  onOpenContactModal?: () => void;
}

export function CreativeHeroSection({ onOpenContactModal }: CreativeHeroSectionProps) {
  const [currentText, setCurrentText] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % creativeTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient opacity-10"></div>
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: y2 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-cyan-400/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Floating Icons */}
      <FloatingIcon icon={Code} delay={0} x={100} y={200} />
      <FloatingIcon icon={Coffee} delay={1} x={300} y={150} />
      <FloatingIcon icon={Sparkles} delay={2} x={200} y={300} />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ opacity }}
      >
        {/* Profile Image with Creative Frame */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2 
          }}
          className="relative mx-auto mb-8 w-32 h-32 sm:w-40 sm:h-40"
        >
          {/* Animated border */}
          <div className="absolute inset-0 rounded-full animated-gradient p-1">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-800">
              {/* Placeholder - reemplaza con tu imagen */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                TU
              </div>
            </div>
          </div>
          
          {/* Floating status indicator */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-3 h-3 bg-white rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-['Poppins'] leading-tight">
            <span className="block text-slate-100 mb-2">Hola, soy</span>
            <motion.span 
              className="block gradient-text"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Tu Nombre
            </motion.span>
          </h1>
        </motion.div>

        {/* Rotating Creative Phrases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 h-16 flex items-center justify-center"
        >
          <motion.p
            key={currentText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-xl sm:text-2xl text-slate-300 max-w-3xl text-shimmer"
            style={{ 
              backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              backgroundSize: "200% 100%"
            }}
          >
            {creativeTexts[currentText]}
          </motion.p>
        </motion.div>

        {/* Role & Specialization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center space-x-4 glass-card px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-semibold">Desarrollador Full Stack</span>
            <div className="w-px h-6 bg-slate-600"></div>
            <span className="text-slate-300">React • Node.js • TypeScript</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10 flex items-center space-x-2">
              <span>Ver mi trabajo</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
          
          <motion.button
            onClick={onOpenContactModal}
            className="group relative px-8 py-4 glass-card text-cyan-400 font-semibold rounded-xl hover:text-white transition-all duration-300 border border-cyan-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <Mail className="w-5 h-5 group-hover:animate-pulse" />
              <span>Hablemos</span>
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => window.open('#', '_blank')}
            className="group px-8 py-4 glass-card text-slate-300 font-semibold rounded-xl hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>Descargar CV</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ y: y1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-slate-400"
          >
            <span className="text-sm">Scroll para descubrir</span>
            <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-slate-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </section>
  );
}