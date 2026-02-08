// Sponsorship configuration for QA or the Highway 2026

export interface SponsorshipBenefit {
  category: string;
  items: string[];
}

export interface SponsorshipTier {
  id: string;
  name: string;
  price: number | string; // number for fixed price, "Ask" for variable pricing
  tagline: string;
  description: string;
  featured?: boolean;
  color?: string;
  benefits: {
    boothLocation?: string;
    boothSize?: string;
    lunchPasses?: number;
    parkingPasses?: number;
    logoPlacement: string[];
    socialMediaPosts?: string;
    guaranteedSpeakingSlot?: boolean;
    keynoteSponsorship?: boolean;
    namedSponsorship?: string;
    specialBenefits?: string[];
    discounts?: string[];
  };
  highlights: string[]; // Top 3-5 key benefits for the tier card
}

export interface JobTitleDistribution {
  title: string;
  percentage: number;
}

export interface CompanySize {
  range: string;
  percentage: number;
}

export interface Demographics {
  expectedAttendees: number;
  jobTitles: JobTitleDistribution[];
  companySizes: CompanySize[];
  industries: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  type: 'pdf' | 'link' | 'signing';
  fileSize?: string;
}

export interface SponsorshipConfig {
  tiers: SponsorshipTier[];
  demographics: Demographics;
  faqs: FAQ[];
  resources: Resource[];
  benefitCategories: SponsorshipBenefit[];
}

