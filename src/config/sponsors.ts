// Sponsor configuration
import applitools from "../assets/images/sponsors/applitools.webp";
import testmuiai from "../assets/images/sponsors/testmuai.png";

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
  gold: [{
    name: "Applitools",
    logo: applitools,
    website: "https://applitools.com/",
  },
  {
    name: "TestMu AI",
    logo: testmuiai,
    website: "https://www.testmuai.com/",
  }],
  silver: [],
  lunch: [],
  snack: [],
  tshirt: [],
};
