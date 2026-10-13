"use client";

import { useEffect, useRef, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Testimonials({ categories }) {
  const [active, setActive] = useState(categories[0].id);
  const [zoom, setZoom] = useState(null);
  const trackRef = useRef(null);

  const current = categories.find((c) => c.id === active);

  // Kembali ke slide pertama saat ganti kategori
  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollTo({ left: 0 });
  }, [active]);

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

  return (
    <section className="testi">
      <div className="tabs" role="tablist" aria-label="Kategori testimoni">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            className={`tab ${active === c.id ? "is-active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
            <span className="count">{c.images.length}</span>
          </button>
        ))}
      </div>

      {current.images.length === 0 ? (
        <div className="empty">
          Belum ada testimoni. Upload foto ke folder{" "}
          <code>public/{current.id}</code> di GitHub.
        </div>
      ) : (
        <div className="slider">
          <button className="nav prev" onClick={() => slide(-1)} aria-label="Sebelumnya">
            ‹
          </button>

          <div className="track" ref={trackRef} key={active}>
            {current.images.map((src, i) => (
              <figure className="slide" key={src}>
                <img
                  src={`${BASE}${src}`}
                  alt={`Testimoni ${current.label} ${i + 1}`}
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
      )}

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(null)}>
          <img src={zoom} alt="Testimoni diperbesar" />
        </div>
      )}
    </section>
  );
        }
