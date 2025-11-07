import { motion } from 'framer-motion';
import { Github, ExternalLink, Filter } from 'lucide-react';
import { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useAdvancedEffects';

// Tipos para los proyectos
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'fullstack' | 'frontend';
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

// Datos de proyectos
const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plataforma completa de comercio electrónico con panel de administración, gestión de inventario y pasarela de pagos integrada.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
    category: 'fullstack',
    githubUrl: 'https://github.com/username/ecommerce',
    demoUrl: 'https://demo.example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Aplicación móvil de gestión de tareas con colaboración en tiempo real y sincronización en la nube.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&auto=format',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    category: 'mobile',
    githubUrl: 'https://github.com/username/task-app',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Dashboard interactivo del clima con mapas en tiempo real, pronósticos detallados y alertas meteorológicas.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&auto=format',
    technologies: ['Vue.js', 'D3.js', 'API Weather', 'Mapbox'],
    category: 'web',
    githubUrl: 'https://github.com/username/weather',
    demoUrl: 'https://weather-demo.example.com',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Sitio web personal con animaciones avanzadas, diseño responsivo y optimización SEO.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&auto=format',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    category: 'frontend',
    githubUrl: 'https://github.com/username/portfolio',
    demoUrl: 'https://portfolio.example.com',
  },
  {
    id: 5,
    title: 'Social Media App',
    description: 'Red social con chat en tiempo real, compartir contenido multimedia y sistema de notificaciones.',
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&h=400&fit=crop&auto=format',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
    category: 'fullstack',
    githubUrl: 'https://github.com/username/social-app',
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'Aplicación de seguimiento de ejercicios con integración de wearables y análisis de datos.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format',
    technologies: ['Flutter', 'Firebase', 'HealthKit', 'Charts.js'],
    category: 'mobile',
    githubUrl: 'https://github.com/username/fitness-tracker',
  }
];

// Categorías para filtros
const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'mobile', label: 'Móvil' },
  { id: 'web', label: 'Web' },
];

export function ProjectsSection() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const [activeCategory, setActiveCategory] = useState('all');

  // Filtrar proyectos por categoría
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Mis Proyectos
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Una selección de mis trabajos más destacados y proyectos personales
          </p>
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid de proyectos responsivo */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20">
                {/* Imagen del proyecto */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay con links */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-slate-800/80 text-white rounded-full hover:bg-slate-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-cyan-600/80 text-white rounded-full hover:bg-cyan-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>

                  {/* Badge de destacado */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                      Destacado
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-slate-700 text-cyan-400 rounded-full text-xs font-medium border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-slate-300 mb-6">
            ¿Quieres ver más proyectos o colaborar en algo nuevo?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hablemos
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}