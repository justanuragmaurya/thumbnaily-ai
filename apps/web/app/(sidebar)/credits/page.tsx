"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Sora } from "next/font/google";
import { appCache } from "@/lib/cache";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const CACHE_KEY = "credits";

function CreditsPage() {
  const cached = appCache.get<number>(CACHE_KEY);

  const [plan, setPlan] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<number>(cached ?? 0);
  const [cloading, setcLoading] = useState(!cached);
  const [country, setCountry] = useState<string>("");
  const router = useRouter();

  const handleClick = async () => {
    if (!plan) return;
    setLoading(true);
    const response = await axios.post("/api/pay", {
      product_id: plan,
      country: country,
    });
    const link = response.data.link;
    setLoading(true);
    router.push(link);
  };

  useEffect(() => {
    if (cached !== undefined) return;
    async function fetchCredits() {
      setcLoading(true);
      const response = await axios.get("/api/getcredits");
      const c = response.data.credits;
      if (c) {
        setCredits(c);
        appCache.set(CACHE_KEY, c);
      }
      setcLoading(false);
    }
    fetchCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedCountries = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-10 border-b md:border-b-0 md:border-r border-border/50">
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/60 mb-3">
              Current Balance
            </span>
            <h1 className={`text-5xl font-bold ${sora.className}`}>
              {cloading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : (
                credits
              )}
            </h1>
            <span className="text-sm text-muted-foreground mt-2">
              credits available
            </span>
            <p className="text-xs text-muted-foreground/50 mt-4 text-center">
              1 credit = 1 thumbnail
            </p>
          </div>

          <div className="flex-1 p-8 md:p-10">
            <h2
              className={`text-lg font-semibold mb-5 ${sora.className}`}
            >
              Buy Credits
            </h2>
            <div className="space-y-3">
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger className="w-full rounded-xl border-border/50">
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdt_fiZwCeFFCoOk0YB3fNrOH">
                    25 credits
                  </SelectItem>
                  <SelectItem value="pdt_B5VzoGkDoHNqiXk7ySoLQ">
                    50 credits
                  </SelectItem>
                  <SelectItem value="pdt_vNJc6ot0MMBfxSWtg6p2l">
                    100 credits
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full rounded-xl border-border/50">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {sortedCountries.map((e) => (
                    <SelectItem key={e.code} value={e.code}>
                      {e.flag} {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white border-0"
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Purchase"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditsPage;
