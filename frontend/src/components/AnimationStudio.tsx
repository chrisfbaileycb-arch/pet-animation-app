import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { togglePlay, setSpeed, setDuration, setCurrentTime } from '../store/animationSlice';
import { Play, Pause, RotateCcw, FastForward, Sliders } from 'lucide-react';

export const AnimationStudio: React.FC = () => {
  const dispatch = useDispatch();
  const { isPlaying, currentTimeMs, durationMs, playbackSpeed } = useSelector(
    (state: RootState) => state.animation
  );

  return (
    <div className="panel-card" style={{ marginTop: '1rem' }}>
      <div className="panel-title">
        <Sliders size={20} color="#6366f1" /> Animation Playback Control
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <button className="btn-primary" onClick={() => dispatch(togglePlay())}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button className="btn-secondary" onClick={() => dispatch(setCurrentTime(0))}>
          <RotateCcw size={16} /> Reset
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
          <FastForward size={16} color="var(--text-muted)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Speed:</span>
          {[0.5, 1.0, 1.5, 2.0].map((s) => (
            <button
              key={s}
              style={{
                background: playbackSpeed === s ? '#6366f1' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: 6,
                fontSize: '0.8rem',
                border: '1px solid var(--border-light)'
              }}
              onClick={() => dispatch(setSpeed(s))}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <span className="control-label">Scrubber Position:</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6366f1' }}>
            {Math.round(currentTimeMs)} ms / {durationMs} ms
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={durationMs}
          value={currentTimeMs}
          onChange={(e) => dispatch(setCurrentTime(Number(e.target.value)))}
          style={{ width: '100%', accentColor: '#6366f1', height: 6, cursor: 'pointer' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span className="control-label" style={{ marginBottom: 0 }}>Total Sequence Duration:</span>
        <select
          value={durationMs}
          onChange={(e) => dispatch(setDuration(Number(e.target.value)))}
          style={{
            background: 'var(--bg-panel)',
            color: '#fff',
            border: '1px solid var(--border-light)',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: '0.85rem'
          }}
        >
          <option value={800}>800 ms (Fast Loop)</option>
          <option value={1200}>1200 ms (Standard)</option>
          <option value={2000}>2000 ms (Slow)</option>
          <option value={3000}>3000 ms (Cinematic)</option>
        </select>
      </div>
    </div>
  );
};
