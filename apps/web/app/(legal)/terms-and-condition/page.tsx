import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Thumbnaily',
  description: 'Terms and conditions for using Thumbnaily service',
}

function page() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8"><strong>Last Updated:</strong> 28/05/2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Acknowledgment</h2>
            <p className="text-gray-600 dark:text-gray-300">These Terms govern your use of the Service and your agreement with Maurya Tech.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">User Accounts</h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li className="mb-1">You must provide accurate and complete info.</li>
              <li className="mb-1">Keep your password confidential.</li>
              <li className="mb-1">Do not use offensive or unauthorized usernames.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300">All content is owned by Maurya Tech. Unauthorized use is prohibited.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">DMCA Policy</h2>
            <p className="text-gray-600 dark:text-gray-300">Send copyright claims to <a href="mailto:ragey.dev@gmail.com" className="text-primary hover:text-primary/80">ragey.dev@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300">Company liability is limited to $100 or the actual amount paid.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300">Service is provided &quot;as is&quot;, without warranties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300">Governed by the laws of India.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Contact</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1">Email: <a href="mailto:work.anuragmaurya@gmail.com" className="text-primary hover:text-primary/80">work.anuragmaurya@gmail.com</a></p>
            <p className="text-gray-600 dark:text-gray-300">Website: <a href="https://anuragmaurya.com" className="text-primary hover:text-primary/80">anuragmaurya.com</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default page
