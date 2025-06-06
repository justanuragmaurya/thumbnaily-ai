import { auth } from "@/lib/auth";
import { defaultOverrides } from "next/dist/server/require-hook";
import Image from "next/image";

export default async function AccountPage() {
    const session = await auth();
    
    if(!session){
        return(
            <div>
                Please login before using the app.
            </div>
        )
    }

    return(
        <div className="mt-32 flex flex-col w-full items-center">
            <Image src={session?.user.image!} width={500} height={500} alt="Profile Picture" className="max-w-24 rounded-full"/>
            <h1 className="text-xl font-bold mt-5">{session.user.name}</h1>
            <h1 className="text-sm text-primary/50">{session.user.email}</h1>
        </div>
    )
}