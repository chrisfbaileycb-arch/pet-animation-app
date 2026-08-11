import { db } from '../db';
import { Animation, KeyframeNode } from '../models/Animation';

export class AnimationService {
  async createAnimation(userId: string, petId: string, name: string, keyframes: KeyframeNode[], durationMs: number = 1000): Promise<Animation> {
    const animation: Animation = {
      id: `anim-${Date.now()}`,
      userId,
      petId,
      name,
      fps: 30,
      durationMs,
      keyframes,
      isLoop: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.animations.set(animation.id, animation);
    return animation;
  }

  async getAnimationsByPet(petId: string): Promise<Animation[]> {
    return Array.from(db.animations.values()).filter(a => a.petId === petId);
  }

  async getAnimationById(animId: string): Promise<Animation | null> {
    return db.animations.get(animId) || null;
  }

  async updateKeyframes(animId: string, userId: string, keyframes: KeyframeNode[], durationMs?: number): Promise<Animation> {
    const anim = db.animations.get(animId);
    if (!anim) throw new Error('Animation not found');
    if (anim.userId !== userId) throw new Error('Unauthorized');

    anim.keyframes = keyframes;
    if (durationMs) anim.durationMs = durationMs;
    anim.updatedAt = new Date();

    db.animations.set(animId, anim);
    return anim;
  }
}

export const animationService = new AnimationService();
