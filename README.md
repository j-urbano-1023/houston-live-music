# Houston Live — Pin Map MVP

A local-first Houston music discovery map built around clickable show pins.

## What's included

- Houston-centered interactive map
- Clickable show pins
- Pin popups with band, venue, genre, price, age restriction, and bar info
- Genre filtering
- Bar-only filtering
- Free-show filtering
- Local band metadata
- Venue metadata
- Community-submission flag
- Mobile layout
- Starter Supabase SQL schema

The map uses **Leaflet + OpenStreetMap**, so this starter does **not require a Mapbox token or API key**.

## Important

All events and venue names included in the starter data are fictional sample records for development. Replace them with real community submissions before launch.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Next milestones

1. Connect Supabase.
2. Build the Add a Show page.
3. Add a moderation queue.
4. Add real venue records.
5. Add band profile pages.
6. Add venue profile pages.
7. Add neighborhood/date filters.
8. Add authentication and contributor profiles.
9. Add marker clustering when there are many shows.
10. Add duplicate-show detection.

## Product principle

Houston Live should prioritize smaller local artists, independent venues, and community-submitted shows rather than allowing major touring concerts to dominate discovery.
