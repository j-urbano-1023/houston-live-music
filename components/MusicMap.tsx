"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { Show } from "@/lib/types";

type Props = {
  shows: Show[];
  selectedShowId: number | null;
  onSelectShow: (id: number) => void;
};

export default function MusicMap({
  shows,
  selectedShowId,
  onSelectShow
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [29.7604, -95.3698],
      zoom: 11,
      zoomControl: true
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    // Helps Leaflet size correctly after Next.js finishes laying out the page.
    window.setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (layerRef.current) {
      layerRef.current.remove();
    }

    markersRef.current.clear();
    const layer = L.layerGroup().addTo(map);
    layerRef.current = layer;

    shows.forEach((show) => {
      const genres = Array.from(
        new Set(show.bands.flatMap((band) => band.genres))
      );

      const pin = L.divIcon({
        className: "houston-live-pin-wrapper",
        html: `
          <div class="houston-live-pin ${show.id === selectedShowId ? "is-selected" : ""}">
            <span>♪</span>
          </div>
        `,
        iconSize: [38, 46],
        iconAnchor: [19, 43],
        popupAnchor: [0, -42]
      });

      const marker = L.marker(
        [show.venue.latitude, show.venue.longitude],
        { icon: pin }
      );

      marker.bindPopup(`
        <div class="show-popup">
          <div class="show-popup-time">${show.dateLabel} · ${show.startTime}</div>
          <strong>${show.title}</strong>
          <div>${show.bands.map((band) => band.name).join(" · ")}</div>
          <div class="show-popup-muted">${show.venue.name} · ${show.venue.neighborhood}</div>
          <div class="show-popup-tags">
            ${genres.map((genre) => `<span>${genre}</span>`).join("")}
            <span>${show.price === 0 ? "Free" : `$${show.price}`}</span>
            <span>${show.ageRestriction}</span>
            ${show.venue.hasBar ? "<span>Bar</span>" : ""}
          </div>
        </div>
      `);

      marker.on("click", () => onSelectShow(show.id));
      marker.addTo(layer);

      markersRef.current.set(show.id, marker);
    });

    if (shows.length > 1) {
      const bounds = L.latLngBounds(
        shows.map((show) => [show.venue.latitude, show.venue.longitude] as [number, number])
      );
      map.fitBounds(bounds.pad(0.18), { maxZoom: 12 });
    } else if (shows.length === 1) {
      map.setView(
        [shows[0].venue.latitude, shows[0].venue.longitude],
        13
      );
    }
  }, [shows]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || selectedShowId === null) return;

    const show = shows.find((item) => item.id === selectedShowId);
    const marker = markersRef.current.get(selectedShowId);

    if (!show || !marker) return;

    map.flyTo(
      [show.venue.latitude, show.venue.longitude],
      Math.max(map.getZoom(), 13),
      { duration: 0.65 }
    );

    marker.openPopup();
  }, [selectedShowId, shows]);

  return <div ref={containerRef} className="map" aria-label="Map of Houston live music shows" />;
}
