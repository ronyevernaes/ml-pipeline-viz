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
import { useInitEdges, useInitNodes } from '../../hooks';
import { CustomNode } from '../CustomNode';
import { CustomEdge } from '../CustomEdge';
import { Badge } from '../Badge';
import { PipelineStatusColors } from '../../constants';

interface Props {
  data: Pipeline;
}

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

export const PipelineViz: FC<Props> = ({ data }: Props) => {
  const initialNodes = useInitNodes(data);
  const initialEdges = useInitEdges(data);

  const [nodes, _, onNodesChange] = useNodesState<Step>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className='flex-1 min-h-0 flex flex-col'>
      <div>
        <h2 className="text-2xl font-semibold flex gap-2">
          {data.name}

          <Badge className={PipelineStatusColors[data.status]}>
            {data.status}
          </Badge>
        </h2>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        color='dark'
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};
