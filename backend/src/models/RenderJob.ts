export type RenderStatus = 'queued' | 'processing' | 'completed' | 'failed';
export type OutputFormat = 'mp4' | 'gif' | 'spritesheet' | 'webm';

export interface RenderJob {
  id: string;
  animationId: string;
  userId: string;
  format: OutputFormat;
  status: RenderStatus;
  progressPercentage: number;
  outputUrl?: string;
  createdAt: Date;
  completedAt?: Date;
}
