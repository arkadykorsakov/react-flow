import type { FlowNodeKind } from 'entities/scenario';

export const SCENARIO_NODE_DND_MIME = 'application/scenario-flow-node-kind';

interface PaletteCardProps {
  kind: FlowNodeKind;
  title: string;
  subtitle: string;
  cardClassName: string;
}

export function PaletteCard({ kind, title, subtitle, cardClassName }: PaletteCardProps) {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData(SCENARIO_NODE_DND_MIME, kind);
        event.dataTransfer.effectAllowed = 'move';
      }}
      className={`cursor-grab select-none rounded-lg border-2 px-3 py-2.5 shadow-sm transition-shadow active:cursor-grabbing hover:shadow-md ${cardClassName}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wide opacity-80">{subtitle}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{title}</p>
    </div>
  );
}
