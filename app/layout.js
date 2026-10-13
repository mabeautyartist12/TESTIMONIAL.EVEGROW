import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Testimoni @Evegrow.digital",
  description:
    "Testimoni pelanggan Evegrow.digital untuk Media Belajar Anak dan Bimbel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={font.className}>{children}</body>
    </html>
  );
}
