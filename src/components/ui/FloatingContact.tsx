import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, Calendar } from 'lucide-react';
import { useState } from 'react';

interface FloatingContactProps {
  onOpenModal: () => void;
}

const contactOptions = [
  {
    icon: MessageSquare,
    label: 'Mensaje',
    action: 'modal',
    color: 'from-cyan-500 to-blue-600',
    hoverColor: 'hover:shadow-cyan-500/25'
  },
  {
    icon: Phone,
    label: 'Llamar',
    action: 'tel:+34123456789',
    color: 'from-green-500 to-emerald-600',
    hoverColor: 'hover:shadow-green-500/25'
  },
  {
    icon: Mail,
    label: 'Email',
    action: 'mailto:hola@tudominio.com',
    color: 'from-purple-500 to-violet-600',
    hoverColor: 'hover:shadow-purple-500/25'
  },
  {
    icon: Calendar,
    label: 'Agenda',
    action: 'https://calendly.com/username',
    color: 'from-amber-500 to-orange-600',
    hoverColor: 'hover:shadow-amber-500/25'
  }
];

export function FloatingContact({ onOpenModal }: FloatingContactProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOptionClick = (action: string) => {
    if (action === 'modal') {
      onOpenModal();
    } else if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      window.location.href = action;
    }
    setIsExpanded(false);
  };

  const containerVariants = {
    expanded: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    collapsed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    expanded: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25
      }
    },
    collapsed: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <motion.div
        variants={containerVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        className="flex flex-col-reverse items-end space-y-reverse space-y-4"
      >
        {/* Contact Options */}
        {contactOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.label}
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="px-3 py-2 bg-slate-800 text-slate-100 text-sm rounded-lg shadow-lg border border-slate-700 whitespace-nowrap"
              >
                {option.label}
              </motion.div>

              {/* Button */}
              <motion.button
                onClick={() => handleOptionClick(option.action)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center shadow-lg ${option.hoverColor} hover:shadow-lg transition-all duration-200`}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          );
        })}

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isExpanded ? 45 : 0 }}
          className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-cyan-500/25 hover:shadow-2xl transition-all duration-300 border-4 border-white/10"
        >
          <motion.div
            animate={{ rotate: isExpanded ? -45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white text-2xl font-bold"
              >
                ×
              </motion.div>
            ) : (
              <MessageSquare className="w-8 h-8 text-white" />
            )}
          </motion.div>
        </motion.button>

        {/* Notification Badge */}
        {!isExpanded && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">4</span>
          </motion.div>
        )}
      </motion.div>

      {/* Background overlay cuando está expandido */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-black/20 -z-10"
        />
      )}
    </div>
  );
}