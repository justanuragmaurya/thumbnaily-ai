import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="bg-background shadow-xl rounded-2xl px-8 py-10 max-w-md w-full border flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">Pricing</h1>
          <div className="text-lg text-gray-700 mb-6 text-center">
            <span className="font-semibold text-blue-500">1 thumbnail</span> = <span className="font-semibold text-yellow-600">1 credit</span>
            <br />
            <span className="text-gray-500">Rs.5 / $0.058 per credit</span>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="text-xs text-gray-400 text-center mt-4">No hidden fees.</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}