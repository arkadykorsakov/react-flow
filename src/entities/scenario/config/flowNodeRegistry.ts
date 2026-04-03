import type { ComponentType } from 'react';
import type { NodeProps } from 'reactflow';
import type { FlowNodeData, FlowNodeKind } from '../model/types';
import { ScenarioActionNode, ScenarioConditionNode } from '../ui/nodes';

type FlowNodeComponent = ComponentType<NodeProps<FlowNodeData>>;

export type FlowNodeRegistryEntry = {
  NodeComponent: FlowNodeComponent;
  defaultLabel: string;
  typeLabel: string;
  palette: {
    title: string;
    subtitle: string;
    cardClassName: string;
  };
};

export const FLOW_NODE_REGISTRY = {
  action: {
    NodeComponent: ScenarioActionNode,
    defaultLabel: 'Новое действие',
    typeLabel: 'Действие',
    palette: {
      title: 'Действие',
      subtitle: 'Блок',
      cardClassName: 'border-slate-300 bg-white',
    },
  },
  condition: {
    NodeComponent: ScenarioConditionNode,
    defaultLabel: 'Новое условие',
    typeLabel: 'Условие',
    palette: {
      title: 'Условие',
      subtitle: 'Блок',
      cardClassName: 'border-amber-400 bg-amber-50',
    },
  },
} as const satisfies Record<FlowNodeKind, FlowNodeRegistryEntry>;

export const FLOW_NODE_KINDS = Object.keys(FLOW_NODE_REGISTRY) as FlowNodeKind[];

export const SCENARIO_FLOW_NODE_TYPES: Record<FlowNodeKind, FlowNodeComponent> = FLOW_NODE_KINDS.reduce(
  (acc, kind) => {
    acc[kind] = FLOW_NODE_REGISTRY[kind].NodeComponent;
    return acc;
  },
  {} as Record<FlowNodeKind, FlowNodeComponent>,
);

export function isFlowNodeKind(value: string): value is FlowNodeKind {
  return Object.hasOwn(FLOW_NODE_REGISTRY, value);
}
