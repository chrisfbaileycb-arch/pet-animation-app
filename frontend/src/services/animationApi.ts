import { ApiClient } from './apiClient';
import { AnimationSequence, PresetMotion } from '../types';

export const animationApi = {
  getAnimations: async (petId: string): Promise<{ animations: AnimationSequence[] }> => ApiClient.get(`/animations/pet/${petId}`),
  saveAnimation: async (animData: Partial<AnimationSequence>): Promise<{ animation: AnimationSequence }> => ApiClient.post('/animations', animData),
  getPresets: async (): Promise<{ presets: PresetMotion[] }> => ApiClient.get('/presets')
};
