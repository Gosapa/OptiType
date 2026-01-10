// src/GazeTracker.jsx
import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { calculateGaze } from './mathUtils';

const GazeTracker = ({ onGazeUpdate }) => {
  const webcamRef = useRef(null);

  // PERFORMANCE FIX 1: Track the last time we processed a frame
  const lastProcessTime = useRef(0);

  // CONFIG: How many milliseconds to wait between checks?
  // 100ms = 10 FPS (Very smooth for UI, low CPU)
  // 200ms = 5 FPS (Maximum performance, slightly choppier cursor)
  const THROTTLE_MS = 150;

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const direction = calculateGaze(landmarks);
        onGazeUpdate(direction);
      }
    });

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          // PERFORMANCE FIX 2: The Throttling Logic
          const now = Date.now();
          if (now - lastProcessTime.current < THROTTLE_MS) {
            return; // SKIP this frame!
          }
          lastProcessTime.current = now;

          if (webcamRef.current && webcamRef.current.video) {
            await faceMesh.send({ image: webcamRef.current.video });
          }
        },
        // PERFORMANCE FIX 3: Lower resolution
        // 1280x720 is overkill for gaze. 640x480 is standard.
        // 320x240 is fastest, but might lose Iris detail.
        // Let's stick to 640x480 for Iris accuracy, relying on the Throttle for speed.
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [onGazeUpdate]);

  return (
    <div style={{ display: 'none' }}>
      <Webcam ref={webcamRef} />
    </div>
  );
};

export default GazeTracker;