// Sponsorship Tiers (from SPONSORSHIP 2026.pdf)
const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: 'platinum',
    name: 'Platinum',
    price: 4000,
    tagline: 'Maximum Visibility & Impact',
    description: 'Premium booth location, guaranteed speaking opportunity, and keynote sponsorship for maximum brand exposure.',
    featured: true,
    color: '#E5E4E2',
    benefits: {
      boothLocation: 'Premium location by keynote/lunch entrance',
      boothSize: "10' x 10' booth space with 8' banquet table",
      lunchPasses: 2,
      parkingPasses: 2,
      logoPlacement: [
        'Featured prominently on website',
        'Conference handouts and printed materials',
        'Social media campaign',
        'Logo featured on lunch presentation',
      ],
      socialMediaPosts: 'Dedicated social media post',
      guaranteedSpeakingSlot: true,
      keynoteSponsorship: true,
      specialBenefits: [
        'Premium booth in high-traffic location near keynote and lunch entrance',
        'Introduction during opening remarks',
        'VIP networking opportunities',
      ],
      discounts: [
        '50% off T-Shirt Sponsor tier',
      ],
    },
    highlights: [
      'Premium booth by keynote/lunch entrance',
      'Guaranteed speaking opportunity',
      'Keynote co-sponsorship',
      'Featured logo on all marketing',
      'Dedicated social media post',
      '50% off T-Shirt Sponsorship',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 2750,
    tagline: 'High Visibility & Engagement',
    description: 'Centrally located booth with speaking opportunity and extensive brand visibility across all conference materials.',
    featured: true,
    color: '#FFD700',
    benefits: {
      boothLocation: 'Centrally located booth placement',
      boothSize: "10' x 10' booth space with 8' banquet table",
      lunchPasses: 2,
      parkingPasses: 2,
      logoPlacement: [
        'Large logo on website',
        'Conference handouts and printed materials',
        'Social media campaign',
        'Logo featured on lunch presentation',
      ],
      socialMediaPosts: 'Dedicated social media post',
      guaranteedSpeakingSlot: true,
      keynoteSponsorship: false,
      specialBenefits: [
        'Central booth location ensuring high foot traffic',
        'Speaking slot in track session',
        'Invitation to speaker dinner',
      ],
      discounts: [
        '50% off T-Shirt Sponsor tier',
      ],
    },
    highlights: [
      'Centrally located booth',
      'Guaranteed speaking slot',
      'Logo on all marketing materials',
      'Dedicated social media post',
      '50% off T-Shirt Sponsorship',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 1500,
    tagline: 'Essential Conference Presence',
    description: 'Entry-level booth placement with logo visibility on website, materials, and social media to connect with attendees.',
    color: '#C0C0C0',
    benefits: {
      boothLocation: 'Standard booth placement',
      boothSize: "10' x 10' booth space with 8' banquet table",
      lunchPasses: 2,
      parkingPasses: 2,
      logoPlacement: [
        'Medium logo on website',
        'Conference handouts and printed materials',
        'Social media mentions',
      ],
      socialMediaPosts: 'Dedicated social media post',
      guaranteedSpeakingSlot: false,
      keynoteSponsorship: false,
    },
    highlights: [
      'Conference booth space',
      'Logo on website and materials',
      'Dedicated social media post',
      'Lunch and parking passes',
      'Access to 400+ attendees',
    ],
  },
  {
    id: 'lunch',
    name: 'Lunch Sponsor',
    price: 1500,
    tagline: 'Captive Audience During Lunch',
    description: 'PowerPoint loop on conference screens in lunch room during the lunch break, ensuring high visibility.',
    color: '#FF6B6B',
    benefits: {
      namedSponsorship: 'Exclusive Lunch Sponsorship',
      logoPlacement: [
        'Medium logo on website',
        'Sponsor signage in lunch area',
        'PowerPoint loop during lunch',
      ],
      socialMediaPosts: 'Dedicated social media post',
      specialBenefits: [
        'PowerPoint presentation loop on all screens during lunch break',
        'Prominent signage in lunch area',
        'Captive audience of 400+ attendees during meal',
      ],
    },
    highlights: [
      'PowerPoint loop during lunch',
      'Prominent lunch room signage',
      'Captive audience of 400+ attendees',
      'Dedicated social media post',
      'Logo on website and social',
    ],
  },
  {
    id: 'tshirt',
    name: 'T-Shirt Sponsor',
    price: 1000,
    tagline: 'Long-Lasting Brand Impression',
    description: 'Your logo on the back of conference t-shirts worn by all attendees during and after the event.',
    color: '#4ECDC4',
    benefits: {
      namedSponsorship: 'Exclusive T-Shirt Sponsorship',
      logoPlacement: [
        'Small logo on website',
        'Large logo on back of conference t-shirt',
      ],
      socialMediaPosts: 'Dedicated social media post',
      specialBenefits: [
        'Your logo featured on back of ALL conference t-shirts',
        'Extended brand visibility as attendees wear shirts after event',
        'Logo seen by attendees, their colleagues, and community',
      ],
    },
    highlights: [
      'Logo on all conference t-shirts',
      'Extended visibility beyond event',
      'Worn by 400+ attendees',
      'Logo on website',
      'Dedicated social media post',
    ],
  },
  {
    id: 'snack',
    name: 'Snack Sponsor',
    price: 500,
    tagline: 'Affordable High-Traffic Visibility',
    description: 'Color logo on snack signage outside the snack room, capturing attendees during breaks.',
    color: '#95E1D3',
    benefits: {
      namedSponsorship: 'Exclusive Snack Sponsorship',
      logoPlacement: [
        'Small logo on website',
        'Color logo on snack signage',
      ],
      socialMediaPosts: 'Dedicated social media post',
      specialBenefits: [
        'Prominent signage outside snack room',
        'High visibility during all breaks',
        'Affordable entry-level sponsorship',
      ],
    },
    highlights: [
      'Logo on snack room signage',
      'High visibility during breaks',
      'Affordable entry point',
      'Logo on website',
      'Dedicated social media post',
    ],
  },
  {
    id: 'lanyard',
    name: 'Lanyard Sponsor',
    price: 'Ask',
    tagline: 'All-Day Brand Exposure',
    description: 'Provide conference lanyards with your company logo, worn by every attendee throughout the entire event.',
    color: '#FFA502',
    benefits: {
      namedSponsorship: 'Exclusive Lanyard Sponsorship',
      lunchPasses: 1,
      parkingPasses: 1,
      logoPlacement: [
        'Small logo on website',
        'Your company logo on ALL conference lanyards',
      ],
      socialMediaPosts: 'Dedicated social media post',
      specialBenefits: [
        'You provide custom lanyards with your logo',
        'Worn by every single attendee all day',
        'Constant visibility and brand recognition',
        'Lanyards kept as conference memorabilia',
      ],
    },
    highlights: [
      'Your logo on all lanyards',
      'Worn by every attendee all day',
      'Constant brand visibility',
      'Kept as memorabilia',
      'Logo on website',
    ],
  },
];

