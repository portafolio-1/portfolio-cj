import { useEffect, useRef, useCallback, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

// Hook para partículas optimizadas con Canvas
export function useOptimizedParticles(count: number = 30) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = usePortfolio();
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    life: number;
  }>>([]);

  const initParticles = useCallback(() => {
    const particles = [];
    const colors = ['#00f5ff', '#bf00ff', '#ff00aa', '#00ff88'];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100 + 50,
      });
    }
    particlesRef.current = particles;
  }, [count]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state.animations.particlesEnabled) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;

      // Wrap around screen
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Regenerate particle if life is over
      if (particle.life <= 0) {
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
        particle.life = Math.random() * 100 + 50;
        particle.opacity = Math.random() * 0.6 + 0.2;
      }

      // Draw particle with glow effect
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw connecting lines
      particlesRef.current.slice(index + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - distance / 100) * 0.2;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    });

    if (!state.animations.reduceMotion) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [state.animations.particlesEnabled, state.animations.reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    initParticles();
    
    window.addEventListener('resize', resizeCanvas);
    
    if (state.animations.particlesEnabled && !state.animations.reduceMotion) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, animate, state.animations.particlesEnabled, state.animations.reduceMotion]);

  return canvasRef;
}

// Hook para efectos de mouse avanzados
export function useAdvancedMouseEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const lastUpdateRef = useRef(0);
  const { state } = usePortfolio();

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (state.animations.reduceMotion) return;
    
    const now = Date.now();
    if (now - lastUpdateRef.current > 16) { // 60fps throttle
      setMousePosition({ 
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2 
      });
      lastUpdateRef.current = now;
    }
  }, [state.animations.reduceMotion]);

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [updateMousePosition]);

  const getElementProps = useCallback(() => ({
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
    style: {
      '--mouse-x': `${mousePosition.x}`,
      '--mouse-y': `${mousePosition.y}`,
      '--hover-intensity': isHovering ? '1' : '0',
    } as React.CSSProperties,
  }), [mousePosition, isHovering]);

  return {
    mousePosition,
    isHovering,
    getElementProps,
  };
}

// Hook para parallax suave
export function useParallax(speed: number = 0.5, enabled: boolean = true) {
  const [offset, setOffset] = useState(0);
  const { state } = usePortfolio();

  useEffect(() => {
    if (!enabled || state.animations.reduceMotion || !state.animations.parallaxEnabled) return;

    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, enabled, state.animations.reduceMotion, state.animations.parallaxEnabled]);

  return offset;
}

// Hook para animaciones con Intersection Observer
export function useIntersectionObserver(threshold: number = 0.1, rootMargin: string = '50px 0px') {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, hasAnimated]);

  return { ref, isVisible, hasAnimated };
}

// Hook para monitoreo de rendimiento
export function usePerformanceMonitor() {
  const { actions, state } = usePortfolio();
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const renderTimeStart = useRef(0);

  const startRenderMeasurement = useCallback(() => {
    renderTimeStart.current = performance.now();
  }, []);

  const endRenderMeasurement = useCallback(() => {
    const renderTime = performance.now() - renderTimeStart.current;
    actions.updatePerformance({ renderTime });
  }, [actions]);

  useEffect(() => {
    const monitor = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        actions.updatePerformance({ fps });
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      requestAnimationFrame(monitor);
    };
    
    requestAnimationFrame(monitor);
  }, [actions]);

  return {
    currentFPS: state.performance.fps,
    renderTime: state.performance.renderTime,
    isOptimized: state.performance.isOptimized,
    startRenderMeasurement,
    endRenderMeasurement,
  };
}

// Hook para efectos 3D con CSS transforms
export function use3DTransform(intensity: number = 1) {
  const [transform, setTransform] = useState('');
  const { state } = usePortfolio();
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (state.animations.reduceMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (y - 0.5) * 20 * intensity;
    const rotateY = (x - 0.5) * 20 * intensity;
    
    setTransform(`perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`);
  }, [intensity, state.animations.reduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  }, []);

  return {
    transform,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

// Hook para gestión de scroll suave
export function useSmoothScroll() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }, []);

  return {
    scrollToSection,
    scrollToTop,
  };
}