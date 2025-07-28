import { Position } from "reactflow";
import type { Pipeline } from "../../types";
import { useNodeLevels } from "../useNodeLevels";

export const useInitNodes = (data: Pipeline) => {
  const levels = useNodeLevels(data);

  return data.steps.map((step) => {
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
};
