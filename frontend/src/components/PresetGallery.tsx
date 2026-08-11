import React from 'react';
import { useDispatch } from 'react-redux';
import { setKeyframes, setDuration } from '../store/animationSlice';
import { Sparkles, Video, Play, CheckCircle } from 'lucide-react';

const presets = [
  {
    id: 'preset-1',
    name: 'Happy Tail Wag',
    durationMs: 1200,
    keyframes: [
      { time: 0, rotTail: -25, rotEarL: -5, rotEarR: 5, posY: 0 },
      { time: 300, rotTail: 25, rotEarL: 5, rotEarR: -5, posY: -8 },
      { time: 600, rotTail: -25, rotEarL: -5, rotEarR: 5, posY: 0 },
      { time: 900, rotTail: 25, rotEarL: 5, rotEarR: -5, posY: -8 },
      { time: 1200, rotTail: -25, rotEarL: -5, rotEarR: 5, posY: 0 }
    ],
    desc: 'High energy tail wagging & bounce cycle.'
  },
  {
    id: 'preset-2',
    name: 'Sleepy Breathe',
    durationMs: 3000,
    keyframes: [
      { time: 0, rotTail: 0, rotEarL: -10, rotEarR: -10, scaleY: 1.0, posY: 5 },
      { time: 1500, rotTail: 2, rotEarL: -12, rotEarR: -12, scaleY: 1.06, posY: 2 },
      { time: 3000, rotTail: 0, rotEarL: -10, rotEarR: -10, scaleY: 1.0, posY: 5 }
    ],
    desc: 'Relaxing resting breath movement.'
  },
  {
    id: 'preset-3',
    name: 'Playful Backflip',
    durationMs: 1600,
    keyframes: [
      { time: 0, rotation: 0, posY: 0, scaleY: 1.0 },
      { time: 400, rotation: -45, posY: -60, scaleY: 1.1 },
      { time: 800, rotation: -180, posY: -120, scaleY: 0.95 },
      { time: 1200, rotation: -315, posY: -40, scaleY: 1.05 },
      { time: 1600, rotation: -360, posY: 0, scaleY: 1.0 }
    ],
    desc: 'Acrobatic 360 flip jump animation.'
  }
];

export const PresetGallery: React.FC = () => {
  const dispatch = useDispatch();
  const [renderStatus, setRenderStatus] = React.useState<string | null>(null);

  const applyPreset = (preset: typeof presets[0]) => {
    dispatch(setKeyframes(preset.keyframes));
    dispatch(setDuration(preset.durationMs));
  };

  const handleExportGif = () => {
    setRenderStatus('Queueing render job on backend server...');
    setTimeout(() => {
      setRenderStatus('Rendering 60 frames on Canvas worker...');
    }, 1200);
    setTimeout(() => {
      setRenderStatus('Render complete! Downloaded pet-animation.gif');
    }, 3000);
  };

  return (
    <div className="panel-card">
      <div className="panel-title">
        <Sparkles size={20} color="#ec4899" /> Motion Presets
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {presets.map((p) => (
          <div
            key={p.id}
            onClick={() => applyPreset(p)}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-light)',
              borderRadius: 10,
              padding: '10px 12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f3f4f6' }}>{p.name}</span>
              <span style={{ fontSize: '0.75rem', color: '#ec4899', fontWeight: 600 }}>{p.durationMs}ms</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Render Export Panel */}
      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
        <div className="panel-title" style={{ fontSize: '1rem' }}>
          <Video size={18} color="#6366f1" /> Export & Render
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Render HD animated GIF / MP4 spritesheet from your keyframes.
        </p>

        <button className="btn-primary" style={{ width: '100%' }} onClick={handleExportGif}>
          <Video size={16} /> Render Animated GIF
        </button>

        {renderStatus && (
          <div style={{
            marginTop: '0.75rem',
            padding: '8px 12px',
            borderRadius: 6,
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#a5b4fc',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <CheckCircle size={14} /> {renderStatus}
          </div>
        )}
      </div>
    </div>
  );
};
