import { KeyframeNode } from './Animation';

export interface Preset {
  id: string;
  name: string;
  description: string;
  species: string;
  durationMs: number;
  keyframes: KeyframeNode[];
  tags: string[];
}
