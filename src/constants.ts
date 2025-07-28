import { PipelineStatus, StepStatus } from "./types";

export const PipelineStatusColors: Record<PipelineStatus, string> = {
  [PipelineStatus.PENDING]: "bg-yellow-500",
  [PipelineStatus.RUNNING]: "bg-blue-500",
  [PipelineStatus.COMPLETED]: "bg-green-500",
  [PipelineStatus.FAILED]: "bg-red-500",
};

export const StepStatusColors: Record<StepStatus, string> = {
  [StepStatus.PENDING]: "bg-yellow-500",
  [StepStatus.RUNNING]: "bg-blue-500",
  [StepStatus.COMPLETED]: "bg-green-500",
  [StepStatus.FAILED]: "bg-red-500",
  [StepStatus.SKIPPED]: "bg-gray-500",
};
