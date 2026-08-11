export interface KeyframeNode {
  time: number; // in milliseconds
  rotTail?: number;
  rotEarL?: number;
  rotEarR?: number;
  rotation?: number;
  posY?: number;
  posX?: number;
  scaleY?: number;
  scaleX?: number;
  expression?: string;
}

export interface Animation {
  id: string;
  petId: string;
  userId: string;
  name: string;
  fps: number;
  durationMs: number;
  keyframes: KeyframeNode[];
  isLoop: boolean;
  createdAt: Date;
  updatedAt: Date;
}