// Demographics (based on past attendance and QA community)
const demographics: Demographics = {
  expectedAttendees: 400,
  jobTitles: [
    { title: 'QA Engineers / Test Automation Engineers', percentage: 45 },
    { title: 'QA Leads', percentage: 25 },
    { title: 'Software Engineers', percentage: 15 },
    { title: 'Engineering Managers / Directors', percentage: 10 },
    { title: 'DevOps Engineers', percentage: 5 },
  ],
  companySizes: [
    { range: 'Enterprise (1000+ employees)', percentage: 40 },
    { range: 'Mid-size (100-1000)', percentage: 35 },
    { range: 'Small / Startup (<100)', percentage: 25 },
  ],
  industries: [
    'Insurance',
    'Government / Public Sector',
    'Financial Services / Banking',
    'Technology / Software',
    'Food & Beverage',
    'Energy / Utilities',
    'Transportation / Logistics',
    'Retail / E-commerce',
    'Manufacturing',
  ],
};

// FAQ Section
const faqs: FAQ[] = [
  {
    question: 'What is the deadline for sponsorship commitment?',
    answer:
      'We accept sponsorships on a rolling basis until all spots are filled. Early commitment ensures better booth placement and maximum marketing visibility. We recommend committing at least 2 months before the conference (by April 12, 2026) to maximize your ROI.',
  },
  {
    question: 'Can I customize my sponsorship package?',
    answer:
      'Absolutely! While we offer standard tiers, we\'re happy to create custom packages that align with your goals and budget. Contact us at cosqam@gmail.com to discuss your specific needs and we\'ll work with you to create the perfect sponsorship opportunity.',
  },
  {
    question: 'What are the payment terms?',
    answer:
      'Payment is due within 10 days prior to the event date (June 2, 2026). We invoice via PayPal to the email address on record and prefer electronic payment processing. If you need alternate payment arrangements, please contact us at cosqam@gmail.com.',
  },
  {
    question: 'What is your refund and cancellation policy?',
    answer:
      'Full refunds (minus payment processing fees) are available for written cancellations received by May 1, 2026. Cancellations after May 1 are subject to a $200 processing fee. No refunds are available after June 10, 2026.',
  },
  {
    question: 'What booth materials and setup should I plan for?',
    answer:
      'You\'ll receive one 10\' booth with one 8\' banquet table. Electrical is available upon request. Your entire display must fit within the booth area and comply with local fire regulations. Setup times will be confirmed approximately 1 week before the conference.',
  },
  {
    question: 'When do I need to submit my logo and marketing materials?',
    answer:
      'Please submit your high-resolution logo (PNG, SVG, or EPS format) within 2 weeks of confirming sponsorship to ensure inclusion in all marketing materials. The final deadline for logo submission is May 15, 2026.',
  },
  {
    question: 'How can I measure ROI from my sponsorship?',
    answer:
      'We provide sponsor benefits including direct attendee engagement at your booth, logo visibility on website and materials (with analytics available), social media reach metrics, and speaking opportunities to establish thought leadership. Many sponsors also track leads collected, business cards exchanged, and post-event demo requests.',
  },
  {
    question: 'Are there opportunities for speaking or presenting?',
    answer:
      'Yes! Platinum and Gold sponsors receive guaranteed speaking opportunities. Platinum sponsors get keynote co-sponsorship and a 5-minute spotlight, while Gold sponsors receive a speaking slot in one of our track sessions. Speaker names, bios, and abstracts must be received one month before the event.',
  },
  {
    question: 'What attendee information will I receive?',
    answer:
      'COSQAM does not release attendee lists or contact information. Sponsors are encouraged to collect attendee information directly through engaging and interactive booths, demos, giveaways, and conversations during the event.',
  },
  {
    question: 'Can I bring my own food or promotional items to the event?',
    answer:
      'You may bring promotional items, swag, and branded materials to distribute at your booth. However, outside food and beverages are not permitted. Snack and lunch selections are controlled by the conference committee to ensure venue compliance and attendee dietary needs.',
  },
];

