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
  createdAt: Date;
  updatedAt: Date;
}
