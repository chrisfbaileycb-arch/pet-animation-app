export const interpolateKeyframe = (k1: any, k2: any, factor: number) => {
  const lerp = (a: number = 0, b: number = 0) => a + (b - a) * factor;

  return {
    rotTail: lerp(k1.rotTail, k2.rotTail),
    rotEarL: lerp(k1.rotEarL, k2.rotEarL),
    rotEarR: lerp(k1.rotEarR, k2.rotEarR),
    rotation: lerp(k1.rotation, k2.rotation),
    posY: lerp(k1.posY, k2.posY),
    posX: lerp(k1.posX, k2.posX),
    scaleY: lerp(k1.scaleY ?? 1, k2.scaleY ?? 1),
    scaleX: lerp(k1.scaleX ?? 1, k2.scaleX ?? 1)
  };
};
