import { Router, Response } from 'express';
import { authMiddleware, AuthenticatedRequest } from '../middleware/authMiddleware';
import { petService } from '../services/petService';

const router = Router();

router.get('/', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const pets = await petService.getPetsByUser(req.userId!);
    return res.json({ pets });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, species, colors, features } = req.body;
    const pet = await petService.createPet(req.userId!, { name, species, colors, features });
    return res.status(201).json({ pet });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const pet = await petService.updatePet(req.params.id, req.userId!, req.body);
    return res.json({ pet });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const success = await petService.deletePet(req.params.id, req.userId!);
    return res.json({ success });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
