import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateSpecies, updateColors, updateFeatures } from '../store/petSlice';
import { SpeciesType } from '../types';
import { Dog, Cat, Rabbit, Bird, Flame, Palette, Smile } from 'lucide-react';

const speciesList: { id: SpeciesType; label: string; icon: any }[] = [
  { id: 'dog', label: 'Dog', icon: Dog },
  { id: 'cat', label: 'Cat', icon: Cat },
  { id: 'rabbit', label: 'Rabbit', icon: Rabbit },
  { id: 'bird', label: 'Bird', icon: Bird },
  { id: 'dragon', label: 'Dragon', icon: Flame }
];

const colorPalettes = [
  { name: 'Amber Gold', primary: '#f59e0b', secondary: '#ffffff', accent: '#ef4444', eyes: '#1e293b' },
  { name: 'Midnight Cat', primary: '#3b82f6', secondary: '#e2e8f0', accent: '#ec4899', eyes: '#10b981' },
  { name: 'Pink Cloud', primary: '#ec4899', secondary: '#fff1f2', accent: '#8b5cf6', eyes: '#1e1b4b' },
  { name: 'Emerald Dragon', primary: '#10b981', secondary: '#ecfdf5', accent: '#f59e0b', eyes: '#ef4444' },
  { name: 'Violet Mystic', primary: '#8b5cf6', secondary: '#f5f3ff', accent: '#06b6d4', eyes: '#000000' }
];

export const PetLibrary: React.FC = () => {
  const dispatch = useDispatch();
  const pet = useSelector((state: RootState) => state.pet.currentPet);

  return (
    <div className="panel-card">
      <div className="panel-title">
        <Dog size={20} color="#6366f1" /> Pet Species & Customizer
      </div>

      {/* Species Selector */}
      <div className="control-group">
        <label className="control-label">Species Breed:</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {speciesList.map((item) => {
            const Icon = item.icon;
            const active = pet.species === item.id;
            return (
              <button
                key={item.id}
                onClick={() => dispatch(updateSpecies(item.id))}
                style={{
                  background: active ? '#6366f1' : 'rgba(255,255,255,0.04)',
                  color: '#fff',
                  border: active ? '1px solid #a5b4fc' : '1px solid var(--border-light)',
                  padding: '8px 4px',
                  borderRadius: 8,
                  fontSize: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palettes */}
      <div className="control-group">
        <label className="control-label">Color Presets:</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {colorPalettes.map((cp, idx) => (
            <button
              key={idx}
              onClick={() => dispatch(updateColors(cp))}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: pet.colors.primary === cp.primary ? '1px solid #6366f1' : '1px solid var(--border-light)',
                borderRadius: 8,
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>{cp.name}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: cp.primary }} />
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: cp.secondary }} />
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: cp.accent }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Expression Selection */}
      <div className="control-group">
        <label className="control-label">Facial Expression:</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['happy', 'curious', 'sleepy', 'excited', 'heroic'].map((exp) => (
            <button
              key={exp}
              onClick={() => dispatch(updateFeatures({ expression: exp as any }))}
              style={{
                background: pet.features.expression === exp ? '#ec4899' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: '0.75rem',
                border: '1px solid var(--border-light)',
                textTransform: 'capitalize'
              }}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
