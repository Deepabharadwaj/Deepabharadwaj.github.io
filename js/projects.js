/**
 * Single source of truth for case-study metadata.
 *
 * Adding a new project:
 *   1. Append an entry to PROJECTS below (keep desired display order).
 *   2. Drop a folder at case-studies/<slug>/ with index.html + img/hero.jpg.
 *   3. Drop a thumbnail at case-studies/common/<slug>.png.
 *
 * The homepage project list and every case study's "next projects" carousel
 * are rendered from this list — no further wiring needed.
 *
 * Path conventions are anchored at the site root. Helpers in render.js rewrite
 * them with the correct number of `../` segments per page depth.
 */
window.SITE_PROJECTS = [
  {
    slug: 'amazon',
    title: 'Amazon Prime Video',
    shortTitle: 'Prime Video Redesign',
    summary:
      'Enhancing the user experience and value proposition of an existing video streaming platform on desktop, adding personalization as well as a social component to Amazon Prime Video',
    shortSummary:
      'Enhancing the user experience and value proposition of an existing video streaming platform on desktop',
    hero: 'case-studies/amazon/img/hero.jpg',
    thumbnail: 'case-studies/common/amazon.png',
  },
  {
    slug: 'adultit',
    title: 'Mentorship App',
    shortTitle: 'Mentorship App',
    summary:
      'Adult-it connects young adults to credible and empathetic mentors for guidance as they transition into adulthood, giving them the crucial support that they need to succeed and thrive as adults.',
    shortSummary:
      'Increasing workplace readiness for Underprivileged Young Adults looking for guidance transitioning into adulthood',
    hero: 'case-studies/adultit/img/hero.jpg',
    thumbnail: 'case-studies/common/adultit.png',
  },
  {
    slug: 'bark',
    title: 'UX Hackathon 2020',
    shortTitle: 'Bark - UX Hackathon',
    summary:
      "An onboarding process for a smart collar solution for dog owners, as well as showcasing the power of IoT to track pets' health stats.",
    shortSummary:
      "An onboarding process for a smart collar solution for dog owners. Plus a showcase of the power of IoT to track pets' health stats.",
    hero: 'case-studies/bark/img/hero.jpg',
    thumbnail: 'case-studies/common/bark.png',
  },
  {
    slug: 'amigas',
    title: 'Travel App',
    shortTitle: 'Travel App',
    summary:
      'Amigas is a travel app that aims to hone in and address specific pain points related to women, thus making the travel experience pleasurable by providing a virtual travel companion for solo women travelers.',
    shortSummary:
      "A travel app that addresses women's pain points by providing a virtual travel companion for solo women travelers.",
    hero: 'case-studies/amigas/img/hero.jpg',
    thumbnail: 'case-studies/common/amigas.png',
  },
];
