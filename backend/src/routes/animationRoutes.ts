import { Router, Response } from 'express';
import { authMiddleware, AuthenticatedRequest } from '../middleware/authMiddleware';
import { animationService } from '../services/animationService';

const router = Router();

router.get('/pet/:petId', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const animations = await animationService.getAnimationsByPet(req.params.petId);
    return res.json({ animations });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { petId, name, keyframes, durationMs } = req.body;
    const animation = await animationService.createAnimation(req.userId!, petId, name, keyframes, durationMs);
    return res.status(201).json({ animation });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id/keyframes', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { keyframes, durationMs } = req.body;
    const animation = await animationService.updateKeyframes(req.params.id, req.userId!, keyframes, durationMs);
    return res.json({ animation });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
