import { db } from '../db';
import { RenderJob, OutputFormat } from '../models/RenderJob';

export class RenderService {
  async createRenderJob(userId: string, animationId: string, format: OutputFormat): Promise<RenderJob> {
    const job: RenderJob = {
      id: `render-${Date.now()}`,
      userId,
      animationId,
      format,
      status: 'queued',
      progressPercentage: 0,
      createdAt: new Date()
    };

    db.renderJobs.set(job.id, job);

    // Simulate async background rendering
    setTimeout(() => {
      job.status = 'processing';
      job.progressPercentage = 45;
      db.renderJobs.set(job.id, job);
    }, 1000);

    setTimeout(() => {
      job.status = 'completed';
      job.progressPercentage = 100;
      job.outputUrl = `/exports/renders/${job.id}.${format}`;
      job.completedAt = new Date();
      db.renderJobs.set(job.id, job);
    }, 3500);

    return job;
  }

  async getRenderJob(jobId: string): Promise<RenderJob | null> {
    return db.renderJobs.get(jobId) || null;
  }

  async getRenderJobsByUser(userId: string): Promise<RenderJob[]> {
    return Array.from(db.renderJobs.values()).filter(j => j.userId === userId);
  }
}

export const renderService = new RenderService();
