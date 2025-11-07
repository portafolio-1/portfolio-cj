import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send, Linkedin, Github, Coffee } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hola@tudominio.com',
    link: 'mailto:hola@tudominio.com',
    description: 'Respondo en menos de 24h'
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+34 123 456 789',
    link: 'tel:+34123456789',
    description: 'Mejor por WhatsApp'
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Madrid, España',
    link: 'https://maps.google.com/?q=Madrid,Spain',
    description: 'Trabajo remoto disponible'
  }
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/username',
    color: 'hover:text-blue-500',
    description: 'Conectemos profesionalmente'
  },
  {
    icon: Github,
    label: 'GitHub',
    url: 'https://github.com/username',
    color: 'hover:text-purple-500',
    description: 'Revisa mi código'
  },
  {
    icon: Coffee,
    label: 'Calendario',
    url: 'https://calendly.com/username',
    color: 'hover:text-amber-500',
    description: 'Agenda una charla'
  }
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simular envío de formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      
      // Reset form después del éxito
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          budget: '',
          timeline: ''
        });
        setSubmitStatus('idle');
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-100 font-['Poppins']">
                    ¡Hablemos! 👋
                  </h2>
                  <p className="text-slate-400 mt-2">
                    ¿Tienes un proyecto en mente? Me encantaría escucharte.
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-6">
                    Información de contacto
                  </h3>
                  
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <motion.a
                          key={info.label}
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all duration-200 group"
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                              {info.label}
                            </h4>
                            <p className="text-slate-300 text-sm mb-1">
                              {info.value}
                            </p>
                            <p className="text-slate-400 text-xs">
                              {info.description}
                            </p>
                          </div>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-6">
                    Conecta conmigo
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          whileHover={{ y: -5 }}
                          className={`group p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all duration-200 text-center ${social.color}`}
                        >
                          <Icon className="w-8 h-8 mx-auto mb-3 text-slate-300 group-hover:scale-110 transition-transform duration-200" />
                          <h4 className="font-semibold text-slate-100 text-sm mb-1">
                            {social.label}
                          </h4>
                          <p className="text-slate-400 text-xs">
                            {social.description}
                          </p>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Fun fact */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20"
                >
                  <div className="flex items-center mb-3">
                    <Coffee className="w-5 h-5 text-amber-400 mr-2" />
                    <h4 className="font-semibold text-slate-100">Fun Fact</h4>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Respondo mejor después de las 10 AM (necesito mi café ☕) y 
                    siempre contesto con más entusiasmo a proyectos interesantes. 
                    <span className="text-cyan-400"> ¡Sorpréndeme!</span>
                  </p>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-xl font-semibold text-slate-100 mb-6">
                  Cuéntame sobre tu proyecto
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Tu nombre *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200"
                        placeholder="juan@empresa.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200"
                      placeholder="Desarrollo de aplicación web"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">
                        Presupuesto aproximado
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200"
                      >
                        <option value="">Selecciona rango</option>
                        <option value="< 5k">Menos de €5,000</option>
                        <option value="5k-15k">€5,000 - €15,000</option>
                        <option value="15k-30k">€15,000 - €30,000</option>
                        <option value="30k+">Más de €30,000</option>
                        <option value="discuss">A discutir</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-slate-300 mb-2">
                        Timeline esperado
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200"
                      >
                        <option value="">Selecciona timeline</option>
                        <option value="urgent">ASAP (&lt; 2 semanas)</option>
                        <option value="fast">Rápido (2-6 semanas)</option>
                        <option value="normal">Normal (2-3 meses)</option>
                        <option value="flexible">Flexible (3+ meses)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Cuéntame más sobre tu proyecto *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors duration-200 resize-none"
                      placeholder="Describe tu visión, objetivos, usuarios target, tecnologías preferidas... ¡Todo lo que creas relevante!"
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Enviando...
                      </div>
                    ) : submitStatus === 'success' ? (
                      <div className="flex items-center text-green-400">
                        ✅ ¡Mensaje enviado!
                      </div>
                    ) : submitStatus === 'error' ? (
                      <div className="flex items-center text-red-400">
                        ❌ Error al enviar
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-5 h-5 mr-2" />
                        Enviar mensaje
                      </div>
                    )}
                  </motion.button>
                  
                  <p className="text-xs text-slate-400 text-center">
                    Al enviar este formulario, acepto ser contactado sobre este proyecto.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}