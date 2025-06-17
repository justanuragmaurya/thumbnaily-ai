"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Copy, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThumbnailDetails() {
  const { thumbnailid } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<MainData | null>(null);
  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      const response = await axios.post("/api/getdetails", {
        thumbnailid: thumbnailid,
      });
      setData(response.data);
      setLoading(false);
    }
    getDetails();
  }, []);
  
    if(loading){
        return(
            <div className="flex items-center justify-center w-full h-screen">
                Loading
            </div>
        )
    }
    return(<div className="flex items-center justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-5 border">
      <div className="flex flex-col gap-2">
        {data && (
          <Image
            src={data.data.link}
            width={1920}
            height={1080}
            alt="Thumbnail"
            className="rounded-md shadow"
          ></Image>
        )}
        <div className="flex gap-2">
          {data?.user.avatar ? (
            <Image
              src={data?.user.avatar}
              width={70}
              height={70}
              alt="User Image"
              className="rounded-full"
            ></Image>
          ) : (
            <div className="bg-black h-[70px] w-[70px] rounded-full flex items-center justify-center">
              <User size={40} />
            </div>
          )}
          {data && (
            <div className="flex flex-col justify-center">
              <h1 className="text-xs">Created By:</h1>
              <h2 className="font-semibold">{data?.user.name}</h2>
              <h2 className="text-xs">
                {data?.data.createdAt
                  ? new Date(data?.data.createdAt).toUTCString()
                  : ""}
              </h2>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="font-black text-xl">Prompt Used :</h1>
          <div className="relative">
            <Button variant={"outline"}>
              <Copy size={20} />
            </Button>
          </div>
        </div>
        <div>
          <p className="text-md text-primary/60 p-2">
            {data?.data.prompt}
          </p>
        </div>
      </div>
    </div>
    </div>)
}

interface MainData {
  data: Data;
  user: User;
}
interface Data {
  prompt: string;
  link: string;
  createdAt: Date;
}
interface User {
  name: string;
  avatar: string;
}
