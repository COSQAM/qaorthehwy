import { describe, it, expect } from 'vitest';
import { sponsorshipConfig } from '../sponsorship';

describe('soldOut', () => {
  it('sold out tiers still have all required display fields', () => {
    const soldOutTiers = sponsorshipConfig.tiers.filter((t) => t.soldOut);
    soldOutTiers.forEach((tier) => {
      expect(tier.name).toBeTruthy();
      expect(tier.price).toBeDefined();
      expect(tier.highlights.length).toBeGreaterThan(0);
    });
  });

  it('available tiers are not marked sold out', () => {
    const available = sponsorshipConfig.tiers.filter((t) => !t.soldOut);
    available.forEach((tier) => {
      expect(tier.soldOut).toBeFalsy();
    });
  });

  it('every tier is selectable in the form or explicitly sold out', () => {
    sponsorshipConfig.tiers.forEach((tier) => {
      expect(tier.id).toBeTruthy();
      expect(tier.name).toBeTruthy();
      // form uses tier.soldOut to disable checkbox — must be boolean or undefined
      expect([true, false, undefined]).toContain(tier.soldOut);
    });
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
