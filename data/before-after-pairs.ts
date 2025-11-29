export type BeforeAfterPair = {
  id: string;
  before: string;
  after: string;
  location: string;
  label: string;
};

const toSrc = (relativePath: string) => encodeURI(relativePath);

export const defaultBeforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "driveway-cincy",
    before: toSrc("/gallery/driveway-cincy-before.jpg"),
    after: toSrc("/gallery/driveway-cincy-after-2.jpg"),
    location: "Cincinnati, OH",
    label: "Driveway resurfacing",
  },
  {
    id: "hussein-patio",
    before: toSrc("/gallery/Before + After/Hussein Before 1.jpg"),
    after: toSrc("/gallery/Before + After/Hussein After 1.jpg"),
    location: "Batavia, OH",
    label: "Garage apron refresh",
  },
  {
    id: "waterfront",
    before: toSrc("/gallery/Before + After/Waterfront before.JPG"),
    after: toSrc("/gallery/Before + After/Waterfront after.JPG"),
    location: "Northern Kentucky",
    label: "Waterfront patio upgrade",
  },
];
