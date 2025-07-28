export enum PipelineStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum StepStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
}

export interface Resources {
  cpu: string;
  memory: string;
  gpu?: string;
}

export interface Step {
  id: string;
  name: string;
  status: StepStatus;
  runtime: number | null;
  resources: Resources;
  artifacts: unknown[];
  startTime: string | null;
  endTime: string | null;
}

export interface Dependency {
  source: string;
  target: string;
}

export interface Pipeline {
  id: string;
  name: string;
  status: PipelineStatus;
  startTime: string | null;
  steps: Step[];
  dependencies: Dependency[];
}
