// src/mathUtils.js

// --- LANDMARK INDICES (MediaPipe Face Mesh) ---
// LEFT EYE (User's Left)
const LEFT_EYE_RIGHT = 33;  // Inner corner
const LEFT_EYE_LEFT = 133;  // Outer corner
const LEFT_IRIS = 468;      // Center of Iris

// RIGHT EYE (User's Right)
const RIGHT_EYE_RIGHT = 362; // Inner corner
const RIGHT_EYE_LEFT = 263;  // Outer corner
const RIGHT_IRIS = 473;      // Center of Iris

// EYELIDS (For Blinking)
const LEFT_EYE_TOP = 159;
const LEFT_EYE_BOTTOM = 145;
const RIGHT_EYE_TOP = 386;
const RIGHT_EYE_BOTTOM = 374;

// --- HELPER: Euclidean Distance ---
const getDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

// --- HELPER: Get Horizontal Ratio for one eye ---
// Returns 0.0 (Looking Left) to 1.0 (Looking Right)
const getEyeRatio = (inner, outer, iris) => {
  const eyeWidth = getDistance(inner, outer);
  const distToInner = getDistance(inner, iris);

  // A simple projection ratio
  // If distToInner is small, looking left. If large, looking right.
  return distToInner / eyeWidth;
};

export const calculateGaze = (landmarks) => {
  // 1. BLINK DETECTION (Check both eyes for robustness)
  const leftOpenRatio = getDistance(landmarks[LEFT_EYE_TOP], landmarks[LEFT_EYE_BOTTOM]) /
                        getDistance(landmarks[LEFT_EYE_RIGHT], landmarks[LEFT_EYE_LEFT]);

  const rightOpenRatio = getDistance(landmarks[RIGHT_EYE_TOP], landmarks[RIGHT_EYE_BOTTOM]) /
                         getDistance(landmarks[RIGHT_EYE_RIGHT], landmarks[RIGHT_EYE_LEFT]);

  // If average openness is low, it's a blink
  if ((leftOpenRatio + rightOpenRatio) / 2 < 0.28) {
    return "BLINK";
  }

  // 2. GAZE DETECTION (Horizontal)

  // Calculate horizontal position for Left Eye
  const leftRatio = getEyeRatio(
    landmarks[LEFT_EYE_RIGHT],
    landmarks[LEFT_EYE_LEFT],
    landmarks[LEFT_IRIS]
  );

  // Calculate horizontal position for Right Eye
  const rightRatio = getEyeRatio(
    landmarks[RIGHT_EYE_RIGHT],
    landmarks[RIGHT_EYE_LEFT],
    landmarks[RIGHT_IRIS]
  );

  // Average the two eyes
  const avgRatio = (leftRatio + rightRatio) / 2;

  // 3. THRESHOLDS (Tuning)
  // 0.5 is roughly center.
  // < 0.35 means looking toward inner corner (Left relative to screen)
  // > 0.65 means looking toward outer corner (Right relative to screen)

  // NOTE: Directions depend on if camera is Mirrored.
  // Assuming Mirrored (Standard Webcam):
  // Low Ratio = Looking User's Right (Screen Right)
  // High Ratio = Looking User's Left (Screen Left)

  // Let's assume non-mirrored raw coordinates first, then flip label if needed.
  // Usually:
  // Ratio < 0.45 -> Looking Right (Screen Left if mirrored)
  // Ratio > 0.55 -> Looking Left (Screen Right if mirrored)

  if (avgRatio > 0.60) return "LEFT";
  if (avgRatio < 0.40) return "RIGHT";

  return "CENTER";
};
