import { PortfolioProvider, usePortfolioInit } from './context/PortfolioContext';
import { CreativeHeroSection } from './components/sections/CreativeHeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { PersonalSection } from './components/sections/PersonalSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Navbar } from './components/sections/Navbar';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ContactModal } from './components/ui/ContactModal';
import { FloatingContact } from './components/ui/FloatingContact';
import { useState } from 'react';

function AppContent() {
  usePortfolioInit();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Navigation */}
      <Navbar />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Main content */}
      <main className="relative">
        <CreativeHeroSection onOpenContactModal={() => setIsContactModalOpen(true)} />
        <AboutSection />
        <PersonalSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      {/* Floating Contact Button */}
      <FloatingContact onOpenModal={() => setIsContactModalOpen(true)} />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hola@tudominio.com"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              Email
            </a>
          </div>
          
          <div className="border-t border-slate-700 pt-8">
            <p className="text-slate-400 text-sm">
              © 2024 Mi Portfolio. Diseñado y desarrollado con ❤️ usando React, TypeScript y Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

export default App;
