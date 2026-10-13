import fs from "fs";
import path from "path";
import Testimonials from "./Testimonials";

// folder di /public + kode nama file
const FOLDERS = [
  { id: "media-belajar-anak", prefix: "MB" },
  { id: "bimbel", prefix: "B" },
];

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

function getImages(folder, prefix) {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) return [];
  const codePattern = new RegExp(`^${prefix}\\d+`, "i");
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f) && codePattern.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/${folder}/${encodeURIComponent(f)}`);
}

export default function Page() {
  // Semua testimoni digabung jadi satu slide
  const images = FOLDERS.flatMap((f) => getImages(f.id, f.prefix));

  return (
    <main className="page">
      <header className="hero">
        <p className="handle">@Evegrow.digital</p>
        <h1>Testimoni</h1>
        <p className="sub">
          Cerita nyata dari orang tua dan siswa yang sudah belajar bersama kami.
        </p>
      </header>

      <Testimonials images={images} />

      <footer className="footer">© Evegrow.digital</footer>
    </main>
  );
}
