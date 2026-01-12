import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import LifecycleSection from './components/LifecycleSection';
import ProjectsSection from './components/ProjectsSection';
import DeploymentSection from './components/DeploymentSection';
import GrowthSection from './components/GrowthSection';
import LearningSection from './components/LearningSection';
import ContactSection from './components/ContactSection';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'lifecycle', 'projects', 'deployment', 'growth', 'learning', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      <main>
        <HeroSection />
        <LifecycleSection />
        <ProjectsSection />
        <DeploymentSection />
        <GrowthSection />
        <LearningSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
