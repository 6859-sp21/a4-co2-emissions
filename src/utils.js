export function abbreviateNumber(number) {

  let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  // what tier? (determines SI symbol)
  let tier = Math.log10(Math.abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if(tier == 0) return number;

  // get suffix and determine scale
  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);

  // scale the number
  let scaled = number / scale;

  // format number and add suffix
  return Math.round(scaled) + suffix;
}

export function getCentralAngle(x, y, width, height) {
  const pi = Math.PI;
  const pi2 = pi * 2;

  const corrX = x - width / 2;
  const corrY = height / 2 - y;

  let angle = corrY > 0 ? Math.atan(corrX / corrY) : Math.atan(corrY / corrX);

  if (corrY <= 0 && corrX > 0) angle = -angle + pi / 2;
  if (corrY <= 0 && corrX <= 0) angle = 1.5 * pi - angle;
  if (corrY > 0 && corrX <= 0) angle = angle + pi2;
  
  return angle;
}