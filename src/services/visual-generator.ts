import { OpenAI } from 'openai';

/**
 * Industrial Visual Generation Service.
 * Manages DALL-E 3 requests with niche-calibrated aesthetic modifiers.
 */

export interface VisualConfig {
  prompt: string;
  niche: 'lofi' | 'trap' | 'ambient' | 'finance' | 'history';
  aspectRatio: 'vertical' | 'horizontal';
}

export async function generateAsset(config: VisualConfig): Promise<string> {
  const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });

  const modifiers = {
    lofi: "lofi aesthetic, anime style, soft lighting, cozy atmosphere, highly detailed, Studio Ghibli inspired",
    trap: "dark gritty cinematic, neon accents, urban night, 4k, hyper-realistic, high contrast",
    ambient: "minimalist landscape, ethereal colors, dreamlike, wide angle, soft focus",
    finance: "professional high-end workspace, glowing screens, minimalist luxury, sharp focus, financial aesthetic",
    history: "vintage film grain, historical oil painting style, dramatic lighting, epic scale, 19th century aesthetic"
  };

  const finalPrompt = `${config.prompt}, ${modifiers[config.niche] || ''}`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: finalPrompt,
      n: 1,
      size: config.aspectRatio === 'vertical' ? "1024x1792" : "1792x1024",
      quality: "hd"
    });

    const imageUrl = response.data[0].url;
    if (!imageUrl) throw new Error("No image URL returned from DALL-E");
    
    return imageUrl;
  } catch (error) {
    console.error("Visual Agent Generation Failed:", error);
    throw error;
  }
}
