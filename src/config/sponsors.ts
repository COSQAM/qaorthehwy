// Sponsor configuration
import applitools from "../assets/images/sponsors/applitools.webp";
import aries from "../assets/images/sponsors/aries.webp";
import boundless from "../assets/images/sponsors/boundless.webp";
import brooksource from "../assets/images/sponsors/brooksource.webp";
import browserstack from "../assets/images/sponsors/browserstack.webp";
import capgemini from "../assets/images/sponsors/capgemini.webp";

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
