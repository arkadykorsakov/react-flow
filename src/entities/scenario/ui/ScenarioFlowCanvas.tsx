import { useCallback, useMemo, type DragEvent } from 'react';
import ReactFlow, { Background, Controls, ReactFlowProvider, useReactFlow } from 'reactflow';
import type { FlowEdge, FlowNode } from '../model/types';
import { useScenarioFlow, type UseScenarioFlowOptions } from 'entities/scenario';
import {
  FLOW_NODE_REGISTRY,
  isFlowNodeKind,
  SCENARIO_FLOW_NODE_TYPES,
} from '../config/flowNodeRegistry';
import { ScenarioFlowPalette } from './ScenarioFlowPalette';
import { SCENARIO_NODE_DND_MIME } from 'entities/scenario/ui/PaletteCard.tsx';

interface ScenarioFlowCanvasProps {
  initialNodes: FlowNode[];
  initialEdges: FlowEdge[];
  onGraphChange: UseScenarioFlowOptions['onGraphChange'];
  className?: string;
}

function ScenarioFlowCanvasInner({
  initialNodes,
  initialEdges,
  onGraphChange,
  className = 'h-112',
}: ScenarioFlowCanvasProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodesDelete,
    onConnect,
    addNodeAt,
    updateSelectedNodeLabel,
    selectedNode,
  } = useScenarioFlow(initialNodes, initialEdges, { onGraphChange });

  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = useMemo(() => SCENARIO_FLOW_NODE_TYPES, []);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const kind = event.dataTransfer.getData(SCENARIO_NODE_DND_MIME);
      if (!isFlowNodeKind(kind)) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      addNodeAt(kind, position);
    },
    [addNodeAt, screenToFlowPosition],
  );

  return (
    <div className="flex gap-4">
      <ScenarioFlowPalette />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Название выбранного узла
          </span>
          {selectedNode ? (
            <span className="mb-2 block text-xs text-slate-500">
              Тип блока: {FLOW_NODE_REGISTRY[selectedNode.data.kind].typeLabel}
            </span>
          ) : null}
          <input
            value={selectedNode ? String(selectedNode.data.label) : ''}
            onChange={(e) => updateSelectedNodeLabel(e.target.value)}
            disabled={!selectedNode}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100"
            placeholder="Выберите узел на схеме"
          />
        </label>

        <div
          className={`overflow-hidden rounded-md border border-slate-200 ${className}`.trim()}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={{
              animated: false,
              style: { stroke: '#64748b', strokeWidth: 2 },
            }}
            onNodesChange={onNodesChange}
            onNodesDelete={onNodesDelete}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            deleteKeyCode={['Backspace', 'Delete']}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export function ScenarioFlowCanvas(props: ScenarioFlowCanvasProps) {
  return (
    <ReactFlowProvider>
      <ScenarioFlowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
