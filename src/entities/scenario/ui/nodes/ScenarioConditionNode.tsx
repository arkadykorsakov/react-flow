import { Handle, Position, type NodeProps } from 'reactflow';
import type { FlowNodeData } from '../../model/types';

export function ScenarioConditionNode({ data, selected }: NodeProps<FlowNodeData>) {
  return (
    <div className="flex h-30 w-30 items-center justify-center">
      <div
        className={`flex h-24 w-24 rotate-45 items-center justify-center rounded-lg border-2 bg-amber-50 shadow-sm transition-colors ${
          selected
            ? 'border-amber-600 ring-2 ring-amber-200 ring-offset-2'
            : 'border-amber-500 hover:border-amber-600'
        }`}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="-top-3! h-2.5! w-2.5! -rotate-45! border! border-amber-600! bg-white!"
        />
        <div className="max-h-18 max-w-18 -rotate-45 px-1 text-center">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-amber-800">Условие</p>
          <p className="mt-0.5 text-xs font-medium leading-tight text-amber-950">{data.label}</p>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          className="-bottom-3! h-2.5! w-2.5! -rotate-45! border! border-amber-600! bg-white!"
        />
      </div>
    </div>
  );
}
