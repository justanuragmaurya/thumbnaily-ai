import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | Thumbnaily',
  description: 'Refund policy for Thumbnaily service',
}

function page() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Refund Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8"><strong>Last Updated:</strong> 28/05/2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Overview</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We strive to ensure your satisfaction with our services. This refund policy outlines the circumstances 
              under which you may be eligible for a refund and the process for requesting one.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Subscription Refunds</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Refunds for our subscription services are subject to the following conditions:</p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li className="mb-1">You may request a full refund within 14 days of your initial purchase if you&apos;re not satisfied with our service.</li>
              <li className="mb-1">No refunds will be provided after the 14-day period has expired.</li>
              <li className="mb-1">For annual subscriptions, a pro-rated refund may be considered at our discretion if requested within 30 days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">One-time Purchases</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">For one-time purchases or credits:</p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li className="mb-1">Refunds may be issued within 7 days of purchase if the service was not used.</li>
              <li className="mb-1">Partial refunds may be offered if only a portion of purchased credits have been used.</li>
              <li className="mb-1">No refunds will be issued for completed services or fully consumed credits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Service Disruptions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If our service experiences significant disruptions affecting your ability to use the platform, we may 
              offer compensation in the form of service credits or, in certain circumstances, a partial refund. 
              Significant disruptions are determined at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">How to Request a Refund</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-5 text-gray-600 dark:text-gray-300">
              <li className="mb-1">Contact our support team at <a href="mailto:work.anuragmaurya@gmail.com" className="text-primary hover:text-primary/80">work.anuragmaurya@gmail.com</a>.</li>
              <li className="mb-1">Include your account information and details about your purchase.</li>
              <li className="mb-1">Provide a reason for your refund request.</li>
            </ol>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              We will review your request and respond within 3-5 business days. Approved refunds will be processed 
              using the original payment method, and may take 5-10 business days to appear on your statement depending 
              on your payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Contact</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1">If you have any questions about our refund policy, please contact us:</p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">Email: <a href="mailto:work.anuragmaurya@gmail.com" className="text-primary hover:text-primary/80">work.anuragmaurya@gmail.com</a></p>
            <p className="text-gray-600 dark:text-gray-300">Website: <a href="https://anuragmaurya.com" className="text-primary hover:text-primary/80">anuragmaurya.com</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default page
