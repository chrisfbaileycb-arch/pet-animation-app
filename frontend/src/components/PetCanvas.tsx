import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCurrentTime } from '../store/animationSlice';

export const PetCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();
  const pet = useSelector((state: RootState) => state.pet.currentPet);
  const { isPlaying, currentTimeMs, durationMs, playbackSpeed, keyframes } = useSelector(
    (state: RootState) => state.animation
  );

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTimestamp) * playbackSpeed;
      lastTimestamp = now;

      if (isPlaying) {
        let nextTime = currentTimeMs + delta;
        if (nextTime >= durationMs) {
          nextTime = 0;
        }
        dispatch(setCurrentTime(nextTime));
      }

      drawPetCanvas();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, currentTimeMs, durationMs, playbackSpeed, keyframes, pet]);

  const drawPetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear Background
    ctx.clearRect(0, 0, width, height);

    // Draw Grid Pattern
    ctx.strokeStyle = '#232738';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Calculate Interpolated Keyframe values
    const currentFrame = getCurrentInterpolatedFrame(currentTimeMs, keyframes, durationMs);

    const centerX = width / 2 + (currentFrame.posX || 0);
    const centerY = height / 2 + 30 + (currentFrame.posY || 0);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(((currentFrame.rotation || 0) * Math.PI) / 180);
    ctx.scale(currentFrame.scaleX || 1, currentFrame.scaleY || 1);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 75, 55, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fill();

    // 1. Draw Tail
    ctx.save();
    ctx.translate(-45, 20);
    ctx.rotate(((currentFrame.rotTail || 0) * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-30, -20, -50, -5);
    ctx.quadraticCurveTo(-30, 10, 0, 10);
    ctx.fillStyle = pet.colors.secondary || '#ffffff';
    ctx.fill();
    ctx.strokeStyle = pet.colors.outline;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // 2. Draw Body
    ctx.beginPath();
    ctx.ellipse(0, 25, 50, 42, 0, 0, Math.PI * 2);
    ctx.fillStyle = pet.colors.primary;
    ctx.fill();
    ctx.strokeStyle = pet.colors.outline;
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // 3. Draw Left Ear
    ctx.save();
    ctx.translate(-30, -45);
    ctx.rotate(((currentFrame.rotEarL || 0) * Math.PI) / 180);
    ctx.beginPath();
    ctx.ellipse(-10, -20, 14, 30, -Math.PI / 12, 0, Math.PI * 2);
    ctx.fillStyle = pet.colors.primary;
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 4. Draw Right Ear
    ctx.save();
    ctx.translate(30, -45);
    ctx.rotate(((currentFrame.rotEarR || 0) * Math.PI) / 180);
    ctx.beginPath();
    ctx.ellipse(10, -20, 14, 30, Math.PI / 12, 0, Math.PI * 2);
    ctx.fillStyle = pet.colors.primary;
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 5. Draw Head
    ctx.beginPath();
    ctx.arc(0, -35, 45, 0, Math.PI * 2);
    ctx.fillStyle = pet.colors.primary;
    ctx.fill();
    ctx.strokeStyle = pet.colors.outline;
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // 6. Draw Muzzle / Belly Accent
    ctx.beginPath();
    ctx.ellipse(0, -25, 22, 16, 0, 0, Math.PI * 2);
    ctx.fillStyle = pet.colors.secondary;
    ctx.fill();

    // 7. Draw Nose
    ctx.beginPath();
    ctx.arc(0, -32, 6, 0, Math.PI * 2);
    ctx.fillStyle = pet.colors.outline;
    ctx.fill();

    // 8. Draw Eyes
    ctx.beginPath();
    ctx.arc(-18, -42, 7, 0, Math.PI * 2);
    ctx.arc(18, -42, 7, 0, Math.PI * 2);
    ctx.fillStyle = pet.colors.eyes;
    ctx.fill();

    // Eye Highlights
    ctx.beginPath();
    ctx.arc(-16, -44, 2.5, 0, Math.PI * 2);
    ctx.arc(20, -44, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // 9. Accessory (e.g. Red Collar / Ribbon)
    ctx.beginPath();
    ctx.roundRect(-28, -5, 56, 10, 4);
    ctx.fillStyle = pet.colors.accent;
    ctx.fill();

    ctx.restore();
  };

  return (
    <div className="canvas-wrapper">
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        background: 'rgba(0,0,0,0.6)',
        padding: '6px 12px',
        borderRadius: 8,
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#a5b4fc',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        🐾 {pet.name} ({pet.species.toUpperCase()}) | {Math.round(currentTimeMs)}ms / {durationMs}ms
      </div>

      <canvas ref={canvasRef} width={640} height={420} />
    </div>
  );
};

// Keyframe Interpolator Helper
function getCurrentInterpolatedFrame(timeMs: number, keyframes: any[], totalDurationMs: number) {
  if (!keyframes || keyframes.length === 0) {
    return { rotTail: 0, rotEarL: 0, rotEarR: 0, rotation: 0, posY: 0, scaleY: 1 };
  }
  if (keyframes.length === 1) return keyframes[0];

  const loopTime = timeMs % totalDurationMs;

  let prev = keyframes[0];
  let next = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (loopTime >= keyframes[i].time && loopTime <= keyframes[i + 1].time) {
      prev = keyframes[i];
      next = keyframes[i + 1];
      break;
    }
  }

  const range = next.time - prev.time;
  const factor = range > 0 ? (loopTime - prev.time) / range : 0;

  const lerp = (a: number = 0, b: number = 0) => a + (b - a) * factor;

  return {
    rotTail: lerp(prev.rotTail, next.rotTail),
    rotEarL: lerp(prev.rotEarL, next.rotEarL),
    rotEarR: lerp(prev.rotEarR, next.rotEarR),
    rotation: lerp(prev.rotation, next.rotation),
    posY: lerp(prev.posY, next.posY),
    posX: lerp(prev.posX, next.posX),
    scaleY: lerp(prev.scaleY ?? 1, next.scaleY ?? 1),
    scaleX: lerp(prev.scaleX ?? 1, next.scaleX ?? 1)
  };
}
