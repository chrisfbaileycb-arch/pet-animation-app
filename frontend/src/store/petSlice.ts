import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet, SpeciesType } from '../types';

interface PetState {
  currentPet: Pet;
  petList: Pet[];
}

const defaultPet: Pet = {
  id: 'pet-default-1',
  userId: 'demo-user',
  name: 'Buster',
  species: 'dog',
  colors: {
    primary: '#f59e0b',
    secondary: '#ffffff',
    accent: '#ef4444',
    eyes: '#1e293b',
    outline: '#0f172a'
  },
  features: {
    earType: 'floppy',
    tailLength: 'medium',
    expression: 'happy',
    accessory: 'red-collar'
  }
};

const initialState: PetState = {
  currentPet: defaultPet,
  petList: [defaultPet]
};

export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setCurrentPet: (state, action: PayloadAction<Pet>) => {
      state.currentPet = action.payload;
    },
    updateSpecies: (state, action: PayloadAction<SpeciesType>) => {
      state.currentPet.species = action.payload;
    },
    updateColors: (state, action: PayloadAction<Partial<Pet['colors']>>) => {
      state.currentPet.colors = { ...state.currentPet.colors, ...action.payload };
    },
    updateFeatures: (state, action: PayloadAction<Partial<Pet['features']>>) => {
      state.currentPet.features = { ...state.currentPet.features, ...action.payload };
    },
    setPetList: (state, action: PayloadAction<Pet[]>) => {
      state.petList = action.payload;
    }
  }
});

export const { setCurrentPet, updateSpecies, updateColors, updateFeatures, setPetList } = petSlice.actions;
export default petSlice.reducer;
