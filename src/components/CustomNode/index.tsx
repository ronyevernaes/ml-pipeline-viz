import { type FC, memo } from 'react';
import { Handle, Position } from 'reactflow';

import type { Step } from '../../types';

interface Props {
  data: Step;
  isConnectable: boolean;
}

export const CustomNode: FC<Props> = memo(({ data, isConnectable }) => {
  const { name, resources } = data;
  const { cpu, memory, gpu } = resources;

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div className='font-semibold p-4 bg-stone-700 rounded-lg'>
        {name}

        <div>
          <div className='text-sm text-stone-400'>
            <div>CPU: {cpu}</div>
            <div>Memory: {memory}</div>
            {gpu && <div>GPU: {gpu}</div>}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
});
