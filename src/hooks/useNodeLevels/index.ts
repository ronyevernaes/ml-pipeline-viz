import type { Pipeline } from "../../types";

export const useNodeLevels = (data: Pipeline) => {
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
