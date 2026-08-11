import { Router, Request, Response } from 'express';
import { canvasService } from '../services/canvasService';

const router = Router();

router.get('/pet/:petId', async (req: Request, res: Response) => {
  try {
    const config = await canvasService.getCanvasConfig(req.params.petId);
    return res.json({ config });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.put('/pet/:petId', async (req: Request, res: Response) => {
  try {
    const config = await canvasService.updateCanvasConfig(req.params.petId, req.body);
    return res.json({ config });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
