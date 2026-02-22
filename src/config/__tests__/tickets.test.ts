import { describe, it, expect, afterEach } from 'vitest';
import { ticketConfig, getActiveTiers, givebutterCampaign } from '../tickets';
import type { TicketPhase } from '../tickets';

const originalPhase = ticketConfig.currentPhase;

afterEach(() => {
  ticketConfig.currentPhase = originalPhase;
});

describe('getActiveTiers', () => {
  it('returns 2 tiers in early-bird phase', () => {
    ticketConfig.currentPhase = 'early-bird';
    const tiers = getActiveTiers();
    expect(tiers).toHaveLength(2);

    const earlyBird = tiers.find((t) => t.id === 'earlyBird')!;
    expect(earlyBird.enabled).toBe(true);
    expect(earlyBird.style).toBe('highlighted');

    const fullPrice = tiers.find((t) => t.id === 'fullPrice')!;
    expect(fullPrice.enabled).toBe(false);
    expect(fullPrice.style).toBe('dimmed');
  });

  it('returns 1 tier in regular phase', () => {
    ticketConfig.currentPhase = 'regular';
    const tiers = getActiveTiers();
    expect(tiers).toHaveLength(1);

    const fullPrice = tiers[0];
    expect(fullPrice.id).toBe('fullPrice');
    expect(fullPrice.enabled).toBe(true);
    expect(fullPrice.style).toBe('normal');
  });

  it('returns 1 tier in last-chance phase', () => {
    ticketConfig.currentPhase = 'last-chance';
    const tiers = getActiveTiers();
    expect(tiers).toHaveLength(1);

    const fullPrice = tiers[0];
    expect(fullPrice.id).toBe('fullPrice');
    expect(fullPrice.enabled).toBe(true);
    expect(fullPrice.style).toBe('highlighted');
  });

  it('returns 1 tier in sold-out phase', () => {
    ticketConfig.currentPhase = 'sold-out';
    const tiers = getActiveTiers();
    expect(tiers).toHaveLength(1);

    const fullPrice = tiers[0];
    expect(fullPrice.id).toBe('fullPrice');
    expect(fullPrice.enabled).toBe(false);
    expect(fullPrice.style).toBe('dimmed');
  });

  it('merged tiers include both tier and state properties', () => {
    ticketConfig.currentPhase = 'early-bird';
    const tiers = getActiveTiers();
    const tier = tiers[0];

    expect(tier).toHaveProperty('name');
    expect(tier).toHaveProperty('price');
    expect(tier).toHaveProperty('features');
    expect(tier).toHaveProperty('visible');
    expect(tier).toHaveProperty('enabled');
    expect(tier).toHaveProperty('style');
  });
});

describe('givebutterCampaign', () => {
  it('is a non-empty string', () => {
    expect(typeof givebutterCampaign).toBe('string');
    expect(givebutterCampaign.length).toBeGreaterThan(0);
  });
});
