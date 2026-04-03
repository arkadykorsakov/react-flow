import { useCallback, useEffect, useMemo, useState } from 'react';
import { copyFlowScenario } from '../lib/copyFlowScenario.ts';
import type { FlowNode, FlowScenario, FlowEdge } from '../model/types';
import { Button, Input } from 'shared';
import { ScenarioFlowCanvas } from './ScenarioFlowCanvas';

interface ScenarioEditFormProps {
  scenario: FlowScenario;
  onSave: (payload: { id: string; name: string; nodes: FlowNode[]; edges: FlowEdge[] }) => void | Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
  saveError?: string | null;
}

export function ScenarioEditForm({
  scenario,
  onSave,
  onCancel,
  isSaving = false,
  saveError = null,
}: ScenarioEditFormProps) {
  const [name, setName] = useState(scenario.name);

  const initialFlow = useMemo(() => copyFlowScenario(scenario), [scenario]);
  const [graph, setGraph] = useState(initialFlow);

  useEffect(() => {
    setGraph(initialFlow);
  }, [initialFlow]);

  useEffect(() => {
    setName(scenario.name);
  }, [scenario.name, scenario.id]);

  const onGraphChange = useCallback((payload: { nodes: FlowNode[]; edges: FlowEdge[] }) => {
    setGraph(payload);
  }, []);

  const canSave = name.trim().length > 0 && !isSaving;

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) {
          return;
        }
        void onSave({
          id: scenario.id,
          name: name.trim(),
          nodes: graph.nodes,
          edges: graph.edges,
        });
      }}
    >
      <Input
        label="Название"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Введите название сценария"
      />

      <ScenarioFlowCanvas
        key={`${scenario.id}-${scenario.updatedAt}`}
        initialNodes={initialFlow.nodes}
        initialEdges={initialFlow.edges}
        onGraphChange={onGraphChange}
      />

      {saveError ? <p className="text-sm text-red-600">{saveError}</p> : null}

      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel} disabled={isSaving}>
          Отмена
        </Button>
        <Button type="submit" disabled={!canSave} loading={isSaving}>
          {isSaving ? 'Сохранение…' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}
