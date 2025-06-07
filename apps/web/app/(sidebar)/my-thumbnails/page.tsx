"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function MyThumbnails() {
    const [data, setData] = useState([]);
    const getThumbnails =async()=>{
        const response = await axios.get("/api/my-thumbnails");
        setData(response.data.thumbnails)
      }
      useEffect(()=>{
        getThumbnails();
      },[])
  return (
    <div className='m-5'>
    <h1 className='text-2xl font-bold'>Your Thumbnails</h1>
    <div className='grid grid-cols-1 md:grid-cols-3'>
        {[...data].reverse().map((e:{link:string , createdAt:Date},index)=>{
            return(
                <div className='p-2 relative' key={index}>
                    <Image src={`${e.link}`} width="1920" height="1080" alt="" className=''/>
                    <Link href={`${e.link}`} target='_blank' className='absolute top-2 right-2 z-10 '>
                        <Button variant={"outline"} className='p-2 m-1 hover:bg-primary/80'> 
                            <Download className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )
        })}
    </div>
    </div>
  )
}