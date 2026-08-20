// Sponsor configuration
//
// 2027 cycle: the roster starts empty and fills in as sponsors are confirmed.
// Sponsors.astro hides any tier with no sponsors, so empty tiers render nothing.
//
// To add a sponsor:
//   1. Drop the logo in src/assets/images/sponsors/
//   2. Import it here, e.g. import acme from "../assets/images/sponsors/acme.png";
//   3. Add { name: "Acme", logo: acme, website: "https://acme.com/" } to its tier
//
// Logos from previous years are still in src/assets/images/sponsors/ and can be
// re-imported as those companies renew.

export interface Sponsor {
  name: string;
  logo: ImageMetadata;
  website?: string;
}

export interface SponsorTiers {
  platinum: Sponsor[];
  gold: Sponsor[];
  silver: Sponsor[];
  lunch: Sponsor[];
  snack: Sponsor[];
  tshirt: Sponsor[];
}

export const sponsorConfig: SponsorTiers = {
  platinum: [],
  gold: [],
  silver: [],
  lunch: [],
  snack: [],
  tshirt: [],
};
