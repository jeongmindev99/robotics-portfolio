import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import LifecycleSection from '../components/LifecycleSection';
import ProjectsSection from '../components/ProjectsSection';
import DeploymentSection from '../components/DeploymentSection';
import GrowthSection from '../components/GrowthSection';
import LearningSection from '../components/LearningSection';
import ContactSection from '../components/ContactSection';
import AdminLoginPrompt from '../components/AdminLoginPrompt';
import AdminBar from '../components/AdminBar';

function PortfolioPage() {
  const { isAdmin, isAuthed } = useAdmin();
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
      {isAdmin && !isAuthed && <AdminLoginPrompt />}
      {isAdmin && isAuthed && <AdminBar />}
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      <main style={isAdmin && isAuthed ? { paddingTop: '48px' } : undefined}>
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

export default PortfolioPage;
