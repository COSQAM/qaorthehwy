import { describe, it, expect, afterEach } from 'vitest';
import { scheduleConfig, getSchedulePhaseConfig } from '../schedule';

const originalPhase = scheduleConfig.currentPhase;

afterEach(() => {
  scheduleConfig.currentPhase = originalPhase;
});

describe('getSchedulePhaseConfig', () => {
  it('coming-soon: hides schedule, shows message with title and subtitle', () => {
    scheduleConfig.currentPhase = 'coming-soon';
    const config = getSchedulePhaseConfig();

    expect(config.showSchedule).toBe(false);
    expect(config.message).toBeDefined();
    expect(typeof config.message!.title).toBe('string');
    expect(typeof config.message!.subtitle).toBe('string');
  });

  it('published: shows schedule, no message', () => {
    scheduleConfig.currentPhase = 'published';
    const config = getSchedulePhaseConfig();

    expect(config.showSchedule).toBe(true);
    expect(config.message).toBeUndefined();
  });
});
