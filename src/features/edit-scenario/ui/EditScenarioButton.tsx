import { Button } from 'shared';

interface EditScenarioButtonProps {
  scenarioId: string;
  onEdit?: (scenarioId: string) => void;
}

export function EditScenarioButton({ scenarioId, onEdit }: EditScenarioButtonProps) {
  return (
    <Button variant="secondary" onClick={() => onEdit?.(scenarioId)}>
      Редактировать
    </Button>
  );
}
