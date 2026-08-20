import { describe, it, expect } from 'vitest';
import { sponsorConfig } from '../sponsors';

describe('sponsorConfig', () => {
  it('has all tier keys', () => {
    expect(sponsorConfig).toHaveProperty('platinum');
    expect(sponsorConfig).toHaveProperty('gold');
    expect(sponsorConfig).toHaveProperty('silver');
    expect(sponsorConfig).toHaveProperty('lunch');
    expect(sponsorConfig).toHaveProperty('snack');
    expect(sponsorConfig).toHaveProperty('tshirt');
  });

  it('every tier is an array', () => {
    Object.values(sponsorConfig).forEach((tier) => {
      expect(Array.isArray(tier)).toBe(true);
    });
  });

  it('every listed sponsor has a name and logo', () => {
    // The roster is empty between conference cycles; this validates whatever is present.
    Object.values(sponsorConfig)
      .flat()
      .forEach((sponsor) => {
        expect(typeof sponsor.name).toBe('string');
        expect(sponsor.name.length).toBeGreaterThan(0);
        expect(sponsor.logo).toBeDefined();
      });
  });

  it('sponsors with website have string URLs', () => {
    const allSponsors = [
      ...sponsorConfig.platinum,
      ...sponsorConfig.gold,
      ...sponsorConfig.silver,
      ...sponsorConfig.lunch,
      ...sponsorConfig.snack,
      ...sponsorConfig.tshirt,
      ...sponsorConfig.lunch
    ];

    allSponsors.forEach((sponsor) => {
      if (sponsor.website) {
        expect(typeof sponsor.website).toBe('string');
      }
    });
  });
});
