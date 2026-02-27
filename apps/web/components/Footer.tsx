import { Sora } from "next/font/google";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Link from "next/link";

const sora = Sora({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <MaxWidthWrapper>
        <div className="px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                <span className={`text-lg tracking-tight ${sora.className}`}>
                  thumbnaily
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mt-3 max-w-xs">
                AI-powered thumbnail generation for creators who'd rather make
                content than design graphics.
              </p>
            </div>

            <div className="flex gap-12 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/60">
                  Product
                </span>
                <Link
                  href="/app"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Generator
                </Link>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/60">
                  Legal
                </span>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-and-condition"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border/50 text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} Thumbnaily. All rights reserved.
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
