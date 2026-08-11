import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KeyframeNode, PresetMotion } from '../types';

interface AnimationState {
  isPlaying: boolean;
  currentTimeMs: number;
  durationMs: number;
  playbackSpeed: number;
  keyframes: KeyframeNode[];
  presets: PresetMotion[];
  selectedKeyframeIndex: number;
}

const defaultKeyframes: KeyframeNode[] = [
  { time: 0, rotTail: -20, rotEarL: -5, rotEarR: 5, posY: 0 },
  { time: 300, rotTail: 20, rotEarL: 5, rotEarR: -5, posY: -10 },
  { time: 600, rotTail: -20, rotEarL: -5, rotEarR: 5, posY: 0 },
  { time: 900, rotTail: 20, rotEarL: 5, rotEarR: -5, posY: -10 },
  { time: 1200, rotTail: -20, rotEarL: -5, rotEarR: 5, posY: 0 }
];

const initialState: AnimationState = {
  isPlaying: true,
  currentTimeMs: 0,
  durationMs: 1200,
  playbackSpeed: 1.0,
  keyframes: defaultKeyframes,
  presets: [],
  selectedKeyframeIndex: 0
};

export const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTimeMs = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.durationMs = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.playbackSpeed = action.payload;
    },
    setKeyframes: (state, action: PayloadAction<KeyframeNode[]>) => {
      state.keyframes = action.payload;
    },
    addKeyframe: (state, action: PayloadAction<KeyframeNode>) => {
      state.keyframes.push(action.payload);
      state.keyframes.sort((a, b) => a.time - b.time);
    },
    setPresets: (state, action: PayloadAction<PresetMotion[]>) => {
      state.presets = action.payload;
    },
    selectKeyframe: (state, action: PayloadAction<number>) => {
      state.selectedKeyframeIndex = action.payload;
    }
  }
});

export const {
  togglePlay,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setSpeed,
  setKeyframes,
  addKeyframe,
  setPresets,
  selectKeyframe
} = animationSlice.actions;

export default animationSlice.reducer;
