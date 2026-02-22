import { describe, it, expect, afterEach } from 'vitest';
import { speakerConfig, getSpeakerPhaseConfig } from '../speakers';

const originalPhase = speakerConfig.currentPhase;

afterEach(() => {
  speakerConfig.currentPhase = originalPhase;
});

describe('getSpeakerPhaseConfig', () => {
  it('keynotes-only: shows keynotes, hides carousel, shows speakers page with message', () => {
    speakerConfig.currentPhase = 'keynotes-only';
    const config = getSpeakerPhaseConfig();

    expect(config.keynotesSection.visible).toBe(true);
    expect(config.sessionSpeakersCarousel.visible).toBe(false);
    expect(config.speakersPage.visible).toBe(true);
    expect(typeof config.speakersPage.message).toBe('string');
    expect(config.speakersPage.message!.length).toBeGreaterThan(0);
  });

  it('full-lineup: shows keynotes, carousel, and speakers page without message', () => {
    speakerConfig.currentPhase = 'full-lineup';
    const config = getSpeakerPhaseConfig();

    expect(config.keynotesSection.visible).toBe(true);
    expect(config.sessionSpeakersCarousel.visible).toBe(true);
    expect(config.speakersPage.visible).toBe(true);
    expect(config.speakersPage.message).toBeUndefined();
  });
});
