import "./globals.css";
import { Playpen_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";

// الخط العربي
const arabicFont = Playpen_Sans_Arabic({
    subsets: ["arabic"],
    weight: ["400", "600", "700"],
    display: "swap",
    variable: "--ar",
});

// الخط الإنجليزي المحلي
const englishFont = localFont({
    src: [
        { path: "./fonts/Geom-Regular.ttf", weight: "400", style: "normal" },
        { path: "./fonts/Geom-SemiBold.ttf", weight: "600", style: "normal" },
        { path: "./fonts/Geom-Bold.ttf", weight: "700", style: "normal" },
    ],
    variable: "--en",
    display: "swap",
});

export const metadata = {
    title: "Paradise Pizza",
    description: "Order fresh pizza online",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ar" className={`${arabicFont.variable} ${englishFont.variable}`}>
            <body>{children}</body>
        </html>
    );
}
