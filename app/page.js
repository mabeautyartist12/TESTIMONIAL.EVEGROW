import fs from "fs";
import path from "path";
import Testimonials from "./testimonials";

// id = nama folder di /public, prefix = kode nama file
const CATEGORIES = [
  { id: "media-belajar-anak", label: "Media Belajar Anak", prefix: "MB" },
  { id: "bimbel", label: "Bimbel", prefix: "B" },
];

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

// Contoh nama valid: MB1.jpg, MB2.png, B1.jpg, B10.webp
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
  const data = CATEGORIES.map((c) => ({
    ...c,
    images: getImages(c.id, c.prefix),
  }));

  return (
    <main className="page">
      <header className="hero">
        <p className="handle">@Evegrow.digital</p>
        <h1>Testimoni</h1>
        <p className="sub">
          Cerita nyata dari orang tua dan siswa yang sudah belajar bersama kami.
        </p>
      </header>

      <Testimonials categories={data} />

      <footer className="footer">© Evegrow.digital</footer>
    </main>
  );
}
