import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

  // 1. Initialize Lenis Smooth Scrolling
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });

      setLenisRef(lenis);

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    } catch (err) {
      console.warn('Lenis smooth scroll initialization fallback:', err);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  // 2. Active Section Scroll Observer
  useEffect(() => {
    const sections = ['hero', 'skills', 'experience', 'projects', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Navigation Handler using Lenis or scrollIntoView
  const handleNavigate = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    if (lenisRef) {
      lenisRef.scrollTo(targetElement, { offset: -80 });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F9FAFB] relative selection:bg-sky-500/30 selection:text-sky-300 font-sans antialiased">
      
      {/* Dual Ambient Neon Background Glow Spheres */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="fixed top-1/3 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none z-0 animate-pulse-glow" style={{ animationDelay: '4s' }} />
      <div className="fixed bottom-10 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Main Content Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

        <main className="flex-grow">
          <Hero onNavigate={handleNavigate} />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Floating AI Chat Assistant at bottom-right */}
      <ChatWidget />
    </div>
  );
}
