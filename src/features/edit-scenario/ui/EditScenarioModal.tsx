import {
  ScenarioEditForm,
  saveScenario,
  selectScenarioSaveError,
  selectScenarioSaving,
  type FlowScenario,
} from 'entities/scenario';
import { Modal, useAppDispatch, useAppSelector } from 'shared';

interface EditScenarioModalProps {
  scenario: FlowScenario | null;
  onClose: () => void;
}

export function EditScenarioModal({ scenario, onClose }: EditScenarioModalProps) {
  const dispatch = useAppDispatch();
  const isSaving = useAppSelector(selectScenarioSaving);
  const saveError = useAppSelector(selectScenarioSaveError);

  return (
    <Modal isOpen={Boolean(scenario)} title="Редактирование сценария" onClose={onClose} size="xl">
      {scenario ? (
        <ScenarioEditForm
          key={scenario.id}
          scenario={scenario}
          isSaving={isSaving}
          saveError={saveError}
          onCancel={onClose}
          onSave={async ({ id, name, nodes, edges }) => {
            await dispatch(saveScenario({ id, name, nodes, edges })).unwrap();
            onClose();
          }}
        />
      ) : null}
    </Modal>
  );
}