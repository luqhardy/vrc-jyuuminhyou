import React, { useContext, useMemo, useEffect } from "react";
import { EffectComposerContext } from "@react-three/postprocessing";
import { VelocityDepthNormalPass, MotionBlurEffect } from "realism-effects";
import * as POSTPROCESSING from "postprocessing";

export const MotionBlur = ({ 
  intensity = 10, 
  samples = 16, 
  jitter = 1 
}) => {
  // Extract the engine instances managed by @react-three/postprocessing
  const { scene, camera, composer } = useContext(EffectComposerContext);

  // 1. Create the required pass to track mesh velocities, depth, and normals
  const velocityDepthNormalPass = useMemo(() => {
    return new VelocityDepthNormalPass(scene, camera);
  }, [scene, camera]);

  // 2. Create the fullscreen MotionBlurEffect using the velocity buffers
  const motionBlurEffect = useMemo(() => {
    return new MotionBlurEffect(velocityDepthNormalPass, {
      intensity,
      samples,
      jitter
    });
  }, [velocityDepthNormalPass, intensity, samples, jitter]);

  // 3. Create the compound EffectPass containing the motion blur layout
  const effectPass = useMemo(() => {
    return new POSTPROCESSING.EffectPass(camera, motionBlurEffect);
  }, [camera, motionBlurEffect]);

  // 4. Safely handle insertion and cleanup within the postprocessing pipeline
  useEffect(() => {
    if (!composer) return;

    // Add passes sequentially to the active composer chain
    composer.addPass(velocityDepthNormalPass);
    composer.addPass(effectPass);

    return () => {
      composer.removePass(velocityDepthNormalPass);
      composer.removePass(effectPass);
    };
  }, [composer, velocityDepthNormalPass, effectPass]);

  return null;
};
