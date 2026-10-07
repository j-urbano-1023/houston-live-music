export type Venue = {
  id: number;
  name: string;
  neighborhood: string;
  address: string;
  latitude: number;
  longitude: number;
  hasBar: boolean;
  servesFood: boolean;
  allAges: boolean;
};

export type Band = {
  id: number;
  name: string;
  hometown: string;
  genres: string[];
  local: boolean;
};

export type Show = {
  id: number;
  title: string;
  dateLabel: string;
  startTime: string;
  price: number;
  ageRestriction: string;
  venue: Venue;
  bands: Band[];
  verified: boolean;
  communitySubmitted: boolean;
};
