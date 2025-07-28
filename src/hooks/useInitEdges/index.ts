import type { Pipeline } from "../../types";

export const useInitEdges = (data: Pipeline) => {
  return data.dependencies.map((dep) => ({
    id: `e-${dep.source}-${dep.target}`,
    source: dep.source,
    target: dep.target,
    type: 'custom',
  }));
};
