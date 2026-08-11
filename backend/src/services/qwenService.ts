import axios from 'axios';

export interface CaricaturePrompt {
  prompt: string;
  style: string;
}

export interface EmailSchedule {
  id: string;
  userId: string;
  recipientEmail: string;
  imageUrl: string;
  message: string;
  scheduledDate: Date;
  status: 'pending' | 'sent' | 'failed';
}

export class QwenService {
  private apiKey: string;
  private baseUrl: string = 'https://openrouter.ai/api/v1';

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
  }

  /**
   * Uses free Qwen model to optimize a street-fair caricature prompt
   */
  async generateCaricaturePrompt(petDescription: string): Promise<CaricaturePrompt> {
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'qwen/qwen-2.5-coder-7b-instruct:free',
          messages: [
            {
              role: 'system',
              content: 'You are an expert prompt engineer for static carnival-style caricature artwork.'
            },
            {
              role: 'user',
              content: `Create a short stable-diffusion style image prompt for a funny, cute street-artist carnival sketch based on this pet: ${petDescription}. Keep it to clean ink outlines and marker shading on a plain white background.`
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const generatedPrompt = response.data.choices[0].message.content;
      
      return {
        prompt: generatedPrompt,
        style: 'carnival-caricature'
      };
    } catch (error: any) {
      throw new Error(`Failed to generate caricature prompt: ${error.message}`);
    }
  }
}

export const qwenService = new QwenService();
