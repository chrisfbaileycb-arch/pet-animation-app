export interface CanvasConfig {
  id: string;
  petId: string;
  width: number;
  height: number;
  backgroundColor: string;
  gridEnabled: boolean;
  scaleFactor: number;
  fpsTarget: number;
  shadowColor?: string;
  updatedAt: Date;
}
