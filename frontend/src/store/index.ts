import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import petReducer from './petSlice';
import animationReducer from './animationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pet: petReducer,
    animation: animationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
