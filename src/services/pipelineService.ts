import { API_DELAY } from '../constants';
import data from '../data.json';
import type { Pipeline } from '../types';

export const PipelineService = {
  async getPipelineData(): Promise<Pipeline> {
    await new Promise(resolve => setTimeout(resolve, API_DELAY));
    return data as Pipeline;
  }
};
