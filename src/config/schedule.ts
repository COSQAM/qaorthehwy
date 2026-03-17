// Schedule feature flag configuration for static site
// To change schedule visibility, update the `currentPhase` value and rebuild

export type SchedulePhase = 'coming-soon' | 'times-tbd' | 'published';

interface ScheduleConfig {
  currentPhase: SchedulePhase;
  phaseConfig: Record<SchedulePhase, {
    showSchedule: boolean;
    showTimes: boolean;
    message?: {
      title: string;
      subtitle: string;
    };
  }>;
}

// Main schedule configuration
export const scheduleConfig: ScheduleConfig = {
  // ⚡ FEATURE FLAG: Change this to switch schedule visibility
  // Options: 'coming-soon' | 'times-tbd' | 'published'
  currentPhase: 'times-tbd',

  // Phase-specific behavior for schedule
  phaseConfig: {
    'coming-soon': {
      showSchedule: false,
      showTimes: false,
      message: {
        title: 'Schedule coming soon!',
        subtitle: "We're working on an amazing lineup of sessions.",
      },
    },
    'times-tbd': {
      showSchedule: true,
      showTimes: false,
      message: {
        title: 'Session times coming soon!',
        subtitle: 'The full schedule with time slots will be announced shortly. Check back for updates!',
      },
    },
    'published': {
      showSchedule: true,
      showTimes: true,
    },
  },
};

// Helper function to get current schedule configuration
export function getSchedulePhaseConfig() {
  return scheduleConfig.phaseConfig[scheduleConfig.currentPhase];
}
