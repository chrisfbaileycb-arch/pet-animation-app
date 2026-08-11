import React from 'react';
import { Play, Palette, Zap, Cpu } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.12) 0%, transparent 100%)',
      padding: '2.5rem 2rem 1.5rem',
      textAlign: 'center',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Animate Custom Pet Avatars in Real-Time
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          Design custom species, fine-tune skeletal keyframes, and bring your animated pets to life with smooth HTML5 Canvas rendering & WebSockets synchronization.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#a5b4fc' }}>
            <Palette size={18} /> Custom Color Palettes & Breeds
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#f472b6' }}>
            <Play size={18} /> Interactive Keyframe Timeline
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#34d399' }}>
            <Zap size={18} /> 60 FPS HTML5 Canvas Renderer
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#fbbf24' }}>
            <Cpu size={18} /> Socket.io Multi-User Sync
          </div>
        </div>
      </div>
    </div>
  );
};
