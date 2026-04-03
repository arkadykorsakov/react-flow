import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { FlowEdge, FlowNode, FlowScenario } from './types';
import { fetchScenarioList } from 'entities/scenario';

interface ScenarioState {
  list: FlowScenario[];
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
  saveError: string | null;
}

const initialState: ScenarioState = {
  list: [],
  isLoading: false,
  error: null,
  isSaving: false,
  saveError: null,
};

export const getScenarioList = createAsyncThunk('scenario/getScenarioList', async () => {
  return fetchScenarioList();
});

export const saveScenario = createAsyncThunk(
  'scenario/saveScenario',
  async (payload: { id: string; name: string; nodes: FlowNode[]; edges: FlowEdge[] }) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return payload;
  },
);

const scenarioSlice = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    updateScenario: (
      state,
      action: { payload: { id: string; changes: Partial<FlowScenario> } },
    ) => {
      const { id, changes } = action.payload;
      state.list = state.list.map((scenario) =>
        scenario.id === id
          ? {
              ...scenario,
              ...changes,
              updatedAt: new Date().toISOString(),
            }
          : scenario,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScenarioList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getScenarioList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getScenarioList.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось загрузить список сценариев';
      })
      .addCase(saveScenario.pending, (state) => {
        state.isSaving = true;
        state.saveError = null;
      })
      .addCase(saveScenario.fulfilled, (state, action) => {
        state.isSaving = false;
        const { id, name, nodes, edges } = action.payload;
        state.list = state.list.map((scenario) =>
          scenario.id === id
            ? {
                ...scenario,
                name,
                nodes,
                edges,
                updatedAt: new Date().toISOString(),
              }
            : scenario,
        );
      })
      .addCase(saveScenario.rejected, (state, action) => {
        state.isSaving = false;
        state.saveError =
          typeof action.payload === 'string'
            ? action.payload
            : (action.error.message ?? 'Не удалось сохранить сценарий');
      });
  },
});

export const scenarioReducer = scenarioSlice.reducer;
export const { updateScenario } = scenarioSlice.actions;
