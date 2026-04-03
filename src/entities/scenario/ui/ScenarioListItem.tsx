import type { FlowScenario } from '../model/types';
import { formatDateTime } from 'shared';
import type { ReactNode } from 'react';

interface ScenarioListItemProps {
  scenario: FlowScenario;
  actions?: ReactNode;
}

export function ScenarioListItem({ scenario, actions }: ScenarioListItemProps) {
  return (
    <li className="rounded-md border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium text-slate-900">{scenario.name}</span>
          <p className="text-sm text-slate-500">{formatDateTime(scenario.updatedAt)}</p>
        </div>
        {actions}
      </div>
    </li>
  );
}
