/**
 * Front page content configuration
 * Update this file to change photos and content on the home page
 */

export const heroImage = {
  src: "/img/hero.webp",
  alt: "Resin‑bound entrance with contrasting border and stone pillars",
};

export type ProjectType = 'before-after' | 'single';

type BaseProject = {
  id: string;
  title: string;
  tags: string[];
};

type BeforeAfterProject = BaseProject & {
  type: 'before-after';
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
};

type SingleImageProject = BaseProject & {
  type: 'single';
  image: {
    src: string;
    alt: string;
  };
};

export type Project = BeforeAfterProject | SingleImageProject;

export const recentProjects: Project[] = [
  {
    id: "driveway-resurfacing",
    title: "Driveway resurfacing",
    type: "before-after",
    beforeImage: {
      src: "/gallery/driveway-cincy-before.jpg",
      alt: "Before: driveway prepped with reinforcement grid",
    },
    afterImage: {
      src: "/gallery/driveway-cincy-after-2.jpg",
      alt: "After: resin‑bound driveway—finished surface at garage",
    },
    tags: ["Cincinnati, OH", "Approx. 600 sq ft", "Blend: Grey mix"],
  },
  {
    id: "finished-edge",
    title: "Finished edge (tape‑off)",
    type: "single",
    image: {
      src: "/gallery/driveway-cincy-after.jpg",
      alt: "Resin‑bound driveway with clean edge and tape‑off",
    },
    tags: ["Cincinnati, OH", "Resin‑bound driveway"],
  },
  {
    id: "surface-detail",
    title: "Surface detail",
    type: "single",
    image: {
      src: "/gallery/driveway-cincy-detail.jpg",
      alt: "Resin‑bound surface detail—aggregate texture",
    },
    tags: ["Texture close‑up", "Permeable, UV‑stable"],
  },
];

export const certificateImage = {
  src: "/AAC1A118-5584-4B37-9504-1F0C01C4B1D1.jpg",
  alt: "Vuba Stone Certified Installer badge",
  width: 300,
  height: 450,
};
