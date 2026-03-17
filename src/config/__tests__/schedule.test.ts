import { describe, it, expect, afterEach } from 'vitest';
import { scheduleConfig, getSchedulePhaseConfig } from '../schedule';

const originalPhase = scheduleConfig.currentPhase;

afterEach(() => {
  scheduleConfig.currentPhase = originalPhase;
});

describe('getSchedulePhaseConfig', () => {
  it('coming-soon: hides schedule and times, shows message', () => {
    scheduleConfig.currentPhase = 'coming-soon';
    const config = getSchedulePhaseConfig();

    expect(config.showSchedule).toBe(false);
    expect(config.showTimes).toBe(false);
    expect(config.message).toBeDefined();
    expect(typeof config.message!.title).toBe('string');
    expect(typeof config.message!.subtitle).toBe('string');
  });

  it('times-tbd: shows schedule but hides times, shows message', () => {
    scheduleConfig.currentPhase = 'times-tbd';
    const config = getSchedulePhaseConfig();

    expect(config.showSchedule).toBe(true);
    expect(config.showTimes).toBe(false);
    expect(config.message).toBeDefined();
    expect(typeof config.message!.title).toBe('string');
    expect(typeof config.message!.subtitle).toBe('string');
  });

  it('published: shows schedule and times, no message', () => {
    scheduleConfig.currentPhase = 'published';
    const config = getSchedulePhaseConfig();

    expect(config.showSchedule).toBe(true);
    expect(config.showTimes).toBe(true);
    expect(config.message).toBeUndefined();
  });

  it('every phase has a valid phaseConfig entry', () => {
    const phases = Object.keys(scheduleConfig.phaseConfig);
    expect(phases).toContain('coming-soon');
    expect(phases).toContain('times-tbd');
    expect(phases).toContain('published');

    for (const phase of phases) {
      const config = scheduleConfig.phaseConfig[phase as keyof typeof scheduleConfig.phaseConfig];
      expect(typeof config.showSchedule).toBe('boolean');
      expect(typeof config.showTimes).toBe('boolean');
    }
  });
});
