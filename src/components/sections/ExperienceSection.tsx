import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useAdvancedEffects';

// Datos de experiencia
const experiences = [
  {
    id: 1,
    position: 'Desarrollador Senior Full Stack',
    company: 'Tech Solutions Inc.',
    location: 'Madrid, España',
    period: '2022 - Presente',
    description: 'Lidero el desarrollo de aplicaciones web escalables utilizando React, Node.js y PostgreSQL. Implementé arquitecturas de microservicios que mejoraron el rendimiento en un 40%.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    achievements: [
      'Mejoré el rendimiento de la aplicación principal en un 40%',
      'Lidero un equipo de 4 desarrolladores junior',
      'Implementé CI/CD reduciendo el tiempo de deploy en 60%'
    ]
  },
  {
    id: 2,
    position: 'Desarrollador Full Stack',
    company: 'StartupXYZ',
    location: 'Barcelona, España',
    period: '2021 - 2022',
    description: 'Desarrollé desde cero una plataforma de e-commerce que alcanzó 10K usuarios activos mensuales. Colaboré estrechamente con el equipo de diseño UX/UI.',
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Stripe API'],
    achievements: [
      'Desarrollé plataforma completa desde MVP hasta producción',
      'Integré sistemas de pago seguros con Stripe',
      'Optimicé SEO alcanzando posición #3 en Google'
    ]
  },
  {
    id: 3,
    position: 'Desarrollador Frontend',
    company: 'Digital Agency Pro',
    location: 'Valencia, España',
    period: '2020 - 2021',
    description: 'Especializado en crear interfaces de usuario atractivas y funcionales para clientes corporativos. Trabajé con metodologías ágiles y control de versiones.',
    technologies: ['React', 'TypeScript', 'Sass', 'Figma'],
    achievements: [
      'Entregué +15 proyectos web exitosos',
      'Reduje tiempo de carga promedio en un 35%',
      'Implementé design systems reutilizables'
    ]
  }
];

export function ExperienceSection() {
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Experiencia Profesional
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Mi trayectoria profesional construyendo soluciones digitales innovadoras
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical del timeline */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:space-x-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-4 border-slate-800 z-10"></div>

                {/* Content card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-900 rounded-xl p-8 border border-slate-700 hover:border-cyan-500 transition-colors duration-300 shadow-lg"
                  >
                    {/* Period */}
                    <div className="flex items-center space-x-2 text-cyan-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">{exp.period}</span>
                    </div>

                    {/* Position & Company */}
                    <h3 className="text-xl font-bold text-slate-100 mb-2">
                      {exp.position}
                    </h3>
                    
                    <div className="flex items-center space-x-4 text-slate-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Key achievements */}
                    <div className="mb-6">
                      <h4 className="text-slate-100 font-semibold mb-3">Logros Principales:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-slate-300 text-sm">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-slate-100 font-semibold mb-3">Tecnologías:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-700 text-cyan-400 rounded-full text-xs font-medium border border-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}