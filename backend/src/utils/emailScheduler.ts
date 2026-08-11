import cron from 'node-cron';
import { emailSchedulerService } from '../services/emailSchedulerService';

/**
 * Email Scheduler Cron Job
 * Runs every hour to check for pending emails that need to be sent
 */
export function setupEmailScheduler() {
  // Check every hour for emails that are due to be sent
  cron.schedule('0 * * * *', async () => {
    console.log('🕐 Running scheduled email check...');
    
    try {
      const dueEmails = await emailSchedulerService.getDueEmails();
      
      if (dueEmails.length === 0) {
        console.log('No emails due to send at this time.');
        return;
      }

      console.log(`Found ${dueEmails.length} email(s) to send.`);

      for (const email of dueEmails) {
        console.log(`Sending email to ${email.recipientEmail}...`);
        
        const success = await emailSchedulerService.sendEmailWithInlineCard(
          email.recipientEmail,
          email.imageUrl,
          email.message
        );

        if (success) {
          await emailSchedulerService.markAsSent(email.id);
          console.log(`✅ Email sent successfully to ${email.recipientEmail}`);
        } else {
          await emailSchedulerService.markAsFailed(email.id, 'Send failed');
          console.error(`❌ Failed to send email to ${email.recipientEmail}`);
        }
      }
    } catch (error: any) {
      console.error(`Error in email scheduler: ${error.message}`);
    }
  });

  console.log('📧 Email scheduler initialized (runs hourly)');
}

/**
 * Alternative: Run every minute for development/testing
 * Uncomment to use frequent checks during development
 */
export function setupEmailSchedulerDev() {
  cron.schedule('* * * * *', async () => {
    console.log('🔍 [DEV MODE] Checking for due emails...');
    
    try {
      const dueEmails = await emailSchedulerService.getDueEmails();
      
      if (dueEmails.length > 0) {
        console.log(`Found ${dueEmails.length} email(s) to send.`);
        
        for (const email of dueEmails) {
          const success = await emailSchedulerService.sendEmailWithInlineCard(
            email.recipientEmail,
            email.imageUrl,
            email.message
          );

          if (success) {
            await emailSchedulerService.markAsSent(email.id);
          } else {
            await emailSchedulerService.markAsFailed(email.id, 'Send failed');
          }
        }
      }
    } catch (error: any) {
      console.error(`Error in dev email scheduler: ${error.message}`);
    }
  });

  console.log('📧 [DEV MODE] Email scheduler initialized (runs every minute)');
}
