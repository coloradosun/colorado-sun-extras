import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Button } from "react-aria-components"
import ProcessedHtmlEmbed from "../components/ProcessedHtmlEmbed"
import "../styles/global.css"

/**
 * Parse a date that could be YYYY-MM-DD string or Date object
 * Handles timezone issues by parsing as local date
 */
function parseLocalDate(dateInput) {
  if (!dateInput) return null
  
  // If it's already a Date object
  if (dateInput instanceof Date) {
    return dateInput
  }
  
  // If it's a string in YYYY-MM-DD format
  if (typeof dateInput === 'string') {
    // Check if it's ISO format (YYYY-MM-DD)
    const isoMatch = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (isoMatch) {
      const [, year, month, day] = isoMatch
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
    // Fallback: try parsing as-is
    return new Date(dateInput)
  }
  
  return null
}

// Sidebar toggle icon - modern panel layout icon
const SidebarIcon = ({ isOpen }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
    <path strokeWidth={2} d="M9 3v18" />
    {isOpen && (
      <path strokeLinecap="round" strokeWidth={2} d="M14 9l3 3-3 3" />
    )}
    {!isOpen && (
      <path strokeLinecap="round" strokeWidth={2} d="M17 9l-3 3 3 3" />
    )}
  </svg>
)

// Custom components for MDX
const mdxComponents = {}

export default function ShareTemplate({ data, children }) {
  const { frontmatter } = data.mdx
  const { title, description, htmlFile, category, publishDate } = frontmatter
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Nav Bar - Minimal for sharing */}
      <header className="bg-sun-dark text-white py-3 px-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onPress={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded transition"
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <SidebarIcon isOpen={isSidebarOpen} />
            </Button>
            <Link to="/" className="hover:opacity-80 transition">
              {/* Logo - replace src with your logo file */}
              <img 
                src="/images/logo.png" 
                alt="Colorado Sun Extras" 
                className="h-8 min-w-[200px] object-contain object-left"
                onError={(e) => {
                  // Fallback to text if logo not found
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <span className="text-xl font-bold hidden">Colorado Sun Extras</span>
            </Link>
          </div>
          {/* No navigation links in share view */}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Slides off screen (no metadata or edit links) */}
        <aside 
          className={`absolute inset-y-0 left-0 z-10 w-96 bg-gray-50 border-r border-gray-200 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            {/* Breadcrumb - simplified */}
            <nav className="text-xs text-gray-500 mb-4">
              <span>{category}</span>
            </nav>

            {/* Title & Description */}
            <h1 className="text-2xl font-bold text-sun-dark mb-3">{title}</h1>
            <p className="text-gray-600 text-sm mb-4">{description}</p>

            {/* Published Date */}
            <p className="text-xs text-gray-400 mb-6">
              {parseLocalDate(publishDate)?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* MDX Content */}
            <div className="prose prose-sm max-w-none post-content">
              <MDXProvider components={mdxComponents}>
                {children}
              </MDXProvider>
            </div>
          </div>
        </aside>

        {/* Right Content - Full Height HTML Embed */}
        <main className={`flex-1 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-96" : "ml-0"
        }`}>
          <ProcessedHtmlEmbed 
            file={htmlFile} 
            publishDate={publishDate} 
            title={title} 
          />
        </main>
      </div>
    </div>
  )
}

export const Head = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title} | Colorado Sun Extras</title>
    <meta name="description" content={data.mdx.frontmatter.description} />
  </>
)

export const query = graphql`
  query ShareBySlug($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        slug
        description
        category
        publishDate
        author
        htmlFile
      }
    }
  }
`
