import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Thumbnaily',
  description: 'Privacy policy for Thumbnaily service',
}

function page() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8"><strong>Last Updated:</strong> 28/05/2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Maurya Tech ("we", "our", or "us") respects your privacy and is committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website and
              tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">We may collect, use, and store different kinds of personal information about you, which we have grouped as follows:</p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li className="mb-1"><strong>Identity Data</strong>: Includes username, email address.</li>
              <li className="mb-1"><strong>Technical Data</strong>: Includes IP address, browser type and version, operating system.</li>
              <li className="mb-1"><strong>Usage Data</strong>: Information about how you use our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">How We Use Your Data</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li className="mb-1">To provide and maintain our service.</li>
              <li className="mb-1">To notify you about changes to our service.</li>
              <li className="mb-1">To provide customer care and support.</li>
              <li className="mb-1">To improve our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
              used, or accessed in an unauthorized way. We limit access to your personal data to those employees and 
              third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Your Legal Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:</p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li className="mb-1">The right to access your personal data.</li>
              <li className="mb-1">The right to request correction of your personal data.</li>
              <li className="mb-1">The right to request erasure of your personal data.</li>
              <li className="mb-1">The right to object to processing of your personal data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use cookies to distinguish you from other users of our website, which helps us to provide you with a good 
              experience when you browse our website and allows us to improve our site.
            </p>
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