import { exec } from 'child_process';
import path from 'path';

/**
 * Industrial Video Generator Service.
 * Bridges the Node.js worker logic with optimized shell scripts for high-performance rendering.
 */

export interface RenderConfig {
  audioPath: string;
  imagePath: string;
  outputPath: string;
}

export async function executeRender(config: RenderConfig): Promise<string> {
  const scriptPath = path.join(process.cwd(), 'scripts', 'assemble_video.sh');
  
  return new Promise((resolve, reject) => {
    // Calling the high-retention zoom script via child_process
    exec(`bash ${scriptPath} "${config.imagePath}" "${config.audioPath}" "${config.outputPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`FFmpeg Render Error: ${error.message}`);
        return reject(error);
      }
      if (stderr && !stderr.includes('ffmpeg version')) {
        console.warn(`FFmpeg Render Warning: ${stderr}`);
      }
      
      console.log(`FFmpeg Render Successful: ${config.outputPath}`);
      resolve(config.outputPath);
    });
  });
}

/**
 * Returns the filter graph configuration for manual fluent-ffmpeg usage if needed.
 */
export const getRetentionFilterGraph = () => {
  return "scale=8000:-1,zoompan=z='min(zoom+0.0005,1.5)':d=125:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920";
};
