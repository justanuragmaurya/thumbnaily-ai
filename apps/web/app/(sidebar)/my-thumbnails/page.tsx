"use client"
import axios from 'axios';
import Image from 'next/image';
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
                <div className='p-2' key={index}>
                    <Image src={`${e.link}`} width="1920" height="1080" alt=""/>
                </div>
            )
        })}
    </div>
    </div>
  )
}