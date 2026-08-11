import { db } from '../db';
import { CanvasConfig } from '../models/Canvas';

export class CanvasService {
  async getCanvasConfig(petId: string): Promise<CanvasConfig> {
    let canvas = db.canvases.get(petId);
    if (!canvas) {
      canvas = {
        id: `canvas-${Date.now()}`,
        petId,
        width: 800,
        height: 600,
        backgroundColor: '#1e1e2e',
        gridEnabled: true,
        scaleFactor: 1.0,
        fpsTarget: 60,
        updatedAt: new Date()
      };
      db.canvases.set(petId, canvas);
    }
    return canvas;
  }

  async updateCanvasConfig(petId: string, updates: Partial<CanvasConfig>): Promise<CanvasConfig> {
    const existing = await this.getCanvasConfig(petId);
    const updated: CanvasConfig = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };
    db.canvases.set(petId, updated);
    return updated;
  }
}

export const canvasService = new CanvasService();
