import { describe, it, expect } from 'vitest';
import {
  sponsorshipConfig,
  getTierById,
  getFeaturedTiers,
  getBoothSponsorships,
  getNamedSponsorships,
  getSoldOutTiers,
} from '../sponsorship';

describe('getTierById', () => {
  it('returns platinum tier for "platinum"', () => {
    const tier = getTierById('platinum');
    expect(tier).toBeDefined();
    expect(tier!.id).toBe('platinum');
    expect(tier!.name).toBe('Platinum');
  });

  it('returns undefined for unknown ID', () => {
    expect(getTierById('nonexistent')).toBeUndefined();
  });
});

describe('getFeaturedTiers', () => {
  it('returns exactly 2 featured tiers (platinum and gold)', () => {
    const featured = getFeaturedTiers();
    expect(featured).toHaveLength(2);

    const ids = featured.map((t) => t.id);
    expect(ids).toContain('platinum');
    expect(ids).toContain('gold');
  });

  it('all returned tiers have featured: true', () => {
    const featured = getFeaturedTiers();
    featured.forEach((tier) => {
      expect(tier.featured).toBe(true);
    });
  });
});

describe('getBoothSponsorships', () => {
  it('returns exactly 3 booth tiers (platinum, gold, silver)', () => {
    const booths = getBoothSponsorships();
    expect(booths).toHaveLength(3);

    const ids = booths.map((t) => t.id);
    expect(ids).toContain('platinum');
    expect(ids).toContain('gold');
    expect(ids).toContain('silver');
  });

  it('all returned tiers have boothLocation and boothSize', () => {
    const booths = getBoothSponsorships();
    booths.forEach((tier) => {
      expect(tier.benefits.boothLocation).toBeDefined();
      expect(tier.benefits.boothSize).toBeDefined();
    });
  });
});

describe('getNamedSponsorships', () => {
  it('returns exactly 4 named tiers (lunch, tshirt, snack, lanyard)', () => {
    const named = getNamedSponsorships();
    expect(named).toHaveLength(4);

    const ids = named.map((t) => t.id);
    expect(ids).toContain('lunch');
    expect(ids).toContain('tshirt');
    expect(ids).toContain('snack');
    expect(ids).toContain('lanyard');
  });

  it('all returned tiers have namedSponsorship', () => {
    const named = getNamedSponsorships();
    named.forEach((tier) => {
      expect(tier.benefits.namedSponsorship).toBeDefined();
    });
  });
});

describe('soldOut', () => {
  it('tiers default to not sold out', () => {
    sponsorshipConfig.tiers.forEach((tier) => {
      expect(tier.soldOut).toBeFalsy();
    });
  });

  it('getSoldOutTiers returns empty array when no tiers are sold out', () => {
    const soldOut = getSoldOutTiers();
    expect(soldOut).toHaveLength(0);
  });

  it('sold-out tiers are still returned by getTierById', () => {
    // Even if a tier were sold out, getTierById should still find it
    const tier = getTierById('lanyard');
    expect(tier).toBeDefined();
    expect(tier!.id).toBe('lanyard');
  });

  it('sold-out tiers are still returned by getBoothSponsorships', () => {
    const booths = getBoothSponsorships();
    expect(booths.length).toBeGreaterThan(0);
    // All booth tiers should be present regardless of soldOut status
    const ids = booths.map((t) => t.id);
    expect(ids).toContain('platinum');
    expect(ids).toContain('gold');
    expect(ids).toContain('silver');
  });

  it('sold-out tiers are still returned by getNamedSponsorships', () => {
    const named = getNamedSponsorships();
    expect(named.length).toBeGreaterThan(0);
    const ids = named.map((t) => t.id);
    expect(ids).toContain('lunch');
    expect(ids).toContain('tshirt');
    expect(ids).toContain('snack');
    expect(ids).toContain('lanyard');
  });
});

describe('data integrity', () => {
  it('config has exactly 7 tiers', () => {
    expect(sponsorshipConfig.tiers).toHaveLength(7);
  });

  it('job title percentages sum to 100', () => {
    const sum = sponsorshipConfig.demographics.jobTitles.reduce(
      (acc, jt) => acc + jt.percentage,
      0
    );
    expect(sum).toBe(100);
  });

  it('company size percentages sum to 100', () => {
    const sum = sponsorshipConfig.demographics.companySizes.reduce(
      (acc, cs) => acc + cs.percentage,
      0
    );
    expect(sum).toBe(100);
  });

  it('all FAQs have question and answer strings', () => {
    sponsorshipConfig.faqs.forEach((faq) => {
      expect(typeof faq.question).toBe('string');
      expect(faq.question.length).toBeGreaterThan(0);
      expect(typeof faq.answer).toBe('string');
      expect(faq.answer.length).toBeGreaterThan(0);
    });
  });

  it('all resources have required fields', () => {
    sponsorshipConfig.resources.forEach((resource) => {
      expect(typeof resource.title).toBe('string');
      expect(typeof resource.description).toBe('string');
      expect(typeof resource.url).toBe('string');
      expect(['pdf', 'link', 'signing']).toContain(resource.type);
    });
  });
});
