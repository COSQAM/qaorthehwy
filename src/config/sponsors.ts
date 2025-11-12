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
  platinum: [
    {
      name: "Applitools",
      logo: applitools,
      website: "https://applitools.com/",
    },
    {
      name: "Aries",
      logo: aries,
      website: "https://www.aries.com/",
    },
  ],
  gold: [
    {
      name: "Boundless",
      logo: boundless,
      website: "https://www.boundless.com/",
    },
    {
      name: "Brooksource",
      logo: brooksource,
      website: "https://www.brooksource.com/",
    },
    {
      name: "Boundless",
      logo: boundless,
      website: "https://www.boundless.com/",
    },
  ],
  silver: [
    {
      name: "BrowserStack",
      logo: browserstack,
      website: "https://www.browserstack.com/",
    },
    {
      name: "Capgemini",
      logo: capgemini,
      website: "https://www.capgemini.com/",
    },
    {
      name: "BrowserStack",
      logo: browserstack,
      website: "https://www.browserstack.com/",
    },
    {
      name: "Capgemini",
      logo: capgemini,
      website: "https://www.capgemini.com/",
    },
  ],
  lunch: [],
  snack: [],
  tshirt: [],
};
