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
  currentPhase: 'coming-soon',

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

// Sessionize event-app URL ("Plan your day using our event app!" link on the
// schedule page). The 2027 slug has not been issued yet; the link is hidden
// while this is null. Set it to e.g. 'https://<slug>.sessionize.com/' once known.
export const eventAppUrl: string | null = null;

// Helper function to get current schedule configuration
export function getSchedulePhaseConfig() {
  return scheduleConfig.phaseConfig[scheduleConfig.currentPhase];
}
