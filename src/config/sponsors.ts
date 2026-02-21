// Sponsor configuration
import testmuiai from "../assets/images/sponsors/testmuai.png";
import browserstack from "../assets/images/sponsors/browserstack.webp";
import parasoft from "../assets/images/sponsors/parasoft.png"
import leapwork from "../assets/images/sponsors/leapwork.svg"
import qtgroup from "../assets/images/sponsors/qtgroup.png"

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
  platinum: [{
    name: "Leapwork",
    logo: leapwork,
    website: "https://www.leapwork.com/",
  }],
  gold: [{
    name: "Browserstack",
    logo: browserstack,
    website: "https://www.browserstack.com/",
  },
  {
    name: "TestMu AI",
    logo: testmuiai,
    website: "https://www.testmuai.com/",
  },
  {
    name: "Parasoft",
    logo: parasoft,
    website: "https://www.parasoft.com/",
  }],
  silver: [{
    name: "Qt Group",
    logo: qtgroup,
    website: "https://www.qt.io/",
  }],
  lunch: [],
  snack: [],
  tshirt: [],
};
