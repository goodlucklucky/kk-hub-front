export const calculateSpeedData = (score: number) => {
  // Balance base speed for engagement while keeping it manageable
  const BASE_SPEED = 0.875; // Increased from 0.75 but still less than 0.9
  const MIN_SPEED = 0.875;
  const MAX_SPEED = 4.8; // Keep max speed cap

  let speedIncrease;

  if (score <= 5) {
    // First 5 eggs - gentle introduction
    speedIncrease = score * 0.02; // Gentle but noticeable
  } else if (score <= 10) {
    // Next 5 eggs - slightly faster
    const baseIncrease = 5 * 0.02;
    const additionalScore = score - 5;
    speedIncrease = baseIncrease + additionalScore * 0.025;
  } else if (score <= 15) {
    // Next 5 eggs - medium increase
    const baseIncrease = 5 * 0.02 + 5 * 0.025;
    const additionalScore = score - 10;
    speedIncrease = baseIncrease + additionalScore * 0.03;
  } else if (score <= 20) {
    // Next 5 eggs - faster linear
    const baseIncrease = 5 * 0.02 + 5 * 0.025 + 5 * 0.03;
    const additionalScore = score - 15;
    speedIncrease = baseIncrease + additionalScore * 0.035;
  } else if (score <= 25) {
    // Last 5 eggs of linear phase
    const baseIncrease = 5 * 0.02 + 5 * 0.025 + 5 * 0.03 + 5 * 0.035;
    const additionalScore = score - 20;
    speedIncrease = baseIncrease + additionalScore * 0.04;
  } else {
    // Exponential phase starting at score 25
    const baseIncrease = 5 * 0.02 + 5 * 0.025 + 5 * 0.03 + 5 * 0.035 + 5 * 0.04;
    const additionalScore = score - 25;
    // Slightly more aggressive exponential curve
    const expIncrease = (Math.pow(1.075, additionalScore) - 1) * 0.38;
    speedIncrease = baseIncrease + expIncrease;
  }

  const currentSpeed = Math.min(
    MAX_SPEED,
    Math.max(MIN_SPEED, BASE_SPEED + speedIncrease)
  );

  const maxLevel = Math.max(15, Math.round(100 - currentSpeed * 15));

  return {
    min: Number(currentSpeed.toFixed(2)),
    max: Number(currentSpeed.toFixed(2)),
    maxLevel,
  };
};

// Speed progression:
// Score  0: 0.82 (balanced start - engaging but manageable)
// Score  5: 0.92 (end of first phase)
// Score 10: 1.05 (end of second phase)
// Score 15: 1.20 (end of third phase)
// Score 20: 1.38 (end of fourth phase)
// Score 25: 1.58 (end of linear phases)
// Score 30: 1.99 (exponential kicking in)
// Score 35: 2.54 (challenging)
// Score 40: 3.27 (very challenging)
// Score 45: 4.21 (highly challenging)
// Score 47: 4.80 (maximum speed reached)
