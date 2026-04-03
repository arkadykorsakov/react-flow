import type { FlowEdge, FlowNode, FlowScenario } from '../model/types';

export function copyFlowScenario(scenario: FlowScenario): {
  nodes: FlowNode[];
  edges: FlowEdge[];
} {
  return {
    nodes: scenario.nodes.map((node) => ({
      ...node,
      position: { ...node.position },
      data: { ...node.data },
    })),
    edges: scenario.edges.map((edge) => ({ ...edge })),
  };
}
