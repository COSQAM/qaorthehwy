// Speaker feature flag configuration for static site
// To change speaker visibility, update the `currentPhase` value and rebuild

export type SpeakerPhase = 'not-announced' | 'keynotes-only' | 'partial-lineup' | 'full-lineup';

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
  // Options: 'not-announced' | 'keynotes-only' | 'partial-lineup' | 'full-lineup'
  currentPhase: 'not-announced',

  // Phase-specific behavior for speaker sections
  phaseConfig: {
    // Pre-announcement: no speakers shown anywhere, speaker detail pages are not built
    'not-announced': {
      keynotesSection: {
        visible: false,
      },
      sessionSpeakersCarousel: {
        visible: false,
      },
      speakersPage: {
        visible: false,
        message: 'Speakers will be announced soon! Check back later for updates.',
      },
    },
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
