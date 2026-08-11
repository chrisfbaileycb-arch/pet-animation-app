import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas';
import { promises as fs } from 'fs';
import path from 'path';

export interface CardConfig {
  width: number;
  height: number;
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  textColor: string;
}

export class CardCanvasService {
  private defaultConfig: CardConfig = {
    width: 600,
    height: 800,
    backgroundColor: '#FDFBF7', // Warm cream background
    fontFamily: 'Gochi Hand',
    fontSize: 36,
    textColor: '#2C2A29' // Clean dark charcoal ink color
  };

  /**
   * Assembles a static Hallmark-style card with caricature image and handwritten text
   */
  async assembleStaticHallmarkCard(
    generatedImagePath: string,
    textMessage: string,
    outputPath: string = 'final_card.png',
    config?: Partial<CardConfig>
  ): Promise<string> {
    const finalConfig = { ...this.defaultConfig, ...config };

    // Create canvas base (600x800 elegant vertical card layout)
    const canvas = createCanvas(finalConfig.width, finalConfig.height);
    const ctx = canvas.getContext('2d');

    // Fill background with warm cream color
    ctx.fillStyle = finalConfig.backgroundColor;
    ctx.fillRect(0, 0, finalConfig.width, finalConfig.height);

    // Load and position the pet's caricature sketch
    try {
      const petSketch = await loadImage(generatedImagePath);
      
      // Scale to fit upper card area (500x500)
      const sketchWidth = 500;
      const sketchHeight = 500;
      const sketchX = (finalConfig.width - sketchWidth) / 2; // Center horizontally
      const sketchY = 50;

      ctx.drawImage(petSketch, sketchX, sketchY, sketchWidth, sketchHeight);
    } catch (error: any) {
      throw new Error(`Failed to load caricature image: ${error.message}`);
    }

    // Set up handwriting font
    ctx.font = `${finalConfig.fontSize}px "${finalConfig.fontFamily}", cursive`;
    ctx.fillStyle = finalConfig.textColor;
    ctx.textAlign = 'center';

    // Draw the sweet message at the bottom center of the card
    const textY = 620;
    const maxWidth = finalConfig.width - 100; // Leave padding

    // Handle text wrapping for longer messages
    const wrappedLines = this.wrapText(ctx, textMessage, maxWidth);
    
    let currentY = textY;
    for (const line of wrappedLines) {
      ctx.fillText(line, finalConfig.width / 2, currentY);
      currentY += finalConfig.fontSize + 10;
    }

    // Save the polished static card image
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(outputPath, buffer);

    console.log(`Card successfully generated and saved to ${outputPath}!`);
    return outputPath;
  }

  /**
   * Wraps text to fit within a maximum width
   */
  private wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * Creates a textured card background with subtle paper grain effect
   */
  async createTexturedBackground(
    outputPath: string = 'card_background.png',
    config?: Partial<CardConfig>
  ): Promise<string> {
    const finalConfig = { ...this.defaultConfig, ...config };
    const canvas = createCanvas(finalConfig.width, finalConfig.height);
    const ctx = canvas.getContext('2d');

    // Base cream color
    ctx.fillStyle = finalConfig.backgroundColor;
    ctx.fillRect(0, 0, finalConfig.width, finalConfig.height);

    // Add subtle noise texture for paper feel
    const imageData = ctx.getImageData(0, 0, finalConfig.width, finalConfig.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 10;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }

    ctx.putImageData(imageData, 0, 0);

    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(outputPath, buffer);

    return outputPath;
  }
}

export const cardCanvasService = new CardCanvasService();
