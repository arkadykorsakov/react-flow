import { useEffect, useMemo, useState } from 'react';
import {
  getScenarioList,
  ScenarioListItem,
  selectScenarioError,
  selectScenarioList,
  selectScenarioLoading,
} from 'entities/scenario';
import { EditScenarioButton, EditScenarioModal } from 'features/edit-scenario';
import { Button, Modal, Title, useAppDispatch, useAppSelector } from 'shared';

export function ScenarioList() {
  const dispatch = useAppDispatch();
  const scenarios = useAppSelector(selectScenarioList);
  const isLoading = useAppSelector(selectScenarioLoading);
  const error = useAppSelector(selectScenarioError);
  const [editingScenarioId, setEditingScenarioId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const editingScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === editingScenarioId) ?? null,
    [editingScenarioId, scenarios],
  );

  useEffect(() => {
    dispatch(getScenarioList());
  }, [dispatch]);

  return (
    <section>
      <div className="flex justify-between gap-1 mb-5">
        <Title>Список сценариев</Title>
        <Button onClick={() => setIsAddModalOpen(true)}>
          Добавить
        </Button>
      </div>

      {isLoading && <p className="text-sm text-slate-500">Загрузка...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!isLoading && !error && (
        <ul className="space-y-3">
          {scenarios.map((scenario) => (
            <ScenarioListItem
              key={scenario.id}
              scenario={scenario}
              actions={
                <EditScenarioButton scenarioId={scenario.id} onEdit={setEditingScenarioId} />
              }
            />
          ))}
        </ul>
      )}

      <EditScenarioModal scenario={editingScenario} onClose={() => setEditingScenarioId(null)} />

      <Modal
        isOpen={isAddModalOpen}
        title="Добавить сценарий"
        onClose={() => setIsAddModalOpen(false)}
      >
        <p className="text-sm text-slate-600">
          В будущем можно будет добавить новый сценарий
        </p>
      </Modal>
    </section>
  );
}
