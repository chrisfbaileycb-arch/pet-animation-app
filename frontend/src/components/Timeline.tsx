import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { selectKeyframe, addKeyframe } from '../store/animationSlice';
import { Film, Plus, Sparkles } from 'lucide-react';

export const Timeline: React.FC = () => {
  const dispatch = useDispatch();
  const { keyframes, currentTimeMs, durationMs, selectedKeyframeIndex } = useSelector(
    (state: RootState) => state.animation
  );

  const handleAddKeyframeAtCurrent = () => {
    dispatch(
      addKeyframe({
        time: Math.round(currentTimeMs),
        rotTail: (Math.random() - 0.5) * 40,
        rotEarL: (Math.random() - 0.5) * 20,
        rotEarR: (Math.random() - 0.5) * 20,
        posY: (Math.random() - 0.5) * 15
      })
    );
  };

  return (
    <div className="panel-card" style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div className="panel-title" style={{ marginBottom: 0 }}>
          <Film size={20} color="#ec4899" /> Keyframe Timeline
        </div>
        <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={handleAddKeyframeAtCurrent}>
          <Plus size={14} /> Keyframe @ {Math.round(currentTimeMs)}ms
        </button>
      </div>

      <div style={{
        position: 'relative',
        height: 64,
        background: '#111422',
        borderRadius: 8,
        border: '1px solid var(--border-light)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Scrubber indicator */}
        <div style={{
          position: 'absolute',
          left: `${(currentTimeMs / durationMs) * 100}%`,
          top: 0,
          bottom: 0,
          width: 2,
          background: '#ec4899',
          boxShadow: '0 0 10px #ec4899',
          zIndex: 10
        }} />

        {/* Keyframe Markers */}
        {keyframes.map((kf, idx) => {
          const leftPercent = (kf.time / durationMs) * 100;
          const isSelected = selectedKeyframeIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => dispatch(selectKeyframe(idx))}
              title={`Keyframe #${idx + 1} at ${kf.time}ms`}
              style={{
                position: 'absolute',
                left: `${leftPercent}%`,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: isSelected ? '#ec4899' : '#6366f1',
                border: isSelected ? '2px solid white' : '2px solid #111422',
                cursor: 'pointer',
                transform: 'translateX(-50%)',
                boxShadow: isSelected ? '0 0 10px #ec4899' : 'none',
                transition: 'transform 0.15s'
              }}
            />
          );
        })}
      </div>

      <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Sparkles size={14} color="#6366f1" /> Click on keyframe nodes to edit limb angles or click "+ Keyframe" to record pose.
      </div>
    </div>
  );
};
