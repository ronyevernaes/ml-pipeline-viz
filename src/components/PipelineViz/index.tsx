import { useCallback, type FC } from 'react';

import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import type { Connection, Edge } from 'reactflow';

import 'reactflow/dist/style.css';
import type { Pipeline, Step } from '../../types';
import { useInitNodes } from '../../hooks/useInitNodes';

interface Props {
  data: Pipeline;
}

export const PipelineViz: FC<Props> = ({ data }: Props) => {
  const initialNodes = useInitNodes(data);

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
