import { Show } from "@/lib/types";

type Props = {
  show: Show;
  selected: boolean;
  onClick: () => void;
};

export default function ShowCard({ show, selected, onClick }: Props) {
  const genres = Array.from(
    new Set(show.bands.flatMap((band) => band.genres))
  );

  return (
    <button
      onClick={onClick}
      className={`show-card ${selected ? "selected" : ""}`}
    >
      <div className="show-card-top">
        <span className="date-chip">{show.dateLabel} · {show.startTime}</span>
        {show.communitySubmitted && <span className="community-chip">Community</span>}
      </div>

      <h3>{show.title}</h3>
      <p className="bands">{show.bands.map((band) => band.name).join(" · ")}</p>
      <p className="venue">{show.venue.name} — {show.venue.neighborhood}</p>

      <div className="tags">
        {genres.map((genre) => <span key={genre}>{genre}</span>)}
        <span>{show.price === 0 ? "Free" : `$${show.price}`}</span>
        <span>{show.ageRestriction}</span>
        {show.venue.hasBar && <span>Bar</span>}
      </div>
    </button>
  );
}
