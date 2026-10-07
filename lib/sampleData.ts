import { Show } from "./types";

// SAMPLE/FICTIONAL events for development only.
// Replace with community submissions and database records before launch.
export const shows: Show[] = [
  {
    id: 1,
    title: "East End Noise Night",
    dateLabel: "Tonight",
    startTime: "8:00 PM",
    price: 10,
    ageRestriction: "18+",
    verified: true,
    communitySubmitted: true,
    venue: {
      id: 1,
      name: "Sample East End Room",
      neighborhood: "East End",
      address: "East End, Houston, TX",
      latitude: 29.7486,
      longitude: -95.3342,
      hasBar: true,
      servesFood: false,
      allAges: false
    },
    bands: [
      { id: 1, name: "Glass Harbor", hometown: "Houston", genres: ["Shoegaze", "Indie"], local: true },
      { id: 2, name: "Static Bloom", hometown: "Houston", genres: ["Noise Rock"], local: true }
    ]
  },
  {
    id: 2,
    title: "Heights Backyard Sessions",
    dateLabel: "Tonight",
    startTime: "7:30 PM",
    price: 0,
    ageRestriction: "All ages",
    verified: false,
    communitySubmitted: true,
    venue: {
      id: 2,
      name: "Sample Heights Patio",
      neighborhood: "The Heights",
      address: "The Heights, Houston, TX",
      latitude: 29.7997,
      longitude: -95.3983,
      hasBar: false,
      servesFood: true,
      allAges: true
    },
    bands: [
      { id: 3, name: "Bayou Radio", hometown: "Houston", genres: ["Indie", "Folk"], local: true }
    ]
  },
  {
    id: 3,
    title: "Montrose Heavy Showcase",
    dateLabel: "Friday",
    startTime: "9:00 PM",
    price: 12,
    ageRestriction: "21+",
    verified: true,
    communitySubmitted: true,
    venue: {
      id: 3,
      name: "Sample Montrose Club",
      neighborhood: "Montrose",
      address: "Montrose, Houston, TX",
      latitude: 29.7424,
      longitude: -95.3912,
      hasBar: true,
      servesFood: true,
      allAges: false
    },
    bands: [
      { id: 4, name: "Terminal Sun", hometown: "Houston", genres: ["Metal", "Hardcore"], local: true },
      { id: 5, name: "South Loop", hometown: "Houston", genres: ["Hardcore"], local: true }
    ]
  },
  {
    id: 4,
    title: "Downtown Local Lineup",
    dateLabel: "Saturday",
    startTime: "8:30 PM",
    price: 8,
    ageRestriction: "18+",
    verified: false,
    communitySubmitted: true,
    venue: {
      id: 4,
      name: "Sample Downtown Stage",
      neighborhood: "Downtown",
      address: "Downtown Houston, TX",
      latitude: 29.7589,
      longitude: -95.3677,
      hasBar: true,
      servesFood: false,
      allAges: false
    },
    bands: [
      { id: 6, name: "Concrete Palms", hometown: "Houston", genres: ["Punk", "Alternative"], local: true },
      { id: 7, name: "Night Bus", hometown: "Houston", genres: ["Post-Punk"], local: true }
    ]
  }
];

export const genres = Array.from(
  new Set(shows.flatMap((show) => show.bands.flatMap((band) => band.genres)))
).sort();
