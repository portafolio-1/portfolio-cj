import { motion } from 'framer-motion';
import { Menu, X, Code, Home, User, Briefcase, Mail, Heart } from 'lucide-react';
import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useSmoothScroll } from '../../hooks/useAdvancedEffects';
import { ThemeToggle } from '../ui/ThemeToggle';

const navItems = [
  { id: 'hero', label: 'Inicio', icon: Home },
  { id: 'about', label: 'Sobre mí', icon: User },
  { id: 'personal', label: 'Fuera del código', icon: Heart },
  { id: 'experience', label: 'Experiencia', icon: Briefcase },
  { id: 'projects', label: 'Proyectos', icon: Code },
  { id: 'contact', label: 'Contacto', icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, actions } = usePortfolio();
  const { scrollToSection } = useSmoothScroll();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    actions.setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                Portfolio
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = state.activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg
                      transition-all duration-300 group
                      ${isActive 
                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50' 
                        : 'text-slate-300 hover:text-white'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-cyan-400/10 rounded-lg border border-cyan-400/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{ 
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = state.activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-all duration-300 text-left
                      ${isActive 
                        ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50' 
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}