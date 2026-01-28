import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-sun-gold text-sun-dark font-medium rounded hover:bg-opacity-90 transition"
        >
          Go Home
        </Link>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <>
    <title>Page Not Found | Colorado Sun Extras</title>
  </>
)
