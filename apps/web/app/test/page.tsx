import db from "@repo/db"
export default async function TestingPage(props:any) {
    // await db.user.create({
    //     data:{
    //         email: "anurag@mail.com",
    //         name: "Anurag",
    //         avatar: "https://framerusercontent.com/images/3xLYE24sMWp956r9KlX5jYBsmWo.webp",
    //     }
    // })

    const person = await db.user.findFirst({
        where:{
            name:"Anurag"
        }
    })

    return(
        <div>
            {JSON.stringify(person)}
            {person?.avatar&&Profile(person)}
            
        </div>
    )
}


function Profile(person:any){
    return(
    <div className="flex flex-col items-center max-w-md m-5 border rounded-xl">
    <img className="w-48 rounded-full border border-gray-200 m-5" src={`${person.avatar}`}/>
    <h2 className="">{person.name}</h2>
    </div>
    )
}