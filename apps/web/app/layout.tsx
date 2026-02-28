import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Thumbnaily — AI Thumbnail Generator",
  description:
    "Generate scroll-stopping thumbnails in seconds with AI. No design skills needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const twitterImagePath =
    "thumbnails/assests/Screenshot+2025-06-07+at+17.36.39.png";
  const twitterImageUrl = process.env.R2_PUBLIC_BASE_URL
    ? `${process.env.R2_PUBLIC_BASE_URL.replace(/\/+$/, "")}/${twitterImagePath}`
    : "https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/thumbnails/assests/Screenshot+2025-06-07+at+17.36.39.png";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codeanuragg" />
        <meta name="twitter:title" content="Thumbnaily — AI Thumbnail Generator" />
        <meta
          name="twitter:description"
          content="Generate scroll-stopping thumbnails in seconds with AI."
        />
        <meta
          name="twitter:image"
          content={twitterImageUrl}
        />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <NextTopLoader color="#DC2626" />
        <Providers>
          {children}
          <Toaster />
          <Analytics/>
        </Providers>
      </body>
    </html>
  );
}
