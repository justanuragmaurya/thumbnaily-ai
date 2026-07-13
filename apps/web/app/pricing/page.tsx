import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

const plans = [
  {
    name: 'Starter',
    credits: 10,
    price: 'Rs.50',
    usd: '$0.58',
    description: 'Perfect for trying out Thumbnaily AI',
    popular: false,
  },
  {
    name: 'Pro',
    credits: 50,
    price: 'Rs.250',
    usd: '$2.90',
    description: 'Best for regular creators',
    popular: true,
  },
  {
    name: 'Elite',
    credits: 100,
    price: 'Rs.500',
    usd: '$5.80',
    description: 'For power users & agencies',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center p-6 py-16">

        <h1 className="text-4xl font-bold text-blue-600 mb-2">Pricing</h1>
        <p className="text-gray-500 mb-2 text-center">
          <span className="font-semibold text-blue-500">1 thumbnail</span> ={' '}
          <span className="font-semibold text-yellow-600">1 credit</span>
          {' '}· Rs.5 / $0.058 per credit
        </p>
        <p className="text-xs text-gray-400 mb-10">No hidden fees.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-background rounded-2xl border shadow-lg px-6 py-8 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-xl ${
                plan.popular ? 'border-blue-500 ring-2 ring-blue-400' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}

              <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
              <p className="text-gray-400 text-sm mb-4 text-center">{plan.description}</p>

              <div className="text-4xl font-extrabold text-blue-600 mb-1">{plan.price}</div>
              <div className="text-gray-400 text-sm mb-1">{plan.usd}</div>
              <div className="text-gray-500 text-sm mb-6">
                <span className="font-semibold text-yellow-600">{plan.credits} credits</span>
              </div>

              <Link
                href="/credits"
                className={`w-full text-center py-2 px-6 rounded-xl font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'border border-blue-500 text-blue-500 hover:bg-blue-50'
                }`}
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}