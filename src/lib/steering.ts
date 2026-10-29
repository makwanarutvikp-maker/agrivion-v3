/** Ideal Ackermann illustration. Ratios are illustrative, not Agrivion dimensions. */
export function steeringAngles(input: number) {
  const angle = Number.isFinite(input) ? Math.max(-35, Math.min(35, input)) : 0;
  if (angle === 0) return { left: 0, right: 0, inner: 0, outer: 0 };
  const wheelbase = 2.4;
  const track = 1.6;
  const radius = wheelbase / Math.tan((Math.abs(angle) * Math.PI) / 180);
  const inner = (Math.atan(wheelbase / (radius - track / 2)) * 180) / Math.PI;
  const outer = (Math.atan(wheelbase / (radius + track / 2)) * 180) / Math.PI;
  return angle < 0
    ? { left: -inner, right: -outer, inner, outer }
    : { left: outer, right: inner, inner, outer };
}
