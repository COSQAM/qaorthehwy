// Speaker feature flag configuration for static site
// To change speaker visibility, update the `currentPhase` value and rebuild

export type SpeakerPhase = 'keynotes-only' | 'partial-lineup' | 'full-lineup';

interface SpeakerSectionState {
  visible: boolean;
  message?: string;
}

interface SpeakerBanner {
  title: string;
  subtitle?: string;
}

interface SpeakerConfig {
  currentPhase: SpeakerPhase;
  phaseConfig: Record<SpeakerPhase, {
    keynotesSection: SpeakerSectionState;
    sessionSpeakersCarousel: SpeakerSectionState;
    speakersPage: SpeakerSectionState;
    speakersPageBanner?: SpeakerBanner;
  }>;
}

// Main speaker configuration
export const speakerConfig: SpeakerConfig = {
  // ⚡ FEATURE FLAG: Change this to switch speaker visibility
  // Options: 'keynotes-only' | 'partial-lineup' | 'full-lineup'
  currentPhase: 'partial-lineup',

  // Phase-specific behavior for speaker sections
  phaseConfig: {
    'keynotes-only': {
      keynotesSection: {
        visible: true,
      },
      sessionSpeakersCarousel: {
        visible: false,
      },
      speakersPage: {
        visible: true,
        message: 'More speakers will be announced soon! Check back later for updates.',
      },
    },
    'partial-lineup': {
      keynotesSection: {
        visible: true,
      },
      sessionSpeakersCarousel: {
        visible: true,
      },
      speakersPage: {
        visible: true,
      },
      speakersPageBanner: {
        title: 'More speakers on the way!',
        subtitle:
          'This is not the full speaker list — additional speakers will be added as they accept their invitations. Check back for updates!',
      },
    },
    'full-lineup': {
      keynotesSection: {
        visible: true,
      },
      sessionSpeakersCarousel: {
        visible: true,
      },
      speakersPage: {
        visible: true,
      },
    },
  },
};

// Helper function to get current speaker configuration
export function getSpeakerPhaseConfig() {
  return speakerConfig.phaseConfig[speakerConfig.currentPhase];
}
