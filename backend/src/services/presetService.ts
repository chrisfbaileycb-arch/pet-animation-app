import { db } from '../db';
import { Preset } from '../models/Preset';

export class PresetService {
  async getAllPresets(): Promise<Preset[]> {
    return Array.from(db.presets.values());
  }

  async getPresetById(presetId: string): Promise<Preset | null> {
    return db.presets.get(presetId) || null;
  }
}

export const presetService = new PresetService();
