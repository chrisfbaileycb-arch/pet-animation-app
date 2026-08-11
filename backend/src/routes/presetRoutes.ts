import { Router, Request, Response } from 'express';
import { presetService } from '../services/presetService';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const presets = await presetService.getAllPresets();
    return res.json({ presets });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const preset = await presetService.getPresetById(req.params.id);
    if (!preset) return res.status(404).json({ error: 'Preset not found' });
    return res.json({ preset });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
