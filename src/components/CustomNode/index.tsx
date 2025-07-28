import { type FC, memo } from 'react';
import { Handle, Position } from 'reactflow';

import type { Step } from '../../types';

interface Props {
  data: Step;
  isConnectable: boolean;
}

export const CustomNode: FC<Props> = memo(({ data, isConnectable }) => {
  const { name } = data;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div className='font-semibold p-4 bg-stone-700 rounded-lg'>
        {name}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
});
