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

  it('non-empty tiers have sponsors with name and logo', () => {
    const nonEmptyTiers = [
      sponsorConfig.platinum,
      sponsorConfig.gold,
      sponsorConfig.silver,
    ];

    nonEmptyTiers.forEach((tier) => {
      expect(tier.length).toBeGreaterThan(0);
      tier.forEach((sponsor) => {
        expect(typeof sponsor.name).toBe('string');
        expect(sponsor.name.length).toBeGreaterThan(0);
        expect(sponsor.logo).toBeDefined();
      });
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
    ];

    allSponsors.forEach((sponsor) => {
      if (sponsor.website) {
        expect(typeof sponsor.website).toBe('string');
      }
    });
  });

  it('empty tiers are empty arrays', () => {
    expect(sponsorConfig.lunch).toEqual([]);
    expect(sponsorConfig.snack).toEqual([]);
    expect(sponsorConfig.tshirt).toEqual([]);
  });
});
