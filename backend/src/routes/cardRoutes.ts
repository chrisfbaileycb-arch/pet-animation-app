import { Router, Response } from 'express';
import { authMiddleware, AuthenticatedRequest } from '../middleware/authMiddleware';
import { qwenService } from '../services/qwenService';
import { cardCanvasService } from '../services/cardCanvasService';
import { emailSchedulerService } from '../services/emailSchedulerService';

const router = Router();

/**
 * POST /api/cards/generate-prompt
 * Generate a carnival caricature prompt using Qwen AI
 */
router.post('/generate-prompt', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { petDescription } = req.body;
    
    if (!petDescription) {
      return res.status(400).json({ error: 'petDescription is required' });
    }

    const result = await qwenService.generateCaricaturePrompt(petDescription);
    return res.json({ prompt: result.prompt, style: result.style });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/cards/assemble
 * Assemble a static Hallmark-style card with caricature and message
 */
router.post('/assemble', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { imageUrl, message, outputPath } = req.body;
    
    if (!imageUrl || !message) {
      return res.status(400).json({ error: 'imageUrl and message are required' });
    }

    const cardPath = await cardCanvasService.assembleStaticHallmarkCard(
      imageUrl,
      message,
      outputPath
    );
    
    return res.json({ 
      success: true, 
      cardPath,
      message: 'Card successfully generated!'
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/cards/schedule-email
 * Schedule an email to be sent with the caricature card
 */
router.post('/schedule-email', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { recipientEmail, imageUrl, message, scheduledDate } = req.body;
    
    if (!recipientEmail || !imageUrl || !message || !scheduledDate) {
      return res.status(400).json({ 
        error: 'recipientEmail, imageUrl, message, and scheduledDate are required' 
      });
    }

    const schedule = await emailSchedulerService.scheduleEmail(
      req.userId!,
      recipientEmail,
      imageUrl,
      message,
      new Date(scheduledDate)
    );
    
    return res.status(201).json({ 
      success: true,
      scheduleId: schedule.id,
      scheduledFor: schedule.scheduledDate,
      recipient: schedule.recipientEmail
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/cards/send-now
 * Immediately send an email with the caricature card
 */
router.post('/send-now', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { recipientEmail, imageUrl, message, subject } = req.body;
    
    if (!recipientEmail || !imageUrl || !message) {
      return res.status(400).json({ error: 'recipientEmail, imageUrl, and message are required' });
    }

    const sent = await emailSchedulerService.sendEmailWithInlineCard(
      recipientEmail,
      imageUrl,
      message,
      subject
    );
    
    if (sent) {
      return res.json({ success: true, message: 'Email sent successfully!' });
    } else {
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
