// Ticket feature flag configuration for static site
// To change ticket states, update the `currentPhase` value and rebuild

export type TicketPhase = 'early-bird' | 'regular' | 'last-chance' | 'sold-out';
export type TicketStyle = 'normal' | 'dimmed' | 'highlighted';

interface TicketTierState {
  visible: boolean;
  enabled: boolean;
  style: TicketStyle;
}

interface TicketTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  deadline?: string; // Optional deadline text (e.g., "Ends March 1st")
}

interface TicketConfig {
  currentPhase: TicketPhase;
  tiers: Record<string, TicketTier>;
  phaseConfig: Record<TicketPhase, Record<string, TicketTierState>>;
}

// Shared features for all tickets
const features = [
  'Access to 32 different talks given by world renowned speakers',
  'Breakfast and Lunch provided',
  'Conference t-shirt',
  'Coffee, Water, Soda, and Tea provided between sessions',
  'Afternoon snacks provided',
  'Conference and Sponsor Raffles',
  'Parking covered with ticket',
];

// Givebutter campaign configuration
export const givebutterCampaign = '7ZPS6Z';

// Main ticket configuration
export const ticketConfig: TicketConfig = {
  // ⚡ FEATURE FLAG: Change this to switch ticket states
  // Options: 'early-bird' | 'regular' | 'last-chance' | 'sold-out'
  currentPhase: 'early-bird',

  // Ticket tier definitions
  tiers: {
    earlyBird: {
      id: 'earlyBird',
      name: 'Early Bird',
      price: '$99',
      features,
      deadline: 'Ends March 1st, 2026', // Update this date as needed
    },
    fullPrice: {
      id: 'fullPrice',
      name: 'Full Price',
      price: '$129',
      features,
    },
  },

  // Phase-specific behavior for each tier
  phaseConfig: {
    'early-bird': {
      earlyBird: {
        visible: true,
        enabled: true,
        style: 'highlighted', // Show as featured/active tier
      },
      fullPrice: {
        visible: true,
        enabled: false,
        style: 'dimmed', // Show but disabled with dark background
      },
    },
    'regular': {
      earlyBird: {
        visible: false, // Hide early bird completely
        enabled: false,
        style: 'normal',
      },
      fullPrice: {
        visible: true,
        enabled: true,
        style: 'normal',
      },
    },
    'last-chance': {
      earlyBird: {
        visible: false,
        enabled: false,
        style: 'normal',
      },
      fullPrice: {
        visible: true,
        enabled: true,
        style: 'highlighted', // Emphasize urgency
      },
    },
    'sold-out': {
      earlyBird: {
        visible: false,
        enabled: false,
        style: 'normal',
      },
      fullPrice: {
        visible: true,
        enabled: false,
        style: 'dimmed',
      },
    },
  },
};

// Helper function to get active tiers with their current states
export function getActiveTiers() {
  const { currentPhase, tiers, phaseConfig } = ticketConfig;
  const currentConfig = phaseConfig[currentPhase];

  return Object.entries(tiers)
    .map(([id, tier]) => ({
      ...tier,
      ...currentConfig[id],
    }))
    .filter((tier) => tier.visible);
}
