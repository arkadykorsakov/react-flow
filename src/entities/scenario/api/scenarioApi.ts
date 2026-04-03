import type { FlowScenario } from '../model/types';
import { mockScenarios } from 'mocks/mockScenarios';

export async function fetchScenarioList(): Promise<FlowScenario[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockScenarios;
}
