import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Thumbnaily",
  description: "Stunning thumbnails in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codeanuragg" />
        <meta name="twitter:title" content="Thumbnaily" />
        <meta
          name="twitter:description"
          content="Ai thumbnaily generator."
        />
        <meta
          name="twitter:image"
          content="https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/thumbnails/assests/Screenshot+2025-06-07+at+17.36.39.png"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
