import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';
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

  // 1. Initialize Lenis Smooth Scrolling (respecting reduced-motion preferences)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: Lenis | null = null;
    let rafId: number;

    try {
      lenis = new Lenis({
        duration: 1.1,
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
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

      if (nearBottom) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 220;

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (lenisRef && !prefersReducedMotion) {
      lenisRef.scrollTo(targetElement, { offset: -72 });
    } else {
      targetElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#080B12] text-[#F8FAFC] relative selection:bg-[#22B8F0]/25 selection:text-[#F8FAFC] font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#22B8F0] focus:text-[#080B12] focus:font-semibold focus:text-xs"
        >
          Skip to main content
        </a>

        {/* Main Content Shell */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

          <main id="main-content" className="flex-grow">
            <Hero onNavigate={handleNavigate} />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>

        {/* Floating AI Chat Assistant at bottom-right */}
        <ChatWidget onNavigate={handleNavigate} />
      </div>
    </MotionConfig>
  );
}
