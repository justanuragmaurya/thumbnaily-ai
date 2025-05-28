"use client"
import { motion } from "motion/react"

export default function BentoGrid(){
    return(
        <div className="w-full my-42">
            <div className="grid grid-cols-3 h-96 gap-3">
                <div className="col-span-2 p-6   bg-amber-300 rounded-3xl flex flex-col justify-end hover:shadow-lg transition-shadow">
                    <div>
                    <motion.h2 
                    initial={{x:"-10"}}
                    animate={{x:0 }}
                    className="max-w-xl text-5xl font-black">
                        Create Beautiful Thumbnails
                    </motion.h2>
                    <p className="mt-2">Design eye-catching thumbnails for your videos, blogs, and social media posts in seconds.</p>
                    </div> 
                </div>
                <div className="bg-red-300 p-6 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold">Ai Powered</h3>
                    <p className="mt-2">Generate stunning designs with our advanced AI algorithms.</p>
                    <div className="mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 h-96 gap-3 pt-3">
                <div className="bg-red-300 p-6 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold">Customizable</h3>
                    <p className="mt-2">Personalize your thumbnails with our easy-to-use editor.</p>
                    <div className="mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                </div>
                <div className="col-span-2 bg-amber-200 p-6 rounded-3xl flex flex-col justify-between hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-bold">Templates Gallery</h2>
                    <p className="text-lg mt-2">Choose from hundreds of professional templates designed for every platform and purpose.</p>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="bg-white bg-opacity-40 rounded-lg h-16"></div>
                        <div className="bg-white bg-opacity-40 rounded-lg h-16"></div>
                        <div className="bg-white bg-opacity-40 rounded-lg h-16"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}