"use client";

import { useEffect, useRef, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Testimonials({ images }) {
  const [zoom, setZoom] = useState(null);
  const trackRef = useRef(null);

  // Tutup zoom dengan Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const slide = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (images.length === 0) {
    return (
      <section className="testi">
        <div className="empty">
          Belum ada testimoni. Upload foto ke folder <code>public/bimbel</code>{" "}
          atau <code>public/media-belajar-anak</code> di GitHub.
        </div>
      </section>
    );
  }

  return (
    <section className="testi">
      <div className="slider">
        <button className="nav prev" onClick={() => slide(-1)} aria-label="Sebelumnya">
          ‹
        </button>

        <div className="track" ref={trackRef}>
          {images.map((src, i) => (
            <figure className="slide" key={src}>
              <img
                src={`${BASE}${src}`}
                alt={`Testimoni ${i + 1}`}
                onClick={() => setZoom(`${BASE}${src}`)}
                draggable={false}
              />
            </figure>
          ))}
        </div>

        <button className="nav next" onClick={() => slide(1)} aria-label="Berikutnya">
          ›
        </button>
      </div>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)}>
          <img src={zoom} alt="Testimoni diperbesar" />
        </div>
      )}
    </section>
  );
}
