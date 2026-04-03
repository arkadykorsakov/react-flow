import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';
import { scenarioReducer } from 'entities/scenario';

export const store = configureStore({
  reducer: {
    app: appReducer,
    scenario: scenarioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
