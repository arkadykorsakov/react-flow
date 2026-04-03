import type { RootState } from 'app/providers/StoreProvider';

export const selectScenarioList = (state: RootState) => state.scenario.list;
export const selectScenarioLoading = (state: RootState) => state.scenario.isLoading;
export const selectScenarioError = (state: RootState) => state.scenario.error;
export const selectScenarioSaving = (state: RootState) => state.scenario.isSaving;
export const selectScenarioSaveError = (state: RootState) => state.scenario.saveError;
