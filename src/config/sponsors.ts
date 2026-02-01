// Sponsor configuration
import applitools from "../assets/images/sponsors/applitools.webp";
import testmuiai from "../assets/images/sponsors/testmuai.png";
import browserstack from "../assets/images/sponsors/browserstack.webp";

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
    name: "Browserstack",
    logo: browserstack,
    website: "https://www.browserstack.com/",
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
