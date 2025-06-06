import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ContactPage() {
  return (
    <div>
        <Navbar/>
        <div className='h-screen flex items-center justify-center'>
        <div className='border flex flex-col p-10 justify-center items-center'>
            <Image src={"/anuragmaurya.png"} width={100} height={100} alt='image' className='max-w-3xl rounded-full m-5'/>
            <h1 className='font-bold text-3xl'>Anurag Maurya</h1>
            <Link href={`mailto:contact@anuragmaurya@.com`}><h1 className='flex items-center text-sm text-primary/60'>contact@anuragmaurya@.com</h1></Link>
            <div className='flex gap-5 font-bold mt-2 text-blue-400'>
            <Link href={"https://x.com/codeanuragg"} target='_blank'><h1>Twitter</h1></Link>
            <Link href={"https://www.linkedin.com/in/realanuragmaurya/"} target='_blank'><h1>LinkedIn</h1></Link>
            </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}