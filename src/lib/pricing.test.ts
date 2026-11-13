import { describe, expect, it } from 'vitest';
import { monthlyPrice } from './pricing';

describe('monthlyPrice', () => {
  it('charges 29 per location per month', () => {
    expect(monthlyPrice(1, 'monthly')).toBe(29);
    expect(monthlyPrice(10, 'monthly')).toBe(290);
  });

  it('charges 24 for each location from the 11th', () => {
    expect(monthlyPrice(11, 'monthly')).toBe(314);
  });

  it('takes 20% off with annual billing', () => {
    expect(monthlyPrice(1, 'annual')).toBe(23.2);
  });

  it('takes 20% off the monthly total only once above 10 locations (TC-12)', () => {
    // 10 × 29 + 2 × 24 = 338 per month; 338 × 0.8 = 270.40; 270.40 × 12 = 3244.80 per year
    expect(monthlyPrice(12, 'annual')).toBe(270.4);
    expect(monthlyPrice(12, 'annual') * 12).toBeCloseTo(3244.8, 2);
  });
});