// Downloadable Resources
const resources: Resource[] = [
  {
    title: 'Sign Sponsorship Agreement Online',
    description: 'Review and sign the sponsorship agreement digitally — no printing or scanning required',
    url: 'https://docuseal.com/d/f4ZJWynaiufZo3',
    type: 'signing',
  },
  {
    title: 'Sponsorship Prospectus 2026',
    description: 'Comprehensive overview of all sponsorship tiers, benefits, and conference details',
    url: '/sponsorship/Sponsorship-Prospectus-2026.pdf',
    type: 'pdf',
    fileSize: '714 KB',
  },
  {
    title: 'Sponsor Agreement PDF',
    description: 'Review our standard sponsorship agreement terms and conditions',
    url: '/sponsorship/Sponsor-Agreement-2026.pdf',
    type: 'pdf',
    fileSize: '107 KB',
  },
];

// Benefit Categories for Accordion Section
const benefitCategories: SponsorshipBenefit[] = [
  {
    category: 'Booth Placement & Traffic',
    items: [
      'Premium sponsors receive booth locations near keynote entrance and lunch area for maximum foot traffic',
      'All booths are strategically placed to ensure attendee visibility during breaks',
      'Setup and breakdown times provided approximately 1 week before the conference',
      'Electrical outlets available upon request at no additional charge',
      'One 8\' banquet table included with all booth sponsorships',
    ],
  },
  {
    category: 'Brand Visibility & Marketing',
    items: [
      'Logo placement on conference website with link to your company',
      'Logo on printed conference materials (programs, handouts, signage)',
      'Dedicated social media posts LinkedIn to our professional community',
      'Logo featured during lunch presentation (Platinum & Gold sponsors)'
    ],
  },
  {
    category: 'Speaking & Thought Leadership',
    items: [
      'Platinum: Keynote co-sponsorship with introduction during opening remarks',
      'Platinum: 5-minute spotlight presentation during keynote session',
      'Gold: Speaking slot in one of the conference track sessions',
      'Gold: Invitation to exclusive speaker dinner and networking event',
      'All speaking opportunities require speaker details 1 month before event',
      'Establish your company as a thought leader in the quality engineering community',
    ],
  },
  {
    category: 'Attendee Access & Networking',
    items: [
      'Direct face-to-face engagement with 400+ quality professionals',
      'A majority of attendees influence or make purchasing decisions',
      'Attendees include QA Engineers, Test Automation Engineers, Engineering Managers, and SDETs',
      'Full-day access to attendees during sessions, breaks, and lunch',
      'Lunch and parking passes for your booth staff',
      'Opportunity to collect leads and business cards throughout the event',
    ],
  },
  {
    category: 'Additional Benefits & Opportunities',
    items: [
      'Ability to include promotional materials in attendee swag bags',
      'Co-marketing opportunities with COSQAM before and after event',
      'Platinum/Gold sponsors: 50% discount on T-Shirt sponsorship',
      'Early access to conference schedule and speaker lineup',
      'Recognition during opening and closing remarks',
      'Post-event recap and sponsor thank you communications',
    ],
  },
];

// Main configuration export
export const sponsorshipConfig: SponsorshipConfig = {
  tiers: sponsorshipTiers,
  demographics,
  faqs,
  resources,
  benefitCategories,
};

// Helper function to get a specific tier by ID
export function getTierById(id: string): SponsorshipTier | undefined {
  return sponsorshipConfig.tiers.find((tier) => tier.id === id);
}

// Helper function to get featured tiers
export function getFeaturedTiers(): SponsorshipTier[] {
  return sponsorshipConfig.tiers.filter((tier) => tier.featured);
}

// Helper function to get booth sponsorships (Platinum, Gold, Silver)
export function getBoothSponsorships(): SponsorshipTier[] {
  return sponsorshipConfig.tiers.filter((tier) =>
    ['platinum', 'gold', 'silver'].includes(tier.id)
  );
}

// Helper function to get named sponsorships (Lunch, T-Shirt, Snack, Lanyard)
export function getNamedSponsorships(): SponsorshipTier[] {
  return sponsorshipConfig.tiers.filter((tier) =>
    ['lunch', 'tshirt', 'snack', 'lanyard'].includes(tier.id)
  );
}
