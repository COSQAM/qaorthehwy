import { describe, it, expect } from 'vitest';
import { socialConfig } from '../social';

describe('socialConfig', () => {
  it('has slackUrl as a non-empty string', () => {
    expect(typeof socialConfig.slackUrl).toBe('string');
    expect(socialConfig.slackUrl.length).toBeGreaterThan(0);
  });
});
