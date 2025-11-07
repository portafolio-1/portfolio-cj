import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function ThemeToggle() {
  const { state, actions } = usePortfolio();

  const toggleTheme = () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    actions.setTheme(newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
        state.theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle Track */}
      <motion.div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          state.theme === 'dark'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 transform translate-x-5'
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 transform translate-x-0'
        }`}
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
      >
        <AnimatePresence mode="wait">
          {state.theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-4 h-4 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        animate={{
          background: state.theme === 'dark'
            ? 'radial-gradient(circle at 80% center, rgba(147, 51, 234, 0.3), transparent 50%)'
            : 'radial-gradient(circle at 20% center, rgba(251, 191, 36, 0.3), transparent 50%)'
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}