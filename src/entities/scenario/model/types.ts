import type { Edge, Node } from 'reactflow';

export type FlowNodeKind = 'action' | 'condition';

export type FlowNodeData = {
  kind: FlowNodeKind;
  label: string;
};

export type FlowNode = Node<FlowNodeData>;

export type FlowEdge = Edge;

export interface FlowScenario {
  id: string;
  name: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  updatedAt: string;
}
