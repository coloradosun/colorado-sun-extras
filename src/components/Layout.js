import React from "react"
import { Link } from "gatsby"

export default function Layout({ children, title }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-sun-dark text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-sun-gold transition">
            Colorado Sun Extras
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-sun-gold transition">
              Home
            </Link>
            <Link to="/categories" className="hover:text-sun-gold transition">
              Categories
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-sun-dark text-gray-400 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© 2025 The Colorado Sun</p>
        </div>
      </footer>
    </div>
  )
}
