// import type { Metadata } from "next";
import localFont from "next/font/local";
import "aos/dist/aos.css";
import "./globals.css";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

let title = "Tweetbio – AI Twitter Bio Generator";
let description = "Generate your next Twitter bio in seconds";
let url = "https://www.wordswap.ai/";
let ogimage = "https://www.wordswap.ai/og-image.png";
let sitename = "wordswap.ai";

// export const metadata: Metadata = {
//   metadataBase: new URL(url),
//   title,
//   description,
//   icons: {
//     icon: "/favicon.ico",
//   },
//   openGraph: {
//     images: [ogimage],
//     title,
//     description,
//     url: url,
//     siteName: sitename,
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     images: [ogimage],
//     title,
//     description,
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
