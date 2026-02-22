import { describe, it, expect } from 'vitest';
import { getCallForSpeakersConfig, getFeedbackConfig } from '../announcements';

describe('getCallForSpeakersConfig', () => {
  it('returns an object with all required fields', () => {
    const config = getCallForSpeakersConfig();

    expect(typeof config.enabled).toBe('boolean');
    expect(typeof config.title).toBe('string');
    expect(typeof config.description).toBe('string');
    expect(typeof config.ctaText).toBe('string');
    expect(typeof config.ctaUrl).toBe('string');
  });

  it('has a deadline string', () => {
    const config = getCallForSpeakersConfig();
    expect(typeof config.deadline).toBe('string');
    expect(config.deadline!.length).toBeGreaterThan(0);
  });

  it('opens in new tab', () => {
    const config = getCallForSpeakersConfig();
    expect(config.openInNewTab).toBe(true);
  });
});

describe('getFeedbackConfig', () => {
  it('returns an object with all required fields', () => {
    const config = getFeedbackConfig();

    expect(typeof config.enabled).toBe('boolean');
    expect(typeof config.title).toBe('string');
    expect(typeof config.description).toBe('string');
    expect(typeof config.ctaText).toBe('string');
    expect(typeof config.ctaUrl).toBe('string');
  });

  it('does not open in new tab', () => {
    const config = getFeedbackConfig();
    expect(config.openInNewTab).toBe(false);
  });
});
