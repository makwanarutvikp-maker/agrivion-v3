import { describe, expect, it } from "vitest";
import { steeringAngles } from "./steering";

describe("ideal Ackermann steering illustration", () => {
  it("keeps both wheels straight at zero", () => {
    expect(steeringAngles(0)).toEqual({ left: 0, right: 0, inner: 0, outer: 0 });
  });
  it("turns the inside wheel further and mirrors left and right", () => {
    const right = steeringAngles(25),
      left = steeringAngles(-25);
    expect(right.right).toBeGreaterThan(right.left);
    expect(left.left).toBe(-right.right);
    expect(left.right).toBe(-right.left);
  });
  it("satisfies the common turning-centre geometry", () => {
    const { inner, outer } = steeringAngles(30);
    const cot = (degrees: number) => 1 / Math.tan((degrees * Math.PI) / 180);
    expect(cot(outer) - cot(inner)).toBeCloseTo(1.6 / 2.4, 10);
  });
  it("bounds extreme input and safely handles non-finite values", () => {
    expect(steeringAngles(100)).toEqual(steeringAngles(35));
    expect(steeringAngles(NaN)).toEqual(steeringAngles(0));
  });
});
