import { useCallback, useEffect, useMemo } from 'react';
import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type XYPosition,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from 'reactflow';
import { FLOW_NODE_REGISTRY } from '../config/flowNodeRegistry.ts';
import type { FlowEdge, FlowNode, FlowNodeKind } from '../model/types.ts';

export interface UseScenarioFlowOptions {
  onGraphChange: (payload: { nodes: FlowNode[]; edges: FlowEdge[] }) => void;
}

export function useScenarioFlow(
  initialNodes: FlowNode[],
  initialEdges: FlowEdge[],
  options: UseScenarioFlowOptions,
) {
  const { onGraphChange } = options;

  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode['data']>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    onGraphChange({ nodes, edges });
  }, [nodes, edges, onGraphChange]);

  const selectedNode = useMemo(() => nodes.find((node) => node.selected), [nodes]);

  const addNodeAt = useCallback(
    (kind: FlowNodeKind, position: XYPosition) => {
      const id = `n-${Date.now()}-${Math.round(Math.random() * 1000)}`;
      setNodes((prev) => [
        ...prev,
        {
          id,
          type: kind,
          position: { x: position.x, y: position.y },
          data: {
            kind,
            label: FLOW_NODE_REGISTRY[kind].defaultLabel,
          },
        },
      ]);
    },
    [setNodes],
  );

  const onNodesDelete = useCallback(
    (deleted: FlowNode[]) => {
      let remainingNodes = [...nodes];
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, remainingNodes, acc);
          const outgoers = getOutgoers(node, remainingNodes, acc);
          const connectedEdges = getConnectedEdges([node], acc);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            })),
          );

          remainingNodes = remainingNodes.filter((rn) => rn.id !== node.id);

          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges, setEdges],
  );

  const updateSelectedNodeLabel = useCallback(
    (label: string) => {
      setNodes((prev) => {
        const selected = prev.find((node) => node.selected);
        if (!selected) {
          return prev;
        }
        return prev.map((node) =>
          node.id === selected.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label,
                },
              }
            : node,
        );
      });
    },
    [setNodes],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prev) => addEdge(connection, prev));
    },
    [setEdges],
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodesDelete,
    onConnect,
    addNodeAt,
    updateSelectedNodeLabel,
    selectedNode,
  };
}
