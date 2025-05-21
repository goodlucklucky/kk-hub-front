export const calculateSpeedData = (dayRetention = 0) => {
  // --- 1. Define the progression curve using a sigmoid ---
  const sigmoid = (t: number, steepness: number = 0.5, midpoint: number = 3) =>
    1 / (1 + Math.exp(-steepness * (t - midpoint)));

  const progression = sigmoid(dayRetention);

  // --- 2. Establish baseline speeds ---
  const minBaseSpeed = 0.4; // Slightly increased from 0.3 for a more engaging start
  const maxBaseSpeed = 3.0; // Reduced from 2.5 to provide a broader range of speeds
  // Baseline speeds increase gradually with progression.
  const baselineMinSpeed =
    minBaseSpeed + (maxBaseSpeed - minBaseSpeed) * progression;
  const baselineMaxSpeed = baselineMinSpeed + 0.7; // Increased fixed offset for more challenge

  // --- 3. Introduce a mild noise factor ---
  // A mild noise factor can add variability to keep the game interesting.
  const noiseFactor = 1 + (Math.random() - 0.5) * 0.2; // Random noise between 0.9 and 1.1

  // --- 4. Combine baseline speeds with the noise ---
  const minSpeed = baselineMinSpeed * noiseFactor;
  let maxSpeed = baselineMaxSpeed * noiseFactor;

  // --- 5. Enforce a dynamic cap on max speed ---
  const dynamicMaxSpeedCap = 3.5 + Math.min(1.0, Math.sqrt(dayRetention) * 0.2);
  maxSpeed = Math.min(maxSpeed, dynamicMaxSpeedCap);

  // --- 6. Helper for rounding to two decimals ---
  const roundToTwo = (num: number) => Math.round(num * 100) / 100;

  // --- 7. Compute maxLevel based on progression ---
  const baseLevel = 60 - dayRetention * 2; // Adjusted logic for a higher starting level
  const maxLevel = Math.max(Math.round(baseLevel * progression), 15); // Ensure a minimum level of 15

  return {
    min: roundToTwo(Math.min(minSpeed, maxSpeed)),
    max: roundToTwo(Math.max(minSpeed, maxSpeed)),
    maxLevel,
  };
};
