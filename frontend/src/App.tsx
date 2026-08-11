import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PetLibrary } from './components/PetLibrary';
import { PetCanvas } from './components/PetCanvas';
import { AnimationStudio } from './components/AnimationStudio';
import { Timeline } from './components/Timeline';
import { PresetGallery } from './components/PresetGallery';
import { AuthModal } from './components/AuthModal';
import './styles/theme.css';
import './styles/App.css';

export const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="app-container">
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <HeroSection />

      <main className="main-layout">
        {/* Left Column: Pet Customizer Library */}
        <aside>
          <PetLibrary />
        </aside>

        {/* Center Column: Canvas & Timeline Controls */}
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <PetCanvas />
          <AnimationStudio />
          <Timeline />
        </section>

        {/* Right Column: Presets & Render Jobs */}
        <aside>
          <PresetGallery />
        </aside>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default App;
