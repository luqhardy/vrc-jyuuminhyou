declare module 'realism-effects' {
  import { Scene, Camera } from 'three';
  import { Pass, Effect } from 'postprocessing';

  export class VelocityDepthNormalPass extends Pass {
    constructor(scene: Scene, camera: Camera);
    render(renderer: any, inputBuffer: any, outputBuffer: any): void;
  }

  export class MotionBlurEffect extends Effect {
    constructor(velocityPass: VelocityDepthNormalPass, options?: {
      intensity?: number;
      samples?: number;
      jitter?: number;
    });
  }
}
