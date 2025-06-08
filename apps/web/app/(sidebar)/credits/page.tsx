"use client"
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
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CreditsPage() {
  const [plan, setPlan] = useState<string | undefined>(undefined);
  const [loading,setLoading] = useState<boolean>(false);
  const [credits,setCredits] = useState<number>(0);
  const [cloading,setcLoading] = useState<boolean>(false);
  const [country,setCountry] = useState<string>("");
  const router = useRouter();

  const handleClick = async () => {
    if(!plan){
      return
    }
    setLoading(true);
    const response = await axios.post("/api/pay",{
      product_id:plan,
      country:country
    });
    const link = response.data.link;
    setLoading(true);
    router.push(link);
  };
  
  useEffect(() => {
    async function fetchCredits() {
      setcLoading(true);
      const response = await axios.get("/api/getcredits");
      const credits = response.data.credits;
      if(credits){
        setCredits(credits);
      }
      setcLoading(false);
    }
    fetchCredits();
  }, []);

  const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="h-screen flex items-center justify-center px-2 bg-background">
      <div className="border rounded-xl shadow flex flex-col md:flex-row w-full max-w-3xl bg-background overflow-hidden">

        <div className="flex-1 flex flex-col items-center justify-center p-10 border-b md:border-b-0 md:border-r border-border">
          <h2 className="text-lg text-foreground">Current Credits: </h2>
          <h1 className="text-5xl font-black m-2 text-foreground">{cloading?"Loading":credits}🔥</h1>
          <p className="text-primary/50 text-sm text-center">
            Each thumbnail cost 1 credit🔥 to make !
          </p>
        </div>
        {/* Buy Credits Section */}
        <div className="flex-1 flex flex-col justify-center p-10">
          <h1 className="text-xl font-bold mb-4 text-foreground">Buy More credits</h1>
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger className="w-full mx-auto mb-4">
              <SelectValue placeholder="Select Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdt_fiZwCeFFCoOk0YB3fNrOH">25</SelectItem>
              <SelectItem value="pdt_B5VzoGkDoHNqiXk7ySoLQ">50</SelectItem>
              <SelectItem value="pdt_vNJc6ot0MMBfxSWtg6p2l">100</SelectItem>
            </SelectContent>
          </Select>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-full mx-auto mb-4">
              <SelectValue placeholder="Select Your Country" />
            </SelectTrigger>
            <SelectContent>
              {sortedCountries.map((e,index)=>{
                return(
                  <SelectItem key={index} value={e.code}>{e.name}{e.flag}</SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <Button className="w-full" onClick={handleClick}>{loading?<><Loader2Icon className="animate-spin"/>Loading</>:"Buy"}</Button>
        </div>
      </div>
    </div>
  );
}

export default CreditsPage;