import { useCallback, type FC } from 'react';

import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
} from 'reactflow';

import type { Connection, Edge } from 'reactflow';

import 'reactflow/dist/style.css';
import type { Pipeline, Step } from '../../types';
import { useNodeLevels } from '../../hooks/useNodeLevels';

interface Props {
  data: Pipeline;
}

export const PipelineViz: FC<Props> = ({ data }: Props) => {
  const levels = useNodeLevels(data);
  
  const initialNodes = data.steps.map((step) => {
    const level = levels[step.id] || 0;
    const nodesAtLevel = data.steps.filter(s => levels[s.id] === level);
    const indexAtLevel = nodesAtLevel.findIndex(s => s.id === step.id);
    
    return {
      id: step.id,
      position: {
        x: level * 300, // Horizontal spacing between levels
        y: indexAtLevel * 120 // Vertical spacing within level
      },
      data: { label: step.name, ...step },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
  });

  const initialEdges = data.dependencies.map((dep) => ({
    id: `e-${dep.source}-${dep.target}`,
    source: dep.source,
    target: dep.target,
  }));

  const [nodes, _, onNodesChange] = useNodesState<Step>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      color='dark'
      fitView
    >
      <Background />
    </ReactFlow>
  );
};
