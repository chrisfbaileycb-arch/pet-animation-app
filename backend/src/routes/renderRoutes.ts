import { Router, Response } from 'express';
import { authMiddleware, AuthenticatedRequest } from '../middleware/authMiddleware';
import { renderService } from '../services/renderService';

const router = Router();

router.post('/jobs', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { animationId, format } = req.body;
    const job = await renderService.createRenderJob(req.userId!, animationId, format || 'gif');
    return res.status(201).json({ job });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/jobs/:id', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const job = await renderService.getRenderJob(req.params.id);
    if (!job) return res.status(404).json({ error: 'Render job not found' });
    return res.json({ job });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
