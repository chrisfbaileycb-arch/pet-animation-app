export type SpeciesType = 'dog' | 'cat' | 'rabbit' | 'bird' | 'dragon';

export interface PetColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  eyes: string;
  outline: string;
}

export interface PetFeatures {
  earType: string;
  tailLength: 'short' | 'medium' | 'long' | 'fluffy';
  expression: 'happy' | 'curious' | 'sleepy' | 'excited' | 'heroic';
  accessory?: string;
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: SpeciesType;
  colors: PetColorPalette;
  features: PetFeatures;
}

export interface KeyframeNode {
  time: number; // ms
  rotTail?: number;
  rotEarL?: number;
  rotEarR?: number;
  rotation?: number;
  posY?: number;
  posX?: number;
  scaleY?: number;
  scaleX?: number;
  expression?: string;
}

export interface AnimationSequence {
  id: string;
  petId: string;
  name: string;
  fps: number;
  durationMs: number;
  keyframes: KeyframeNode[];
  isLoop: boolean;
}

export interface PresetMotion {
  id: string;
  name: string;
  description: string;
  species: string;
  durationMs: number;
  keyframes: KeyframeNode[];
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  username: string;
}
