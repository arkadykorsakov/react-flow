import { Handle, Position, type NodeProps } from 'reactflow';
import type { FlowNodeData } from '../../model/types';

export function ScenarioActionNode({ data, selected }: NodeProps<FlowNodeData>) {
  return (
    <div
      className={`min-w-37 rounded-lg border-2 bg-white px-3 py-2 shadow-sm transition-colors ${
        selected
          ? 'border-sky-500 ring-2 ring-sky-200 ring-offset-2'
          : 'border-slate-300 hover:border-slate-400'
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="h-2.5! w-2.5! border! border-slate-400! bg-white!"
      />
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Действие</p>
      <p className="text-sm font-medium leading-snug text-slate-900">{data.label}</p>
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-2.5! w-2.5! border! border-slate-400! bg-white!"
      />
    </div>
  );
}
