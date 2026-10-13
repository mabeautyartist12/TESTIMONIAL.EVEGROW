import fs from "fs";
import path from "path";
import Testimonials from "./testimonials";

// Folder di /public -> nama folder = kategori testimoni
const CATEGORIES = [
  { id: "media-belajar-anak", label: "Media Belajar Anak" },
  { id: "bimbel", label: "Bimbel" },
];

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

// Dibaca otomatis saat build: tinggal upload foto ke folder, selesai.
function getImages(folder) {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/${folder}/${encodeURIComponent(f)}`);
}

export default function Page() {
  const data = CATEGORIES.map((c) => ({ ...c, images: getImages(c.id) }));

  return (
    <main className="page">
      <header className="hero">
        <p className="handle">@Evegrow.digital</p>
        <h1>Testimoni</h1>
        <p className="sub">Cerita nyata dari orang tua dan siswa yang sudah belajar bersama kami.</p>
      </header>

      <Testimonials categories={data} />

      <footer className="footer">© Evegrow.digital</footer>
    </main>
  );
}
