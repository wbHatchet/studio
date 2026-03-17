/**
 * Industrial FFmpeg Video Generator configuration.
 * Optimized for high-retention Shorts with subtle animation to bypass "static content" flags.
 */

export interface RenderConfig {
  audioPath: string;
  imagePath: string;
  outputPath: string;
}

export const generateVideoRenderCommand = (config: RenderConfig) => {
  // This command provides a Ken Burns zoom effect:
  // - scale=8000:-1: high res scaling for zoom quality
  // - zoompan: subtle zoom (0.0005) centered on the frame
  // - s=1080x1920: standard vertical Shorts resolution
  const filterGraph = `scale=8000:-1,zoompan=z='min(zoom+0.0005,1.5)':d=125:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920`;
  
  return {
    inputs: [
      { path: config.imagePath, options: ['-loop 1'] },
      { path: config.audioPath }
    ],
    options: [
      '-vf', filterGraph,
      '-c:v', 'libx264',
      '-tune', 'stillimage',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-pix_fmt', 'yuv420p',
      '-shortest'
    ],
    output: config.outputPath
  };
};
