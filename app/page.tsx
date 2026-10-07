"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ShowCard from "@/components/ShowCard";
import { genres, shows } from "@/lib/sampleData";

const MusicMap = dynamic(() => import("@/components/MusicMap"), { ssr: false });

export default function Home() {
  const [selectedShowId, setSelectedShowId] = useState<number | null>(shows[0]?.id ?? null);
  const [genre, setGenre] = useState("All");
  const [barOnly, setBarOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);

  const filteredShows = useMemo(() => {
    return shows.filter((show) => {
      const showGenres = show.bands.flatMap((band) => band.genres);

      if (genre !== "All" && !showGenres.includes(genre)) return false;
      if (barOnly && !show.venue.hasBar) return false;
      if (freeOnly && show.price !== 0) return false;

      return true;
    });
  }, [genre, barOnly, freeOnly]);

  return (
    <main>
      <header className="header">
        <div>
          <div className="eyebrow">Houston&apos;s local music map</div>
          <h1>Houston Live</h1>
        </div>

        <button className="submit-button">+ Add a show</button>
      </header>

      <section className="filters">
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="All">All genres</option>
          {genres.map((item) => <option key={item}>{item}</option>)}
        </select>

        <label className="toggle">
          <input
            type="checkbox"
            checked={barOnly}
            onChange={(e) => setBarOnly(e.target.checked)}
          />
          Bar
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(e) => setFreeOnly(e.target.checked)}
          />
          Free
        </label>

        <span className="result-count">
          {filteredShows.length} local shows
        </span>
      </section>

      <section className="workspace">
        <div className="map-column">
          <MusicMap
            shows={filteredShows}
            selectedShowId={selectedShowId}
            onSelectShow={setSelectedShowId}
          />
        </div>

        <aside className="sidebar">
          <div className="sidebar-heading">
            <div>
              <span className="eyebrow">Discover</span>
              <h2>Under the radar</h2>
            </div>
            <p>Community-first shows from Houston&apos;s local scene.</p>
          </div>

          <div className="show-list">
            {filteredShows.map((show) => (
              <ShowCard
                key={show.id}
                show={show}
                selected={show.id === selectedShowId}
                onClick={() => setSelectedShowId(show.id)}
              />
            ))}

            {filteredShows.length === 0 && (
              <div className="empty">No shows match those filters yet.</div>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
