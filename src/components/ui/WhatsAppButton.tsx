import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Tu número de WhatsApp (formato internacional sin +)
  const phoneNumber = '51933055687'; // +51 933 055 687
  const message = '¡Hola Ciro! Vi tu portafolio y me gustaría conversar contigo.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-28 right-8 z-50"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glass effect button - igual al diseño de tu página */}
        <div className="relative w-14 h-14 glass-card rounded-xl flex items-center justify-center border border-green-500/30 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
          <MessageCircle className="w-7 h-7 text-green-400" strokeWidth={2} />
          
          {/* Notification dot */}
          <motion.div
            className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="glass-card px-4 py-2 rounded-lg shadow-xl border border-green-500/30 text-sm font-medium">
                <span className="text-slate-100">¡Hablemos por </span>
                <span className="text-green-400">WhatsApp</span>!
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-transparent border-l-slate-800/90"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </motion.div>
  );
}
