// Schedule feature flag configuration for static site
// To change schedule visibility, update the `currentPhase` value and rebuild

export type SchedulePhase = 'coming-soon' | 'published';

interface ScheduleConfig {
  currentPhase: SchedulePhase;
  phaseConfig: Record<SchedulePhase, {
    showSchedule: boolean;
    message?: {
      title: string;
      subtitle: string;
    };
  }>;
}

// Main schedule configuration
export const scheduleConfig: ScheduleConfig = {
  // ⚡ FEATURE FLAG: Change this to switch schedule visibility
  // Options: 'coming-soon' | 'published'
  currentPhase: 'published',

  // Phase-specific behavior for schedule
  phaseConfig: {
    'coming-soon': {
      showSchedule: false,
      message: {
        title: 'Schedule coming soon!',
        subtitle: "We're working on an amazing lineup of sessions.",
      },
    },
    'published': {
      showSchedule: true,
    },
  },
};

// Helper function to get current schedule configuration
export function getSchedulePhaseConfig() {
  return scheduleConfig.phaseConfig[scheduleConfig.currentPhase];
}
