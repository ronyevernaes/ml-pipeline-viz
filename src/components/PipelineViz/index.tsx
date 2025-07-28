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

interface Props {
  data: Pipeline;
}

export const PipelineViz: FC<Props> = ({ data }: Props) => {
  // Calculate node levels based on dependencies for horizontal layout
  const calculateNodeLevels = () => {
    const levels: Record<string, number> = {};
    const inDegree: Record<string, number> = {};

    // Initialize in-degree count
    data.steps.forEach(step => {
      inDegree[step.id] = 0;
    });

    // Calculate in-degrees
    data.dependencies.forEach(dep => {
      inDegree[dep.target] = (inDegree[dep.target] || 0) + 1;
    });

    // Topological sort to determine levels
    const queue: string[] = [];
    data.steps.forEach(step => {
      if (inDegree[step.id] === 0) {
        levels[step.id] = 0;
        queue.push(step.id);
      }
    });

    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentLevel = levels[current];

      data.dependencies
        .filter(dep => dep.source === current)
        .forEach(dep => {
          inDegree[dep.target]--;
          levels[dep.target] = Math.max(levels[dep.target] || 0, currentLevel + 1);
          
          if (inDegree[dep.target] === 0) {
            queue.push(dep.target);
          }
        });
    }

    return levels;
  };

  const levels = calculateNodeLevels();
  
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
