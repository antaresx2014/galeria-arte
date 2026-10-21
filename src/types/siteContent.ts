export interface Exhibition {
  year: number;
  title: string;
  venue: string;
}

export interface SiteContent {
  artist: {
    name: string;
    tagline: string;
    location: string;
    bio: string;
    bioExtended: string;
    statement: string;
    exhibitions: Exhibition[];
    awards: string[];
    stats: {
      worksInCollections: string;
      countriesCollected: string;
      yearsActive: string;
      uniquePiecesPercent: string;
    };
    portraitImage: string;
    studioImage: string;
  };
  contact: {
    whatsappNumber: string;
    contactEmail: string;
    phoneDisplay: string;
    schedule: string;
    studioAddress: string;
  };
  navbar: {
    topNoticeLeft: string;
    topNoticeCenter: string;
    collectorSupportText: string;
    links: {
      collection: string;
      artist: string;
      atelier: string;
      contact: string;
    };
  };
  hero: {
    badge: string;
    atelierPrefix: string;
    mainTitle: string;
    mainTitleHighlight: string;
    exploreBtnText: string;
    featuredBtnText: string;
    trustBadges: {
      signedCertificate: string;
      secureShipping: string;
      atelierLocation: string;
    };
  };
  artistSection: {
    badge: string;
    titlePrefix: string;
    exhibitionsHeading: string;
    awardsHeading: string;
  };
  guarantees: {
    authenticity: {
      title: string;
      description: string;
    };
    shipping: {
      title: string;
      description: string;
    };
    trial: {
      title: string;
      description: string;
    };
  };
  footer: {
    subtitle: string;
    brandDescription: string;
    locationLabel: string;
    contactLabel: string;
    copyrightNotice: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
  };
  catalog: {
    sectionBadge: string;
    sectionTitle: string;
    sectionDescription: string;
    emptyMessage: string;
  };
}
