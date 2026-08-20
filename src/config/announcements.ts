// Announcement banner configuration
// Toggle visibility of Call for Speakers and Feedback banners on the home page

export interface AnnouncementBannerConfig {
  enabled: boolean;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  deadline?: string;
  openInNewTab?: boolean;
}

interface AnnouncementConfig {
  callForSpeakers: AnnouncementBannerConfig;
  feedback: AnnouncementBannerConfig;
}

export const announcementConfig: AnnouncementConfig = {
  callForSpeakers: {
    // Toggle to show/hide the Call for Speakers banner
    enabled: false,
    title: "CALL FOR SPEAKERS",
    description:
      "Never spoken at a conference before? Start here. This community is welcoming, supportive, and eager to hear your story. Experienced speakers we'd love to have you back, too. Real experiences and honest insights—we're here to learn from each other.",
    ctaText: "Submit Your Proposal",
    // TODO: 2027 Sessionize slug not issued yet. Set this before flipping
    // `enabled` to true — the banner stays hidden while the URL is empty.
    ctaUrl: "",
    deadline: "Deadline: March 15, 2027",
    openInNewTab: true,
  },
  feedback: {
    // Toggle to show/hide the Feedback banner
    enabled: false,
    title: "HOW WAS YOUR EXPERIENCE?",
    description: "Help us make next year even better. Share your thoughts and suggestions.",
    ctaText: "Leave Feedback",
    ctaUrl: "/contact",
    openInNewTab: false,
  },
};

export function getCallForSpeakersConfig(): AnnouncementBannerConfig {
  return announcementConfig.callForSpeakers;
}

export function getFeedbackConfig(): AnnouncementBannerConfig {
  return announcementConfig.feedback;
}
