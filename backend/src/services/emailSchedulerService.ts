import { db } from '../db';
import { EmailSchedule } from './qwenService';

export class EmailSchedulerService {
  /**
   * Creates a scheduled email job for sending a caricature card
   */
  async scheduleEmail(
    userId: string,
    recipientEmail: string,
    imageUrl: string,
    message: string,
    scheduledDate: Date
  ): Promise<EmailSchedule> {
    const schedule: EmailSchedule = {
      id: `email-${Date.now()}`,
      userId,
      recipientEmail,
      imageUrl,
      message,
      scheduledDate,
      status: 'pending'
    };

    // Store in database (using renderJobs map as temporary storage)
    db.renderJobs.set(schedule.id, {
      id: schedule.id,
      animationId: '',
      userId: schedule.userId,
      format: 'png',
      status: 'queued',
      progressPercentage: 0,
      createdAt: new Date(),
      outputUrl: imageUrl
    } as any);

    console.log(`Email scheduled for ${scheduledDate} to ${recipientEmail}`);
    return schedule;
  }

  /**
   * Gets all pending email schedules that should be sent now
   */
  async getDueEmails(): Promise<EmailSchedule[]> {
    const now = new Date();
    // In a real implementation, this would query from an emailSchedules table
    // For now, we'll return an empty array as placeholder
    return [];
  }

  /**
   * Marks an email schedule as sent
   */
  async markAsSent(scheduleId: string): Promise<void> {
    console.log(`Marking email ${scheduleId} as sent`);
    // Update status in database
  }

  /**
   * Marks an email schedule as failed
   */
  async markAsFailed(scheduleId: string, error: string): Promise<void> {
    console.error(`Email ${scheduleId} failed: ${error}`);
    // Update status in database
  }

  /**
   * Sends an email with inline caricature card image
   * Uses SendGrid or Mailgun API in production
   */
  async sendEmailWithInlineCard(
    recipientEmail: string,
    imageUrl: string,
    message: string,
    subject?: string
  ): Promise<boolean> {
    try {
      // In production, integrate with SendGrid/Mailgun API
      // Example with SendGrid:
      /*
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const msg = {
        to: recipientEmail,
        from: process.env.FROM_EMAIL,
        subject: subject || 'A Special Surprise Card! 🎨',
        html: `
          <div style="font-family: 'Gochi Hand', cursive; text-align: center;">
            <img src="cid:card_image" alt="Your Custom Card" style="max-width: 600px;" />
            <p style="font-size: 24px; color: #2C2A29;">${message}</p>
          </div>
        `,
        attachments: [
          {
            content: fs.readFileSync(imageUrl).toString('base64'),
            filename: 'card.png',
            type: 'image/png',
            disposition: 'inline',
            content_id: 'card_image'
          }
        ]
      };
      
      await sgMail.send(msg);
      */

      console.log(`Email would be sent to ${recipientEmail} with card: ${imageUrl}`);
      console.log(`Message: ${message}`);
      
      return true;
    } catch (error: any) {
      console.error(`Failed to send email: ${error.message}`);
      return false;
    }
  }
}

export const emailSchedulerService = new EmailSchedulerService();
