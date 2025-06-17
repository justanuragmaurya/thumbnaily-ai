import db from "@repo/db"
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const data = await db.thumbnails.findMany();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 m-5 gap-2">
    {[...data].reverse().map((e,index)=>{
      return(
        <Link key={index} href={`/public/${e.id}`} className="group relative">
            <Image src={e.link} width={1920} height={1080} alt="Thumbnails" className="rounded-md"/>
            <div className="hidden group-hover:flex transition absolute inset-x-0 w-full bottom-0 h-max bg-gradient-to-t from-black to-transparent rounded-b-md p-2 pt-5">
                <div className="text-xs">
                    <h1> Click to know more about the creator and other details </h1>
                </div>
            </div>
        </Link>
      )
    })}
    </div>
  );
}