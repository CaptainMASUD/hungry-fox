'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Accordion, Button, Label, TextInput, Textarea } from 'flowbite-react'
import { FaPhone, FaEnvelope, FaComments, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'

export default function Contactus() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [supportStatus, setSupportStatus] = useState('Online')

  useEffect(() => {
    // Simulate real-time visitor count
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)

    // Simulate support status changes
    const statusInterval = setInterval(() => {
      setSupportStatus(prev => prev === 'Online' ? 'Busy' : 'Online')
    }, 15000)

    return () => {
      clearInterval(interval)
      clearInterval(statusInterval)
    }
  }, [])

  return (
    <div className="min-h-screen  text-white dark:bg-gray-900 dark:text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-gray-100 text-gray-600">Customer Support</h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm dark:text-gray-100 text-gray-600">Live Visitors: {visitorCount}</span>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="email" value="Your email" />
                <TextInput id="email" type="email" placeholder="name@company.com" required />
              </div>
              <div>
                <Label htmlFor="subject" value="Subject" />
                <TextInput id="subject" type="text" placeholder="Let us know how we can help you" required />
              </div>
              <div>
                <Label htmlFor="message" value="Your message" />
                <Textarea id="message" placeholder="Leave a comment..." required rows={4} />
              </div>
              <Button
              gradientDuoTone='purpleToBlue'
              outline
              type="submit">Send message</Button>
            </form>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Live Chat</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="mb-4">Start a conversation with our support team.</p>
              <Button color="light">
                <FaComments className="mr-2" />
                Start Chat
              </Button>
            </div>
          </section>
        </div>

        <aside className="lg:w-1/3 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">FAQ</h2>
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title>What are your business hours?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-400">
                    Our support team is available 24/7 to assist you with any inquiries.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>How can I track my order?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-400">
                    You can track your order by logging into your account and visiting the 'Order History' section.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>What is your return policy?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-400">
                    We offer a 30-day return policy for most items. Please check our Returns page for more details.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Support Status</h2>
            <motion.div
              animate={{
                backgroundColor: supportStatus === 'Online' ? '#059669' : '#DC2626'
              }}
              className="p-4 rounded-lg text-center"
            >
              <p className="font-semibold">{supportStatus}</p>
              <p className="text-sm">Average response time: 5 minutes</p>
            </motion.div>
          </section>
        </aside>
      </main>

      <footer className="border-t border-gray-800 mt-8 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <p className="flex items-center"><FaPhone className="mr-2" /> +1 (555) 123-4567</p>
              <p className="flex items-center"><FaEnvelope className="mr-2" /> hungry-fox@gmail.com</p>
            </div>
            <div className="flex space-x-4">
              <FaTwitter className="text-2xl hover:text-blue-400 cursor-pointer" />
              <FaFacebook className="text-2xl hover:text-blue-600 cursor-pointer" />
              <FaLinkedin className="text-2xl hover:text-blue-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
