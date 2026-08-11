import { User } from './models/User';
import { Pet } from './models/Pet';
import { Animation } from './models/Animation';
import { CanvasConfig } from './models/Canvas';
import { Preset } from './models/Preset';
import { RenderJob } from './models/RenderJob';

export class Database {
  private static instance: Database;

  public users: Map<string, User> = new Map();
  public pets: Map<string, Pet> = new Map();
  public animations: Map<string, Animation> = new Map();
  public canvases: Map<string, CanvasConfig> = new Map();
  public presets: Map<string, Preset> = new Map();
  public renderJobs: Map<string, RenderJob> = new Map();

  private constructor() {
    this.seedDefaultPresets();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private seedDefaultPresets() {
    const defaultPresets: Preset[] = [
      {
        id: 'preset-1',
        name: 'Happy Tail Wag',
        description: 'Enthusiastic tail wagging and ear wiggling motion cycle.',
        species: 'all',
        durationMs: 1200,
        keyframes: [
          { time: 0, rotTail: -25, rotEarL: -5, rotEarR: 5, posY: 0 },
          { time: 300, rotTail: 25, rotEarL: 5, rotEarR: -5, posY: -8 },
          { time: 600, rotTail: -25, rotEarL: -5, rotEarR: 5, posY: 0 },
          { time: 900, rotTail: 25, rotEarL: 5, rotEarR: -5, posY: -8 },
          { time: 1200, rotTail: -25, rotEarL: -5, rotEarR: 5, posY: 0 }
        ],
        tags: ['wag', 'happy', 'bounce']
      },
      {
        id: 'preset-2',
        name: 'Sleepy Breathe',
        description: 'Gentle chest expansion and rhythmic resting animation.',
        species: 'all',
        durationMs: 3000,
        keyframes: [
          { time: 0, rotTail: 0, rotEarL: -10, rotEarR: -10, scaleY: 1.0, posY: 5 },
          { time: 1500, rotTail: 2, rotEarL: -12, rotEarR: -12, scaleY: 1.06, posY: 2 },
          { time: 3000, rotTail: 0, rotEarL: -10, rotEarR: -10, scaleY: 1.0, posY: 5 }
        ],
        tags: ['rest', 'breathe', 'sleepy']
      },
      {
        id: 'preset-3',
        name: 'Playful Backflip',
        description: 'Dynamic 360-degree acrobatic pet jump.',
        species: 'all',
        durationMs: 1600,
        keyframes: [
          { time: 0, rotation: 0, posY: 0, scaleY: 1.0 },
          { time: 400, rotation: -45, posY: -60, scaleY: 1.1 },
          { time: 800, rotation: -180, posY: -120, scaleY: 0.95 },
          { time: 1200, rotation: -315, posY: -40, scaleY: 1.05 },
          { time: 1600, rotation: -360, posY: 0, scaleY: 1.0 }
        ],
        tags: ['flip', 'stunt', 'acrobatic']
      }
    ];

    defaultPresets.forEach(preset => this.presets.set(preset.id, preset));
  }
}

export const db = Database.getInstance();
